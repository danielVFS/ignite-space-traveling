import Image from 'next/image';
import Link from 'next/link';

import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <a>
          <Image src="/images/Logo.svg" alt="logo" width={240} height={30} />
        </a>
      </Link>
    </header>
  );
}
