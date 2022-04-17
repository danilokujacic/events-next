import { ActionType, EventState } from './types';

export const initialState: EventState = {
  view: 'COLLAPSED',
};

export const eventReducerInitializer = (
  initialState: EventState,
): EventState => {
  return {
    view: 'COLLAPSED',
  };
};

export const eventReducer = (
  state: EventState,
  action: { type: ActionType; payload?: any },
): EventState => {
  const { type, payload } = action;

  if (type === 'TOGGLE_VIEW') {
    return {
      ...state,
      view: state.view === 'COLLAPSED' ? 'EXPANDED' : 'COLLAPSED',
    };
  }

  return state;
};
