import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { useState } from 'react';
import { FaCalendar, FaUser, FaRegClock } from 'react-icons/fa';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Header from '../../components/Header';
import { Loading } from '../../components/Loading';

import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

export interface Post {
  slug: string;
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const [formattedPost, setFormattedPost] = useState({
    ...post,
    first_publication_date: format(
      new Date(post.first_publication_date),
      'dd MMM yyyy',
      { locale: ptBR }
    ),
  });

  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{formattedPost.slug} | SpaceTraveling</title>
      </Head>
      <Header />
      <img
        src={formattedPost.data.banner.url}
        alt={formattedPost.slug}
        className={styles.banner}
      />
      <div className={styles.postContainer}>
        <h2>{formattedPost.data.title}</h2>
        <div>
          <span>
            <FaCalendar />
            {formattedPost.first_publication_date}
          </span>
          <span>
            <FaUser />
            {formattedPost.data.author}
          </span>
          <span>
            <FaRegClock />4 min
          </span>
        </div>
        <main>
          {formattedPost.data.content.map(content => {
            return (
              <article key={content.heading.slice(4, 10)}>
                <h3>{content.heading}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </article>
            );
          })}
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});

  const postsResponse = await prismic.getByType('post', { pageSize: 5 });

  const paths = postsResponse.results.map(post => ({
    params: { slug: post.uid },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});

  const response = await prismic.getByUID('post', String(slug));

  const post: Post = {
    slug: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
  };
};
