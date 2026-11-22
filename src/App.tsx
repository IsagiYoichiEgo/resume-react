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
import { Story } from './components/Story';
import { Moods } from './components/Moods';
import { Mission } from './components/Mission';
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
      <Story />
      <About />
      <Moods />
      <Workflow />
      <Mission />
      <Contact />
    </main>
    <Footer />
    <Mascot />
    <Cursor />
  </>;
}
