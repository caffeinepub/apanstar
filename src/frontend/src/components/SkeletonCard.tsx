import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCreatorCard() {
  return (
    <div
      className="card-elevated rounded-2xl p-3 flex flex-col gap-2.5"
      aria-busy="true"
    >
      <Skeleton className="w-16 h-16 rounded-full mx-auto" />
      <div className="flex flex-col items-center gap-1.5">
        <Skeleton className="h-3.5 w-24 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-4 w-10 rounded" />
      </div>
    </div>
  );
}

export function SkeletonVideoCard() {
  return (
    <div className="card-elevated rounded-2xl overflow-hidden" aria-busy="true">
      <Skeleton className="w-full aspect-[9/16] max-h-52" />
      <div className="p-2.5 flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
        <Skeleton className="h-7 w-16 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonList({
  count = 4,
  variant = "creator",
}: { count?: number; variant?: "creator" | "video" }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => `sk-${i}`).map((key) =>
        variant === "video" ? (
          <SkeletonVideoCard key={key} />
        ) : (
          <SkeletonCreatorCard key={key} />
        ),
      )}
    </>
  );
}
