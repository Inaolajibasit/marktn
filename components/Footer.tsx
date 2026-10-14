import Link from "next/link";
import { BrandLogo, ButtonLink } from "./BrandUI";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <h2>
          Got something
          <br />
          <span>worth going beyond?</span>
        </h2>
        <div>
          <ButtonLink href="/contact" variant="light">
            Let’s make it happen
          </ButtonLink>
          <a className="footer-email" href="mailto:hello@marktnpr.com">
            hello@marktnpr.com
          </a>
        </div>
      </div>
      <div className="footer-columns">
        <div>
          <h3>Our world</h3>
          <p>Lagos, Nigeria</p>
          <p>Rooted in Africa.</p>
          <p>Connected to the world.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/work">Projects</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/press">Press</Link>
          <Link href="/blog">Journal</Link>
        </div>
        <div>
          <h3>Stay connected</h3>
          <a
            href="https://www.instagram.com/marktnpr"
            target="_blank"
            rel="noreferrer"
          >
            Instagram ↗
          </a>
          <a
            href="https://www.linkedin.com/company/marktnpr"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <Link href="/contact">Start a conversation ↗</Link>
        </div>
        <div>
          <h3>Beyond the brief</h3>
          <p>
            Another angle. A better question.
            <br />
            Something worth paying attention to.
          </p>
          <Link href="/blog" className="footer-journal-link">
            Read our latest thinking ↗
          </Link>
        </div>
      </div>
      <div className="footer-wordmark">
        <BrandLogo light />
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MARKTN. All rights reserved.</span>
        <span>Beyond the brief.</span>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
