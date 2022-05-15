import { SyntheticEvent } from 'react';
import { FiX } from 'react-icons/fi';
import styles from './comments.module.scss';

interface CommentsProps {
  closeComments: (event: SyntheticEvent<Element, Event>) => void;
}

export function Comments({ closeComments }: CommentsProps): JSX.Element {
  return (
    <div className={styles.container}>
      <header>
        <h3>Comentários</h3>

        <button type="button" onClick={closeComments}>
          <FiX />
        </button>
      </header>
    </div>
  );
}
