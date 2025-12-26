import React, { useState, useEffect } from "react";
import { Cartridge, Printer, updateCartridge, uploadImage, updateImage, getPaginatedPrinters, getPrintersByCartridgeId, createCompatibility, deleteCompatibility, getPaginatedCompatibilities } from "../../utils/api";
import { CartridgeFormFields } from "./CartridgeFormFields";
import { PrinterLinkingSection } from "./PrinterLinkingSection";
import { CreatePrinterModal } from "../printers/CreatePrinterModal";
import styles from "./cartridges.module.css";

interface EditCartridgeModalProps {
  cartridge: Cartridge;
  onClose: () => void;
  onSave: () => void;
}

export const EditCartridgeModal: React.FC<EditCartridgeModalProps> = ({ cartridge, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    modelCart: cartridge.modelCart || "",
    vendor: cartridge.vendor || "",
    devices: cartridge.devices || "",
    refill_price: cartridge.refill_price || "",
    recovery_price: cartridge.recovery_price || "",
    resource: cartridge.resource || "",
    chip: Boolean(cartridge.chip) || false,
    public: cartridge.public !== false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string | null>(null);
  
  const [allPrinters, setAllPrinters] = useState<Printer[]>([]);
  const [selectedPrinters, setSelectedPrinters] = useState<Printer[]>([]);
  const [linkedPrinters, setLinkedPrinters] = useState<Printer[]>([]);
  const [compatibilityMap, setCompatibilityMap] = useState<Map<string, string>>(new Map());
  const [isLoadingPrinters, setIsLoadingPrinters] = useState(false);
  const [isCreatePrinterModalOpen, setIsCreatePrinterModalOpen] = useState(false);

  useEffect(() => {
    if (cartridge.photo) {
      if (typeof cartridge.photo === 'object' && cartridge.photo !== null && cartridge.photo.src) {
        setCurrentImageSrc(cartridge.photo.src);
      }
    }
    
    loadPrinters();
    loadLinkedPrinters();
  }, [cartridge._id]);

  const loadPrinters = async () => {
    try {
      setIsLoadingPrinters(true);
      const response = await getPaginatedPrinters({ page: 1, limit: 10000 });
      setAllPrinters(response.data);
    } catch (error) {
      console.error("Ошибка загрузки принтеров:", error);
    } finally {
      setIsLoadingPrinters(false);
    }
  };

  const loadLinkedPrinters = async () => {
    try {
      const response = await getPrintersByCartridgeId(cartridge._id);
      setLinkedPrinters(response.data);
      
      const compatibilities = await getPaginatedCompatibilities({ cartridgeId: cartridge._id, limit: 1000 });
      const map = new Map<string, string>();
      compatibilities.data.forEach((comp) => {
        map.set(comp.printerId, comp._id);
      });
      setCompatibilityMap(map);
    } catch (error) {
      console.error("Ошибка загрузки связанных принтеров:", error);
    }
  };

  const handlePrinterSelect = (printer: Printer) => {
    if (!selectedPrinters.find((p) => p._id === printer._id)) {
      setSelectedPrinters([...selectedPrinters, printer]);
    }
  };

  const handleCreateCompatibility = async () => {
    if (selectedPrinters.length === 0) return;
    
    try {
      for (const printer of selectedPrinters) {
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
      setSelectedPrinters([]);
      await loadLinkedPrinters();
    } catch (error) {
      console.error("Ошибка при создании связей:", error);
      alert("Ошибка при создании связей");
    }
  };

  const handleDeleteCompatibility = async (printerId: string) => {
    const compatibilityId = compatibilityMap.get(printerId);
    if (!compatibilityId) return;
    
    try {
      await deleteCompatibility(compatibilityId);
      await loadLinkedPrinters();
    } catch (error) {
      console.error("Ошибка при удалении связи:", error);
      alert("Ошибка при удалении связи");
    }
  };

  const handleCreateNewPrinter = () => {
    setIsCreatePrinterModalOpen(true);
  };

  const handlePrinterCreated = async () => {
    await loadPrinters();
    setIsCreatePrinterModalOpen(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateCartridge(
        cartridge._id,
        {
          ...formData,
          resource: formData.resource ? parseFloat(formData.resource as any) : undefined,
          public: formData.public,
        },
        imageFile || undefined
      );

      if (imageFile && cartridge.photo && typeof cartridge.photo === 'object' && cartridge.photo._id) {
        await updateImage(cartridge.photo._id, imageFile, { cartridgeId: cartridge._id });
      } else if (imageFile && (!cartridge.photo || (typeof cartridge.photo === 'object' && !cartridge.photo._id))) {
        await uploadImage(imageFile, { cartridgeId: cartridge._id });
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
      {isCreatePrinterModalOpen && (
        <CreatePrinterModal
          onClose={() => setIsCreatePrinterModalOpen(false)}
          onSave={handlePrinterCreated}
          isNested={true}
        />
      )}
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>Редактировать картридж</h2>
            <button className={styles.closeButton} onClick={onClose}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <CartridgeFormFields
              formData={formData}
              onFormDataChange={(data) => setFormData({ ...formData, ...data })}
              imagePreview={currentImageSrc}
              onImageChange={handleImageChange}
            />

            <div className={styles.formGroup}>
              <label>Привязать принтеры</label>
              <PrinterLinkingSection
                allPrinters={allPrinters}
                selectedPrinters={selectedPrinters}
                linkedPrinters={linkedPrinters}
                isLoadingPrinters={isLoadingPrinters}
                onPrinterSelect={handlePrinterSelect}
                onCreateCompatibility={handleCreateCompatibility}
                onDeleteCompatibility={handleDeleteCompatibility}
                onCreateNewPrinter={handleCreateNewPrinter}
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

