import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    name: {
      type: String,
    },
    completed: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);

export default model("Task", taskSchema);
