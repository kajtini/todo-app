export interface ITodo {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  uid: string;
  title: string;
  status: TodoStatus;
}

export type TodoStatus = "active" | "completed";
