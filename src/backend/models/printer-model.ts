import { Schema, model } from "mongoose";
import { IPrinterSchema } from "../../utils/types";

export const printerSchema = new Schema<IPrinterSchema>(
  {
    vendor: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    format: {
      type: String,
      required: false,
    },
    capacity: {
      type: Number,
      required: false,
    },
    speed: {
      type: Number,
      required: false,
    },
    public: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Уникальный индекс на комбинацию vendor + model
printerSchema.index({ vendor: 1, model: 1 }, { unique: true });

export const PrinterModel = model<IPrinterSchema>("printridge-printer", printerSchema);

