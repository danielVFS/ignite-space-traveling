import { AppProps } from 'next/app';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';
import Head from 'next/head';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Head>
        <title>SpaceTraveling</title>
      </Head>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
