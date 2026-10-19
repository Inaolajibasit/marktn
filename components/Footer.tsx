import Link from "next/link";
import Image from "next/image";
import { Arrow, ButtonLink } from "./BrandUI";

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
          <a className="footer-email" href="mailto:Info@marktn.com">
            Info@marktn.com
          </a>
        </div>
      </div>
      <div className="footer-columns">
        <div>
          <h3>Our world</h3>
          <p>Nigeria &amp; Africa</p>
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
            href="https://instagram.com/marktnagency?rpxt=MTB0dXJ3dW94a2U0cA%3D%3D"
            target="_blank"
            rel="noreferrer"
          >
            Instagram <Arrow className="inline-arrow" />
          </a>
          <a
            href="https://www.linkedin.com/company/marktn-agency/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Arrow className="inline-arrow" />
          </a>
          <Link href="/contact">Start a conversation <Arrow className="inline-arrow" /></Link>
        </div>
        <div>
          <h3>Beyond the brief</h3>
          <p>
            Another angle. A better question.
            <br />
            Something worth paying attention to.
          </p>
          <Link href="/blog" className="footer-journal-link">
            Read our latest thinking <Arrow className="inline-arrow" />
          </Link>
        </div>
      </div>
      <div className="footer-wordmark">
        <Image
          src="/images/hero/LOGO-WHITE.svg"
          alt="MARKTN"
          width={399}
          height={167}
          className="brand-logo"
        />
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MARKTN. All rights reserved.</span>
        <span>Beyond the brief.</span>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
