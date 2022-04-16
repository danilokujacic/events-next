import { FunctionComponent } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import EventComponent from '../Event';

const EventsList: FunctionComponent<{ events: Event[] }> = ({ events }) => {
  if (!events) {
    return <div>Currently no events</div>;
  }

  console.log(events)
  return (
    <>
      {events.map((event) => (
        <div className="mx-4 my-4" key={event.key}>
          <EventComponent {...event} id={event.key} />
        </div>
      ))}
    </>
  );
};

export default EventsList;
