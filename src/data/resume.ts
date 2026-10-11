export type ProjectCategory = 'web' | 'ai' | 'concept';

export interface Project {
  id: string;
  number: string;
  title: string;
  category: ProjectCategory;
  kind: string;
  status: string;
  description: string;
  stack: string[];
  features: string[];
  flow: string[];
}

// Content comes from the previous résumé. Edit your profile in this file.
export const profile = {
  firstName: 'Аброрбек',
  lastName: 'Алимжанов',
  latinName: 'Abrorbek Alimjanov',
  role: 'Junior Fullstack Developer',
  location: 'Бишкек, Кыргызстан',
  phone: '+996 228 936 151',
  phoneLink: '+996228936151',
  whatsapp: 'https://wa.me/996228936151',
  github: 'https://github.com/IsagiYoichiEgo',
  githubUsername: 'IsagiYoichiEgo',
  university: 'INAI',
  universityFull: 'Кыргызско-Германский институт прикладной информатики',
  degree: 'Прикладная информатика',
  educationPeriod: '2024 — настоящее время',
  bio: 'Учусь в INAI, разрабатываю веб-приложения и изучаю локальный искусственный интеллект. Мне интересно, как соединить понятный интерфейс, продуманный backend и полезную автоматизацию в одном продукте.',
  focus: 'Spring Boot · React · Local AI',
};

export const skillGroups = [
  { name: 'Frontend', description: 'Интерфейсы, с которыми удобно работать.', skills: ['React', 'JavaScript', 'TypeScript', 'HTML / CSS', 'Next.js'] },
  { name: 'Backend & Data', description: 'Логика приложения и работа с данными.', skills: ['Java', 'Spring Boot', 'REST API', 'PostgreSQL', 'SQLite'] },
  { name: 'AI & Tools', description: 'Автоматизация и инструменты разработчика.', skills: ['Python', 'Ollama / Qwen2.5', 'Git / GitHub', 'Linux / WSL2', 'Cisco Packet Tracer'] },
];

export const projects: Project[] = [
  {
    id: 'bookstore', number: '01', title: 'BookStore', category: 'web', kind: 'Fullstack / Web', status: 'Завершён',
    description: 'Веб-приложение книжного магазина: каталог, поиск, корзина и авторизация. От интерфейса до базы данных.',
    stack: ['Spring Boot', 'React', 'PostgreSQL', 'JWT'],
    features: ['Каталог книг с поиском и категориями.', 'Корзина и оформление заказа.', 'Авторизация на основе JWT.', 'Backend с разделением Controller, Service и Repository.'],
    flow: ['React interface', 'REST API / Spring Boot', 'JPA / PostgreSQL'],
  },
  {
    id: 'norvis', number: '02', title: 'NORVIS', category: 'ai', kind: 'AI / Automation', status: 'В разработке',
    description: 'Локальный голосовой помощник. Эксперименты с языковой моделью, распознаванием речи и автоматизацией задач.',
    stack: ['Python', 'Ollama', 'Qwen2.5', 'SpeechRecognition'],
    features: ['Запуск локальной модели через Ollama.', 'Обработка голосовых команд.', 'Автоматизация действий в операционной системе.', 'Эксперименты с голосовым ответом.'],
    flow: ['Голосовая команда', 'Python / обработка запроса', 'Ollama или действие в ОС'],
  },
  {
    id: 'splitbill', number: '03', title: 'Split Bill', category: 'concept', kind: 'Fintech / Concept', status: 'Концепция',
    description: 'Концепция для Xyzen Neobank: совместные расходы и расчёт взаимных долгов без лишних переводов.',
    stack: ['System Design', 'Graph Algorithms', 'Fintech UX'],
    features: ['Учёт участников и совместных расходов.', 'Расчёт итогового баланса каждого участника.', 'Упрощение взаимных долгов.', 'Проектирование пользовательского сценария.'],
    flow: ['Общие расходы', 'Баланс участников', 'Оптимизированные переводы'],
  },
  {
    id: 'chess', number: '04', title: 'Chess + AI', category: 'ai', kind: 'Game / Algorithms', status: 'Игровой проект',
    description: 'Шахматы с компьютерным соперником. Игровая логика, оценка позиции и поиск следующего хода.',
    stack: ['JavaScript', 'Canvas', 'Minimax', 'Alpha-Beta'],
    features: ['Проверка допустимых ходов.', 'Поиск хода алгоритмом Minimax.', 'Отсечение ветвей методом Alpha-Beta.', 'Оценка фигур и позиции на доске.'],
    flow: ['Состояние доски', 'Поиск и оценка ходов', 'Ход компьютерного соперника'],
  },
  {
    id: 'alhuda', number: '05', title: 'Al Huda', category: 'web', kind: 'Personal / Web', status: 'В разработке',
    description: 'Личный проект с лаконичным интерфейсом, полезными ресурсами и инструментами духовной продуктивности.',
    stack: ['React / Next.js', 'CSS', 'REST API', 'Local Storage'],
    features: ['Лаконичный адаптивный интерфейс.', 'Работа с расписанием и уведомлениями.', 'Локальное хранение пользовательских данных.', 'Развитие функций личной продуктивности.'],
    flow: ['Пользовательский интерфейс', 'Данные и расписание', 'Локальное хранение'],
  },
];

export const languages = [
  { name: 'Русский', level: 'Свободно', code: 'RU' },
  { name: 'Кыргызский', level: 'Родной', code: 'KG' },
  { name: 'Английский', level: 'B1 / B2', code: 'EN' },
  { name: 'Немецкий', level: 'A1 / A2', code: 'DE' },
];

export const interests = [
  { name: 'Шахматы', description: 'Стратегия, расчёт и спокойствие под давлением.', icon: 'chess' },
  { name: 'Видеомонтаж', description: 'Короткие видео, визуальный ритм и motion design.', icon: 'film' },
  { name: 'Теннис', description: 'Реакция, концентрация и движение.', icon: 'activity' },
  { name: 'Хакатоны', description: 'Командная работа и быстрые прототипы идей.', icon: 'code' },
] as const;
