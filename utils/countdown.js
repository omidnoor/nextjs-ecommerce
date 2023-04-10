export function calculateDiffSMHD(diffTimeInMs) {
  const secondsInMillisecond = 1000;
  const minutesInMillisecond = secondsInMillisecond * 60;
  const hoursInMillisecond = minutesInMillisecond * 60;
  const daysInMillisecond = hoursInMillisecond * 24;

  const days = Math.floor(diffTimeInMs / daysInMillisecond);
  const hours = Math.floor(
    (diffTimeInMs % daysInMillisecond) / hoursInMillisecond,
  );
  const minutes = Math.floor(
    (diffTimeInMs % hoursInMillisecond) / minutesInMillisecond,
  );
  const seconds = Math.floor(
    (diffTimeInMs % minutesInMillisecond) / secondsInMillisecond,
  );

  return {
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    days: days,
  };
}

export function decrementSec(timeInMs) {
  return timeInMs - 1000;
}
