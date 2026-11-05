import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent2">{eyebrow}</p>
          <h2 className="mb-12 text-3xl font-bold sm:text-4xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
