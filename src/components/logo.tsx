import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function Logo({ className = "", withName = true }: { className?: string; withName?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/logo-mark-480.png"
        alt=""
        width={480}
        height={379}
        priority
        className="h-[22px] w-auto"
      />
      {withName && <span className="text-[17px] font-semibold tracking-[-0.02em]">{site.shortName}</span>}
    </Link>
  );
}
