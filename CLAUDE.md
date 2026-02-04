Never use em dashes (—) in any content. Use regular dashes (-) or rewrite the sentence instead.

Do not add Co-Authored-By lines in git commit messages.

## Blog Writing Rules

These rules apply when writing or editing blog posts for this site.

### Tone and Voice

- Write in a direct, practical style. No filler phrases like "In this article, we'll explore..." or "Let's dive in" or "Without further ado."
- Use second person ("you") or neutral voice. Not overly casual, not academic.
- Explain briefly what's coming, then show the code.
- Keep paragraphs short - 1-3 sentences.
- No hype language - avoid "amazing", "powerful", "game-changing", "awesome."
- Never use em dashes. Use regular dashes (-) or rewrite the sentence.

### Post Frontmatter

Every post requires this YAML frontmatter:

```yaml
---
title: 'Post Title'
description: 'Concise description for meta tags and listings'
slug: post-slug-here
published: 'YYYY-MM-DD'
category: javascript
---
```

**Valid categories:** javascript, react, css, general, design, git, next, typescript, svelte, sveltekit

**Optional fields:**
- `series` - for multi-part posts
- `draft` - set to exclude from production

### File Structure

- Posts live in `posts/[slug]/[slug].md`
- The folder name and markdown file name must match the slug exactly
- Images go in `posts/[slug]/images/`

### Post Structure

1. Opening paragraph - state what the post covers and why it matters (1-2 sentences, no filler)
2. Sections with H2 headings
3. Subsections with H3 when needed
4. Code examples after brief explanation text
5. Conclusion or summary section
6. Resources section with reference links to official docs

Do not use H1 headings - the post title is auto-rendered as H1.

### Code Examples

- Always include the language tag on code blocks (```javascript, ```python, etc.)
- Use descriptive variable names in examples
- Show expected output in comments where helpful
- Code block titles are supported: ```javascript title="example.js"
- Use real, working examples - not pseudocode

### Custom Embed Tags

- YouTube: `{% youtube id="VIDEO_ID" title="Title" %}`
- Images: `{% img src="filename.webp" alt="Alt text" %}`
- Video: `{% video src="filename.mp4" %}`
- Embeds/iframes: `{% embed src="URL" title="Title" %}`
- Code tabs: Wrap consecutive code blocks in `{% codetabs %}...{% endcodetabs %}` to create a language switcher. Readers can toggle between languages and the preference persists via localStorage.

### Image Guidelines

- Store images in `posts/[slug]/images/` directory
- Prefer WebP format
- Always include descriptive alt text

### Writing Style

**Avoid:**
- Filler introductions and generic conclusions ("In conclusion, we've learned...")
- Explaining code line-by-line when it's self-evident
- Overly long paragraphs
- Hype adjectives

**Do:**
- Get to the point in the first sentence
- Explain the "why" before the "how"
- Use tables for comparisons
- Include a Resources section with official docs and reference links
- Use horizontal rules (---) to separate major topic shifts
- Number sections when listing techniques or items (e.g., "1.1. Swap Variables")
