# Portfolio showcase verification — 2026-11-07

- Native browser inspection at desktop, 390px, 320px; no horizontal page overflow. Text elements on 320px have no intrinsic overflow.
- Hero selector changes desktop/mobile images, pressed state and live-site destination together; tested click and keyboard Space.
- Real image assets load locally; screenshot provenance is documented in showcase-assets.md.
- Project cover opens native dialog; Escape restores focus to the originating cover button.
- Mobile menu opens and closes on destination selection; keyboard navigation checked.
- Added project parallax uses one throttled animation frame for the gallery and removes listeners on unmount. Reduced-motion rules and media-query handling inspected; OS preference not changed.
- Cat collision remains focused on actual actions/status. Large decorative cover trigger is excluded while its visible arrow is protected; bubble additionally avoids nonempty text. Empty feedback lines do not create phantom obstacles.
- No API mutations or changes to the demo repositories. Existing contact destinations unchanged.
