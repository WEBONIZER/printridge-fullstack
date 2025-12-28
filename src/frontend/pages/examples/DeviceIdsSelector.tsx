import React, { useState, useEffect, useRef } from "react";
import { getPaginatedCartridges, getPaginatedPrinters, getPaginatedLaptops, Cartridge, Printer, Laptop } from "../../utils/api";
import styles from "./examples.module.css";

interface DeviceIdsSelectorProps {
  deviceType: "cartridge" | "printer" | "laptop";
  selectedIds: string[];
  onIdsChange: (ids: string[]) => void;
  label: string;
}

interface Device {
  _id: string;
  model?: string;
  modelCart?: string;
  vendor?: string;
  series?: string;
}

export const DeviceIdsSelector: React.FC<DeviceIdsSelectorProps> = ({
  deviceType,
  selectedIds,
  onIdsChange,
  label,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Device[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const loadSelectedDevices = async () => {
      if (selectedIds.length === 0) {
        setSelectedDevices([]);
        return;
      }

      try {
        let devices: Device[] = [];
        switch (deviceType) {
          case "cartridge":
            const cartridgesRes = await getPaginatedCartridges({ page: 1, limit: 1000 });
            devices = cartridgesRes.data.filter((c: Cartridge) => selectedIds.includes(c._id));
            break;
          case "printer":
            const printersRes = await getPaginatedPrinters({ page: 1, limit: 1000 });
            devices = printersRes.data.filter((p: Printer) => selectedIds.includes(p._id));
            break;
          case "laptop":
            const laptopsRes = await getPaginatedLaptops({ page: 1, limit: 1000 });
            devices = laptopsRes.data.filter((l: Laptop) => selectedIds.includes(l._id));
            break;
        }
        setSelectedDevices(devices);
      } catch (error) {
        console.error("Ошибка загрузки устройств:", error);
      }
    };

    loadSelectedDevices();
  }, [selectedIds, deviceType]);

  useEffect(() => {
    const searchDevices = async () => {
      if (!inputValue.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      try {
        let results: Device[] = [];
        const searchQuery = inputValue.trim().toLowerCase();
        
        switch (deviceType) {
          case "cartridge":
            const cartridgesRes = await getPaginatedCartridges({ 
              page: 1, 
              limit: 20,
              modelCart: searchQuery 
            });
            results = cartridgesRes.data.filter((c: Cartridge) => 
              !selectedIds.includes(c._id) &&
              (c.modelCart?.toLowerCase().includes(searchQuery) || 
               c.vendor?.toLowerCase().includes(searchQuery))
            );
            break;
          case "printer":
            const printersRes = await getPaginatedPrinters({ 
              page: 1, 
              limit: 20,
              model: searchQuery 
            });
            results = printersRes.data.filter((p: Printer) => 
              !selectedIds.includes(p._id) &&
              (p.model?.toLowerCase().includes(searchQuery) || 
               p.vendor?.toLowerCase().includes(searchQuery))
            );
            break;
          case "laptop":
            const laptopsRes = await getPaginatedLaptops({ 
              page: 1, 
              limit: 20,
              model: searchQuery 
            });
            results = laptopsRes.data.filter((l: Laptop) => 
              !selectedIds.includes(l._id) &&
              (l.model?.toLowerCase().includes(searchQuery) || 
               l.vendor?.toLowerCase().includes(searchQuery) ||
               l.series?.toLowerCase().includes(searchQuery))
            );
            break;
        }
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Ошибка поиска устройств:", error);
        setSuggestions([]);
        setShowSuggestions(true);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(searchDevices, 300);
    return () => clearTimeout(timer);
  }, [inputValue, deviceType, selectedIds]);

  const handleSuggestionClick = (device: Device) => {
    if (!selectedIds.includes(device._id)) {
      onIdsChange([...selectedIds, device._id]);
      setSelectedDevices([...selectedDevices, device]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveDevice = (deviceId: string) => {
    onIdsChange(selectedIds.filter((id) => id !== deviceId));
    setSelectedDevices(selectedDevices.filter((d) => d._id !== deviceId));
  };

  const getDeviceDisplayName = (device: Device): string => {
    if (deviceType === "cartridge") {
      return `${(device as Cartridge).vendor?.toUpperCase() || ''} ${(device as Cartridge).modelCart || ''}`;
    } else if (deviceType === "printer") {
      return `${(device as Printer).vendor?.toUpperCase() || ''} ${(device as Printer).model || ''}`;
    } else {
      const laptop = device as Laptop;
      const series = laptop.series ? `${laptop.series} ` : '';
      return `${laptop.vendor?.toUpperCase() || ''} ${series}${laptop.model || ''}`;
    }
  };

  return (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <div ref={wrapperRef} className={styles.autocompleteWrapper}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => {
            if (inputValue.trim() || suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={`Введите название ${deviceType === "cartridge" ? "картриджа" : deviceType === "printer" ? "принтера" : "ноутбука"}...`}
          className={styles.autocompleteInput}
        />
        {showSuggestions && inputValue.trim() && (
          <div className={styles.autocompleteDropdown}>
            {isSearching ? (
              <div className={styles.autocompleteLoading}>Поиск...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((device) => (
                <div
                  key={device._id}
                  onClick={() => handleSuggestionClick(device)}
                  className={styles.autocompleteItem}
                >
                  {getDeviceDisplayName(device)}
                </div>
              ))
            ) : (
              <div className={styles.autocompleteEmpty}>Такого устройства в базе нет</div>
            )}
          </div>
        )}
      </div>
      {selectedDevices.length > 0 && (
        <div className={styles.selectedNamesContainer}>
          {selectedDevices.map((device) => (
            <span key={device._id} className={styles.selectedNameTag}>
              {getDeviceDisplayName(device)}
              <button
                type="button"
                onClick={() => handleRemoveDevice(device._id)}
                className={styles.removeNameButton}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};


