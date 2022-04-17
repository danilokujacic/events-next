import { createContext } from 'react';
import Event from '../interfaces/GraphQL/Event';

const EventDashboardContext = createContext<{
  clientEvents: Event[] | null;
  setClientEvents: Function;
} | null>(null);

export default EventDashboardContext;
