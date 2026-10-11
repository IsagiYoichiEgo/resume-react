type IconName = 'arrow' | 'download' | 'github' | 'sun' | 'moon' | 'menu' | 'close' | 'copy' | 'check' | 'pin' | 'code' | 'film' | 'chess' | 'activity' | 'phone';

const paths: Record<IconName, string> = {
  arrow: 'M5 19 19 5M5 5h14v14',
  download: 'M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5',
  github: 'M9 19c-4 1-4-2-6-2m12 5v-4a3 3 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 6a4.3 4.3 0 0 0-.1-3s-1-.3-3.3 1.3a11.5 11.5 0 0 0-6 0C6.7 2.7 5.7 3 5.7 3a4.3 4.3 0 0 0-.1 3 4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 9 17.5V22',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  moon: 'M20.9 13A9 9 0 1 1 11 3.1 7 7 0 0 0 20.9 13Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'm6 6 12 12M6 18 18 6',
  copy: 'M9 9h11v11H9zM15 5V3H3v12h2',
  check: 'm5 12 4 4L19 6',
  pin: 'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  code: 'm8 7-5 5 5 5m8-10 5 5-5 5M14 3l-4 18',
  film: 'M3 3h18v18H3zM7 3v18M17 3v18M3 8h4m10 0h4M3 16h4m10 0h4',
  chess: 'M8 21h10M9 17h7l-1-4 3-3-3-6h-4l-3 8h4l-3 5ZM11 4V2m4 4h.01',
  activity: 'M2 12h5l3-8 4 16 3-8h5',
  phone: 'M22 16v4a2 2 0 0 1-2 2C10 21 3 14 2 4a2 2 0 0 1 2-2h4l2 6-3 2a16 16 0 0 0 7 7l2-3Z',
};

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
