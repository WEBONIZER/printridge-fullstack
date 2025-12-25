import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchLaptops } from "../../services/slices/laptops";
import { Laptop } from "../../utils/api";
import { LaptopsFilters } from "./LaptopsFilters";
import { LaptopsTable } from "./LaptopsTable";
import { EditLaptopModal } from "./EditLaptopModal";
import { CreateLaptopModal } from "./CreateLaptopModal";
import styles from "./laptops.module.css";

export const LaptopsPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.laptops);
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [hasImageFilter, setHasImageFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<Laptop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchLaptops({ page: 1, limit: 1000 }));
  }, [dispatch]);

  const vendors = useMemo(() => {
    const uniqueVendors = new Set(items.map((item) => item.vendor).filter(Boolean));
    return Array.from(uniqueVendors).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (vendorFilter && item.vendor !== vendorFilter) return false;
      return true;
    });
  }, [items, vendorFilter, hasImageFilter]);

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
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className={styles.addButton}
        >
          Добавить
        </button>
      </div>

      <LaptopsFilters
        vendorFilter={vendorFilter}
        vendors={vendors}
        onVendorFilterChange={setVendorFilter}
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
    </div>
  );
};
