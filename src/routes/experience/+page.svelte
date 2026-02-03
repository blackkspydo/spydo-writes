<script lang="ts">
	import * as config from '$lib/site/config'
</script>

<svelte:head>
	<title>Experience - {config.siteTitle}</title>
</svelte:head>

<main>
	<article class="content">
		<h1>Experience</h1>
		
		<div class="timeline">
			<div class="job">
				<h2>Software Engineer</h2>
				<p class="meta">eCourts India · June 2025 - Present</p>
				<p>Building legal tech serving 400K+ users across India.</p>
			</div>

			<div class="job">
				<h2>Software Engineer</h2>
				<p class="meta">89Transfers · Dec 2022 - May 2025</p>
				<p>Led frontend for a trip booking platform.</p>
			</div>

			<div class="job">
				<h2>Frontend Engineer</h2>
				<p class="meta">Grambell · Sept 2021 - Apr 2023</p>
				<p>Built dashboards and optimized performance.</p>
			</div>

			<div class="job">
				<h2>Junior Frontend Engineer</h2>
				<p class="meta">DRCFS · Nov 2021 - Apr 2022</p>
				<p>Student portal development.</p>
			</div>

			<div class="job">
				<h2>Frontend Developer</h2>
				<p class="meta">Nepali Things · Mar 2021 - Aug 2021</p>
				<p>Community platform development.</p>
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

	.timeline {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-32);
	}

	.job {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	h2 {
		font-size: 18px;
		font-weight: 600;
		margin: 0;
		color: var(--clr-primary);
	}

	.meta {
		font-size: 14px;
		color: var(--clr-txt-muted, #666);
		margin: 0;
	}

	p {
		font-size: 15px;
		color: var(--clr-txt);
		margin: 0;
	}
</style>
