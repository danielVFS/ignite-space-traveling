import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Post } from '../pages';

export function formatData(posts: Post[]): Post[] {
  const formattedPost = posts.map(post =>
    post.first_publication_date
      ? {
          ...post,
          first_publication_date: format(
            new Date(post.first_publication_date),
            'dd MMM yyyy',
            { locale: ptBR }
          ),
        }
      : post
  );
  return formattedPost;
}
