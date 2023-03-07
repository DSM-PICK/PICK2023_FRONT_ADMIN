// App.tsx

import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux"; // Provider import 추가
import { SDSThemeProvider } from "@semicolondsm/react-emotion-theme";
import { Global } from "@emotion/react";
import { globalStyles } from "../styles/globalStyle";
import SidebarLayout from "@/components/sidebar/SidebarLayout";
import { DehydratedState, QueryClient, QueryClientProvider } from "react-query";
import { store } from "@/store/store";

export default function App({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        staleTime: 1000,
        refetchInterval: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Provider store={store}>
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
        <QueryClientProvider client={queryClient}>
          <SDSThemeProvider mode="light-only">
            <Global styles={globalStyles} />
            <SidebarLayout>
              <Component {...pageProps} />
            </SidebarLayout>
          </SDSThemeProvider>
        </QueryClientProvider>
      </>
    </Provider>
  );
}
