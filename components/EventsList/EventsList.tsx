import { AnimatePresence, motion } from 'framer-motion';
import { FunctionComponent } from 'react';
import Event from '../../interfaces/GraphQL/Event';
import EventComponent from '../Event';

const EventsList: FunctionComponent<{ events: Event[] }> = ({ events }) => {
  if (!events) {
    return <div>Currently no events</div>;
  }

  return (
    <>
      <AnimatePresence>
        {events.map((event) => (
          <motion.div
            exit='popOut'
            animate='popIn'
            variants={{
              popIn: {
                rotateX: [120, 60, 0],
                opacity: 1,
                transition: {
                  duration: 0.2,
                },
              },
              popOut: {
                opacity: 0,
                rotateX: 120,
                transition: {
                  duration: 0.2,
                },
              },
            }}
            className='mx-4 my-4'
            key={event.key}>
            <EventComponent {...event} id={event.key} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default EventsList;
