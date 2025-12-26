import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchExamples } from "../../services/slices/examples";
import { Example, getPaginatedCartridges, getPaginatedPrinters, getPaginatedLaptops, Cartridge, Printer, Laptop } from "../../utils/api";
import { ExamplesTable } from "./ExamplesTable";
import { ExamplesFilters } from "./ExamplesFilters";
import { EditExampleModal } from "./EditExampleModal";
import { CreateExampleModal } from "./CreateExampleModal";
import styles from "./examples.module.css";

export const ExamplesPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.examples);
  const [selectedItem, setSelectedItem] = useState<Example | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [titleFilterInput, setTitleFilterInput] = useState<string>("");
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [publicFilter, setPublicFilter] = useState<string>("all");
  const [cartridgesMap, setCartridgesMap] = useState<Map<string, Cartridge>>(new Map());
  const [printersMap, setPrintersMap] = useState<Map<string, Printer>>(new Map());
  const [laptopsMap, setLaptopsMap] = useState<Map<string, Laptop>>(new Map());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleFilter(titleFilterInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [titleFilterInput]);

  useEffect(() => {
    dispatch(fetchExamples({ 
      page: 1, 
      limit: 1000,
      title: titleFilter || undefined,
      public: publicFilter !== "all" ? publicFilter : undefined
    }));
  }, [dispatch, titleFilter, publicFilter]);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const [cartridgesRes, printersRes, laptopsRes] = await Promise.all([
          getPaginatedCartridges({ page: 1, limit: 10000 }),
          getPaginatedPrinters({ page: 1, limit: 10000 }),
          getPaginatedLaptops({ page: 1, limit: 10000 }),
        ]);
        
        const carts = new Map<string, Cartridge>();
        cartridgesRes.data.forEach((cart) => {
          carts.set(cart._id, cart);
        });
        setCartridgesMap(carts);
        
        const prints = new Map<string, Printer>();
        printersRes.data.forEach((printer) => {
          prints.set(printer._id, printer);
        });
        setPrintersMap(prints);
        
        const laps = new Map<string, Laptop>();
        laptopsRes.data.forEach((laptop) => {
          laps.set(laptop._id, laptop);
        });
        setLaptopsMap(laps);
      } catch (err) {
        console.error("Error loading devices:", err);
      }
    };
    
    loadDevices();
  }, [dispatch]);

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
        <h1 className={styles.title}>Примеры</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className={styles.addButton}
        >
          Добавить
        </button>
      </div>

      <ExamplesFilters
        titleFilter={titleFilterInput}
        publicFilter={publicFilter}
        onTitleFilterChange={setTitleFilterInput}
        onPublicFilterChange={(value) => {
          setPublicFilter(value);
        }}
      />

      <ExamplesTable
        examples={filteredItems}
        cartridgesMap={cartridgesMap}
        printersMap={printersMap}
        laptopsMap={laptopsMap}
        onExampleClick={(example) => {
          setSelectedItem(example);
          setIsModalOpen(true);
        }}
      />

      {filteredItems.length === 0 && (
        <div className={styles.empty}>Примеры не найдены</div>
      )}

      {isModalOpen && selectedItem && (
        <EditExampleModal
          example={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={() => {
            dispatch(fetchExamples({ page: 1, limit: 1000 }));
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {isCreateModalOpen && (
        <CreateExampleModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={() => {
            dispatch(fetchExamples({ page: 1, limit: 1000 }));
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
