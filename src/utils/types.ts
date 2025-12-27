import { Schema } from "mongoose";

export interface CartridgeData {
    modelCart: string;
    vendor: string;
    devices: string;
    refill_price: string | number;
    recovery_price: string | number;
    chip: boolean | string;
    resource?: number;
    public?: boolean;
  }

export interface RequestCustom extends Request {
    userId?: string;
    user?: {
        _id: string;
    };
}

export interface IVideo {
    src: string;
    cartridgeId?: string;
    printerId?: string;
    laptopId?: string;
    exampleId?: string;
}

// Модель принтера
export interface IPrinterSchema {
    vendor: string;
    model: string;
    device?: "printer" | "MFU";
    type?: "color" | "mono";
    format?: "A3" | "A4";
    capacity?: number;
    speed?: number;
    public?: boolean;
    price?: string;
}

// Совместимость устройств (связь картридж-принтер)
export interface ICompatibilitySchema {
    cartridgeId: string;
    printerId: string;
}

export interface IPhoto {
    src: string;
    alt: string;
    cartridgeId?: string;
    printerId?: string;
    laptopId?: string;
    exampleId?: string;
}

export interface IExampleSchema {
    title: string;
    text: string;
    cartridgeId?: string;
    printerId?: string;
    laptopId?: string;
    cartridgeNames?: string[];
    printerNames?: string[];
    laptopNames?: string[];
    public?: boolean;
    // SEO метатеги
    metaTitle?: string; // Title для SEO (50-60 символов)
    metaDescription?: string; // Description для SEO (150-160 символов)
    metaKeywords?: string; // Keywords для SEO (через запятую)
    ogTitle?: string; // Open Graph title
    ogDescription?: string; // Open Graph description
    ogImage?: string; // Open Graph image URL
    route?: string; // URL-friendly маршрут для блога (генерируется из title)
}

export interface ICartridgeSchema {
    modelCart: string;
    photo: Schema.Types.ObjectId;
    resource: number;
    chip: boolean;
    _id?: string;
    vendor: string;
    devices: string;
    refill_price: string;
    recovery_price: string;
    public?: boolean;
}

export interface ICartridge extends Omit<ICartridgeSchema, 'photo'> {
    photo: IPhoto;
}

// Модель пользователя
export interface IUserSchema {
    email: string;
    password: string;
    name?: string;
    role?: string;
}

// Модель прайса
export interface IPriceSchema {
    diagnostics: number;
    TO: number;
    rollers: number;
    drum: number;
    laser: number;
    therm: number;
    reducer: number;
    scaner?: number | null;
    adf?: number | null;
    duplex: number;
    electronics: number;
    printerId: string;
}

// Модель ноутбука
export interface ILaptopSchema {
    model: string;
    series?: string;
    vendor: string;
    display?: number;
    processor?: number;
    processorVendor?: string;
    processorName?: string;
    video?: string;
    ram?: number;
    ramType?: string;
    public?: boolean;
    price?: string; // ID прайса из laptop-price-template
}

// Модель прайса для ноутбуков
export interface ILaptopPriceSchema {
    diagnostics: number;
    TO: number;
    thermalPaste: number;
    installOS: number;
    installPO: number;
    antivirus: number;
    matrixReplacement: number;
    batteryReplacement: number;
    ramReplacement: number;
    electronics: number;
    laptopId: string;
}

// Прайс-шаблон для принтеров
export interface IPrinterPriceTemplateSchema {
    _id?: string;
    priceType: string;
    diagnostics: number;
    TO: number;
    rollers: number;
    drum: number;
    laser: number;
    therm: number;
    reducer: number;
    scaner?: number | null;
    adf?: number | null;
    duplex: number;
    electronics: number;
}

// Прайс-шаблон для ноутбуков
export interface ILaptopPriceTemplateSchema {
    _id?: string;
    priceType: string;
    diagnostics: number;
    TO: number;
    thermalPaste: number;
    installOS: number;
    installPO: number;
    antivirus: number;
    matrixReplacement: number;
    batteryReplacement: number;
    ramReplacement: number;
    electronics: number;
}