import { useRef, useState } from 'react';
import { projects } from '../data/resume';
import type { Project, ProjectCategory } from '../data/resume';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';
import { ProjectVisual } from './ProjectVisual';
import { ProjectDialog } from './ProjectDialog';

const filters: { id: ProjectCategory | 'all'; label: string }[] = [{ id: 'all', label: 'Все проекты' }, { id: 'web', label: 'Fullstack & Web' }, { id: 'ai', label: 'AI & Алгоритмы' }, { id: 'concept', label: 'Концепции' }];

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all');
  const [selected, setSelected] = useState<Project | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const visibleProjects = projects.filter(project => filter === 'all' || project.category === filter);

  return <section id="projects" className="section container">
    <div className="projects-heading"><SectionHeading number="03" label="Практика" title="Меньше слов. Больше проектов." description="Веб-приложения, AI-эксперименты и идеи, которые хочется развивать." /><span className="project-count">{String(projects.length).padStart(2, '0')}<small>selected works</small></span></div>
    <div className="project-filters" role="group" aria-label="Фильтр проектов">{filters.map(item => <button key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}{item.id === 'all' && <span>{projects.length}</span>}</button>)}</div>
    <p className="sr-only" role="status">Показано проектов: {visibleProjects.length}</p>
    <div className={`project-grid ${filter !== 'all' ? 'is-filtered' : ''}`}>
      {visibleProjects.map(project => <article className="project-card" key={project.id}>
        <ProjectVisual id={project.id} />
        <div className="project-body"><div className="project-meta"><span>{project.kind}</span><span>{project.number}</span></div><h3><button onClick={event => { trigger.current = event.currentTarget; setSelected(project); }} aria-label={`Подробнее о проекте ${project.title}`}>{project.title}<span className="project-arrow"><Icon name="arrow" /></span></button></h3><p>{project.description}</p><div className="tags">{project.stack.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div><span className={`project-status ${project.status === 'Завершён' ? 'is-complete' : ''}`}><i />{project.status}</span></div>
      </article>)}
    </div>
    {selected && <ProjectDialog project={selected} returnFocusTo={trigger.current} onClose={() => setSelected(null)} />}
  </section>;
}
