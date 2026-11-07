import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/resume';
import { Icon } from './Icon';

export function Contact() {
  const [copyStatus, setCopyStatus] = useState('');
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timeout.current), []);

  async function copyPhone() {
    try { await navigator.clipboard.writeText(profile.phone); setCopyStatus('Номер скопирован'); }
    catch { setCopyStatus('Скопируйте номер вручную: ' + profile.phone); }
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopyStatus(''), 4500);
  }

  return <section id="contact" className="contact-section container" aria-labelledby="contact-title">
    <div className="contact-panel" data-reveal>
      <div className="contact-copy"><span className="contact-spark" aria-hidden="true">✳</span><h2 id="contact-title">Нужен сайт?<br />Давайте обсудим.</h2><p>Расскажите, что хотите сделать.<br />Написать проще всего в WhatsApp.</p><a className="button button-primary" href={profile.whatsapp} target="_blank" rel="noreferrer">Написать в WhatsApp <Icon name="arrow" /></a></div>
      <div className="contact-details"><div className="contact-row"><span className="contact-label">Телефон</span><div><a className="phone-link" href={'tel:' + profile.phoneLink}>{profile.phone}</a><button className="icon-button" type="button" onClick={copyPhone} aria-label="Скопировать номер телефона"><Icon name={copyStatus === 'Номер скопирован' ? 'check' : 'copy'} /></button></div></div><div className="contact-row"><span className="contact-label">GitHub</span><a className="github-link" href={profile.github} target="_blank" rel="noreferrer">{profile.githubUsername}<Icon name="arrow" /></a></div><p className="copy-feedback" role="status">{copyStatus || ' '}</p></div>
    </div>
  </section>;
}
