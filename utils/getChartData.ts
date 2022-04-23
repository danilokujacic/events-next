import Event from '../interfaces/GraphQL/Event';
import categorizeEvents from './categorizeEvents';

const getChartData = (events: Event[]) => {
  const eventsByCategory = categorizeEvents(events);
  const randomColors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(255, 205, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(201, 203, 207, 0.5)',
  ];
  const randomBorderColors = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
  ];
  return {
    labels: eventsByCategory.map((evByCat) => evByCat.label),
    datasets: [
      {
        data: eventsByCategory.map((evByCat) => evByCat.events.length),
        backgroundColor: eventsByCategory.map((_) => {
          const color = randomColors.pop();
          return color;
        }),
        borderColor: eventsByCategory.map((_) => {
          const color = randomBorderColors.pop();
          return color;
        }),
        borderWidth: 1,
      },
    ],
  };
};

export default getChartData;
