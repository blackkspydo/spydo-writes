# blackkspydo.com

Personal blog and portfolio. Writing about web development and developer tools.

Built with [SvelteKit](https://kit.svelte.dev/) and hosted on [Vercel](https://vercel.com/).

## Setup

Requires [pnpm](https://pnpm.io/).

```sh
git clone https://github.com/blackkspydo/spydo-web-v3.git
cd spydo-web-v3
pnpm i
pnpm run dev
```

## Writing Posts

Posts live in the `posts/` directory. Each post is a folder containing a markdown file with the same name:

```
posts/
  my-post-slug/
    my-post-slug.md
```

Frontmatter format:

```yaml
---
title: 'Post Title'
description: 'Short description'
slug: my-post-slug
published: '2026-02-04'
category: javascript
---
```

## Stack

- SvelteKit 2 / Svelte 5
- Markdown with remark/rehype pipeline
- Shiki for syntax highlighting
- FlexSearch for client-side search
- Vercel adapter for deployment
