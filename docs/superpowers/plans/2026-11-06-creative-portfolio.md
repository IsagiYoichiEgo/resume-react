# Creative client portfolio implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Publish a distinctive dark client portfolio with a generated animated cat and honest, usable examples of the owner's work.
**Architecture:** Retain React/TypeScript/Vite and GitHub Pages. Focused content/components; CSS 3D and one requestAnimationFrame scroll loop, native dialog, generated raster mascot with transparent walk frames.
**Tech Stack:** React 19, TypeScript, Vite 7, CSS, Node native tests.
**Spec:** ../specs/2026-11-06-creative-portfolio-design.md (approved by user).

## Global constraints
- User approved dark 3D/glow direction and generated cream/charcoal cat.
- No programming skill levels, Junior, fake clients, testimonials, unverified project features or dead demo buttons.
- BookStore is local coursework; Ai Huda is in development. music and ads-board-react- are educational published examples, not paid client work.
- Preserve real phone, WhatsApp, GitHub and correct /resume-react/ base path.
- Keep mascot in viewport, respect reduced motion, keyboard access and 390px layout.
- User explicitly expanded scope to polishing music and ads demos; independent agents own separate clones, root verifies/integrates them. Their visual changes do not modify the shared API or create live data.

## Review focus
- Short documents and narrow viewports: no division by zero or offscreen pet.
- Scrolling upward/downward and resizing: bounded pet coordinates, no stale animation frame/timer/listener.
- Reduced motion and hidden mascot: stop motion, readable page, restore control remains accessible.
- Long project text/mobile: no horizontal page overflow or occluded contact CTA.
- Dialog/links: Escape/backdrop/focus return work; only verified demo URLs have open-site links.

### Task 1: Source baseline, assets and motion contract
Files: package.json, src/lib/motion.ts, tests/motion.test.mjs, public/assets/cat-*.png.
Interfaces: scrollProgress(scrollY, documentHeight, viewportHeight): number; petPosition(progress, viewportWidth, petWidth, inset): number; canShowBubble(now,lastAt,lastSection,nextSection): boolean.
- [ ] npm ci and baseline npm run build.
- [ ] Add meaningful failing native tests for finite clamped scroll progress, bounded cat coordinates across mobile/short pages, and bubble cooldown/section repetition.
- [ ] Implement the motion helpers, watch tests pass. Generate and inspect walk sprite preserving the approved cat; copy assets to public/assets with traceable prompt file.

### Task 2: Client content and main layout
Files: src/data/resume.ts, App.tsx, Header.tsx, Hero.tsx, Projects.tsx, ProjectVisual.tsx, ProjectDialog.tsx, Contact.tsx, styles.css, index.html.
- [ ] Replace recruiting/skills/philosophical copy with direct client content and four factual project records.
- [ ] Build the distinctive dark header/hero scene, project covers and clear site/source/detail actions, compact about and contact.
- [ ] Preserve and check dialog focus/Escape and phone-copy behavior; keep no false/demo links for local projects.
- [ ] Run typecheck/build and browser navigation/dialog checks.

### Task 3: Persistent cat and scroll scene
Files: src/components/Mascot.tsx, src/lib/usePageMotion.ts (or colocated focused effect), styles.css.
- [ ] Wire the tested motion contract into one RAF loop; cleanup RAF, timers and listeners.
- [ ] Animate real walk phases on scroll, idle on stop, face travel direction, keep position clamped on resize.
- [ ] Add small contextual bubbles with cooldown, explicit pet reaction, hide/restore and reduced-motion behavior.
- [ ] Browser test desktop and mobile, keyboard and motion-off state; run native tests and build.

### Task 4: Review, integration and delivery
- [ ] Fresh independent code review of portfolio; fix material findings and run relevant proof.
- [ ] Review agents' music/ads diffs and their tests/builds; spot-check browser layouts and APIs read-only.
- [ ] Commit source, update the three authorized repositories and trigger their existing Pages publication paths.
- [ ] Verify actual deployment results and open published pages; report exact links and any material verification limit.

Execution method: root implements portfolio inline; two independent agents polish the separately authorized example sites. The user delegated routine choices and explicitly approved implementation; no additional plan handoff approval is needed.
