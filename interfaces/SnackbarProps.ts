import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';
import SnackbarType from '../types/Snackbar';

export interface ISnackbarProps {
  duration?: 3000;
  type: SnackbarType;
  position: ToastPosition;
  text: string | JSX.Element;
}
