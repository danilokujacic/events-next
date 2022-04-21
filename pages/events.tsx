import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { getEvents } from '../services/GraphQL';
import formatEntries from '../utils/GraphQL/formatEntries';

const EventsPage: NextPage<{ events: Event[]; error: boolean }> = ({
  events,
  error,
}) => {
  console.log({ events });
  return <div>Events</div>;
};

export default EventsPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const events = await getEvents();

    return {
      props: {
        events: formatEntries(events),
        error: false,
      },
    };
  } catch (err) {
    return { props: { events: [], error: true } };
  }
};
