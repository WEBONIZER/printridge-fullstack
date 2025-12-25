import { Schema, model } from "mongoose";
import { ICompatibilitySchema } from "../../utils/types";

export const compatibilitySchema = new Schema<ICompatibilitySchema>(
  {
    cartridgeId: {
      type: String,
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

// Уникальный индекс на комбинацию cartridgeId + printerId
compatibilitySchema.index({ cartridgeId: 1, printerId: 1 }, { unique: true });

export const CompatibilityModel = model<ICompatibilitySchema>("printridge-compatibility", compatibilitySchema);

