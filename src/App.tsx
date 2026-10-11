import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { SectionHeading } from './components/SectionHeading';
import { Icon } from './components/Icon';
import { profile, skillGroups, languages, interests, projects } from './data/resume';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('resume-theme', theme); } catch { /* Theme still works without storage. */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#171a17' : '#f5f5ed');
  }, [theme]);

  return <>
    <a className="skip-link" href="#main">Перейти к содержимому</a>
    <Header theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
    <main id="main">
      <Hero />
      <section id="about" className="section about-section container"><SectionHeading number="01" label="Знакомство" title="Любопытство — мой главный инструмент." /><div className="about-layout"><div className="about-text"><p className="large-copy">Мне нравится понимать,<br />как всё <span>работает изнутри.</span></p><p>{profile.bio}</p><p>В разработке ценю ясную структуру, внимание к деталям и возможность постоянно учиться. А за пределами редактора кода — шахматы, спорт и видеомонтаж.</p></div><div className="about-facts"><div><span className="fact-value">{profile.university}<span>↗</span></span><span className="fact-label">Прикладная информатика</span></div><div><span className="fact-value">{String(projects.length).padStart(2, '0')}<span>+</span></span><span className="fact-label">Проектов в портфолио</span></div><div><span className="fact-value">04<span>↗</span></span><span className="fact-label">Языка для общения</span></div></div></div></section>
      <section id="skills" className="section skills-section container"><SectionHeading number="02" label="Инструменты" title="Мой рабочий стек." description="От первого компонента до API, базы данных и локальной модели." /><div className="skills-grid">{skillGroups.map((group, index) => <article className="skill-group" key={group.name}><div className="skill-group-top"><span className="skill-index">0{index + 1}</span><Icon name="code" /></div><h3>{group.name}</h3><p>{group.description}</p><div className="skill-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></section>
      <Projects />
      <section id="education" className="section education-section container"><SectionHeading number="04" label="Основа" title="Учёба. Практика. Следующий шаг." /><div className="education-layout"><article className="education-main"><span className="eyebrow">Высшее образование</span><div className="education-title"><span className="inai-mark">i<span>.</span></span><div><h3>{profile.university}</h3><p>{profile.universityFull}</p></div></div><p className="education-degree">{profile.degree}</p><p className="education-period">{profile.educationPeriod}</p><p className="education-summary">Изучаю программирование, алгоритмы, базы данных и принципы построения программных систем. Закрепляю знания в собственных проектах.</p></article><div className="awards"><span className="eyebrow">Достижения</span><article><span className="award-place">02<span>место</span></span><div><h3>Шахматный турнир</h3><p>Региональный турнир в Сузаке</p></div></article><article><span className="award-place">01<span>место</span></span><div><h3>Олимпиада по английскому</h3><p>Школьная олимпиада</p></div></article></div></div><div className="languages"><h3>Говорим на одном языке.</h3><div>{languages.map(language => <div className="language" key={language.code}><span>{language.code}</span><p>{language.name}<small>{language.level}</small></p></div>)}</div></div></section>
      <section id="interests" className="section interests-section container"><SectionHeading number="05" label="За пределами кода" title="Не только разработчик." /><div className="interests-grid">{interests.map(interest => <article key={interest.name}><Icon name={interest.icon} /><h3>{interest.name}</h3><p>{interest.description}</p></article>)}</div></section>
      <Contact />
    </main>
    <footer className="container site-footer"><a href="#home" className="brand-mark" aria-label="Вернуться к началу">aa<span>.</span></a><p>© {new Date().getFullYear()} {profile.latinName}<span>Сделано с вниманием к деталям.</span></p><a href="#home" className="back-top">Наверх <span>↑</span></a></footer>
  </>;
}
