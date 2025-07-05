import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'material-symbols';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Turbo",
  description: "The OS of the future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/minimal.png" sizes="any" />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
