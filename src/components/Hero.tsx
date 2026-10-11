import { useState } from 'react';
import type { FormEvent } from 'react';
import { profile, projects } from '../data/resume';
import { Icon } from './Icon';

function DeveloperConsole() {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('Попробуй help, stack, projects или contact.');
  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = command.trim().toLowerCase();
    if (!input) return;
    const commands: Record<string, string> = {
      help: 'Команды: stack · projects · contact · clear',
      stack: 'Java / Spring Boot · React · Python / Ollama',
      skills: 'Java / Spring Boot · React · Python / Ollama',
      projects: projects.map(project => project.title).join(' · '),
      contact: `${profile.phone} · GitHub: ${profile.githubUsername}`,
      clear: '',
    };
    setResponse(commands[input] ?? `Команда «${command.trim()}» не найдена. Введи help.`);
    setCommand('');
  }

  return <div className="profile-window">
    <div className="window-top"><span className="window-dots"><i /><i /><i /></span><span>developer.profile</span><Icon name="code" /></div>
    <div className="profile-art" aria-hidden="true"><div className="art-orbit" /><span className="art-label">BUILD. LEARN. REPEAT.</span><span className="art-monogram">aa<span>.</span></span><span className="art-caption">FULLSTACK & LOCAL AI</span><span className="art-coordinate">42.87° N / 74.59° E</span></div>
    <div className="code-profile"><span className="code-comment">// a little about me</span><div><span className="code-purple">const</span> developer = {'{'}</div><div className="code-indent">name: <span className="code-green">"Abrorbek"</span>,</div><div className="code-indent">focus: <span className="code-green">"Fullstack & AI"</span>,</div><div className="code-indent">mindset: <span className="code-green">"Always learning"</span></div><div>{'};'}</div></div>
    <form className="terminal" onSubmit={runCommand}>
      <div className="terminal-output" role="status">{response || 'Терминал очищен.'}</div>
      <label className="terminal-input"><span aria-hidden="true">❯</span><span className="sr-only">Команда терминала</span><input value={command} onChange={event => setCommand(event.target.value)} placeholder="help" maxLength={80} autoComplete="off" spellCheck={false} /><button type="submit" aria-label="Выполнить команду">↵</button></label>
    </form>
  </div>;
}

export function Hero() {
  return <section id="home" className="hero container">
    <div className="hero-copy">
      <div className="availability"><span />Открыт к стажировкам и junior-позициям</div>
      <p className="hero-greeting">Привет, я</p>
      <h1>{profile.firstName}{' '}<br />{profile.lastName}<span className="accent-dot">.</span></h1>
      <div className="hero-role"><span className="role-line" />{profile.role}</div>
      <p className="hero-description">Создаю веб-приложения на <strong>Spring Boot и React.</strong> Исследую локальный AI и превращаю идеи в работающие проекты.</p>
      <div className="hero-buttons"><a className="button button-primary" href="#projects">Смотреть проекты <Icon name="arrow" /></a><button className="button button-secondary" onClick={() => window.print()} title="В окне печати выбери «Сохранить как PDF»">Сохранить PDF <Icon name="download" /></button></div>
      <div className="hero-meta"><span><Icon name="pin" />{profile.location}</span><a href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" />GitHub <Icon name="arrow" /></a></div>
    </div>
    <DeveloperConsole />
    <div className="hero-bottom"><span>ОТ ИДЕИ ДО РЕАЛИЗАЦИИ</span><a href="#about">Познакомимся ближе <span>↓</span></a><span>PORTFOLIO / 2026</span></div>
  </section>;
}
