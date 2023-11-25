"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { TodoStatus } from "@/types";

type TodoFilter = TodoStatus | "all";

const filters: {
  id: number;
  title: string;
  value: TodoFilter;
}[] = [
  {
    id: 0,
    title: "All",
    value: "all",
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

  const handleFilterClick = (filter: TodoFilter) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (filter && filter !== "all") {
      searchParams.set("status", filter);
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
              search === filter.value || (!search && filter.value === "all")
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
