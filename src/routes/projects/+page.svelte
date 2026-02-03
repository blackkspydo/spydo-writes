<script lang="ts">
	import * as config from '$lib/site/config'
</script>

<svelte:head>
	<title>Projects - {config.siteTitle}</title>
</svelte:head>

<main>
	<article class="content">
		<h1>Projects</h1>

		<div class="projects-list">
			<div class="project">
				<h2>openapi-mcp</h2>
				<p>MCP server for Claude and Cursor. Inspect OpenAPI specs, generate TypeScript types, validate payloads.</p>
				<a href="https://github.com/blackkspydo/openapi-mcp" target="_blank" rel="noopener">github →</a>
			</div>

			<div class="project">
				<h2>Bikram Sambat</h2>
				<p>Date manipulation library for the Nepali calendar system.</p>
				<a href="https://github.com/blackkspydo/bikram-sambat" target="_blank" rel="noopener">github →</a>
			</div>
		</div>
	</article>
</main>

<style>
	main {
		max-width: 700px;
		margin: 0 auto;
		padding: var(--spacing-32) var(--spacing-16) var(--spacing-64);
	}

	.content {
		line-height: 1.7;
	}

	h1 {
		font-size: clamp(28px, 4vw, 36px);
		font-weight: 700;
		margin-bottom: var(--spacing-32);
		color: var(--clr-primary);
	}

	.projects-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-32);
	}

	.project {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-8);
	}

	h2 {
		font-size: 18px;
		font-weight: 600;
		margin: 0;
		color: var(--clr-primary);
	}

	p {
		font-size: 15px;
		color: var(--clr-txt);
		margin: 0;
		line-height: 1.6;
	}

	a {
		font-size: 14px;
		color: var(--clr-txt-muted, #666);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
