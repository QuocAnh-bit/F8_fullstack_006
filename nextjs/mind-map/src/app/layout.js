import "./globals.css";
import { Providers } from "./providers";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "../app/components/Header/Header";
import Footer from "../app/components/Footer/Footer";

export const metadata = {
  title: "Mind Map",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico?v=4",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <UserProvider>
        <body>
          <Providers>
            <Header />
            <main className="max-w-[1280px] px-3 m-auto ">{children}</main>
            <Footer />
          </Providers>
        </body>
      </UserProvider>
    </html>
  );
}
