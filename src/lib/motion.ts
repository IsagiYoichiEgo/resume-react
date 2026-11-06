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
