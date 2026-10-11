import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/resume';
import { Icon } from './Icon';

export function Contact() {
  const [copyStatus, setCopyStatus] = useState('');
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(profile.phone);
      setCopyStatus('Номер скопирован');
    } catch { setCopyStatus(`Скопируй номер вручную: ${profile.phone}`); }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopyStatus(''), 4500);
  }

  return <section id="contact" className="contact-section container">
    <div className="contact-panel"><div className="contact-copy"><p className="eyebrow">06 / На связи</p><h2>Хорошие идеи<br />начинаются с <span>«привет».</span></h2><p>Стажировка, интересный проект или разговор о технологиях — буду рад познакомиться.</p><a className="button button-primary" href={profile.whatsapp} target="_blank" rel="noreferrer">Написать в WhatsApp <Icon name="arrow" /></a></div>
      <div className="contact-details"><div className="contact-row"><span className="contact-label">Телефон</span><div><a href={`tel:${profile.phoneLink}`}>{profile.phone}</a><button className="icon-button" onClick={copyPhone} aria-label="Скопировать номер телефона"><Icon name={copyStatus === 'Номер скопирован' ? 'check' : 'copy'} /></button></div></div><div className="contact-row"><span className="contact-label">GitHub</span><a href={profile.github} target="_blank" rel="noreferrer">@{profile.githubUsername}<Icon name="arrow" /></a></div><div className="contact-row"><span className="contact-label">Где я</span><p>{profile.location}<span className="remote-note">UTC+6 · Рассматриваю удалённую работу</span></p></div><p className="copy-feedback" role="status">{copyStatus || '\u00a0'}</p></div>
    </div>
  </section>;
}
