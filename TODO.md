# Radical Minimal Blog Implementation - TODO

## Overview
Transform blackkspydo.com into a radically minimal, blog-first website following the wireframe specs.

**Branch:** feature/radical-minimal-homepage
**References:** /tmp/radical-minimal-wireframe.md, /tmp/boonie-task.md
**Date:** 2026-01-26

## Design Philosophy
- BLOG-FIRST: Posts are the main event, not the author
- Author as metadata: Name is small, unobtrusive
- Zero marketing: No hero, no pitch, no "RECENT POSTS" labels
- Maximum density: 10-15 posts visible immediately
- Inspired by: overreacted.io, macwright.com, jvns.ca

## Core Principle
**The blog posts are the portfolio. The writing is the resume. Everything else is just navigation.**

## Implementation Steps

### 1. Content Generation
- [x] Create feature branch: `feature/radical-minimal-homepage`
- [ ] Generate 10 realistic dummy blog posts about web development
  - Topics: React, TypeScript, Rust, Git, CSS, Debugging, Terminal, PostgreSQL, Docker, Vim
  - Each with realistic title, description, date, and content
  - Follow existing markdown structure in posts/ directory

### 2. Header Component (Minimal)
- [ ] Strip down header to minimal design
  - Site name: small (16-18px), lowercase, left-aligned
  - Nav: about | projects | rss (plain text, right-aligned)
  - Total height: ~40-50px
  - Remove: logo, search, preferences, social icons, menu

### 3. Homepage Redesign
- [ ] Remove hero section completely
- [ ] Remove newsletter section
- [ ] Update +page.svelte to show post list immediately
- [ ] Modify +page.server.ts to load 12 posts instead of 10
- [ ] Create minimal posts list component
  - Post title: Large (24-28px)
  - Metadata: Date + read time only (13-14px, gray)
  - Format: "Dec 15, 2024 • 8 min"
  - Spacing: ~40px between posts
  - No cards, no borders, no shadows
  - No excerpts, no tags
- [ ] Add simple pagination: "← older posts" link

### 4. About Page
- [ ] Create /about route if doesn't exist
- [ ] 3 sentences maximum
- [ ] Social links below (plain text: twitter | github | email)
- [ ] No photo, no resume, no skills list

### 5. Projects Page
- [ ] Create /projects route if doesn't exist
- [ ] Simple list format
- [ ] Project name + one-line description
- [ ] Link to github/demo (plain text)
- [ ] No screenshots, no tech stack badges

### 6. Post Page Template
- [ ] Simplify [slug]/+page.svelte
- [ ] Title: Large (32-36px)
- [ ] Date: Below title, small
- [ ] Content starts immediately
- [ ] Remove: sidebar, TOC, share buttons, related posts, warnings

### 7. Typography & Styling
- [ ] System font stack
- [ ] Line height: 1.6-1.7
- [ ] Max width: 650-700px
- [ ] Background: White or off-white
- [ ] Text: Near-black (#1a1a1a)
- [ ] Links: Blue or accent color
- [ ] Metadata: Light gray (#666 or #888)
- [ ] Remove gradients, shadows, borders

### 8. Cleanup
- [ ] Remove unused components (hero, newsletter, etc.)
- [ ] Remove unused routes (archive, categories, newsletter, drafts)
- [ ] Update global styles for minimal aesthetic
- [ ] Ensure mobile responsiveness (same layout, narrower)

### 9. Testing
- [ ] Test homepage loads quickly
- [ ] Verify 12 posts visible on desktop
- [ ] Test navigation between pages
- [ ] Check mobile responsiveness
- [ ] Verify RSS feed still works

### 10. Commit & Report
- [ ] Commit with clear, descriptive messages
- [ ] Create summary report with:
  - What was built
  - Files created/modified
  - Preview instructions
  - Next steps for PR

## Success Criteria
- Homepage loads in <100ms
- 12+ posts visible without scrolling (desktop)
- Zero hero section
- Clean, readable typography
- Production-ready code

## Files to Modify
- `src/routes/+page.svelte` - Remove hero, show posts
- `src/routes/+page.server.ts` - Load 12 posts
- `src/lib/ui/header/header.svelte` - Minimal header
- `src/lib/ui/posts.svelte` - Minimal post list
- `src/routes/[slug]/+page.svelte` - Minimal post page
- `src/routes/about/+page.svelte` - 3-sentence about
- `src/routes/+layout.svelte` - Minimal layout
- Global styles - Minimal aesthetic

## Files to Create
- `posts/building-minimal-blog-rust/` - Dummy post 1
- `posts/ditched-react-vanilla-js/` - Dummy post 2
- `posts/webassembly-performance/` - Dummy post 3
- `posts/git-worktrees/` - Dummy post 4
- `posts/css-grid-flexbox/` - Dummy post 5
- `posts/debugging-production/` - Dummy post 6
- `posts/terminal-setup-2024/` - Dummy post 7
- `posts/postgresql-optimization/` - Dummy post 8
- `posts/rust-lifetimes/` - Dummy post 9
- `posts/docker-compose-dev/` - Dummy post 10
- `src/routes/projects/+page.svelte` - Projects page
