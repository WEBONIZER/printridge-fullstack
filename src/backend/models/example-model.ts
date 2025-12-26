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
    cartridgeNames: {
      type: [String],
      required: false,
      default: [],
    },
    printerNames: {
      type: [String],
      required: false,
      default: [],
    },
    laptopNames: {
      type: [String],
      required: false,
      default: [],
    },
    public: {
      type: Boolean,
      default: true,
      required: false,
    },
    // SEO метатеги
    metaTitle: {
      type: String,
      required: false,
      maxlength: 60,
    },
    metaDescription: {
      type: String,
      required: false,
      maxlength: 160,
    },
    metaKeywords: {
      type: String,
      required: false,
    },
    ogTitle: {
      type: String,
      required: false,
      maxlength: 60,
    },
    ogDescription: {
      type: String,
      required: false,
      maxlength: 200,
    },
    ogImage: {
      type: String,
      required: false,
    },
    route: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      maxlength: 100,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ExampleModel = model<IExampleSchema>("printridge-example", exampleSchema);
