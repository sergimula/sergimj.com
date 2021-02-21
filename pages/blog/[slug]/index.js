import Head from 'next/head'

import { getPostSlugs, fetchPost } from '../../../utils/buildPosts'

const BlogPost = (props) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>
          {props.post.data.title}
        </h1>
        <div dangerouslySetInnerHTML={{
          __html: props.post.html
        }}>
        </div>
      </main>
    </div>
  )
}

export const getStaticPaths = () => ({
  paths: getPostSlugs().map((slug) => ({ params: { slug } })),
  fallback: false
})

export const getStaticProps = async ({ params }) => {
  const post = await fetchPost(params.slug)

  console.log(post, params);

  return {
    props: {
      post
    }
  }
}

export default BlogPost;
