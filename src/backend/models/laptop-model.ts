import { Schema, model } from "mongoose";
import { ILaptopSchema } from "../../utils/types";

export const laptopSchema = new Schema<ILaptopSchema>(
  {
    model: {
      type: String,
      required: true,
    },
    series: {
      type: String,
      required: false,
    },
    vendor: {
      type: String,
      required: true,
    },
    display: {
      type: Number,
      required: false,
    },
    processor: {
      type: Number,
      required: false,
    },
    processorVendor: {
      type: String,
      required: false,
    },
    processorName: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
    ram: {
      type: Number,
      required: false,
    },
    ramType: {
      type: String,
      required: false,
    },
    public: {
      type: Boolean,
      default: true,
      required: false,
    },
    price: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Уникальный индекс на комбинацию vendor + model
laptopSchema.index({ vendor: 1, model: 1 }, { unique: true });

export const LaptopModel = model<ILaptopSchema>("printridge-laptop", laptopSchema);

