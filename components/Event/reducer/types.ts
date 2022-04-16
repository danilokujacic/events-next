export type ActionType = 'TOGGLE_VIEW';

export interface EventState {
  view: 'COLLAPSED' | 'EXPANDED';
  id?: string;
}
