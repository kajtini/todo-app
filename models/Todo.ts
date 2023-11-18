import { ITodo } from "@/types";
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema<ITodo>(
  {
    uid: String,
    title: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
