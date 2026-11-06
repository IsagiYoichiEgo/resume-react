# Portfolio showcase — design

## Intent
Make the existing dark client portfolio more memorable and convincing through real work, a stronger first screen, and direct interaction. Continue the already approved dark/3D/cat direction and the user's standing instruction to choose routine design details autonomously. The exact layout below is the builder's choice, not a newly claimed user approval.

## Approach
Selected: an interactive 3D showcase of real published work, using the existing React/CSS stack. A denser particle/WebGL scene would add cost and compete with the work; cosmetic glow alone would not meaningfully improve the page. No new runtime dependencies.

## Design
- Palette: midnight #0A1020, deep blue #121C31, cream #F6F3EC, mint #7DE6D1, peach #FFB788, lilac #A69BE3. Retain Golos Text for reading, Unbounded for display.
- Hero: bold left-aligned type, clear client action, a large layered browser scene showing real Music/Ads screenshots. Two native buttons change the showcased project with a clear selected state; preview has its own live-site link. Pointer tilt and scroll depth, a single coordinated entry, no autoplay carousel.
- Work: featured published projects use real screenshot/device compositions. BookStore and Ai Huda retain distinct concept art, with factual local/in-development status. Cover is also an accessible details trigger; no nested buttons.
- Add a short three-step collaboration strip before contact: discuss task, see a first version, refine details. No invented guarantees, prices, metrics or testimonials.
- Keep the cat's hide/restore, collision and reduced-motion behavior. Any new controls must participate in existing main-control collision detection.
- Responsive at 320/390/800/desktop; content visible without motion, controls keyboard usable; no horizontal scrolling. Reduced motion disables transforms, animated entries and smooth scrolling.

## Assets and constraints
Real screenshots captured during the previous deployment verification in outputs/music-preview.jpg and outputs/ads-preview.jpg; mechanically encode as WebP in public/assets. No edits to music/ads repos or their APIs. Preserve existing public contact destinations and Pages hosting.
