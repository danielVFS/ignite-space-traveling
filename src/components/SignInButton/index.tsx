import { FaFacebook } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, useSession, signOut } from 'next-auth/react';

import styles from './signInButton.module.scss';

export function SignInButton(): JSX.Element {
  const { data: session } = useSession();

  return session ? (
    <button
      type="button"
      className={`${styles.signInButton} ${styles.logged}`}
      onClick={() => signOut()}
    >
      <FaFacebook color="#11b85c" />
      {session.user.name ?? 'Usuário'}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={`${styles.signInButton} ${styles.notLogged}`}
      onClick={() => signIn('facebook')}
    >
      <FaFacebook color="#dd9e20" /> Login com Facebook
    </button>
  );
}
