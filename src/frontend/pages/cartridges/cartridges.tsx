import React, { useEffect, useState, useMemo } from "react";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchCartridges } from "../../services/slices/cartridges";
import { Cartridge, Printer, getPrintersByCartridgeId, getCartridgeVendors } from "../../utils/api";
import { CartridgesFilters } from "./CartridgesFilters";
import { CartridgesTable } from "./CartridgesTable";
import { PaginationControls } from "./PaginationControls";
import { EditCartridgeModal } from "./EditCartridgeModal";
import { CreateCartridgeModal } from "./CreateCartridgeModal";
import styles from "./cartridges.module.css";

export const CartridgesPage: React.FC = () => {
  const dispatch = useDispatch_();
  const { items, isLoading, error, pagination } = useSelector_((state) => state.cartridges);
  const [vendorFilter, setVendorFilter] = useState<string>("");
  const [hasImageFilter, setHasImageFilter] = useState<string>("all");
  const [hasLinkedDevicesFilter, setHasLinkedDevicesFilter] = useState<string>("all");
  const [publicFilter, setPublicFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<Cartridge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [vendors, setVendors] = useState<string[]>([]);
  const [linkedPrintersMap, setLinkedPrintersMap] = useState<Map<string, Printer[]>>(new Map());
  const [isLoadingLinkedDevices, setIsLoadingLinkedDevices] = useState<boolean>(false);

  useEffect(() => {
    loadVendors();
  }, []);

  useEffect(() => {
    dispatch(fetchCartridges({ page: currentPage, limit: 30, vendor: vendorFilter || undefined }));
  }, [dispatch, currentPage, vendorFilter]);

  useEffect(() => {
    if (items.length > 0) {
      loadLinkedPrintersForAll();
    } else {
      setLinkedPrintersMap(new Map());
    }
  }, [items]);

  const loadVendors = async () => {
    try {
      const response = await getCartridgeVendors();
      if (response && response.data) {
        setVendors(response.data);
      }
    } catch (error) {
      console.error("Ошибка загрузки производителей:", error);
    }
  };

  const loadLinkedPrintersForAll = async () => {
    setIsLoadingLinkedDevices(true);
    const map = new Map<string, Printer[]>();
    try {
      await Promise.all(
        items.map(async (cartridge) => {
          try {
            const response = await getPrintersByCartridgeId(cartridge._id);
            map.set(cartridge._id, response.data || []);
          } catch (error) {
            map.set(cartridge._id, []);
          }
        })
      );
      setLinkedPrintersMap(map);
    } catch (error) {
      console.error("Ошибка загрузки связанных принтеров:", error);
    } finally {
      setIsLoadingLinkedDevices(false);
    }
  };

  const hasImage = (cartridge: Cartridge): boolean => {
    if (!cartridge.photo) return false;
    if (typeof cartridge.photo === 'object' && cartridge.photo !== null) {
      return !!(cartridge.photo.src || cartridge.photo._id);
    }
    return !!cartridge.photo;
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (hasImageFilter === "yes" && !hasImage(item)) return false;
      if (hasImageFilter === "no" && hasImage(item)) return false;
      
      if (hasLinkedDevicesFilter !== "all") {
        const linkedPrinters = linkedPrintersMap.get(item._id);
        if (linkedPrinters === undefined) {
          return true;
        }
        if (hasLinkedDevicesFilter === "yes" && linkedPrinters.length === 0) return false;
        if (hasLinkedDevicesFilter === "no" && linkedPrinters.length > 0) return false;
      }
      
      if (publicFilter !== "all") {
        const isPublic = item.public !== false;
        if (publicFilter === "true" && !isPublic) return false;
        if (publicFilter === "false" && isPublic) return false;
      }
      
      return true;
    });
  }, [items, hasImageFilter, hasLinkedDevicesFilter, publicFilter, linkedPrintersMap]);

  if (isLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 className={styles.title}>Картриджи</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className={styles.addButton}
        >
          Добавить
        </button>
      </div>

      <CartridgesFilters
        vendorFilter={vendorFilter}
        hasImageFilter={hasImageFilter}
        hasLinkedDevicesFilter={hasLinkedDevicesFilter}
        publicFilter={publicFilter}
        vendors={vendors}
        onVendorFilterChange={(value) => {
          setVendorFilter(value);
          setCurrentPage(1);
        }}
        onHasImageFilterChange={setHasImageFilter}
        onHasLinkedDevicesFilterChange={setHasLinkedDevicesFilter}
        onPublicFilterChange={setPublicFilter}
      />

      <CartridgesTable
        cartridges={filteredItems}
        linkedPrintersMap={linkedPrintersMap}
        onCartridgeClick={(cartridge) => {
          setSelectedItem(cartridge);
          setIsModalOpen(true);
        }}
      />

      {filteredItems.length === 0 && (
        <div className={styles.empty}>Картриджи не найдены</div>
      )}

      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        onPreviousPage={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        onNextPage={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
      />

      {isModalOpen && selectedItem && (
        <EditCartridgeModal
          cartridge={selectedItem}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
          onSave={() => {
            dispatch(fetchCartridges({ page: currentPage, limit: 30, vendor: vendorFilter || undefined })).then(() => {
              loadLinkedPrintersForAll();
            });
            setIsModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}

      {isCreateModalOpen && (
        <CreateCartridgeModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={() => {
            dispatch(fetchCartridges({ page: currentPage, limit: 30, vendor: vendorFilter || undefined })).then(() => {
              loadLinkedPrintersForAll();
            });
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
