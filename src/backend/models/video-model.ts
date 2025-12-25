import { Schema, model } from "mongoose";
import { IVideo } from "../../utils/types";

const videoSchema = new Schema<IVideo>(
  {
    src: {
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
    exampleId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const VideoModel = model<IVideo>("printridge-video", videoSchema);

