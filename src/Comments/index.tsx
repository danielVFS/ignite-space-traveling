import { useSession } from 'next-auth/react';
import { SyntheticEvent, useState } from 'react';
import { FiX } from 'react-icons/fi';

import styles from './comments.module.scss';

interface CommentsProps {
  closeComments: (event: SyntheticEvent<Element, Event>) => void;
}

export function Comments({ closeComments }: CommentsProps): JSX.Element {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});

  const { data: session } = useSession();

  return (
    <div className={styles.commentsContainer}>
      <section>
        <header>
          <h3>Comentários (0)</h3>
          <button type="button" onClick={closeComments}>
            <FiX />
          </button>
        </header>
        <main>
          <div className={styles.user}>
            <img src={session.user.image} alt={session.user.name} />
            <p>{session.user.name}</p>
          </div>
          <textarea
            placeholder="Faça um comentário"
            onChange={e => setComment(e.target.value)}
          />

          <div className={styles.buttons}>
            <button type="button" className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="button" className={styles.commentButton}>
              Comentar
            </button>
          </div>

          <div className={styles.comments}>
            {comments && <p>Seja o primeiro a comentar.</p>}
          </div>
        </main>
      </section>
    </div>
  );
}
