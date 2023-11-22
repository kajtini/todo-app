import { ReactNode } from "react";

import Header from "@/components/header";
import AddTodoForm from "@/components/add-todo-form";
import TodoFilters from "@/components/todo-filters";

export default function TodosLayout({ children }: { children: ReactNode }) {
  return (
    <section className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-grow max-w-7xl mx-auto w-full px-7 py-7 flex-col gap-5">
        <AddTodoForm />
        <TodoFilters />

        {children}
      </div>
    </section>
  );
}
