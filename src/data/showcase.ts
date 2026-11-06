export type ShowcaseId = 'music' | 'ads';

export const showcase = {
  music: {title:'Thunder bend', label:'Музыкальный сайт', desktop:'assets/music-preview.webp', mobile:'assets/music-mobile.webp', url:'https://isagiyoichiego.github.io/music/'},
  ads: {title:'Доска объявлений', label:'Доска объявлений', desktop:'assets/ads-preview.webp', mobile:'assets/ads-mobile.webp', url:'https://isagiyoichiego.github.io/ads-board-react-/'},
} satisfies Record<ShowcaseId,{title:string;label:string;desktop:string;mobile:string;url:string}>;
