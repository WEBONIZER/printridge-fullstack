import mongoose, { Schema, model } from "mongoose";

export interface IPrinterPriceTemplateSchema {
  priceType: string; // например "monoPrinter10k40kA4"
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

export const printerPriceTemplateSchema = new Schema<IPrinterPriceTemplateSchema>(
  {
    priceType: {
      type: String,
      required: true,
      unique: true,
    },
    diagnostics: {
      type: Number,
      required: true,
    },
    TO: {
      type: Number,
      required: true,
    },
    rollers: {
      type: Number,
      required: true,
    },
    drum: {
      type: Number,
      required: true,
    },
    laser: {
      type: Number,
      required: true,
    },
    therm: {
      type: Number,
      required: true,
    },
    reducer: {
      type: Number,
      required: true,
    },
    scaner: {
      type: Number,
      required: false,
    },
    adf: {
      type: Number,
      required: false,
    },
    duplex: {
      type: Number,
      required: true,
    },
    electronics: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PrinterPriceTemplateModel = model<IPrinterPriceTemplateSchema>("printridge-printer-price-template", printerPriceTemplateSchema);

