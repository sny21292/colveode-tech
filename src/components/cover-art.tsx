/**
 * Abstract cover art for project tiles. Pure CSS: brand gradient shapes,
 * hue-shifted per project so each tile reads as its own. Replace with real
 * screenshots when case studies arrive (pass `image` to ProjectTile).
 */
export function CoverArt({ hue, variant, className = "" }: { hue: number; variant: 1 | 2 | 3 | 4; className?: string }) {
  const style = { filter: `hue-rotate(${hue}deg)` } as const;
  return (
    <div className={`relative overflow-hidden bg-graphite ${className}`} aria-hidden>
      <div className="absolute inset-0" style={style}>
        {variant === 1 && (
          <>
            <div className="brand-gradient absolute -left-[10%] top-[20%] size-[70%] rounded-full opacity-90 blur-2xl" />
            <div className="absolute right-[8%] top-[12%] size-[38%] rounded-full bg-brand-orange opacity-80 blur-xl" />
            <div className="absolute inset-x-[12%] bottom-[14%] h-[34%] rounded-3xl bg-white/8 backdrop-blur-md" />
          </>
        )}
        {variant === 2 && (
          <>
            <div className="brand-gradient absolute left-[15%] top-[15%] size-[28%] rounded-full" />
            <div className="brand-gradient absolute left-[42%] top-[38%] size-[36%] rounded-full" />
            <div className="brand-gradient absolute left-[22%] top-[58%] size-[22%] rounded-full" />
            <div className="absolute left-[27%] top-[27%] h-[3px] w-[28%] origin-left rotate-[38deg] bg-white/70" />
            <div className="absolute left-[33%] top-[70%] h-[3px] w-[22%] origin-left -rotate-[35deg] bg-white/70" />
          </>
        )}
        {variant === 3 && (
          <>
            <div className="brand-gradient absolute inset-x-0 bottom-0 h-[55%] opacity-95" />
            <div className="absolute inset-x-[10%] top-[16%] grid grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-10 rounded-xl bg-white/12 backdrop-blur" />
              ))}
            </div>
          </>
        )}
        {variant === 4 && (
          <>
            <div className="brand-gradient absolute -right-[20%] -top-[25%] size-[85%] rounded-full opacity-90 blur-3xl" />
            <div className="absolute left-[10%] top-[22%] h-[6%] w-[46%] rounded-full bg-white/80" />
            <div className="absolute left-[10%] top-[34%] h-[6%] w-[30%] rounded-full bg-white/50" />
            <div className="absolute left-[10%] top-[46%] h-[6%] w-[38%] rounded-full bg-white/30" />
          </>
        )}
      </div>
    </div>
  );
}
