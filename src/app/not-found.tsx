import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ink text-white">
      <div className="wrap-narrow text-center">
        <h1 className="text-display">That page isn’t here.</h1>
        <p className="text-lede mt-6 text-white/70">The link may be old or the address may have a typo.</p>
        <div className="mt-10">
          <Button href="/">Back to the start</Button>
        </div>
      </div>
    </section>
  );
}
