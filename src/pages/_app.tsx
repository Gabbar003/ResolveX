import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import Navbar from "./components/ui/Navbar";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={`${GeistSans.className} flex flex-row w-screen h-screen `}>
        <Navbar/>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
