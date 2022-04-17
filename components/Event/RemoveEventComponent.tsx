import { gql, useMutation } from '@apollo/client';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FunctionComponent,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import useEventList from '../../hooks/useEventsList';
import styles from './Event.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

interface IRemoveEventComponentProps {
  id: string;
}

const deleteEventMutation = gql`
  mutation ($id: ID!) {
    deleteEvent(id: $id) {
      data {
        attributes {
          Title
        }
      }
    }
  }
`;

const RemoveEventComponent: FunctionComponent<IRemoveEventComponentProps> =
  forwardRef(({ id }, ref) => {
    const {
      actions: { deleteEvent: deleteEventSync },
    } = useEventList();
    const [deleteEvent] = useMutation(deleteEventMutation, {
      variables: {
        id,
      },
      onCompleted: () => {
        if (deleteEventSync) {
          deleteEventSync(id);
        }
      },
    });
    const handleRemoveEvent = () => {
      deleteEvent();
    };
    const [showRemove, setShowRemove] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      toggleRemove: (shouldShow = false) => {
        setShowRemove(shouldShow);
      },
    }));

    return (
      <AnimatePresence>
        {showRemove && (
          <motion.button
            animate='fadeIn'
            exit='fadeOut'
            variants={{
              fadeIn: {
                opacity: 1,
              },
              fadeOut: {
                opacity: 0,
              },
            }}
            onClick={handleRemoveEvent}
            className={styles['remove-button']}>
            <FontAwesomeIcon icon={faClose} color='white' />
          </motion.button>
        )}
      </AnimatePresence>
    );
  });

export default RemoveEventComponent;
