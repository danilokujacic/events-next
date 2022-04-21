import Event from '../interfaces/GraphQL/Event';
import filterEventsFunction from './filterEvents';

const categorizeEvents = (events: Event[]) => {
  return [
    {
      label: 'Active',
      events: events.filter(filterEventsFunction('ACTIVE')),
    },
    {
      label: 'Finished',
      events: events.filter(filterEventsFunction('FINISHED')),
    },
    {
      label: 'Waiting',
      events: events.filter(filterEventsFunction('WAITING')),
    },
    {
      label: 'Archived',
      events: events.filter(filterEventsFunction('ARCHIVED')),
    },
  ];
};

export default categorizeEvents;
