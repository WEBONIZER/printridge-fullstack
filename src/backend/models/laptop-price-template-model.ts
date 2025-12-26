import mongoose, { Schema, model } from "mongoose";

export interface ILaptopPriceTemplateSchema {
  priceType: string; // например "display1314"
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

export const laptopPriceTemplateSchema = new Schema<ILaptopPriceTemplateSchema>(
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
    thermalPaste: {
      type: Number,
      required: true,
    },
    installOS: {
      type: Number,
      required: true,
    },
    installPO: {
      type: Number,
      required: true,
    },
    antivirus: {
      type: Number,
      required: true,
    },
    matrixReplacement: {
      type: Number,
      required: true,
    },
    batteryReplacement: {
      type: Number,
      required: true,
    },
    ramReplacement: {
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

export const LaptopPriceTemplateModel = model<ILaptopPriceTemplateSchema>("printridge-laptop-price-template", laptopPriceTemplateSchema);

