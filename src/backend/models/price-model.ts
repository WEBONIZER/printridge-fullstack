import { Schema, model } from "mongoose";
import { IPriceSchema } from "../../utils/types";

export const priceSchema = new Schema<IPriceSchema>(
  {
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
    printerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Уникальный индекс на printerId (один прайс на один принтер)
priceSchema.index({ printerId: 1 }, { unique: true });

export const PriceModel = model<IPriceSchema>("printridge-price", priceSchema);

