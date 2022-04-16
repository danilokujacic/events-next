import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FunctionComponent, MouseEventHandler, SyntheticEvent } from 'react';
import styles from './Dashboard.module.scss';

const ActionItem: FunctionComponent<{
  action: MouseEventHandler<HTMLDivElement>;
  label: string;
  icon: IconProp;
}> = ({ action, label, icon }) => {
  return (
    <div
      role='button'
      onClick={action}
      className={styles['action-item']}>
      <div>
        <FontAwesomeIcon size='2x' icon={icon} />
      </div>
      <span className={styles['action-label']}>{label}</span>
    </div>
  );
};

export default ActionItem;
