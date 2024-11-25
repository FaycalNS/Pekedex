import ApolloProvider from "@/components/ApolloProvider";
import type { Metadata } from "next";

import { Roboto } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

const roboto = Roboto({
  weight: ['100','300','400','500', '700','900'],
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "Pokedex",
  description: "A Pokedex app using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ApolloProvider>{children}</ApolloProvider>
        <Toaster />
      </body>
    </html>
  );
}
