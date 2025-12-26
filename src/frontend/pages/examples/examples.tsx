import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchExamples } from "../../services/slices/examples";
import { Example } from "../../utils/api";
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
  const [publicFilter, setPublicFilter] = useState<string>("all");

  useEffect(() => {
    dispatch(fetchExamples({ page: 1, limit: 1000 }));
  }, [dispatch]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (publicFilter !== "all") {
        const isPublic = item.public !== false;
        if (publicFilter === "true" && !isPublic) return false;
        if (publicFilter === "false" && isPublic) return false;
      }
      return true;
    });
  }, [items, publicFilter]);

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
        publicFilter={publicFilter}
        onPublicFilterChange={setPublicFilter}
      />

      <ExamplesTable
        examples={filteredItems}
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
