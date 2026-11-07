import { useLayoutEffect } from 'react';

// Visible HTML is the fallback. Only a working observer opts targets into motion.
export function useViewportReveal() {
  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches || typeof IntersectionObserver === 'undefined') return;

    const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    const pending = new Set(targets);
    const entering = new Set<HTMLElement>();
    let ready = false;
    let frame = 0;

    const show = (element: HTMLElement, immediately = false) => {
      if (immediately) element.setAttribute('data-reveal-immediate', '');
      element.setAttribute('data-reveal-state', 'visible');
      pending.delete(element);
      entering.delete(element);
      observer.unobserve(element);
      if (!pending.size) observer.disconnect();
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        if (ready) show(element);
        else entering.add(element);
      }
    }, { rootMargin: '0px 0px 80px 0px', threshold: 0 });

    // Focus and anchor destinations appear in the same frame as the interaction.
    const showRelated = (target: Element) => {
      targets.forEach(element => {
        if (element.contains(target) || target.contains(element)) show(element, true);
      });
    };
    const showHash = (hash: string) => {
      if (!hash) return;
      try {
        const destination = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (destination) showRelated(destination);
      } catch { /* An invalid fragment must not interrupt the page. */ }
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element) showRelated(event.target);
    };
    const onAnchor = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (link) showHash(link.getAttribute('href') ?? '');
    };
    const onHash = () => showHash(window.location.hash);
    const onMotion = () => {
      if (media.matches) targets.forEach(element => show(element, true));
    };

    targets.forEach(element => {
      // Browser scroll restoration may start us below content already passed.
      if (element.getBoundingClientRect().bottom <= 0) show(element, true);
      else {
        element.setAttribute('data-reveal-state', 'pending');
        observer.observe(element);
      }
    });
    onHash();
    const focused = document.activeElement;
    if (focused && focused !== document.body && focused !== document.documentElement) showRelated(focused);
    document.addEventListener('focusin', onFocus);
    document.addEventListener('click', onAnchor, true);
    window.addEventListener('hashchange', onHash);
    media.addEventListener('change', onMotion);

    // Establish the initial position before playing the first viewport sequence.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        ready = true;
        entering.forEach(element => show(element));
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('focusin', onFocus);
      document.removeEventListener('click', onAnchor, true);
      window.removeEventListener('hashchange', onHash);
      media.removeEventListener('change', onMotion);
      targets.forEach(element => {
        element.removeAttribute('data-reveal-state');
        element.removeAttribute('data-reveal-immediate');
      });
    };
  }, []);
}
