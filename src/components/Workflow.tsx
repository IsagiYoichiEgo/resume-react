import './workflow.css';

const steps = [
  {title:'Обсудим задачу',text:'Для кого нужен сайт, что на нём должно быть и какие детали важны.'},
  {title:'Покажу первую версию',text:'Вы увидите структуру и оформление. Обсудим, что нравится и что изменить.'},
  {title:'Доведём детали',text:'Проверим страницы, кнопки и вид на телефоне. Затем опубликуем сайт.'},
];

export function Workflow() {
  return <section className="workflow-section container" aria-labelledby="workflow-title">
    <div className="workflow-heading"><h2 id="workflow-title">От задачи<br/>до готового сайта.</h2><p>Понятный процесс,<br/>в котором вы видите результат.</p></div>
    <ol className="workflow-steps">{steps.map((step,index)=><li key={step.title}><span className="workflow-number" aria-hidden="true">0{index+1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
  </section>;
}
