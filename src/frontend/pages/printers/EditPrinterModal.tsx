import React, { useState, useEffect } from "react";
import { Printer, Cartridge, updatePrinter, uploadImage, updateImage, getPaginatedCartridges, getCartridgesByPrinterId, createCompatibility, deleteCompatibility, getPaginatedCompatibilities, getPrinterVendors } from "../../utils/api";
import { PrinterFormFields } from "./PrinterFormFields";
import { CartridgeLinkingSection } from "./CartridgeLinkingSection";
import { PrinterPriceSection } from "./PrinterPriceSection";
import { CreateCartridgeModal } from "../cartridges/CreateCartridgeModal";
import styles from "./printers.module.css";

interface EditPrinterModalProps {
  printer: Printer;
  onClose: () => void;
  onSave: () => void;
}

export const EditPrinterModal: React.FC<EditPrinterModalProps> = ({ printer, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    vendor: printer.vendor || "",
    model: printer.model || "",
    device: printer.device || "",
    type: printer.type || "",
    format: printer.format || "",
    capacity: printer.capacity || "",
    speed: printer.speed || "",
    public: printer.public !== false,
  });
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>((printer as any).price || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  
  const [allCartridges, setAllCartridges] = useState<Cartridge[]>([]);
  const [selectedCartridges, setSelectedCartridges] = useState<Cartridge[]>([]);
  const [linkedCartridges, setLinkedCartridges] = useState<Cartridge[]>([]);
  const [compatibilityMap, setCompatibilityMap] = useState<Map<string, string>>(new Map());
  const [isLoadingCartridges, setIsLoadingCartridges] = useState(false);
  const [isCreateCartridgeModalOpen, setIsCreateCartridgeModalOpen] = useState(false);
  const [allVendors, setAllVendors] = useState<string[]>([]);

  useEffect(() => {
    if ((printer as any).photo) {
      const photo = (printer as any).photo;
      if (typeof photo === 'object' && photo !== null && photo.src) {
        setCurrentImageSrc(photo.src);
      }
    }
    
    loadCartridges();
    loadLinkedCartridges();
    loadVendors();
  }, [printer._id]);

  const loadVendors = async () => {
    try {
      const response = await getPrinterVendors();
      if (response && response.data && Array.isArray(response.data)) {
        setAllVendors(response.data);
      } else {
        setAllVendors([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки производителей:", error);
      setAllVendors([]);
    }
  };

  const loadCartridges = async () => {
    try {
      setIsLoadingCartridges(true);
      const response = await getPaginatedCartridges({ page: 1, limit: 10000 });
      setAllCartridges(response.data);
    } catch (error) {
      console.error("Ошибка загрузки картриджей:", error);
    } finally {
      setIsLoadingCartridges(false);
    }
  };

  const loadLinkedCartridges = async () => {
    try {
      const response = await getCartridgesByPrinterId(printer._id);
      setLinkedCartridges(response.data);
      
      const compatibilities = await getPaginatedCompatibilities({ printerId: printer._id, limit: 1000 });
      const map = new Map<string, string>();
      compatibilities.data.forEach((comp) => {
        map.set(comp.cartridgeId, comp._id);
      });
      setCompatibilityMap(map);
    } catch (error) {
      console.error("Ошибка загрузки связанных картриджей:", error);
    }
  };

  const handleCartridgeSelect = (cartridge: Cartridge) => {
    if (!selectedCartridges.find((c) => c._id === cartridge._id)) {
      setSelectedCartridges([...selectedCartridges, cartridge]);
    }
  };

  const handleCreateCompatibility = async () => {
    if (selectedCartridges.length === 0) return;
    
    try {
      for (const cartridge of selectedCartridges) {
        try {
          await createCompatibility({
            cartridgeId: cartridge._id,
            printerId: printer._id,
          });
        } catch (error: any) {
          if (error.response?.status !== 409) {
            console.error("Ошибка создания связи:", error);
          }
        }
      }
      setSelectedCartridges([]);
      await loadLinkedCartridges();
    } catch (error) {
      console.error("Ошибка при создании связей:", error);
      alert("Ошибка при создании связей");
    }
  };

  const handleDeleteCompatibility = async (cartridgeId: string) => {
    const compatibilityId = compatibilityMap.get(cartridgeId);
    if (!compatibilityId) return;
    
    try {
      await deleteCompatibility(compatibilityId);
      await loadLinkedCartridges();
    } catch (error) {
      console.error("Ошибка при удалении связи:", error);
      alert("Ошибка при удалении связи");
    }
  };

  const handleCreateNewCartridge = () => {
    setIsCreateCartridgeModalOpen(true);
  };

  const handleCartridgeCreated = async () => {
    await loadCartridges();
    setIsCreateCartridgeModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSearchVendors = async (query: string): Promise<string[]> => {
    if (allVendors.length === 0) {
      return [];
    }
    const queryLower = query.toLowerCase().trim();
    if (!queryLower) {
      return allVendors.slice(0, 20);
    }
    const filtered = allVendors
      .filter(vendor => vendor && typeof vendor === 'string' && vendor.toLowerCase().includes(queryLower))
      .slice(0, 20);
    return filtered;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updatePrinter(printer._id, {
        vendor: formData.vendor.trim(),
        model: formData.model.trim(),
        device: formData.device.trim() || undefined,
        type: formData.type.trim() || undefined,
        format: formData.format.trim() || undefined,
        capacity: formData.capacity ? parseFloat(formData.capacity as any) : undefined,
        speed: formData.speed ? parseFloat(formData.speed as any) : undefined,
        public: formData.public,
        price: selectedPriceId || undefined,
      });

      if (imageFile) {
        const photo = (printer as any).photo;
        if (photo && typeof photo === 'object' && photo._id) {
          await updateImage(photo._id, imageFile, { printerId: printer._id });
        } else {
          await uploadImage(imageFile, { printerId: printer._id });
        }
      }

      onSave();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
      alert("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {isCreateCartridgeModalOpen && (
        <CreateCartridgeModal
          onClose={() => setIsCreateCartridgeModalOpen(false)}
          onSave={handleCartridgeCreated}
          isNested={true}
        />
      )}
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>Редактировать принтер</h2>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <PrinterFormFields
              formData={formData}
              onFormDataChange={(data) => setFormData({ ...formData, ...data })}
              imagePreview={currentImageSrc}
              onImageChange={handleImageChange}
              onSearchVendors={handleSearchVendors}
            />

            <PrinterPriceSection
              currentPriceId={(printer as any).price}
              device={formData.device}
              type={formData.type}
              format={formData.format}
              capacity={formData.capacity ? parseFloat(formData.capacity as any) : undefined}
              onPriceChange={setSelectedPriceId}
            />

            <div className={styles.formGroup}>
              <label>Привязать картриджи</label>
              <CartridgeLinkingSection
                allCartridges={allCartridges}
                selectedCartridges={selectedCartridges}
                linkedCartridges={linkedCartridges}
                isLoadingCartridges={isLoadingCartridges}
                onCartridgeSelect={handleCartridgeSelect}
                onCreateCompatibility={handleCreateCompatibility}
                onDeleteCompatibility={handleDeleteCompatibility}
                onCreateNewCartridge={handleCreateNewCartridge}
                isEditMode={true}
              />
            </div>

            <div className={styles.modalActions}>
              <button type="button" onClick={onClose} disabled={isSaving}>
                Отмена
              </button>
              <button type="submit" disabled={isSaving}>
                {isSaving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

