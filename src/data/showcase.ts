export type ShowcaseId = 'xyzen' | 'music' | 'ads';

export const showcase = {
  xyzen: {title:'XYZEN Music', label:'Плеер', desktop:'assets/xyzen-preview.webp', mobile:'assets/xyzen-mobile.webp', url:'https://isagiyoichiego.github.io/resume-react/xyzen/'},
  music: {title:'Thunder bend', label:'Музыка', desktop:'assets/music-preview.webp', mobile:'assets/music-mobile.webp', url:'https://isagiyoichiego.github.io/music/'},
  ads: {title:'Доска объявлений', label:'Объявления', desktop:'assets/ads-preview.webp', mobile:'assets/ads-mobile.webp', url:'https://isagiyoichiego.github.io/ads-board-react-/'},
} satisfies Record<ShowcaseId,{title:string;label:string;desktop:string;mobile:string;url:string}>;

export const isShowcaseId = (id: string): id is ShowcaseId => id in showcase;
