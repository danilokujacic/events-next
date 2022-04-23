import React, { FunctionComponent } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import EventSnippet from '../Event/Snippet/EventSnippet';
import styles from './EventCategories.module.scss';

interface IEventCategoryProps {
  label: string;
  events: Event[];
}

const Category: FunctionComponent<IEventCategoryProps> = ({
  label,
  events,
}) => {
  return (
    <div
      className={`flex-grow-1 mx-4 d-flex flex-column ${styles['events-column']}`}>
      <p className='h5'>{label}</p>
      {events.map((event) => (
        <EventSnippet key={event.key} event={event} />
      ))}
    </div>
  );
};

export default Category;
