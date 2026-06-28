import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VocabRank — Learn English-Indonesian Vocabulary",
  description:
    "A gamified English-to-Indonesian vocabulary learning platform. Answer quizzes, earn XP, climb the leaderboard, and master new words every day.",
  keywords: ["vocabulary", "english", "indonesian", "learning", "quiz", "gamification"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
