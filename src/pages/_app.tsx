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
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const router = useRouter();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  const Toaster = dynamic(
    () => import("react-hot-toast").then((c) => c.Toaster),
    {
      ssr: false,
    }
  );

  return (
    <Provider store={store}>
      <>
        <Head>
          <title>PiCK Admin</title>
          <meta
            name="description"
            content="야간자율학습 출결관리 웹 서비스, 여기서 전부 관리하고, 확인해요!"
          ></meta>
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
          <Toaster />
          <SDSThemeProvider mode="light-only">
            <Global styles={globalStyles} />
            {router.pathname !== "/" ? (
              <SidebarLayout>
                <Component {...pageProps} />
              </SidebarLayout>
            ) : (
              <Component {...pageProps} />
            )}
          </SDSThemeProvider>
        </QueryClientProvider>
      </>
    </Provider>
  );
}
