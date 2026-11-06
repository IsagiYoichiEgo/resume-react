# Verification — 2026-11-06

- npm test: 9/9 passed. Covers page bounds, mobile mascot bounds, message cooldown, avoiding controls, reduced-motion placement.
- npm run build: TypeScript and Vite production build passed.
- Browser QA at desktop, 390px and 320px: no horizontal page overflow; mobile menu opens and closes on navigation; project dialog opens, hides mascot, closes with Escape and restores trigger focus; phone copy confirms success.
- Hiding the mascot leaves the global reading progress working. Restoring the mascot works. The mascot starts near the right edge and rises above visible controls.
- Decorative art is clipped at the page boundary, without cutting content.
- Reduced-motion behavior is covered by pure placement tests and CSS inspection; system preference was not changed.
- External project links and contact destinations match the existing public profile. No contact messages sent and no shared API records changed.

Final review follow-up: speech bubbles are measured before paint and on scroll/resize; hidden whenever they would overlap a main/footer control or exceed the viewport. Regression geometry test passes; visible non-overlapping bubble checked on phone.
