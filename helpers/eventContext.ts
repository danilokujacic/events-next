import { createContext, useContext } from 'react';
import { toggleView } from './EventReducer/actions';
import { initialState } from './EventReducer/reducer';
import { EventState } from './EventReducer/types';

export const EventContext = createContext<[EventState, Function]>([
  initialState,
  () => {},
]);
