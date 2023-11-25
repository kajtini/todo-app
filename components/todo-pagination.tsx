"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PER_PAGE } from "@/lib/constants";

interface TodoPaginationProps {
  totalTodos: number;
}

export default function TodoPagination({ totalTodos }: TodoPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page")?.toString() || "1";
  const maxPages = Math.ceil(totalTodos / PER_PAGE);
  const hasAccessToPreviousPage = +currentPage - 1 > 0;
  const hasAccessToNextPage = +currentPage + 1 <= maxPages;

  const handlePageUpdate = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (page) {
      searchParams.set("page", `${page}`);
    } else {
      searchParams.delete("page");
    }

    const search = searchParams.toString();
    const query = search ? `?${search}` : "";
    const newPathname = `${pathname}${query}`;

    router.replace(newPathname);
  };

  const handlePreviousPageClick = (currentPage: string) => {
    if (hasAccessToPreviousPage) {
      handlePageUpdate(+currentPage - 1);
    }
  };

  const handleNextPageClick = (currentPage: string) => {
    if (hasAccessToNextPage) {
      handlePageUpdate(+currentPage + 1);
    }
  };

  if (PER_PAGE >= totalTodos || !totalTodos) {
    return null;
  }

  return (
    <div
      className="flex
     items-center gap-3 self-end"
    >
      <Button
        size="icon"
        variant="ghost"
        onClick={() => handlePreviousPageClick(currentPage)}
        disabled={!hasAccessToPreviousPage}
      >
        <ChevronLeft size={18} />
      </Button>

      <p className="text-muted-foreground">
        {currentPage}/{maxPages}
      </p>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => handleNextPageClick(currentPage)}
        disabled={!hasAccessToNextPage}
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
}
