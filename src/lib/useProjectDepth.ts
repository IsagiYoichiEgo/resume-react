import { useEffect, type RefObject } from 'react';

// One frame loop for the entire gallery. Content never depends on this effect.
export function useProjectDepth(root:RefObject<HTMLDivElement|null>) {
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const update=()=>{
      frame=0;
      root.current?.querySelectorAll<HTMLElement>('.project-visual').forEach(cover=>{
        const top=cover.getBoundingClientRect().top;
        const depth=media.matches?0:Math.max(-1,Math.min(1,(top-window.innerHeight*.4)/Math.max(1,window.innerHeight)));
        cover.style.setProperty('--view-depth',String(depth));
      });
    };
    const schedule=()=>{if(!frame) frame=requestAnimationFrame(update);};
    update();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    media.addEventListener('change',schedule);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);media.removeEventListener('change',schedule);};
  },[root]);
}
