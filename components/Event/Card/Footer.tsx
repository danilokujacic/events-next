import { gql, useMutation } from '@apollo/client';
import moment from 'moment';
import { FunctionComponent, memo, useMemo } from 'react';
import { Button, Card } from 'react-bootstrap';
import measureDateDiffirence from '../../../helpers/measureDateDiffirence';
import useEvent from '../../../hooks/useEvent';
import useEventList from '../../../hooks/useEventsList';
import { EventDate } from '../../../types/Event';
import style from '../Event.module.scss';

interface IEventProps {
  startDate: string;
  isArchived: boolean;
  endDate: string;
  eventID: string;
}

const getEventDates = (startDate: string, endDate: string): EventDate => {
  if (measureDateDiffirence(endDate, Date.now()) >= 0) {
    return 'EVENT_FINISHED';
  } else if (measureDateDiffirence(startDate, Date.now()) >= 0) {
    return 'EVENT_IN_PROGRESS';
  } else {
    return `${measureDateDiffirence(
      Date.now(),
      startDate,
    )} days left untill start`;
  }
};

const renderEventFinishedTemplate = (id: string, updateStatus: Function) => {
  return {
    status: (
      <p className={`fs-6 text-warning fw-bold ${style['info-paragraph']}`}>
        Event finished.
      </p>
    ),
    action: (
      <Button
        onClick={() => updateStatus({ variables: { id } })}
        color='warning'>
        Archive
      </Button>
    ),
  };
};
const renderEventInProgressTemplate = () => {
  return {
    status: (
      <p className={`fs-6 text-primary fw-bold ${style['info-paragraph']}`}>
        Event in progress.
      </p>
    ),
  };
};

const formatDateLabel = (
  type: 'Start' | 'End' = 'Start',
  eventDateType: EventDate,
) => {
  if (eventDateType === 'EVENT_FINISHED') {
    return type + 'ed';
  }
  if (eventDateType === 'EVENT_IN_PROGRESS') {
    return type === 'Start' ? type + 'ed' : type + 'ing';
  } else {
    return type + 'ing';
  }
};

const ARHIVE_MUTATION = gql`
  mutation ($id: ID!) {
    updateEvent(id: $id, data: { isArchived: true }) {
      data {
        attributes {
          isArchived
        }
      }
    }
  }
`;

const EventFooter: FunctionComponent<IEventProps> = ({
  startDate,
  endDate,
  eventID,
  isArchived,
}) => {
  const eventDate = useMemo(
    () => getEventDates(startDate, endDate),
    [startDate, endDate],
  );
  const { actions } = useEventList();
  const [state, eventActions] = useEvent();
  const [updateStatus, { error, loading }] = useMutation(ARHIVE_MUTATION, {
    onCompleted: (response) => {
      if (actions.updateEvent) {
        actions.updateEvent(eventID, response.updateEvent.data.attributes);
      }
    },
  });

  let template: {
    status: JSX.Element;
    action?: JSX.Element;
  };

  if (eventDate === 'EVENT_FINISHED') {
    template = renderEventFinishedTemplate(eventID, updateStatus);
  } else if (eventDate === 'EVENT_IN_PROGRESS') {
    template = renderEventInProgressTemplate();
  } else {
    template = { status: <div>{eventDate}</div> };
  }

  const shouldDisplayAction = !isArchived && template.action;

  return (
    <Card.Footer className={style['event-footer']}>
      {state.view === 'EXPANDED' ? (
        <>
          <div>
            <p className={style['date-info-paragraph']}>
              {formatDateLabel('Start', eventDate)}:&nbsp;
              <span className='text-info'>
                {moment(startDate).format('LLL')}
              </span>
            </p>
            <p className={style['date-info-paragraph']}>
              {formatDateLabel('End', eventDate)}:&nbsp;
              <span className='text-info'>{moment(endDate).format('LLL')}</span>
            </p>
          </div>
          <div className={style['event-status']}>{template.status}</div>
        </>
      ) : (
        <></>
      )}

      <div className={style['event-actions']}>
        <Button
          variant='outline-primary'
          onClick={() => eventActions.toggleView()}>
          {state.view === 'COLLAPSED' ? 'Expand all' : 'Collapse all'}
        </Button>
        {shouldDisplayAction ? template.action : <></>}
      </div>
    </Card.Footer>
  );
};

export default memo(EventFooter);
