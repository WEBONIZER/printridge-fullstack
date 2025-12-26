import React, { useState, useEffect } from "react";
import { Printer, Cartridge, createPrinter, uploadImage, getPaginatedCartridges, createCompatibility, searchPrinterModels } from "../../utils/api";
import { PrinterFormFields } from "./PrinterFormFields";
import { CartridgeLinkingSection } from "./CartridgeLinkingSection";
import { PrinterPriceSection } from "./PrinterPriceSection";
import { CreateCartridgeModal } from "../cartridges/CreateCartridgeModal";
import styles from "./printers.module.css";

interface CreatePrinterModalProps {
  onClose: () => void;
  onSave: () => void;
  isNested?: boolean;
}

export const CreatePrinterModal: React.FC<CreatePrinterModalProps> = ({ onClose, onSave, isNested = false }) => {
  const [formData, setFormData] = useState({
    vendor: "",
    model: "",
    device: "",
    type: "",
    format: "",
    capacity: "",
    speed: "",
    public: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [allCartridges, setAllCartridges] = useState<Cartridge[]>([]);
  const [selectedCartridges, setSelectedCartridges] = useState<Cartridge[]>([]);
  const [isLoadingCartridges, setIsLoadingCartridges] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [isCreateCartridgeModalOpen, setIsCreateCartridgeModalOpen] = useState(false);

  useEffect(() => {
    loadCartridges();
  }, []);

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

  const handleCartridgeSelect = (cartridge: Cartridge) => {
    if (!selectedCartridges.find((c) => c._id === cartridge._id)) {
      setSelectedCartridges([...selectedCartridges, cartridge]);
    }
  };

  const handleRemoveCartridge = (cartridgeId: string) => {
    setSelectedCartridges(selectedCartridges.filter((c) => c._id !== cartridgeId));
  };

  const handleCreateNewCartridge = () => {
    setIsCreateCartridgeModalOpen(true);
  };

  const handleCartridgeCreated = async () => {
    await loadCartridges();
    setIsCreateCartridgeModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const handleSearchModels = async (query: string): Promise<string[]> => {
    try {
      const response = await searchPrinterModels(query);
      return response.data || [];
    } catch (error) {
      console.error("Ошибка поиска моделей:", error);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const printerData = {
        vendor: formData.vendor.trim(),
        model: formData.model.trim(),
        device: formData.device.trim() || undefined,
        type: formData.type.trim() || undefined,
        format: formData.format.trim() || undefined,
        capacity: formData.capacity ? parseFloat(formData.capacity) : undefined,
        speed: formData.speed ? parseFloat(formData.speed) : undefined,
        public: formData.public,
        price: selectedPriceId || undefined,
      };

      const createdPrinter = await createPrinter(printerData);
      const printerId = createdPrinter.data._id;

      if (imageFile) {
        try {
          await uploadImage(imageFile, { printerId });
        } catch (error) {
          console.error("Ошибка загрузки изображения:", error);
        }
      }

      if (selectedCartridges.length > 0) {
        for (const cartridge of selectedCartridges) {
          try {
            await createCompatibility({
              cartridgeId: cartridge._id,
              printerId,
            });
          } catch (error: any) {
            if (error.response?.status !== 409) {
              console.error("Ошибка создания связи:", error);
            }
          }
        }
      }

      onSave();
    } catch (error: any) {
      console.error("Ошибка создания принтера:", error);
      alert(error.response?.data?.error || "Ошибка создания принтера");
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
      <div className={`${styles.modalOverlay} ${isNested ? styles.modalOverlayNested : ''}`} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>Добавить принтер</h2>
            <button onClick={onClose} className={styles.closeButton}>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <PrinterFormFields
              formData={formData}
              onFormDataChange={(data) => setFormData({ ...formData, ...data })}
              onImageChange={handleImageChange}
              isCreateMode={true}
              onSearchModels={handleSearchModels}
            />

            <PrinterPriceSection
              device={formData.device}
              type={formData.type}
              format={formData.format}
              capacity={formData.capacity ? parseFloat(formData.capacity) : undefined}
              onPriceChange={setSelectedPriceId}
            />

            <div className={styles.linkedItems}>
              <label>Привязать картриджи</label>
              <CartridgeLinkingSection
                allCartridges={allCartridges}
                selectedCartridges={selectedCartridges}
                linkedCartridges={[]}
                isLoadingCartridges={isLoadingCartridges}
                onCartridgeSelect={handleCartridgeSelect}
                onRemoveCartridge={handleRemoveCartridge}
                onCreateNewCartridge={handleCreateNewCartridge}
                isEditMode={false}
              />
            </div>

            <div className={styles.modalActions}>
              <button type="button" onClick={onClose} disabled={isSaving}>
                Отмена
              </button>
              <button type="submit" disabled={isSaving}>
                {isSaving ? "Сохранение..." : "Создать"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

