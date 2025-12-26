import React, { useState, useEffect, useRef } from "react";
import { searchCartridgeModels, searchPrinterModels, searchLaptopModels } from "../../utils/api";
import styles from "./examples.module.css";

interface DeviceNamesSelectorProps {
  deviceType: "cartridge" | "printer" | "laptop";
  selectedNames: string[];
  onNamesChange: (names: string[]) => void;
  label: string;
}

export const DeviceNamesSelector: React.FC<DeviceNamesSelectorProps> = ({
  deviceType,
  selectedNames,
  onNamesChange,
  label,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
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
    const searchDevices = async () => {
      if (!inputValue.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      try {
        let results: string[] = [];
        switch (deviceType) {
          case "cartridge":
            results = await searchCartridgeModels(inputValue.trim(), 10);
            break;
          case "printer":
            results = await searchPrinterModels(inputValue.trim(), 10);
            break;
          case "laptop":
            results = await searchLaptopModels(inputValue.trim(), 10);
            break;
        }
        // Фильтруем уже выбранные устройства
        const filtered = Array.isArray(results) ? results.filter((name) => !selectedNames.includes(name)) : [];
        setSuggestions(filtered);
        // Показываем выпадающий список если есть результаты или если есть текст в инпуте
        setShowSuggestions(true);
      } catch (error) {
        console.error("Ошибка поиска устройств:", error);
        setSuggestions([]);
        setShowSuggestions(true); // Все равно показываем выпадающий список с сообщением об ошибке
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(searchDevices, 300);
    return () => clearTimeout(timer);
  }, [inputValue, deviceType, selectedNames]);

  const handleSuggestionClick = (name: string) => {
    if (!selectedNames.includes(name)) {
      onNamesChange([...selectedNames, name]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveName = (nameToRemove: string) => {
    onNamesChange(selectedNames.filter((name) => name !== nameToRemove));
  };

  const handleInputFocus = () => {
    // Показываем выпадающий список если есть текст в инпуте или есть suggestions
    if (inputValue.trim() || suggestions.length > 0) {
      setShowSuggestions(true);
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
          onFocus={handleInputFocus}
          placeholder={`Введите название ${deviceType === "cartridge" ? "картриджа" : deviceType === "printer" ? "принтера" : "ноутбука"}...`}
          className={styles.autocompleteInput}
        />
        {showSuggestions && inputValue.trim() && (
          <div className={styles.autocompleteDropdown}>
            {isSearching ? (
              <div className={styles.autocompleteLoading}>Поиск...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={styles.autocompleteItem}
                >
                  {suggestion}
                </div>
              ))
            ) : (
              <div className={styles.autocompleteEmpty}>Такого устройства в базе нет</div>
            )}
          </div>
        )}
      </div>
      {selectedNames.length > 0 && (
        <div className={styles.selectedNamesContainer}>
          {selectedNames.map((name) => (
            <span key={name} className={styles.selectedNameTag}>
              {name}
              <button
                type="button"
                onClick={() => handleRemoveName(name)}
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

