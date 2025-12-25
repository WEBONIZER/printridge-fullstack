import { Schema, model } from "mongoose";
import { IPhoto } from "../../utils/types";

const photoSchema = new Schema<IPhoto>(
  {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: false,
      default: "",
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
    exampleId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const PhotoModel = model<IPhoto>("printridge-photo", photoSchema);
