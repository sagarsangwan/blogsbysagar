import Link from "next/link";

export function Hero() {
  return (
    <section className="relative py-20 sm:py-28 border-b border-border">
      <div className="container max-w-4xl mx-auto px-4 sm:px-8">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
            Notes on Building Software
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Practical writing on web development, AI systems, and engineering
            decisions — based on real projects, not tutorials rewritten for SEO.
          </p>

          <p className="text-sm text-muted-foreground">
            Written by{" "}
            <Link
              href="https://www.sagarsangwan.dev"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Sagar Sangwan
            </Link>
            , software engineer.
          </p>
        </div>
      </div>
    </section>
  );
}
