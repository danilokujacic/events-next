import { createContext } from 'react';
import { ISnackbarProps } from '../interfaces/SnackbarProps';

const snackbarFunction = (props: ISnackbarProps): void => {};

const SnackbarContext = createContext(snackbarFunction);

export default SnackbarContext;
