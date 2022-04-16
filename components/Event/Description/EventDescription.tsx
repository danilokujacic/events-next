import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Card } from 'react-bootstrap';
import style from '../Event.module.scss';
import useEvent from '../Utils/context';

interface IEventDescription {
  description: string;
}

const limitedDescription = (desc: string) =>
  desc.length > 256 ? desc.substring(0, 256).concat('...') : desc;

const EventDescription: FunctionComponent<IEventDescription> = ({
  description,
}) => {
  const [state] = useEvent();
  return (
    <Card.Body className={style['event-description']}>
      <p>{limitedDescription(description)}</p>
      {state.view === 'EXPANDED' ? (
        <Link href={`/events/${state.id}`}>View event</Link>
      ) : (
        <></>
      )}
    </Card.Body>
  );
};

export default EventDescription;
