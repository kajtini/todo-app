"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { TodoStatus } from "@/types";

const filters: {
  id: number;
  title: string;
  value: TodoStatus | "";
}[] = [
  {
    id: 0,
    title: "All",
    value: "",
  },
  {
    id: 1,
    title: "Active",
    value: "active",
  },
  {
    id: 2,
    title: "Completed",
    value: "completed",
  },
];

export default function TodoFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("status")?.toString();

  const handleFilterClick = (status: TodoStatus | "") => {
    const searchParams = new URLSearchParams();

    if (status) {
      searchParams.set("status", status);
    } else {
      searchParams.delete("status");
    }

    const search = searchParams.toString();
    const query = search ? `?${search}` : "";
    const newPathname = `${pathname}${query}`;

    router.replace(newPathname);
  };

  return (
    <ul className="flex items-center gap-3">
      {filters.map((filter) => (
        <li key={filter.id} onClick={() => handleFilterClick(filter.value)}>
          <Button
            variant="ghost"
            size="sm"
            className={`${
              search === filter.value || (!search && filter.value === "")
                ? "bg-accent"
                : "bg-background"
            } capitalize`}
          >
            {filter.title}
          </Button>
        </li>
      ))}
    </ul>
  );
}
