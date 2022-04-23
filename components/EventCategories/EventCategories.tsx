import React, { FunctionComponent, useMemo } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import categorizeEvents from '../../utils/categorizeEvents';
import Category from './Category';

interface IEventCategoriesProps {
  events: Event[];
}

const EventCategories: FunctionComponent<IEventCategoriesProps> = ({
  events,
}) => {
  const categorizedEvents = useMemo(() => categorizeEvents(events), [events]);

  return (
    <div className='d-flex w-100'>
      {categorizedEvents.map((eventProps) => (
        <Category key={eventProps.label} {...eventProps} />
      ))}
    </div>
  );
};

export default EventCategories;
