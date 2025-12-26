import { Schema, model } from "mongoose";
import { IExampleSchema } from "../../utils/types";

export const exampleSchema = new Schema<IExampleSchema>(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    cartridgeId: {
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

export const ExampleModel = model<IExampleSchema>("printridge-example", exampleSchema);
