import { FunctionComponent, useMemo } from 'react';
import useEventList from '../../hooks/useEventsList';
import ActionItem from './ActionItem';
import styles from './Dashboard.module.scss';
import getActions from '../../utils/getActions';

const ActionMenu: FunctionComponent = () => {
  const { actions } = useEventList();
  if (!actions.filterEvents) {
    return <></>;
  }
  const actionsList = useMemo(() => getActions(actions), []);
  return (
    <div className={styles['navigation-menu']}>
      {actionsList.map((action) => (
        <ActionItem key={action.label} {...action} />
      ))}
    </div>
  );
};

export default ActionMenu;
