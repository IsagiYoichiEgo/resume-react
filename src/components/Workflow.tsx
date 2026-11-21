import './workflow.css';

const steps = [
  {title:'Обсудим задачу',text:'Для кого нужен сайт, что на нём должно быть и какие детали важны.'},
  {title:'Покажу первую версию',text:'Вы увидите структуру и оформление. Обсудим, что нравится и что изменить.'},
  {title:'Доведём детали',text:'Проверим страницы, кнопки и вид на телефоне. Затем опубликуем сайт.'},
];

// Small looping scenes that show what happens at each step.
const scenes = [
  <svg key="chat" className="step-scene scene-chat" viewBox="0 0 180 104" aria-hidden="true">
    <rect className="bubble b1" x="8" y="10" width="104" height="26" rx="13" />
    <rect className="bubble b2" x="64" y="44" width="108" height="26" rx="13" />
    <g className="typing"><rect x="8" y="78" width="52" height="22" rx="11" /><circle cx="22" cy="89" r="3" /><circle cx="34" cy="89" r="3" /><circle cx="46" cy="89" r="3" /></g>
    <path className="line l1" d="M22 23h60" /><path className="line l2" d="M78 57h70" />
  </svg>,
  <svg key="draft" className="step-scene scene-draft" viewBox="0 0 180 104" aria-hidden="true">
    <rect className="frame" x="6" y="6" width="168" height="92" rx="9" />
    <path className="frame" d="M6 22h168" />
    <circle cx="16" cy="14" r="2.5" /><circle cx="25" cy="14" r="2.5" /><circle cx="34" cy="14" r="2.5" />
    <rect className="block k1" x="16" y="32" width="70" height="12" rx="3" />
    <rect className="block k2" x="16" y="50" width="52" height="7" rx="3" />
    <rect className="block k3" x="16" y="66" width="36" height="14" rx="7" />
    <rect className="block k4" x="98" y="32" width="66" height="54" rx="6" />
  </svg>,
  <svg key="ship" className="step-scene scene-ship" viewBox="0 0 180 104" aria-hidden="true">
    <rect className="phone" x="20" y="6" width="56" height="92" rx="10" />
    <path className="tick t1" d="M96 24l6 6 12-12" /><path className="row r1" d="M124 24h44" />
    <path className="tick t2" d="M96 52l6 6 12-12" /><path className="row r2" d="M124 52h36" />
    <path className="tick t3" d="M96 80l6 6 12-12" /><path className="row r3" d="M124 80h40" />
    <circle className="live" cx="48" cy="52" r="9" />
  </svg>,
];

export function Workflow() {
  return <section id="process" className="workflow-section container" aria-labelledby="workflow-title">
    <div className="workflow-heading" data-reveal><h2 id="workflow-title">От задачи<br/>до готового сайта.</h2><p>Понятный процесс, <br/>в котором вы видите результат.</p></div>
    <ol className="workflow-steps">{steps.map((step,index)=><li key={step.title} data-reveal data-reveal-delay={String(index)}><span className="workflow-number" aria-hidden="true">0{index+1}</span>{scenes[index]}<h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
  </section>;
}
