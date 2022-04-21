import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  FunctionComponent,
  MouseEventHandler,
  SyntheticEvent,
} from 'react';
import styles from './Dashboard.module.scss';

interface IActionItemProps {
  action: MouseEventHandler<HTMLDivElement>;
  label: string;
  icon: IconProp;
  isSelected: boolean;
}

const ActionItem: FunctionComponent<IActionItemProps> = ({
  action,
  label,
  isSelected,
  icon,
}) => {
  return (
    <div
      role='button'
      onClick={action}
      className={`${styles['action-item']} ${
        isSelected ? styles['selected'] : ''
      }`}>
      <div>
        <FontAwesomeIcon size='2x' icon={icon} />
      </div>
      <span className={styles['action-label']}>{label}</span>
    </div>
  );
};

export default ActionItem;
