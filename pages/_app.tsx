import '../styles/globals.scss';
import '../styles/fonts/SmoochSans/index.css';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ApolloProvider } from '@apollo/client';
import { client } from '../client';

const auth0Config = {
  domain: `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`,
  clientId: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}`,
  secret: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET}`,
  redirectUri: `${process.env.NEXT_PUBLIC_APPLICATION_HOST}`,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider {...auth0Config}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
