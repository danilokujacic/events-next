import { FunctionComponent, useMemo, useState } from 'react';
import useEventList from '../../hooks/useEventsList';
import ActionItem from './ActionItem';
import styles from './Dashboard.module.scss';
import getActions from '../../utils/getActions';

const ActionMenu: FunctionComponent = () => {
  const { actions } = useEventList();
  const [selected, setSelected] = useState<string>('All');
  if (!actions.filterEvents) {
    return <></>;
  }
  const actionsList = useMemo(() => getActions(actions), []);

  const selectFilter = (action: Function, label: string) => {
    return () => {
      setSelected(label);
      action();
    };
  };

  return (
    <div className={styles['navigation-menu']}>
      {actionsList.map(({ label, action, icon }) => (
        <ActionItem
          key={label}
          action={selectFilter(action, label)}
          icon={icon}
          label={label}
          isSelected={selected === label}
        />
      ))}
    </div>
  );
};

export default ActionMenu;
