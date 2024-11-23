import ApolloProvider from "@/components/ApolloProvider";
import type { Metadata } from "next";
import "./globals.css";



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
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
