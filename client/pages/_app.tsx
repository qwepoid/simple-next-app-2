import "../styles/globals.css";
import type { AppProps } from "next/app";
import Headers from "../src/components/Headers";
import React from "react";
import dynamic from "next/dynamic";
import BottomNav from "../src/components/BottomNav";

function SafeHydrate({ children }: { children: any }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  const AppProviders = dynamic(() => import("../src/context"), {
    ssr: false,
  });

  // const Headers = dynamic(() => import("../src/components/Headers"), {
  //   webpack() {},
  // });

  // if (process.env.NODE_ENV === "development") {
  //   if (typeof window === "undefined") {
  //     console.log("inside window undefined");
  //     import("../mocks/server.js").then(({ server }) => {
  //       server.listen();
  //     });
  //   } else {
  //     console.log("inside window is defined");
  //     import("../mocks/browser.js").then(({ worker }) => {
  //       worker.start();
  //     });
  //   }
  // }

  return (
    <>
      <SafeHydrate>
        <AppProviders>
          <Headers />
          <div className="md:mx-24 pb-16 h-full">
            <Component {...pageProps} />
          </div>
        </AppProviders>
      </SafeHydrate>
      <BottomNav />
    </>
  );
}

export default MyApp;
