import '../styles/globals.scss';
import '../styles/fonts/SmoochSans/index.css';

import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { UserProvider } from '@auth0/nextjs-auth0';
import { ApolloProvider } from '@apollo/client';
import { client } from '../client';
import { motion } from 'framer-motion';
import { MotionConfig } from 'framer-motion';

const auth0Config = {
  domain: `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`,
  clientId: `${process.env.NEXT_PUBLIC_AUTH0_API_CLIENT_ID}`,
  secret: `${process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET}`,
  redirectUri: `${process.env.NEXT_PUBLIC_APPLICATION_HOST}`,
};
const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider {...auth0Config}>
        <Layout>
          <motion.div
            key={router.route}
            variants={variants} // Pass the variant object into Framer Motion
            initial='hidden' // Set the initial state to variants.hidden
            animate='enter' // Animated state to variants.enter// Exit state (used later) to variants.exit
            transition={{ type: 'linear' }} // Set the transition to linear>
          >
            <Component {...pageProps} />
          </motion.div>
        </Layout>
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
