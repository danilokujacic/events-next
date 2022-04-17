import { FunctionComponent, useReducer, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import styles from './Event.module.scss';
import EventFooter from './Footer';
import { motion } from 'framer-motion';
import EventDescription from './Description';
import {
  eventReducer,
  eventReducerInitializer,
} from '../../helpers/EventReducer';
import { EventContext } from '../../helpers/eventContext';
import EventHeader from './Header';
import { initialState } from '../../helpers/EventReducer/reducer';
import Event from '../../interfaces/GraphQL/Event';
import RemoveEventComponent from './RemoveEventComponent';

const Event: FunctionComponent<Event & { id: string }> = (props) => {
  const [state, dispatch] = useReducer(
    eventReducer,
    { ...initialState, id: props.id },
    eventReducerInitializer,
  );
  const removeEventComponentRef = useRef<{ toggleRemove: Function } | null>(
    null,
  );

  const toggleRemove = (shouldShow = false) => {
    if (removeEventComponentRef.current) {
      removeEventComponentRef.current.toggleRemove(shouldShow);
    }
  };

  return (
    <EventContext.Provider value={[state, dispatch]}>
      <motion.div
        exit='popOut'
        animate='popIn'
        whileHover='scaleIn'
        onMouseEnter={() => toggleRemove(true)}
        onMouseLeave={() => toggleRemove()}
        variants={{
          popIn: {
            rotateX: [120, 60, 0],
            opacity: 1,
            transition: {
              duration: 0.2,
            },
          },
          scaleIn: {
            scale: 1.1,
          },
          popOut: {
            opacity: 0,
            rotateX: 120,
            transition: {
              duration: 0.2,
            },
          },
        }}
        className='px-4 py-4'
        key={props.id}>
        <Card className={`p-3 ${styles['event-card']} shadow`}>
          <RemoveEventComponent ref={removeEventComponentRef} id={props.id} />
          <EventHeader
            imageEntry={props.EventImages}
            title={props.Title}
            authorID={props.AuthorID}
          />
          {state.view === 'EXPANDED' && (
            <EventDescription description={props.Description} />
          )}
          <EventFooter
            eventID={props.id}
            isArchived={props.isArchived}
            startDate={props.StartDate}
            endDate={props.EndDate}
          />
        </Card>
      </motion.div>
    </EventContext.Provider>
  );
};

export default Event;
