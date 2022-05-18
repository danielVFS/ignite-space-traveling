import { useEffect, useState } from 'react';
import styles from './readTime.module.scss';

interface ReadTimeProps {
  loaded: boolean;
}

let totalSeconds = 0;

export function ReadTime({ loaded }: ReadTimeProps): JSX.Element {
  const [displayTime, setDisplayTime] = useState('00:00');

  const pad = (val: string): string => {
    if (val.length < 2) {
      return `0${val}`;
    }
    return val;
  };

  useEffect(() => {
    if (loaded) {
      const timer = setInterval(() => {
        totalSeconds += 1;

        const minutes = `${parseInt(`${totalSeconds / 60}`, 10)}`;
        const seconds = `${parseInt(`${totalSeconds % 60}`, 10)}`;
        setDisplayTime(`${pad(minutes)}:${pad(seconds)}`);
      }, 1000);
      return () => clearInterval(timer);
    }
    setDisplayTime('00:00');
    totalSeconds = 0;
  }, [loaded]);

  return (
    <div
      className={`${styles.read_spectrum_container} ${
        loaded ? `${styles.open}` : `${styles.closed}`
      }`}
    >
      <div className="player_container">
        <p>{displayTime}</p>
      </div>
    </div>
  );
}
