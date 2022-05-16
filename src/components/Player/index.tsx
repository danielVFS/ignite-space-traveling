import { FaPlayCircle } from 'react-icons/fa';

import styles from './player.module.scss';

export function Player(): JSX.Element {
  return (
    <div className={styles.player}>
      <button type="button" title="Escutar post">
        <FaPlayCircle />
      </button>
    </div>
  );
}
