import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import GuestDashboard from '../components/Dashboard/GuestDashboard';
import Event from '../interfaces/GraphQL/Event';
import { getEvents } from '../services/GraphQL';
import formatEntries from '../utils/GraphQL/formatEntries';

const EventsPage: NextPage<{ events: Event[]; error: boolean }> = ({
  events,
  error,
}) => {
  return <GuestDashboard events={events} />;
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
