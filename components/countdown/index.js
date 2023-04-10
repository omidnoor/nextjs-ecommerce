import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

import { calculateDiffSMHD, decrementSec } from "@/utils/countdown";

const defaultRemainingTime = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
};

export default function Countdown({ date }) {
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => setTimeInMs(date.getTime()), [date]);

  const updateRemainingTime = () => {
    const currentTimeInMs = new Date().getTime();
    setRemainingTime(calculateDiffSMHD(timeInMs - currentTimeInMs));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   console.log(remainingTime);
  // }, [remainingTime]);

  return (
    <div className={styles.countdown}>
      <span>{Math.floor(remainingTime.days / 10)}</span>
      <span>{remainingTime.days % 10}</span>
      <b>:</b>
      <span>{Math.floor(remainingTime.hours / 10)}</span>
      <span>{remainingTime.hours % 10}</span>
      <b>:</b>
      <span>{Math.floor(remainingTime.minutes / 10)}</span>
      <span>{remainingTime.minutes % 10}</span>
      <b>:</b>
      <span>{Math.floor(remainingTime.seconds / 10)}</span>
      <span>{remainingTime.seconds % 10}</span>
    </div>
  );
}
