import type { AppProps } from "next/app";
import Head from "next/head";
import { SDSThemeProvider } from "@semicolondsm/react-emotion-theme";
import { Global } from "@emotion/react";
import { globalStyles } from "../styles/globalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SDSThemeProvider mode="light-only">
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </SDSThemeProvider>
    </>
  );
}
