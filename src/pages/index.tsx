import { GetStaticProps } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { FaCalendar, FaUser } from 'react-icons/fa';

import { PrismicDocument, Query } from '@prismicio/types';
import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  async function loadMorePosts(): Promise<void> {
    const data: Query<PrismicDocument<Record<string, any>, string, string>> =
      await fetch(`${nextPage}`).then(response => response.json());

    setNextPage(data.next_page);

    const newPosts: Post[] = data.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date),
          'dd MMM yyyy',
          { locale: ptBR }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    setPosts(prevPosts => [...prevPosts, ...newPosts]);
  }

  return (
    <div className={styles.postContainer}>
      {posts.map(post => {
        return (
          <div className={styles.post} key={post.uid}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <h2>{post.data.title}</h2>
              </a>
            </Link>
            <p>{post.data.subtitle}</p>
            <div>
              <span>
                <FaCalendar />
                {post.first_publication_date}
              </span>
              <span>
                <FaUser />
                {post.data.author}
              </span>
            </div>
          </div>
        );
      })}
      {nextPage && (
        <button
          type="button"
          className={styles.showMorePostsButton}
          onClick={loadMorePosts}
        >
          Carregar mais posts
        </button>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});

  const postsResponse = await prismic.getByType('post', { pageSize: 5 });

  const posts: Post[] = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        { locale: ptBR }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
