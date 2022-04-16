import { FunctionComponent, useReducer } from 'react';
import { Card } from 'react-bootstrap';
import styles from './Event.module.scss';
import EventFooter from './Footer';
import EventDescription from './Description';
import { eventReducer, eventReducerInitializer } from './reducer';
import { EventContext } from './Utils/context';
import EventHeader from './Header';
import { initialState } from './reducer/reducer';
import Event from '../../interfaces/GraphQL/Event';

const Event: FunctionComponent<Event & { id: string }> = (props) => {
  const [state, dispatch] = useReducer(
    eventReducer,
    { ...initialState, id: props.id },
    eventReducerInitializer,
  );

  return (
    <EventContext.Provider value={[state, dispatch]}>
      <Card className={`p-3 ${styles['event-card']} shadow`}>
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
    </EventContext.Provider>
  );
};

export default Event;
