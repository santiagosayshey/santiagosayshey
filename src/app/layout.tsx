// src/app/layout.tsx
import "@/styles/fonts.css";
import "@/styles/globals.css";

export const metadata = {
  title: "santiagosayshey.me",
  description: "Santiago's Homepage",
  icons: {
    icon: "/favicon.ico",
  },
  // Add more metadata properties as needed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
