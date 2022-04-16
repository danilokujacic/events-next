import { FunctionComponent, useMemo } from 'react';
import ActionItem from '../ActionItem';
import styles from '../Dashboard.module.scss';
import getActions from './getActions';

const ActionMenu: FunctionComponent<{
  actions: { [key: string]: Function };
}> = ({ actions }) => {
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
