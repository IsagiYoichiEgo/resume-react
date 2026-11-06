import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Mascot } from './components/Mascot';
import { profile } from './data/resume';

export default function App() {
  return <>
    <a className="skip-link" href="#main">Перейти к содержимому</a>
    <Header />
    <main id="main" tabIndex={-1}>
      <Hero />
      <Projects />
      <section id="about" className="about-section container" aria-labelledby="about-title">
        <div className="about-title"><span className="about-spark" aria-hidden="true">✳</span><h2 id="about-title">Обо мне</h2></div>
        <div className="about-copy"><p>Я Аброрбек, учусь в <span>INAI</span> в Бишкеке. Делаю личные и учебные проекты, использую AI в работе.</p><p>Открыт к небольшим платным заказам: сайтам и веб-интерфейсам.</p></div>
      </section>
      <Contact />
    </main>
    <footer className="site-footer container"><a href="#home" className="brand" aria-label="В начало">{profile.brand}<span>.</span></a><p>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}</p><a className="back-top" href="#home">Наверх <span aria-hidden="true">↑</span></a></footer>
    <Mascot />
  </>;
}
