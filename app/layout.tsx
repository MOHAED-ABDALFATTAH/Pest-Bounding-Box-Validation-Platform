import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fieldnote | Pest annotation review",
  description:
    "Review and validate pest bounding-box annotations in one focused workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
