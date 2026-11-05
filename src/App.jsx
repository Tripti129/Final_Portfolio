import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Hackathons from './components/Hackathons'
import Achievements from './components/Achievements'
import CodingStats from './components/CodingStats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MouseEffects from './components/MouseEffects'
import { useMouseParallax } from './components/Interactive'
import { motion } from 'framer-motion'

export default function App() {
  const far = useMouseParallax(60)
  const near = useMouseParallax(-40)
  return (
    <div className="relative min-h-screen overflow-x-hidden" onPointerMove={(e) => { far.handler(e); near.handler(e) }}>
      <MouseEffects />
      {/* background glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div style={{ x: far.x, y: far.y }} className="absolute -top-40 left-[calc(50%-350px)] h-[500px] w-[700px] rounded-full bg-accent/20 blur-[120px]" />
        <motion.div style={{ x: near.x, y: near.y }} className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent2/10 blur-[120px]" />
        <div className="bg-grid absolute inset-0" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Hackathons />
        <Achievements />
        <CodingStats />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
