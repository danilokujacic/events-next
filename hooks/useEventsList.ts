import { useContext, useEffect, useState } from 'react';
import sortEventBy from '../utils/sortEventBy';
import EventContext from '../helpers/eventsDashboardContext';
import filterEventsFunction from '../utils/filterEvents';
import { EventSortMethod, EventStatus } from '../types/Event';

const useEventList = () => {
  const state = useContext(EventContext);

  if (!state?.clientEvents) {
    return {
      loading: true,
      events: [],
      actions: {
        filterEvents: () => {},
      },
    };
  }
  const filterEvents = (status: EventStatus | 'ALL') => {
    if (status === 'ALL') {
      return state.setClientEvents(state);
    }
    state.setClientEvents(
      (state?.clientEvents || []).filter(filterEventsFunction(status)),
    );
  };
  const sortEvents = (sort: EventSortMethod) => {
    state.setClientEvents((state?.clientEvents || []).sort(sortEventBy(sort)));
  };
  const updateEvent = (id: string, options: any) => {
    state.setClientEvents(
      (state?.clientEvents || []).map((event) =>
        id === event.key ? { ...event, ...options } : event,
      ),
    );
  };

  const deleteEvent = (id: string) => {
    state.setClientEvents([
      ...(state?.clientEvents || []).filter((event) => event.key !== id),
    ]);
  };
  const searchEvents = (value: string) => {
    state.setClientEvents(
      (state?.clientEvents || []).filter(({ Title }) =>
        Title.toLocaleLowerCase().includes(value),
      ),
    );
  };

  return {
    events: state?.clientEvents || [],
    actions: {
      filterEvents,
      sortEvents,
      updateEvent,
      searchEvents,
      deleteEvent,
    },
  };
};

export default useEventList;
