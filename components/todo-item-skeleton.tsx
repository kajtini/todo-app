import { Skeleton } from "@/components/ui/skeleton";

export default function TodoItemSkeleton() {
  return (
    <div className="px-4 py-3 border-border border rounded-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="space-y-1">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-[22px] w-20 rounded-full" />
        </div>

        <div className="flex item-center gap-1"></div>
      </div>
    </div>
  );
}
