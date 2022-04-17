import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';
import useEvent from '../../hooks/useEvent';
import { ImageEntry } from '../../interfaces/GraphQL/Image';
import ImageSlider from '../ImageSlider/ImageSlider';
import styles from './Event.module.scss';

interface IEventHeader {
  imageEntry: ImageEntry;
  title: string;
  authorID: string;
}

const EventHeader: FunctionComponent<IEventHeader> = ({
  imageEntry,
  title,
  authorID,
}) => {
  const [state] = useEvent();
  return (
    <>
      <div className={`w-100 ${styles['carousel-wrapper']}`}>
        <ImageSlider imageEntry={imageEntry} />
      </div>
      <Card.Title className={styles['event-title']}>
        <p className='h3'>{title}</p>
      </Card.Title>
      <Card.Subtitle
        className={`${styles['event-subtitle']}  ${
          state.view === 'COLLAPSED' ? styles['collapsed'] : ''
        }`}>
        <p>By&nbsp;{authorID}</p>
        <div className={styles['link-holder']}>
          {state.view === 'COLLAPSED' ? (
            <Link href={`/events/${state.id}`}>View event</Link>
          ) : (
            <></>
          )}
        </div>
      </Card.Subtitle>
    </>
  );
};

export default EventHeader;
