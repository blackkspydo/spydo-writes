<header>
	<div class="container">
		<a href="/" class="site-name">blackkspydo</a>

		<a href="/about" class="author">
			<span>by</span>
			<img src="/me-yellow.png" alt="Kishor Upadhyaya" />
		</a>
	</div>
</header>

<style>
	header {
		max-width: 700px;
		margin: 0 auto;
		padding: var(--spacing-24) var(--spacing-16);
		margin-bottom: var(--spacing-16);
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.site-name {
		font-size: 16px;
		color: var(--clr-primary);
		text-decoration: none;
		font-weight: 600;
	}

	.site-name::before {
		content: none;
	}

	.author {
		display: flex;
		align-items: center;
		gap: var(--spacing-8);
		text-decoration: none;
	}

	.author::before {
		content: none;
	}

	.author span {
		font-size: 14px;
		font-style: italic;
		color: var(--clr-txt-muted, #666);
	}

	.author img {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		object-fit: cover;
	}
</style>
