export interface Project {
  id: 'music' | 'ads' | 'bookstore' | 'aihuda';
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
    id: 'music', title: 'Thunder bend', kind: 'Музыкальный сайт', status: 'Опубликован',
    description: 'Концертная атмосфера и рабочий профиль музыканта. Учебный сайт музыкальной группы.',
    stack: ['React', 'TypeScript', 'API'],
    details: ['Главная страница музыкальной группы.', 'Регистрация, вход и выход из аккаунта.', 'Просмотр и редактирование профиля музыканта.'],
    note: 'Учебный проект. Концертное изображение — иллюстрация, а не фотография реальной группы.',
    liveUrl: 'https://isagiyoichiego.github.io/music/', sourceUrl: 'https://github.com/IsagiYoichiEgo/music',
  },
  {
    id: 'ads', title: 'Доска объявлений', kind: 'Веб-приложение', status: 'Опубликован',
    description: 'Учебное приложение с объявлениями, загрузкой данных с API и переходом между страницами.',
    stack: ['React', 'TypeScript', 'API'],
    details: ['Лента объявлений с учебного сервера.', 'Просмотр информации об объявлениях.', 'Пагинация для перехода между страницами.'],
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
