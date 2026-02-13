export default function SkeletonTable({ rows = 5 }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface/40">
      <div className="border-b border-border px-5 py-3.5">
        <div className="flex gap-16">
          {[120, 80, 60, 50, 90, 70].map((w, i) => (
            <div key={i} className="skeleton h-3 rounded" style={{ width: w }} />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-16 border-b border-border/50 px-5 py-4">
          <div className="space-y-1.5">
            <div className="skeleton h-3.5 w-36 rounded" />
            <div className="skeleton h-2.5 w-48 rounded" />
          </div>
          <div className="skeleton h-5 w-20 rounded-full" />
          <div className="skeleton h-3.5 w-16 rounded" />
          <div className="skeleton h-5 w-14 rounded-full" />
          <div className="skeleton h-3 w-24 rounded" />
          <div className="flex gap-1">
            <div className="skeleton h-7 w-7 rounded-lg" />
            <div className="skeleton h-7 w-7 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
