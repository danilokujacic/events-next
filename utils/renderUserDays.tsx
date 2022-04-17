import measureDateDiffirence from '../helpers/measureDateDiffirence';

const renderUserDays = (lastLogin: string | number): JSX.Element => {
  const daysDiff = measureDateDiffirence(lastLogin, Date.now(), 'days');

  if (daysDiff === 0) {
    return <>&nbsp; today</>;
  }
  if (daysDiff === 1) {
    return <>&nbsp; a day ago</>;
  }

  return <>&nbsp; {daysDiff} days ago</>;
};

export default renderUserDays;
