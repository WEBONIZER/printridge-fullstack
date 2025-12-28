import { Schema, model } from "mongoose";
import { ICompatibilitySchema } from "../../utils/types";

export const compatibilitySchema = new Schema<ICompatibilitySchema>(
  {
    // Связи примеров с устройствами
    exampleId: {
      type: String,
      required: false,
    },
    printerId: {
      type: String,
      required: false,
    },
    laptopId: {
      type: String,
      required: false,
    },
    cartridgeId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Уникальный индекс на комбинацию exampleId + printerId (пример с принтером)
compatibilitySchema.index(
  { exampleId: 1, printerId: 1 }, 
  { 
    unique: true,
    partialFilterExpression: { 
      exampleId: { $exists: true, $ne: null },
      printerId: { $exists: true, $ne: null }
    }
  }
);

// Уникальный индекс на комбинацию exampleId + laptopId (пример с ноутбуком)
compatibilitySchema.index(
  { exampleId: 1, laptopId: 1 }, 
  { 
    unique: true,
    partialFilterExpression: { 
      exampleId: { $exists: true, $ne: null },
      laptopId: { $exists: true, $ne: null }
    }
  }
);

// Уникальный индекс на комбинацию exampleId + cartridgeId (пример с картриджем)
compatibilitySchema.index(
  { exampleId: 1, cartridgeId: 1 }, 
  { 
    unique: true,
    partialFilterExpression: { 
      exampleId: { $exists: true, $ne: null },
      cartridgeId: { $exists: true, $ne: null }
    }
  }
);

// Уникальный индекс на комбинацию cartridgeId + printerId (картридж с принтером)
compatibilitySchema.index(
  { cartridgeId: 1, printerId: 1 }, 
  { 
    unique: true,
    partialFilterExpression: { 
      cartridgeId: { $exists: true, $ne: null },
      printerId: { $exists: true, $ne: null }
    }
  }
);

export const CompatibilityModel = model<ICompatibilitySchema>("printridge-compatibility", compatibilitySchema);
