export interface Project {
  id: 'xyzen' | 'music' | 'ads' | 'bookstore' | 'aihuda';
  title: string;
  kind: string;
  status: string;
  description: string;
  stack: string[];
  details: string[];
  note: string;
  liveUrl?: string;
  sourceUrl?: string;
}

export const profile = {
  firstName: 'Аброрбек', lastName: 'Алимжанов', latinName: 'Abrorbek Alimjanov', brand: 'alimbro',
  location: 'Бишкек, Кыргызстан', phone: '+996 228 936 151', phoneLink: '+996228936151',
  whatsapp: 'https://wa.me/996228936151', github: 'https://github.com/IsagiYoichiEgo',
  githubUsername: 'IsagiYoichiEgo', university: 'INAI',
};

export const projects: Project[] = [
  {
    id: 'xyzen', title: 'XYZEN Music', kind: 'Музыкальный плеер', status: 'Опубликован',
    description: 'Тёмный музыкальный плеер со стеклянным интерфейсом. Музыка генерируется прямо в браузере, а визуализатор реагирует на звук.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Web Audio'],
    details: ['Четыре плейлиста-настроения, у каждого свой темп и цвет.', 'Треки синтезируются через Web Audio API, без аудиофайлов.', 'Визуализатор-кольцо реагирует на настоящий звук.', 'Инерционный курсор и стеклянный интерфейс на чистом CSS.'],
    note: 'Концепт-проект. Исполнители и треки вымышленные.',
    liveUrl: 'https://isagiyoichiego.github.io/xyzen-music/', sourceUrl: 'https://github.com/IsagiYoichiEgo/xyzen-music',
  },
  {
    id: 'music', title: 'Thunder bend', kind: 'Музыкальный сайт', status: 'Опубликован',
    description: 'Сайт рок-группы: альбом, состав и даты тура, плюс аккаунт музыканта с профилем.',
    stack: ['React', 'TypeScript', 'API'],
    details: ['Анимированный первый экран: прожекторы, падающие буквы, параллакс.', 'Разделы с альбомом, составом группы и датами тура.', 'Регистрация, вход и редактирование профиля музыканта.', 'Демо-режим: если учебный сервер недоступен, аккаунты хранятся в браузере.'],
    note: 'Учебный проект. Группа, альбом и тур вымышлены, концертное изображение — иллюстрация.',
    liveUrl: 'https://isagiyoichiego.github.io/music/', sourceUrl: 'https://github.com/IsagiYoichiEgo/music',
  },
  {
    id: 'ads', title: 'Доска объявлений', kind: 'Веб-приложение', status: 'Опубликован',
    description: 'Доска объявлений с поиском, сортировкой по цене, избранным и публикацией с фото.',
    stack: ['React', 'TypeScript', 'API'],
    details: ['Лента объявлений с API и пагинацией.', 'Поиск, сортировка по цене и избранное.', 'Окно объявления с крупным фото.', 'Демо-объявления, если учебный сервер недоступен.'],
    note: 'Учебный проект с общим сервером. Данные в ленте добавляют участники учебного курса.',
    liveUrl: 'https://isagiyoichiego.github.io/ads-board-react-/', sourceUrl: 'https://github.com/IsagiYoichiEgo/ads-board-react-',
  },
  {
    id: 'bookstore', title: 'BookStore', kind: 'Курсовая работа', status: 'Готов · локальный запуск',
    description: 'Интернет-магазин книг с базой данных. Завершённая курсовая работа с локальным запуском.',
    stack: ['Веб-приложение', 'База данных'],
    details: ['Интернет-магазин книг.', 'Работа с базой данных.', 'Готовая курсовая работа, которая запускается локально.'],
    note: 'Публичного демо пока нет. Здесь можно прочитать краткое описание работы.',
  },
  {
    id: 'aihuda', title: 'Ai Huda', kind: 'Приложение', status: 'В разработке',
    description: 'Личный проект приложения для чтения Корана. Работаю над интерфейсом и удобством чтения.',
    stack: ['Чтение Корана', 'Личный проект'],
    details: ['Приложение для чтения Корана.', 'Проект находится в разработке.', 'Внимание к читаемости и удобству интерфейса.'],
    note: 'Приложение ещё не выпущено. Ссылка на скачивание появится после готового релиза.',
  },
];
