import '../styles/globals.scss';
import '../styles/fonts/SmoochSans/index.css';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ApolloProvider } from '@apollo/client';
import { client } from '../client';
import Snackbar from '../components/Snackbar';

const auth0Config = {
  domain: `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`,
  clientId: `${process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_ID}`,
  secret: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET}`,
  redirectUri: `${process.env.NEXT_PUBLIC_APPLICATION_HOST}`,
};

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider {...auth0Config}>
        <Snackbar>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Snackbar>
      </UserProvider>

      <script
        src='https://code.jquery.com/jquery-3.5.1.slim.min.js'
        integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj'
        crossOrigin='anonymous'></script>
      <script
        src='https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js'
        integrity='sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx'
        crossOrigin='anonymous'></script>
    </ApolloProvider>
  );
}

export default MyApp;
