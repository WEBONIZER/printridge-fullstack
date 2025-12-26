import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchPrinters } from "../../services/slices/printers";
import { Printer, Cartridge, getCartridgesByPrinterId, getPrinterVendors } from "../../utils/api";
import { PrintersFilters } from "./PrintersFilters";
import { PrintersTable } from "./PrintersTable";
import { PaginationControls } from "./PaginationControls";
import { EditPrinterModal } from "./EditPrinterModal";
import { CreatePrinterModal } from "./CreatePrinterModal";
import styles from "./printers.module.css";

export const PrintersPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.printers);
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [hasImageFilter, setHasImageFilter] = useState<string>("all");
  const [hasLinkedCartridgesFilter, setHasLinkedCartridgesFilter] = useState<string>("all");
  const [publicFilter, setPublicFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Printer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [vendors, setVendors] = useState<string[]>([]);
  const [linkedCartridgesMap, setLinkedCartridgesMap] = useState<Map<string, Cartridge[]>>(new Map());
  const [isLoadingLinkedDevices, setIsLoadingLinkedDevices] = useState<boolean>(false);

  useEffect(() => {
    loadVendors();
  }, []);

  useEffect(() => {
    dispatch(fetchPrinters({ page: currentPage, limit: 30, vendor: vendorFilter || undefined }));
  }, [dispatch, currentPage, vendorFilter]);

  useEffect(() => {
    if (items.length > 0) {
      loadLinkedCartridgesForAll();
    } else {
      setLinkedCartridgesMap(new Map());
    }
  }, [items]);

  const loadVendors = async () => {
    try {
      const response = await getPrinterVendors();
      if (response && response.data) {
        setVendors(response.data);
      }
    } catch (error) {
      console.error("Ошибка загрузки производителей:", error);
    }
  };

  const loadLinkedCartridgesForAll = async () => {
    setIsLoadingLinkedDevices(true);
    const map = new Map<string, Cartridge[]>();
    try {
      await Promise.all(
        items.map(async (printer) => {
          try {
            const response = await getCartridgesByPrinterId(printer._id);
            map.set(printer._id, response.data || []);
          } catch (error) {
            map.set(printer._id, []);
          }
        })
      );
      setLinkedCartridgesMap(map);
    } catch (error) {
      console.error("Ошибка загрузки связанных картриджей:", error);
    } finally {
      setIsLoadingLinkedDevices(false);
    }
  };

  const hasImage = (printer: Printer): boolean => {
    return false;
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (hasImageFilter === "yes" && !hasImage(item)) return false;
      if (hasImageFilter === "no" && hasImage(item)) return false;
      
      if (hasLinkedCartridgesFilter !== "all") {
        const linkedCartridges = linkedCartridgesMap.get(item._id);
        if (linkedCartridges === undefined) {
          return true;
        }
        if (hasLinkedCartridgesFilter === "yes" && linkedCartridges.length === 0) return false;
        if (hasLinkedCartridgesFilter === "no" && linkedCartridges.length > 0) return false;
      }
      
      if (publicFilter !== "all") {
        const isPublic = item.public !== false;
        if (publicFilter === "true" && !isPublic) return false;
        if (publicFilter === "false" && isPublic) return false;
      }
      
      return true;
    });
  }, [items, hasImageFilter, hasLinkedCartridgesFilter, publicFilter, linkedCartridgesMap]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className={styles.title}>Принтеры</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className={styles.addButton}
        >
          Добавить
        </button>
      </div>

      <PrintersFilters
        vendorFilter={vendorFilter}
        hasImageFilter={hasImageFilter}
        hasLinkedCartridgesFilter={hasLinkedCartridgesFilter}
        publicFilter={publicFilter}
        vendors={vendors}
        onVendorFilterChange={(value) => {
          setVendorFilter(value);
          setCurrentPage(1);
        }}
        onHasImageFilterChange={setHasImageFilter}
        onHasLinkedCartridgesFilterChange={setHasLinkedCartridgesFilter}
        onPublicFilterChange={setPublicFilter}
      />

      <PrintersTable
        printers={filteredItems}
        linkedCartridgesMap={linkedCartridgesMap}
        onPrinterClick={(printer) => {
          setSelectedItem(printer);
          setIsModalOpen(true);
        }}
      />

      {filteredItems.length === 0 && (
        <div className={styles.empty}>Принтеры не найдены</div>
      )}

      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        onPreviousPage={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        onNextPage={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
      />

      {isModalOpen && selectedItem && (
        <EditPrinterModal
          printer={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={() => {
            dispatch(fetchPrinters({ page: currentPage, limit: 30, vendor: vendorFilter || undefined })).then(() => {
              loadLinkedCartridgesForAll();
            });
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {isCreateModalOpen && (
        <CreatePrinterModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={() => {
            dispatch(fetchPrinters({ page: currentPage, limit: 30, vendor: vendorFilter || undefined })).then(() => {
              loadLinkedCartridgesForAll();
            });
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
