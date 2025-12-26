import React, { useState, useEffect, useRef } from "react";

interface ModelAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => Promise<string[]>;
  placeholder?: string;
  required?: boolean;
}

export const ModelAutocomplete: React.FC<ModelAutocompleteProps> = ({
  value,
  onChange,
  onSearch,
  placeholder,
  required,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    const searchModels = async () => {
      if (!value.trim()) {
        setSuggestions([]);
        setHasSearched(false);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);
      setHasSearched(true);
      try {
        const results = await onSearch(value.trim());
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Ошибка поиска моделей:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchModels, 300);
    return () => clearTimeout(timeoutId);
  }, [value, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0 || (hasSearched && value.trim())) {
      setShowSuggestions(true);
    }
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          fontSize: "14px",
          boxSizing: "border-box",
        }}
      />
      {showSuggestions && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isSearching ? (
            <div style={{ padding: "10px", textAlign: "center", color: "#666" }}>
              Поиск...
            </div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  borderBottom: index < suggestions.length - 1 ? "1px solid #eee" : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                {suggestion}
              </div>
            ))
          ) : value.trim() && hasSearched ? (
            <div style={{ padding: "10px", textAlign: "center", color: "#999" }}>
              Такого устройства в базе нет
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

