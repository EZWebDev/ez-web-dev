import { blogPosts, type BlogPost } from '../blogPosts'

/** BlogPost plus the optional fields the content agent is adding; read defensively. */
export type BlogPostMeta = BlogPost & { updated?: string; image?: string }

export const DEFAULT_POST_IMAGE = '/og-image.png'

export const postModified = (p: BlogPostMeta): string => p.updated || p.date
export const postImage = (p: BlogPostMeta): string => p.image || DEFAULT_POST_IMAGE

/** Newest first (by publish date, then by last update, then title). */
export function sortedPosts(): BlogPostMeta[] {
  return [...(blogPosts as BlogPostMeta[])].sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      postModified(b).localeCompare(postModified(a)) ||
      a.title.localeCompare(b.title),
  )
}

export const getPost = (slug: string): BlogPostMeta | undefined =>
  (blogPosts as BlogPostMeta[]).find((p) => p.slug === slug)
