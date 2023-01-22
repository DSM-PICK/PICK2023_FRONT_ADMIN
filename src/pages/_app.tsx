import { SDSThemeProvider } from "@semicolondsm/react-emotion-theme";
import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { globalStyles } from "../styles/globalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SDSThemeProvider mode="light-only">
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </SDSThemeProvider>
  );
}
