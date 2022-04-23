import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import Event from '../../../interfaces/GraphQL/Event';
import ImageSlider from '../../ImageSlider/ImageSlider';
import styles from '../Event.module.scss';

interface IEventSnippetProps {
  event: Event;
}

const EventSnippet: FunctionComponent<IEventSnippetProps> = ({ event }) => {
  return (
    <Link href={`/events/${event.key}`} key={event.key}>
      <a className={`my-2 rounded shadow-lg ${styles['event-snippet']}`}>
        <ImageSlider
          controls={false}
          indicators={false}
          imageEntry={event.EventImages}
        />
        <div className='d-flex flex-column px-2 py-1'>
          <p className='text-white'>{event.Title}</p>
        </div>
      </a>
    </Link>
  );
};

export default EventSnippet;
