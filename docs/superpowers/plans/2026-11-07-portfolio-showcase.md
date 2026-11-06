# Portfolio showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the existing client portfolio visibly stronger with an interactive real-project showcase.
**Architecture:** React components and scoped CSS, local WebP screenshots, existing motion/cat helpers. No new runtime dependencies.
**Tech Stack:** React, TypeScript, Vite, CSS 3D.
**Spec:** docs/superpowers/specs/2026-11-07-portfolio-showcase-design.md

## Global constraints
- Existing contact links, project truth/status, GitHub Pages address retained.
- No live API mutations, fake clients, metrics, price promises or unpublished demos.
- Keyboard navigation, reduced motion and 320px viewport supported.

## Review focus
- Switching a hero preview must change image, label and destination together. Verify both by keyboard and browser.
- Small screens must retain all actions with no horizontal overflow. Check 320/390/800/desktop.
- Cat/bubbles must avoid new preview controls. Inspect main controls at relevant scroll positions.
- Motion preferences must preserve layout and visible content. Inspect reduced-motion rules and existing regression tests.
- Project cover actions must preserve dialog close/focus behavior without nested controls. Verify Escape and focus restore.

### Task 1 — Interactive showcase
Files: public/assets/*-preview.webp, src/components/Hero.tsx, new Showcase.tsx/showcase.css, src/styles.css.
- [ ] Encode the two verified screenshots as local WebP.
- [ ] Implement two explicit project selectors, a 3D browser composition and matching live-site action; no autoplay.
- [ ] Refine first-screen scale, spacing, entry and responsive layout.
- [ ] Build/typecheck and browser-check both selectors and mobile boundaries.

### Task 2 — Project presentation and collaboration
Files: Projects.tsx, ProjectVisual.tsx, new Workflow.tsx/workflow.css, App.tsx, styles.css.
- [ ] Use real device/screenshot covers for published work, preserve concept covers for unpublished work.
- [ ] Make covers keyboard-accessible details buttons; retain native dialog and return-focus behavior.
- [ ] Add concise three-step collaboration strip; refine contact/footer transitions.
- [ ] Browser-check project links, dialogs and cat collision near new controls.

### Task 3 — Verify and publish
- [ ] Run existing npm test, npm run build and git diff --check. Do not add tests that mirror low-impact visual markup.
- [ ] Review desktop/390/320 and reduced-motion fallbacks; save screenshot evidence.
- [ ] One fresh read-only final review; address concrete findings in one pass.
- [ ] Commit and fast-forward push main; verify Pages run and published result.
