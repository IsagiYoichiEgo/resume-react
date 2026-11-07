# Portfolio entrance and scroll reveal

## Behavior

- Header and hero content enter once with opacity 0 → 1 and a 24 px upward movement, lasting 780 ms. First-screen offsets are 0–240 ms.
- Project introduction/cards, About columns, Workflow heading/steps and Contact panel reveal independently. The observer starts 80 px before the viewport bottom to avoid a long empty area; mobile cards and steps have no stagger delay.
- Reveal transforms belong to outer content layers. Device/cover depth, hover effects, project switching and ambient lighting retain their own transforms and animation timings.
- HTML/CSS content is visible by default. The hook sets pending attributes only when IntersectionObserver is available and reduced motion is off. Header and Mascot also guard their existing observer use.
- Focused content, anchor destinations and content above a restored scroll position show immediately. Enabling reduced motion reveals all remaining targets immediately.
- One observer, two initial animation frames, delegated focus/anchor handlers and a media-query handler; no scroll listener, React animation state, new timers or dependencies. Cleanup disconnects the observer, cancels the pending frame, removes listeners and resets attributes (including React StrictMode remounts).

## Validation

- `npm run build`: passed (TypeScript and Vite).
- `npm test`: 9/9 existing motion/mascot tests passed.
- `git diff --check`: passed.
- `ambient-light.css`, project data, contact data and image assets have no changes.

## Browser handoff

Visual checks remain for the parent task before publication: fresh entry and slow/fast scrolling on desktop/mobile, project hover/switch/dialog, sticky header and mobile menu, mascot/control overlap, keyboard focus into offscreen cards, section navigation/direct hash load, reduced motion at load and toggled during an entrance, and a reload with IntersectionObserver unavailable. Inspect `[data-reveal-state="pending"]` to confirm each target becomes visible once and is never hidden again. No push or deployment was performed by the implementation subtask.
