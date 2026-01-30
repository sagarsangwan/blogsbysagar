export function BlogFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        {/* Author Statement */}
        <p className="max-w-2xl text-sm text-muted-foreground">
          This blog is written by{" "}
          <strong className="text-foreground">Sagar Sangwan</strong>, a software
          engineer working on full-stack systems, AI tooling, and production
          software. These posts are notes from real work — what failed, what
          shipped, and what mattered.
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <a
            href="https://www.sagarsangwan.dev"
            className="hover:text-foreground"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/sagarsangwan"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/sangwansagar"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>

        {/* Legal */}
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sagar Sangwan · blogs.sagarsangwan.dev
        </p>
      </div>
    </footer>
  );
}
