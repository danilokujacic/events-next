import { FunctionComponent, useRef, useState } from 'react';
import SnackbarContext from '../../helpers/snackBarContext';
import { ISnackbarProps } from '../../interfaces/SnackbarProps';
import SnackbarType from '../../types/Snackbar';
import SnackbarContainer from './SnackbarContainer';

const Snackbar: FunctionComponent = ({ children }) => {
  const snackbarRef = useRef<{ toggleToast: Function } | null>(null);
  const toggleSnackbar = (props: ISnackbarProps) => {
    if (snackbarRef.current) {
      snackbarRef.current.toggleToast(props);
    }
  };

  return (
    <SnackbarContext.Provider value={toggleSnackbar}>
      {children}
      <SnackbarContainer ref={snackbarRef} />
    </SnackbarContext.Provider>
  );
};

export default Snackbar;
