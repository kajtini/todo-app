import { ReactNode } from "react";

import Header from "@/components/header";

export default function TodosLayout({ children }: { children: ReactNode }) {
  return (
    <section className="h-screen flex flex-col">
      <Header />
      {children}
    </section>
  );
}
