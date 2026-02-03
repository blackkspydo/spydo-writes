import * as config from '$lib/site/config'
import { getPosts } from '$lib/site/posts'

export const prerender = true

export async function GET() {
	const posts = await getPosts()
	const filteredPosts = posts.filter((post) => !post.draft)

	const headers = { 'Content-Type': 'application/xml' }

	const staticPages = [
		{ path: '', priority: '1.0', changefreq: 'weekly' },
		{ path: 'about', priority: '0.8', changefreq: 'monthly' },
		{ path: 'experience', priority: '0.7', changefreq: 'monthly' },
		{ path: 'projects', priority: '0.7', changefreq: 'monthly' },
	]

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${config.siteUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${filteredPosts
	.map(
		(post) => `  <url>
    <loc>${config.siteUrl}${post.slug}</loc>
    <lastmod>${new Date(post.published).toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`
	)
	.join('\n')}
</urlset>`

	return new Response(sitemap, { headers })
}
