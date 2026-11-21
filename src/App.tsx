import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Workflow } from './components/Workflow';
import { Mascot } from './components/Mascot';
import { Marquee } from './components/Marquee';
import { useSpotlight } from './lib/useSpotlight';
import { useMagnetic } from './lib/useMagnetic';
import { Cursor } from './components/Cursor';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { useViewportReveal } from './lib/useViewportReveal';

export default function App() {
  useViewportReveal();
  useSpotlight('.contact-panel');
  useMagnetic();
  return <>
    <a className="skip-link" href="#main">Перейти к содержимому</a>
    <Header />
    <main id="main" tabIndex={-1}>
      <Hero />
      <Projects />
      <Marquee />
      <About />
      <Workflow />
      <Contact />
    </main>
    <Footer />
    <Mascot />
    <Cursor />
  </>;
}
