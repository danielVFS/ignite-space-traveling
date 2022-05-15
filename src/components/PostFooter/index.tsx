import { BsHeart, BsShare } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import styles from './postFooter.module.scss';

export function PostFooter(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div>
        <button type="button">
          <BsHeart />
        </button>
        <button type="button">
          <GoComment />
        </button>
      </div>

      <div>
        <button type="button">
          <BsShare />
        </button>
      </div>
    </footer>
  );
}
