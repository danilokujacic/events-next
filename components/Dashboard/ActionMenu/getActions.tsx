import {
  faBox,
  faCalendarCheck,
  faCalendarXmark,
  faEarthEurope,
} from '@fortawesome/free-solid-svg-icons';

const getActions = (actions: { [key: string]: Function }) => {
  return [
    {
      label: 'All',
      icon: faEarthEurope,
      action: () => actions.filterEvents('ALL'),
    },
    {
      label: 'Archived',
      icon: faBox,
      action: () =>actions.filterEvents('ARCHIVED'),
    },
    {
      label: 'Started',
      icon: faCalendarCheck,
      action: () =>actions.filterEvents('ACTIVE'),
    },
    {
      label: 'Finished',
      icon: faCalendarXmark,
      action: () =>actions.filterEvents('FINISHED'),
    },
    {
      label: 'Waiting',
      icon: faCalendarXmark,
      action: () =>actions.filterEvents('WAITING'),
    },
  ];
};

export default getActions;
