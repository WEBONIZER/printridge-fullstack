import { Schema, model } from "mongoose";
import { ICartridgeSchema } from "../../utils/types";

export const cartridgeSchema = new Schema<ICartridgeSchema>(
  {
    modelCart: {
      type: String,
      required: true,
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: "printridge-photo",
      required: true,
    },
    resource: {
      type: Number,
      required: false,
    },
    chip: {
      type: Boolean,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    devices: {
      type: String,
      required: true,
    },
    refill_price: {
      type: String,
      required: true,
    },
    recovery_price: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const CartridgeModel = model<ICartridgeSchema>("printridge-cartridge", cartridgeSchema);
