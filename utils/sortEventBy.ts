import Event from '../interfaces/GraphQL/Event';
import { EventSortMethod } from '../types/Event';

const sortEventBy = (method: EventSortMethod) => {
  return (eventA: Event, eventB: Event) => {
    return 1;
  };
};

export default sortEventBy;
