import Link from "next/link";
import { ModeToggle } from "./theme-toggle";

export function BlogNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* Blog Identity */}
        <Link
          href="/"
          className="font-semibold text-base tracking-tight"
        >
          Sagar’s Blog
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          {/* <Link href="/posts" className="hover:text-foreground">
            All Posts
          </Link>
          <Link href="/tags/web" className="hover:text-foreground">
            Web
          </Link>
          <Link href="/tags/ai" className="hover:text-foreground">
            AI
          </Link>
          <Link href="/tags/systems" className="hover:text-foreground">
            Systems
          </Link> */}

          {/* Exit to portfolio */}
          <ModeToggle/>
          <a
            href="https://www.sagarsangwan.dev"
            className="text-muted-foreground hover:text-foreground"
          >
            Author ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
