import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchLaptops } from "../../services/slices/laptops";
import { Laptop } from "../../utils/api";
import { LaptopsFilters } from "./LaptopsFilters";
import { LaptopsTable } from "./LaptopsTable";
import { EditLaptopModal } from "./EditLaptopModal";
import { CreateLaptopModal } from "./CreateLaptopModal";
import { LaptopPriceTemplatesModal } from "./LaptopPriceTemplatesModal";
import styles from "./laptops.module.css";

export const LaptopsPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.laptops);
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [modelFilterInput, setModelFilterInput] = useState<string>("");
  const [modelFilter, setModelFilter] = useState<string>("");
  const [hasImageFilter, setHasImageFilter] = useState<string>("all");
  const [publicFilter, setPublicFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<Laptop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPriceTemplatesModalOpen, setIsPriceTemplatesModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModelFilter(modelFilterInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [modelFilterInput]);

  useEffect(() => {
    dispatch(fetchLaptops({ 
      page: 1, 
      limit: 1000,
      vendor: vendorFilter || undefined,
      model: modelFilter || undefined,
      hasImage: hasImageFilter !== "all" ? hasImageFilter : undefined,
      public: publicFilter !== "all" ? publicFilter : undefined
    }));
  }, [dispatch, vendorFilter, modelFilter, hasImageFilter, publicFilter]);

  const vendors = useMemo(() => {
    const uniqueVendors = new Set(items.map((item) => item.vendor).filter(Boolean));
    return Array.from(uniqueVendors).sort();
  }, [items]);

  const filteredItems = items;

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className={styles.title}>Ноутбуки</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setIsPriceTemplatesModalOpen(true)}
            className={styles.addButton}
            style={{ backgroundColor: "#17a2b8" }}
          >
            Прайсы
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className={styles.addButton}
          >
            Добавить
          </button>
        </div>
      </div>

      <LaptopsFilters
        vendorFilter={vendorFilter}
        modelFilter={modelFilterInput}
        publicFilter={publicFilter}
        vendors={vendors}
        onVendorFilterChange={(value) => {
          setVendorFilter(value);
        }}
        onModelFilterChange={setModelFilterInput}
        onPublicFilterChange={(value) => {
          setPublicFilter(value);
        }}
      />

      <LaptopsTable
        laptops={filteredItems}
        onLaptopClick={(laptop) => {
          setSelectedItem(laptop);
          setIsModalOpen(true);
        }}
      />

      {filteredItems.length === 0 && (
        <div className={styles.empty}>Ноутбуки не найдены</div>
      )}

      {isModalOpen && selectedItem && (
        <EditLaptopModal
          laptop={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={() => {
            dispatch(fetchLaptops({ page: 1, limit: 1000 }));
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {isCreateModalOpen && (
        <CreateLaptopModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={() => {
            dispatch(fetchLaptops({ page: 1, limit: 1000 }));
            setIsCreateModalOpen(false);
          }}
        />
      )}

      {isPriceTemplatesModalOpen && (
        <LaptopPriceTemplatesModal onClose={() => setIsPriceTemplatesModalOpen(false)} />
      )}
    </div>
  );
};
