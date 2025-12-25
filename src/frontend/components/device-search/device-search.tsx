import React, { useState, useEffect, useRef } from "react";
import styles from "./device-search.module.css";

interface SearchItem {
  _id: string;
  model?: string;
  modelCart?: string;
  vendor: string;
  [key: string]: any;
}

interface DeviceSearchProps<T extends SearchItem> {
  items: T[];
  onSelect: (item: T) => void;
  placeholder?: string;
  displayField?: keyof T;
  searchFields?: (keyof T)[];
}

export function DeviceSearch<T extends SearchItem>({
  items,
  onSelect,
  placeholder = "Поиск...",
  displayField = "model",
  searchFields = ["model", "vendor"],
}: DeviceSearchProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = items.filter((item) => {
        return searchFields.some((field) => {
          const value = item[field];
          if (typeof value === "string") {
            return value.toLowerCase().includes(query);
          }
          return false;
        });
      });
      setFilteredItems(filtered.slice(0, 10)); // Ограничиваем до 10 результатов
      setIsOpen(true);
    } else {
      setFilteredItems([]);
      setIsOpen(false);
    }
  }, [searchQuery, items, searchFields]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: T) => {
    if (!selectedItems.find((i) => i._id === item._id)) {
      const newSelected = [...selectedItems, item];
      setSelectedItems(newSelected);
      onSelect(item);
    }
    setSearchQuery("");
    setIsOpen(false);
  };

  const handleRemove = (itemId: string) => {
    setSelectedItems(selectedItems.filter((i) => i._id !== itemId));
  };

  const getDisplayValue = (item: T): string => {
    const field = displayField || "model";
    const value = item[field] || item.modelCart || item.model;
    return `${item.vendor} ${value}`;
  };

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => searchQuery.trim() && setIsOpen(true)}
        placeholder={placeholder}
        className={styles.searchInput}
      />
      
      {isOpen && filteredItems.length > 0 && (
        <div className={styles.dropdown}>
          {filteredItems.map((item) => {
            const isSelected = selectedItems.some((i) => i._id === item._id);
            return (
              <div
                key={item._id}
                onClick={() => !isSelected && handleSelect(item)}
                className={`${styles.dropdownItem} ${isSelected ? styles.selected : ""}`}
              >
                {getDisplayValue(item)}
                {isSelected && <span className={styles.checkmark}>✓</span>}
              </div>
            );
          })}
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className={styles.selectedItems}>
          {selectedItems.map((item) => (
            <div key={item._id} className={styles.selectedItem}>
              <span>{getDisplayValue(item)}</span>
              <button
                type="button"
                onClick={() => handleRemove(item._id)}
                className={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

