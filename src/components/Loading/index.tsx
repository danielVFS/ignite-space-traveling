import ReactLoading from 'react-loading';
import Header from '../Header';

import styles from './loading.module.scss';

export function Loading(): JSX.Element {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <ReactLoading type="bubbles" color="#ff57b2" height={650} width={350} />
      </div>
    </>
  );
}
