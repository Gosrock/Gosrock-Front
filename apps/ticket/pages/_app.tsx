import { globalStyle, theme } from '@dudoong/ui';
import { Global, ThemeProvider } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps, AppContext } from 'next/app';
import { useEffect, useState } from 'react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import 'react-spring-bottom-sheet/dist/style.css';
import GlobalOverlay from '@components/shared/overlay/GlobalOverlay';
import { AuthApi, OauthLoginResponse } from '@dudoong/utils';
import { authState } from '@store/auth';
import cookies from 'next-cookies';
import { setCredentials } from '@lib/utils/setCredentials';
import { getCookie } from 'cookies-next';
import Layout from '@components/shared/Layout';
import Head from 'next/head';
import useApiError from '@lib/hooks/useError';
import { access } from 'fs';

interface MyAppProps extends AppProps {
  loginData: OauthLoginResponse | null;
}

function MyApp({ Component, pageProps, loginData }: MyAppProps) {
  const { handleError } = useApiError();

  const initializer = ({ set }: MutableSnapshot) => {
    if (loginData) {
      const auth = {
        userProfile: loginData.userProfile,
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
        isAuthenticated: true,
        callbackUrl: (getCookie('redirectUrl') as string) || '/',
      };
      set(authState, auth);
    }
  };

  useEffect(() => {
    loginData && setCredentials(loginData);
  }, [loginData]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { onError: handleError, retry: true },
          mutations: { onError: handleError },
        },
      }),
  );

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <RecoilRoot initializeState={initializer}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Hydrate state={pageProps.dehydratedState}>
              <Global styles={globalStyle} />
              <Layout>
                <Component {...pageProps} />
                <GlobalOverlay />
              </Layout>
            </Hydrate>
          </QueryClientProvider>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx, Component, router } = context;
  const refreshToken = cookies(ctx).refreshToken;
  let pageProps = {};
  let loginData: OauthLoginResponse | null;
  console.log(ctx.req);
  try {
    if (ctx.req) {
      const response = await AuthApi.REFRESH(refreshToken!);
      loginData = response;
      ctx.res?.setHeader(
        'set-cookie',
        `refreshToken=${response.refreshToken}; path=/; max-age=${response.refreshTokenAge}`,
      );
    } else {
      loginData = null;
    }
  } catch (err: any) {
    loginData = null;
  }

  if (Component.getInitialProps) {
    // Component의 context로 ctx를 넣어주자
    pageProps = await Component.getInitialProps(ctx);
  }
  // return한 값은 해당 컴포넌트의 props로 들어가게 됩니다.
  return { pageProps, loginData };
};

export default MyApp;
