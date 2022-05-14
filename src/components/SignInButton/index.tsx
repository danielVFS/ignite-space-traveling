import { FaFacebook } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './signInButton.module.scss';

export function SignInButton(): JSX.Element {
  const session = true;

  return session ? (
    <button type="button" className={`${styles.signInButton} ${styles.logged}`}>
      <FaFacebook color="#11b85c" />
      Daniel Vitor
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={`${styles.signInButton} ${styles.notLogged}`}
    >
      <FaFacebook color="#dd9e20" /> Sign in with Github
    </button>
  );
}
