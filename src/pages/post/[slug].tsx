import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { FaCalendar, FaUser } from 'react-icons/fa';

import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

interface Post {
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
  return (
    <>
      <Head>
        <title>{post.slug} | SpaceTraveling</title>
      </Head>
      <Header />
      <img
        src={post.data.banner.url}
        alt={post.slug}
        className={styles.banner}
      />
      <div className={styles.postContainer}>
        <h2>{post.data.title}</h2>
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
        <main>
          {post.data.content.map(content => {
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

  return {
    paths: [
      { params: { slug: 'typescript-por-tras-do-superset-de-javascript' } },
    ],
    fallback: true,
  };
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
