import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with marktn PR.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
