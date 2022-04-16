import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';
import { client } from '../client';
import { gql } from '@apollo/client';
import formatEntries from '../utils/GraphQL/formatEntries';
import Event from '../interfaces/GraphQL/Event';
import Dashboard from '../components/Dashboard/Dashboard';

const Home: NextPage<{ events: Event[] }> = ({ events }) => {
  return (
    <div className={styles.container}>
      <Dashboard events={events} />
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetEvents {
          events {
            data {
              id
              attributes {
                Title
                StartDate
                EndDate
                AuthorID
                Description
                isArchived
                EventImages {
                  data {
                    attributes {
                      url
                      caption
                      name
                    }
                  }
                }
                UsersInvolved {
                  UserID
                }
              }
            }
          }
        }
      `,
    });

    return {
      props: { events: formatEntries(data.events.data) },
      revalidate: 3600,
    };
  } catch (err) {
    if (err instanceof Error) {
      return { props: { error: err.message } };
    } else {
      return { props: { error: true } };
    }
  }
};
