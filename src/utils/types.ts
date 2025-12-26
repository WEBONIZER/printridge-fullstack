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
    device?: string;
    type?: string;
    format?: string;
    capacity?: number;
    speed?: number;
    public?: boolean;
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
    public?: boolean;
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