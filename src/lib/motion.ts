const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

export function scrollProgress(scrollY: number, documentHeight: number, viewportHeight: number): number {
  const travel = documentHeight - viewportHeight;
  if (!Number.isFinite(scrollY) || !Number.isFinite(travel) || travel <= 0) return 0;
  return clamp(scrollY / travel, 0, 1);
}

export function petPosition(progress: number, viewportWidth: number, petWidth: number, inset: number): number {
  const available = Math.max(0, viewportWidth - petWidth);
  const margin = Math.min(Math.max(0, inset), available / 2);
  const safeProgress = Number.isFinite(progress) ? clamp(progress, 0, 1) : 0;
  return margin + Math.max(0, available - margin * 2) * safeProgress;
}

export function canShowBubble(now: number, lastAt: number, lastSection: string, nextSection: string): boolean {
  return nextSection.length > 0 && nextSection !== lastSection && now - lastAt >= 6000;
}


type ControlBounds = {left:number;right:number;top:number;bottom:number};

// Keep the companion near the right edge and lift it above visible controls.
export function safePetPlacement(progress:number, width:number, height:number, petWidth:number, petHeight:number, controls:ControlBounds[], reduced:boolean) {
  const x = petPosition(reduced ? 1 : .8 + .2 * progress, width, petWidth, 18);
  let bottom = 9;
  const maximum = Math.max(9, height - petHeight - 12);
  for (const control of [...controls].sort((a,b) => b.top-a.top)) {
    if (control.right > x-10 && control.left < x+petWidth+10 && control.bottom > height-bottom-petHeight-10 && control.top < height-bottom+10) {
      bottom = Math.min(maximum, Math.max(bottom, height-control.top+10));
    }
  }
  return {x,bottom};
}
