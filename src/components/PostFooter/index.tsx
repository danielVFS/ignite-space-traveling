import { SyntheticEvent, useState } from 'react';
import { BsHeart, BsShare } from 'react-icons/bs';
import { GoComment } from 'react-icons/go';
import { Comments } from '../../Comments';

import styles from './postFooter.module.scss';

export function PostFooter(): JSX.Element {
  const [commentsVisible, setCommentsVisible] = useState(false);

  function handleOpenCommentsMenu(event: SyntheticEvent): void {
    event.preventDefault();

    setCommentsVisible(v => !v);
  }

  return (
    <footer className={styles.footer}>
      <div>
        <button type="button">
          <BsHeart />
        </button>
        <button
          type="button"
          onClick={handleOpenCommentsMenu}
          aria-label="Open or close comments"
        >
          <GoComment />
        </button>
      </div>

      <div>
        <button type="button">
          <BsShare />
        </button>
      </div>

      <div
        className={`${styles.commentsWrapper} ${
          commentsVisible ? styles.showComments : styles.hiddenComments
        }`}
        aria-hidden={!commentsVisible}
      >
        <Comments closeComments={handleOpenCommentsMenu} />
      </div>
    </footer>
  );
}
