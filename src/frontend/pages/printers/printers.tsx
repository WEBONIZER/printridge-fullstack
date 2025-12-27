import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchPrinters } from "../../services/slices/printers";
import { Printer, Cartridge, getCartridgesByPrinterId, getPrinterVendors } from "../../utils/api";
import { PrintersFilters } from "./PrintersFilters";
import { PrintersTable } from "./PrintersTable";
import { PaginationControls } from "./PaginationControls";
import { EditPrinterModal } from "./EditPrinterModal";
import { CreatePrinterModal } from "./CreatePrinterModal";
import { PrinterPriceTemplatesModal } from "./PrinterPriceTemplatesModal";
import styles from "./printers.module.css";

export const PrintersPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.printers);
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [modelFilterInput, setModelFilterInput] = useState<string>("");
  const [modelFilter, setModelFilter] = useState<string>("");
  const [hasImageFilter, setHasImageFilter] = useState<string>("all");
  const [hasLinkedCartridgesFilter, setHasLinkedCartridgesFilter] = useState<string>("all");
  const [publicFilter, setPublicFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Printer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPriceTemplatesModalOpen, setIsPriceTemplatesModalOpen] = useState(false);
  const [vendors, setVendors] = useState<string[]>([]);
  const [linkedCartridgesMap, setLinkedCartridgesMap] = useState<Map<string, Cartridge[]>>(new Map());
  const [isLoadingLinkedDevices, setIsLoadingLinkedDevices] = useState<boolean>(false);

  useEffect(() => {
    loadVendors();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModelFilter(modelFilterInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [modelFilterInput]);

  useEffect(() => {
    dispatch(fetchPrinters({ 
      page: currentPage, 
      limit: 30, 
      vendor: vendorFilter || undefined,
      model: modelFilter || undefined,
      hasImage: hasImageFilter !== "all" ? hasImageFilter : undefined,
      hasLinkedCartridges: hasLinkedCartridgesFilter !== "all" ? hasLinkedCartridgesFilter : undefined,
      public: publicFilter !== "all" ? publicFilter : undefined
    }));
  }, [dispatch, currentPage, vendorFilter, modelFilter, hasImageFilter, hasLinkedCartridgesFilter, publicFilter]);

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
        <h1 className={styles.title}>Принтеры</h1>
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

      <PrintersFilters
        vendorFilter={vendorFilter}
        modelFilter={modelFilterInput}
        hasImageFilter={hasImageFilter}
        hasLinkedCartridgesFilter={hasLinkedCartridgesFilter}
        publicFilter={publicFilter}
        vendors={vendors}
        onVendorFilterChange={(value) => {
          setVendorFilter(value);
          setCurrentPage(1);
        }}
        onModelFilterChange={setModelFilterInput}
        onHasImageFilterChange={(value) => {
          setHasImageFilter(value);
          setCurrentPage(1);
        }}
        onHasLinkedCartridgesFilterChange={(value) => {
          setHasLinkedCartridgesFilter(value);
          setCurrentPage(1);
        }}
        onPublicFilterChange={(value) => {
          setPublicFilter(value);
          setCurrentPage(1);
        }}
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
            dispatch(fetchPrinters({ 
              page: currentPage, 
              limit: 30, 
              vendor: vendorFilter || undefined,
              model: modelFilter || undefined,
              hasImage: hasImageFilter !== "all" ? hasImageFilter : undefined,
              hasLinkedCartridges: hasLinkedCartridgesFilter !== "all" ? hasLinkedCartridgesFilter : undefined,
              public: publicFilter !== "all" ? publicFilter : undefined
            })).then(() => {
              loadLinkedCartridgesForAll();
            });
            setIsCreateModalOpen(false);
          }}
        />
      )}

      {isPriceTemplatesModalOpen && (
        <PrinterPriceTemplatesModal onClose={() => setIsPriceTemplatesModalOpen(false)} />
      )}
    </div>
  );
};
