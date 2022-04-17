import { useContext } from 'react';
import { EventContext } from '../helpers/eventContext';
import { toggleView } from '../helpers/EventReducer/actions';
import { EventState } from '../helpers/EventReducer/types';

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
