import { createContext, useContext } from 'react';
import { toggleView } from '../reducer/actions';
import { initialState } from '../reducer/reducer';
import { EventState } from '../reducer/types';

export const EventContext = createContext<[EventState, Function]>([
  initialState,
  () => {},
]);

const useEvent = (): [EventState, { [key: string]: Function }] => {
  const [state, dispatch] = useContext(EventContext);

  if (!state || !dispatch) {
    throw Error(
      `Cannot use hook outside of ${EventContext.displayName} provider`,
    );
  }

  const actions = {
    toggleView: () => toggleView(dispatch as Function),
  };

  return [state, actions];
};

export default useEvent;
