import type { GetServerSideProps, NextPage } from 'next';
import formatEntries from '../utils/GraphQL/formatEntries';
import Event from '../interfaces/GraphQL/Event';
import Dashboard from '../components/Dashboard/Dashboard';
import { getEvents, getEventsForUser } from '../services/GraphQL';
import { getSession } from '@auth0/nextjs-auth0';

const Home: NextPage<{
  events: Event[];
  isLoggedIn: boolean;
  error: boolean;
}> = ({ events, isLoggedIn, error }) => {
  return <Dashboard events={events} />;
};

export default Home;
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const session = await getSession(req, res);

    if (!session || !session.user) {
      const events = await getEvents();
      return {
        props: {
          events: formatEntries(events),
          isLoggedIn: false,
          error: false,
        },
      };
    }
    const events = await getEventsForUser(session.user.nickname);

    return {
      props: {
        events: formatEntries(events),
        isLoggedIn: true,
        error: false,
      },
    };
  } catch (err) {
    return {
      props: {
        events: [],
        isLoggedIn: false,
        error: false,
      },
    };
  }
};
