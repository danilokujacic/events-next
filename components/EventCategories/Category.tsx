import React, { FunctionComponent } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import Link from 'next/link';
import EventSnippet from '../Event/Snippet/EventSnippet';

interface IEventCategoryProps {
  label: string;
  events: Event[];
}

const Category: FunctionComponent<IEventCategoryProps> = ({
  label,
  events,
}) => {
  return (
    <div className='flex-grow-1 mx-4 d-flex flex-column'>
      <h3>{label}</h3>
      {events.map((event) => (
        <Link href={`/events/${event.key}`} key={event.key}>
          <EventSnippet event={event} />
        </Link>
      ))}
    </div>
  );
};

export default Category;
