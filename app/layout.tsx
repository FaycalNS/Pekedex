import ApolloProvider from "@/components/ApolloProvider";

import { Roboto } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

const roboto = Roboto({
  weight: ['100','300','400','500', '700','900'],
  subsets: ['latin'],
})




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
