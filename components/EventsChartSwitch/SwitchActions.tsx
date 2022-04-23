import { FunctionComponent, useState } from 'react';
import { ChartType } from '../../types/Chart';
import { motion } from 'framer-motion';
import styles from './EventsChartSwitch.module.scss';

interface ISwitchActionsProps {
  handleChartsSwitch: (type: ChartType) => void;
}

const SwitchActions: FunctionComponent<ISwitchActionsProps> = ({
  handleChartsSwitch,
}) => {
  const [selected, setSelected] = useState('Bar');
  const switchActions = [
    {
      label: 'Bar',
      action: () => handleChartsSwitch('bar'),
    },
    {
      label: 'Dougnut',
      action: () => handleChartsSwitch('doughnut'),
    },
    {
      label: 'Polar',
      action: () => handleChartsSwitch('polar'),
    },
  ];

  return (
    <nav>
      <ul className={`${styles.list} d-flex`}>
        {switchActions.map((item) => (
          <li
            key={item.label}
            className={`${styles.item} ${
              item.label === selected ? styles.active : ''
            }`}
            onClick={() => {
              item.action();
              setSelected(item.label);
            }}>
            {item.label}
            {item.label === selected ? (
              <motion.div className={styles.underline} layoutId='underline' />
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SwitchActions;
