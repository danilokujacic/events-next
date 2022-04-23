import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  DoughnutController,
  PolarAreaController,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  DoughnutController,
  PolarAreaController,
  ArcElement,
  RadialLinearScale,
);
import { Bar, Doughnut, PolarArea } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { ChartType } from '../../types/Chart';

const variants = {
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
};

const renderChart = (data: any, type: ChartType) => {
  const additionalOptions =
    type === 'bar'
      ? {
          arc: 3,
        }
      : type === 'polar'
      ? {
          radialLinear: 3,
        }
      : {};
  const chartProps = {
    className: 'events-chart',
    data,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      ...additionalOptions,
    },
  };
  let chart;

  if (type === 'bar') {
    chart = <Bar {...chartProps} />;
  } else if (type === 'doughnut') {
    chart = <Doughnut {...chartProps} />;
  } else {
    chart = <PolarArea {...chartProps} />;
  }

  return (
    <motion.div animate='fadeIn' exit='fadeOut' variants={variants}>
      {chart}
    </motion.div>
  );
};

export default renderChart;
