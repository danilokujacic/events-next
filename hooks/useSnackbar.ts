import { useContext } from 'react';
import SnackbarContext from '../helpers/snackBarContext';

const useSnackbar = () => {
  const toggleToast = useContext(SnackbarContext);

  if (!toggleToast) {
    throw Error(
      "You haven't call hook inside " +
        SnackbarContext.displayName +
        ' provider',
    );
  }
  return toggleToast;
};

export default useSnackbar;
