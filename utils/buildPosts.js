import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import unified from 'unified'
import remarkParse from 'remark-parse'
import remarkGFM from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeMinify from 'rehype-preset-minify'

const POSTS_DIRECTORY = join(process.cwd(), 'posts')

export const getPostSlugs = () => fs.readdirSync(POSTS_DIRECTORY)
  .map((post) => post.replace('.md', ''))

export const fetchPost = async (slug) => {
  const post = fs.readFileSync(join(POSTS_DIRECTORY, `${slug}.md`), 'utf8')
  const { data, content } = matter(post)
  const html = await unified()
    .use(remarkParse)
    .use(remarkGFM)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeMinify)
    .process(content)

  // return transformPost({ data, html, slug })
  return {
    slug,
    data,
    html: html.toString(),
  }
}
