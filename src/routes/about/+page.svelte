<script lang="ts">
	import * as config from '$lib/site/config'
</script>

<svelte:head>
	<title>About - {config.siteTitle}</title>
</svelte:head>

<main>
	<article class="content">
		<h1>About</h1>
		
		<p>
			Hi, I'm Kishor Upadhyaya, a software engineer from Kathmandu, Nepal. I build scalable 
			web applications and mobile apps with a focus on frontend architectures and performance.
		</p>

		<p>
			Currently working at <strong>eCourts India</strong> in Delhi, where I built the entire 
			frontend and React Native mobile apps for a legal research platform serving 400K+ monthly 
			active users across India. I also developed .NET ETL pipelines processing 190M+ case records 
			from 29K courts.
		</p>

		<p>
			I specialize in React, TypeScript, and SvelteKit. I enjoy writing about web development, 
			sharing what I learn, and building tools for developers.
		</p>

		<h2>What I Do</h2>
		<ul>
			<li>Frontend development with React, React Native, and SvelteKit</li>
			<li>Building scalable web applications and mobile apps</li>
			<li>Writing about web development and developer tools</li>
			<li>Contributing to open source projects</li>
		</ul>

		<h2>Community</h2>
		<ul>
			<li>Moderator at <strong>Askbuddie</strong> community (30K+ IT enthusiasts)</li>
			<li>Technical writer on Medium, DEV Community, and personal blog</li>
			<li>Open source contributor</li>
		</ul>

		<h2>Links</h2>
		<ul>
			<li><a href="https://github.com/blackkspydo" target="_blank" rel="noopener">GitHub</a></li>
			<li><a href="https://linkedin.com/in/blackkspydo" target="_blank" rel="noopener">LinkedIn</a></li>
			<li><a href="mailto:work@blackkspydo.com">Email</a></li>
			<li><a href="https://t.me/blackkspydo" target="_blank" rel="noopener">Telegram</a></li>
		</ul>
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

	h2 {
		font-size: clamp(20px, 3vw, 24px);
		font-weight: 600;
		margin-top: var(--spacing-48);
		margin-bottom: var(--spacing-16);
		color: var(--clr-primary);
	}

	p {
		margin-bottom: var(--spacing-24);
		font-size: 16px;
		color: var(--clr-txt);
	}

	ul {
		margin-bottom: var(--spacing-24);
		padding-left: var(--spacing-24);
	}

	li {
		margin-bottom: var(--spacing-8);
		font-size: 16px;
	}

	a {
		color: var(--clr-primary);
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	strong {
		font-weight: 600;
		color: var(--clr-primary);
	}
</style>
