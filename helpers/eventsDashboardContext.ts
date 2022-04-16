import { createContext } from 'react';
import Event from '../interfaces/GraphQL/Event';

const EventDashboardContext = createContext<Event[] | null>(null);

export default EventDashboardContext;
