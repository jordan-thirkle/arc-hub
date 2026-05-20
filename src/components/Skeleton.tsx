interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className = 'h-4 w-full', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`skeleton-shimmer rounded-sm ${className}`} />
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="card-base p-4 space-y-3">
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-12 rounded-sm" />
        <Skeleton className="h-6 w-12 rounded-sm" />
      </div>
    </div>
  );
}
