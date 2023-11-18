import Header from "@/components/header";
import { ReactNode } from "react";

export default function TodosLayout({ children }: { children: ReactNode }) {
  return (
    <section className="h-screen flex flex-col">
      <Header />
      {children}
    </section>
  );
}
