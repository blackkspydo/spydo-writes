<script lang="ts">
	import * as config from '$lib/site/config'
	import type { Post } from '$lib/types'

	let { data } = $props()

	const { posts } = data

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	}

	function calculateReadTime(content: string): number {
		const wordsPerMinute = 200
		const words = content.trim().split(/\s+/).length
		return Math.ceil(words / wordsPerMinute)
	}
</script>

<svelte:head>
	<title>{config.siteTitle}</title>

	<meta content={config.siteDescription} name="description" />

	<meta content={config.siteTitle} property="og:title" />
	<meta content={config.siteImage} property="og:image" />
	<meta content={config.siteUrl} property="og:url" />
	<meta content={config.siteDescription} property="og:description" />
	<meta content={config.siteName} property="og:site_name" />

	<meta content={config.twitterHandle} name="twitter:creator" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content={config.siteTitle} name="twitter:title" />
	<meta content={config.siteDescription} name="twitter:description" />
	<meta content={config.siteImage} name="twitter:image" />
</svelte:head>

<main>
	<section class="about">
		<p>
			<strong>Kishor Upadhyaya</strong> — Software engineer from Kathmandu, Nepal. I build scalable web apps and care about frontend architecture, performance, and developer experience.
		</p>
	</section>

	<div class="posts-list">
		{#each posts as post, i}
			<article class="post-item">
				<a href="/{post.slug}" class="post-link">
					<h2 class="post-title" style="--gradient-index: {i};">{post.title}</h2>
					<div class="post-meta">
						{formatDate(post.published)} • {calculateReadTime(post.description)} min read
					</div>
					<p class="post-description">{post.description}</p>
				</a>
			</article>
		{/each}
	</div>
</main>

<style>
	main {
		max-width: 700px;
		margin: 0 auto;
		padding: var(--spacing-32) var(--spacing-16) var(--spacing-48);
	}

	.about {
		background: var(--clr-card-bg);
		color: var(--clr-card-txt);
		padding: var(--spacing-24) var(--spacing-32);
		border-radius: var(--rounded-20);
		margin-bottom: var(--spacing-48);
		line-height: 1.7;
	}

	.about p {
		margin: 0;
		font-size: 16px;
	}

	.about strong {
		color: var(--clr-primary);
		font-weight: 600;
	}

	.posts-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-32);
	}

	.post-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-12);
	}

	.post-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}

	.post-title {
		font-size: clamp(24px, 3vw, 28px);
		font-weight: 600;
		line-height: 1.3;
		margin: 0;
		margin-bottom: 4px;
		color: hsl(
			calc(220 - (var(--gradient-index) * 8)),
			45%,
			75%
		);
	}

	.post-description {
		font-size: 16px;
		line-height: 1.6;
		color: var(--clr-txt-muted, #666);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.post-link:hover .post-title {
		text-decoration: underline;
	}

	.post-meta {
		font-size: 13px;
		color: var(--clr-txt-muted, #666);
		margin-bottom: 8px;
	}

	a::before {
		content: none;
	}
</style>
