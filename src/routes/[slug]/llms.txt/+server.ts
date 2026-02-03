import { getPosts, getPostContent } from '$lib/site/posts.js'
import * as config from '$lib/site/config'

export const prerender = true

export async function entries() {
	const posts = await getPosts()
	return posts.filter((post) => !post.draft).map((post) => ({ slug: post.slug }))
}

export async function GET({ params }) {
	const posts = await getPosts()
	const post = posts.find((p) => p.slug === params.slug)

	if (!post) {
		return new Response('Post not found', { status: 404 })
	}

	const content = await getPostContent(params.slug)

	const text = [
		`# ${post.title}`,
		'',
		`> ${post.description}`,
		'',
		`Published: ${post.published}`,
		`Category: ${post.category}`,
		`URL: ${config.siteUrl}${post.slug}`,
		'',
		'---',
		'',
		content,
	].join('\n')

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	})
}
