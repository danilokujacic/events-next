import { useContext, useState } from 'react';
import sortEventBy from '../utils/sortEventBy';
import EventContext from '../helpers/eventsDashboardContext';
import filterEventsFunction from '../utils/filterEvents';
import { EventSortMethod, EventStatus } from '../types/Event';

const useEventList = () => {
  const state = useContext(EventContext);
  const [events, setEvents] = useState(state);
  if (!events) {
    throw Error(`Using hook outside ${EventContext.displayName} context`);
  }

  const filterEvents = (status: EventStatus | 'ALL') => {
    if (status === 'ALL') {
      return setEvents(state);
    }
    setEvents(events.filter(filterEventsFunction(status)))
  };
  const sortEvents = (sort: EventSortMethod) => {
    setEvents(events.sort(sortEventBy(sort)));
  };
  const updateEvent = (id: string, options: any) => {
    setEvents(
      events.map((event) =>
        id === event.key ? { ...event, ...options } : event,
      ),
    );
  };

  const deleteEvent = (id:string) => setEvents(events.filter(event => event.key !== id));
  const searchEvents = (value: string) => {
    setEvents(
      events.filter(({ Title }) => Title.toLocaleLowerCase().includes(value)),
    );
  };

  return {
    events,
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
