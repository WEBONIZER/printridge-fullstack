import { Schema, model } from "mongoose";
import { ILaptopPriceSchema } from "../../utils/types";

export const laptopPriceSchema = new Schema<ILaptopPriceSchema>(
  {
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
    laptopId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Уникальный индекс на laptopId (один прайс на один ноутбук)
laptopPriceSchema.index({ laptopId: 1 }, { unique: true });

export const LaptopPriceModel = model<ILaptopPriceSchema>("printridge-laptop-price", laptopPriceSchema);

