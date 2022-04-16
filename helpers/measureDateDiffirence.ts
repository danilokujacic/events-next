import moment from 'moment';

const measureDateDiffirence = (
  firstDate: string | number,
  secondDate: string | number,
  diffType: moment.unitOfTime.Diff = 'days',
) => {
  const momentFirstDate = moment(firstDate);
  const momentSecondDate = moment(secondDate);

  return momentSecondDate.diff(momentFirstDate, diffType);
};

export default measureDateDiffirence;
