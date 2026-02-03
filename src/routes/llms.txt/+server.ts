import { getPosts } from '$lib/site/posts.js'
import * as config from '$lib/site/config'

export const prerender = true

export async function GET() {
	const posts = await getPosts()

	const text = [
		`# ${config.siteName}`,
		`> ${config.siteDescription}`,
		'',
		`URL: ${config.siteUrl}`,
		'',
		'## Posts',
		'',
		...posts
			.filter((post) => !post.draft)
			.map(
				(post) =>
					`- [${post.title}](${config.siteUrl}${post.slug}/llms.txt) - ${post.published}: ${post.description}`
			),
	].join('\n')

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	})
}
