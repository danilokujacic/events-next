import {
  forwardRef,
  FunctionComponent,
  useImperativeHandle,
  useState,
} from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';
import { ISnackbarProps } from '../../interfaces/SnackbarProps';
import SnackbarType from '../../types/Snackbar';
import styles from './Snackbar.module.scss';

const toastColors: { [key: string]: string } = {
  INFO: 'bg-primary',
  WARNING: 'bg-warning',
  ERROR: 'bg-danger',
  SUCCESS: styles['snackbar-success'],
};

const SnackbarContainer = forwardRef((props, ref) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [text, setText] = useState<string | JSX.Element>('');
  const [type, setType] = useState<SnackbarType>('INFO');
  const [position, setPosition] = useState<ToastPosition>('bottom-end');

  useImperativeHandle(ref, () => ({
    toggleToast: (options?: ISnackbarProps) => {
      if (options) {
        const { text, position, duration, type } = options;
        setText(text);
        setPosition(position);
        setType(type);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, duration || 3000);
      } else {
        setShowToast(false);
      }
    },
  }));

  return (
    <ToastContainer className='p-3' position={position}>
      <Toast className={toastColors[type]} show={!!showToast}>
        <Toast.Body className={styles['toast-text']}>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
});

export default SnackbarContainer;
