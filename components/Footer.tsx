import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink px-gutter pb-10 pt-section text-paper">
      <Link href="/contact" className="group block" data-cursor="click">
        <h2 className="max-w-4xl font-display text-display-2 italic transition-colors group-hover:text-rust">
          Let&rsquo;s build something that shifts perception.
        </h2>
      </Link>

      <div className="mt-16 flex flex-col gap-10 border-t border-paper/15 pt-10 font-mono text-caption uppercase tracking-[0.08em] text-paper/60 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-paper">marktn PR</p>
          <p className="mt-1">Lagos, Nigeria</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/about" className="hover:text-rust">About</Link>
          <Link href="/services" className="hover:text-rust">Services</Link>
          <Link href="/work" className="hover:text-rust">Work</Link>
          <Link href="/press" className="hover:text-rust">Press</Link>
          <Link href="/blog" className="hover:text-rust">Blog</Link>
        </nav>

        <div className="flex gap-x-8">
          <a href="mailto:hello@marktnpr.com" className="hover:text-rust">Email</a>
          <a href="https://linkedin.com/company/marktnpr" className="hover:text-rust">LinkedIn</a>
          <a href="https://instagram.com/marktnpr" className="hover:text-rust">Instagram</a>
          <a href="https://wa.me/2340000000000" className="hover:text-rust">WApp</a>
        </div>
      </div>

      <p className="mt-10 font-mono text-caption text-paper/30">
        © {new Date().getFullYear()} marktn PR. All rights reserved.
      </p>
    </footer>
  );
}
