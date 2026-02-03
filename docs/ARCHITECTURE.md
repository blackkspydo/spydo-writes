# Architecture Documentation

## Overview

This is a SvelteKit-based blog and content platform called "Joy of Code", focused on web development and design content. The application uses a static site generation (SSG) approach with full prerendering for optimal performance, and is deployed on Vercel.

## Tech Stack

### Core Framework
- **SvelteKit 2.x**: Full-stack framework with SSG capabilities
- **Svelte 5**: Component framework
- **TypeScript**: Type safety throughout the application
- **Vite**: Build tool and dev server

### Content Management
- **Markdown**: Content is authored in Markdown files
- **gray-matter**: Frontmatter parsing
- **unified/remark/rehype**: Markdown processing pipeline
- **Shiki**: Syntax highlighting for code blocks

### UI & Styling
- **Sass**: CSS preprocessor
- **Melt UI**: Accessible component primitives
- **Custom CSS**: Theme system with multiple color schemes

### Search & Features
- **FlexSearch**: Client-side search functionality
- **Web Workers**: Search indexing in background
- **lite-youtube-embed**: Embedded YouTube videos

### Deployment
- **Vercel**: Hosting platform
- **adapter-vercel**: SvelteKit adapter for Vercel deployment

## Project Structure

```
spydo-web-v3/
├── posts/                      # Markdown content files
│   └── [slug]/
│       └── [slug].md          # Post content with frontmatter
├── src/
│   ├── app.html               # HTML template
│   ├── lib/                   # Shared library code
│   │   ├── embed/            # Embeddable components (YouTube)
│   │   ├── icons/            # SVG icon components
│   │   ├── markdown/         # Markdown processing pipeline
│   │   │   ├── index.js     # Markdown preprocessor
│   │   │   └── plugins.js   # Custom rehype plugins
│   │   ├── site/            # Site configuration and utilities
│   │   │   ├── config.ts    # Site metadata and settings
│   │   │   ├── posts.ts     # Post loading and filtering
│   │   │   └── plugins.ts   # Custom plugins
│   │   ├── sfx/             # Sound effects
│   │   ├── types/           # TypeScript type definitions
│   │   ├── ui/              # Reusable UI components
│   │   │   └── header/      # Header with search, menu, preferences
│   │   └── utils/           # Utility functions
│   ├── routes/              # SvelteKit routes
│   │   ├── +layout.svelte          # Root layout
│   │   ├── +layout.server.ts       # Server layout load (prerender enabled)
│   │   ├── +page.svelte            # Homepage
│   │   ├── [slug]/                 # Dynamic post routes
│   │   │   ├── +page.ts           # Load post markdown
│   │   │   ├── +page.svelte       # Post template
│   │   │   ├── toc.svelte         # Table of contents
│   │   │   └── clipboard.svelte   # Code copy functionality
│   │   ├── about/                  # About page
│   │   ├── archive/                # Archive listing
│   │   ├── categories/[category]/  # Category filtering
│   │   ├── drafts/                 # Draft posts
│   │   ├── newsletter/             # Newsletter signup
│   │   ├── api/                    # API endpoints
│   │   │   ├── posts/             # Posts API
│   │   │   ├── search/            # Search API
│   │   │   └── subscribe/         # Newsletter subscription
│   │   ├── rss.xml/               # RSS feed
│   │   └── sitemap.xml/           # Sitemap
│   └── styles/              # Global styles
│       ├── global.css      # Base styles
│       ├── themes.css      # Theme definitions
│       ├── fonts.css       # Font loading
│       ├── code.css        # Code block styling
│       └── post.css        # Post-specific styles
├── static/                  # Static assets
│   ├── assets/             # Images and media
│   ├── fonts/              # Web fonts
│   └── sfx/                # Sound effect files
├── svelte.config.js        # SvelteKit configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies and scripts
```

## Core Features

### 1. Markdown Processing Pipeline

The application features a sophisticated Markdown processing system:

**Location**: `src/lib/markdown/index.js`

**Pipeline Flow**:
1. **Frontmatter Extraction**: Parse YAML frontmatter using gray-matter
2. **Custom Syntax Replacement**: Process custom tags like `{% youtube %}`, `{% img %}`, `{% video %}`
3. **Markdown to AST**: Parse Markdown using remark-parse
4. **Markdown Extensions**: Apply remark plugins (GFM, smartypants, TOC)
5. **HTML Conversion**: Transform to HTML AST using remark-rehype
6. **HTML Enhancement**: Apply rehype plugins (slug, autolinks, code titles, Shiki highlighting)
7. **HTML String Output**: Generate final HTML
8. **Svelte Escaping**: Escape special Svelte characters while preserving components

**Custom Markdown Tags**:
- `{% youtube id="..." title="..." %}`: Embed YouTube videos
- `{% img src="..." alt="..." %}`: Embed images from GitHub
- `{% video src="..." %}`: Embed video files
- `{% embed src="..." title="..." %}`: Embed iframes

### 2. Content Loading

**Location**: `src/lib/site/posts.ts`

Posts are stored in the `posts/` directory with structure:
```
posts/
└── post-slug/
    └── post-slug.md
```

The `getPosts()` function:
- Reads all post directories
- Parses frontmatter from each Markdown file
- Sorts posts by publication date (newest first)
- Filters drafts in production

### 3. Dynamic Routing

**Post Routes**: `src/routes/[slug]/+page.ts`

Posts use SvelteKit's dynamic routing:
1. User visits `/post-slug`
2. `+page.ts` dynamically imports `posts/post-slug/post-slug.md`
3. Markdown preprocessor converts to Svelte component
4. Component renders with layout and post-specific features

### 4. Search Functionality

**Location**: `src/lib/ui/header/search/`

- **FlexSearch**: Lightweight full-text search
- **Web Worker**: `search-worker.ts` handles indexing in background thread
- **Real-time**: Search as you type
- **Index**: Searches post titles and descriptions

### 5. Theme System

**Location**: `src/styles/themes.css`

Features:
- Multiple color themes
- CSS custom properties for theme values
- Dyslexic-friendly font option
- Reading width adjustment
- Preferences stored in localStorage

### 6. Prerendering Strategy

**Configuration**: All routes use `export const prerender = true`

Benefits:
- Static HTML generated at build time
- Zero server-side rendering overhead
- Excellent performance and SEO
- Simple hosting requirements

## Build Process

### Development
```bash
pnpm dev
```
- Vite dev server with hot module replacement
- Markdown files processed on-the-fly
- SvelteKit routing and page generation

### Production Build
```bash
pnpm build
```

Build steps:
1. SvelteKit processes all routes
2. Markdown preprocessor runs on `.md` files
3. All pages prerendered to static HTML
4. Assets optimized and bundled
5. Output to `build/` directory
6. Vercel adapter prepares deployment

## Configuration Files

### `svelte.config.js`
- Registers `.md` files as valid extensions
- Configures preprocessor sequence:
  1. Custom Markdown preprocessor
  2. Vite preprocessor (TypeScript, etc.)
  3. Melt UI preprocessor
- Sets Vercel adapter
- Enables Svelte inspector

### `vite.config.js`
Configures Vite build tool and plugins

### `tsconfig.json`
TypeScript configuration with path aliases:
- `$lib/*`: Maps to `src/lib/*`

## Data Flow

### Post Rendering Flow
```
User Request
    ↓
SvelteKit Router (/[slug])
    ↓
Dynamic Import (posts/[slug]/[slug].md)
    ↓
Markdown Preprocessor
    ↓
Svelte Component (with metadata)
    ↓
Layout Wrapper
    ↓
Rendered HTML
```

### Search Flow
```
User Input
    ↓
Search Component
    ↓
Web Worker (search-worker.ts)
    ↓
FlexSearch Index
    ↓
Results
    ↓
UI Update
```

## Styling Architecture

### CSS Organization
- `reset.css`: Browser resets
- `fonts.css`: Font face declarations
- `global.css`: Base styles and utilities
- `themes.css`: CSS custom properties for theming
- `code.css`: Code block and syntax highlighting
- `post.css`: Post-specific typography and layout

### Theme Variables
Themes define CSS custom properties for:
- Colors (background, text, accent)
- Fonts (regular, dyslexic option)
- Spacing and typography
- Code highlighting colors

## API Endpoints

### `/api/posts`
Returns list of all published posts with metadata

### `/api/search`
Search endpoint (if server-side search is needed)

### `/api/subscribe`
Newsletter subscription via Buttondown API

## External Integrations

### GitHub
- Posts stored in GitHub repository
- Images served from GitHub raw content
- Edit links point to GitHub file editor

### Buttondown
- Newsletter subscription service
- API key in environment variables

### Vercel
- Deployment platform
- Automatic deployments on push
- Edge network CDN

## Performance Optimizations

1. **Prerendering**: All pages generated at build time
2. **Image Loading**: Lazy loading for images
3. **Code Splitting**: Automatic by Vite
4. **Web Workers**: Search indexing in background
5. **Minimal JavaScript**: Most content is static HTML
6. **CSS**: Single stylesheet, no CSS-in-JS runtime
7. **Font Loading**: Optimized font loading strategy

## Development Workflow

1. Create new post in `posts/[slug]/[slug].md`
2. Add frontmatter with metadata
3. Write content in Markdown
4. Preview with `pnpm dev`
5. Build and deploy with `pnpm build`
6. Vercel automatically deploys on git push

## Key Dependencies

### Production
- `@melt-ui/svelte`: Accessible UI primitives
- `flexsearch`: Search functionality
- `gray-matter`: Frontmatter parsing
- `rehype-*`: HTML processing plugins
- `remark-*`: Markdown processing plugins
- `unified`: Processing pipeline orchestration

### Development
- `@sveltejs/kit`: Framework
- `@sveltejs/adapter-vercel`: Deployment adapter
- `@shikijs/rehype`: Syntax highlighting
- `sass`: CSS preprocessing
- `typescript`: Type checking
- `vite`: Build tool
