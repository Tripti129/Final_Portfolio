import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { profile } from '../data/portfolio'

const links = ['About', 'Skills', 'Experience', 'Projects', 'Hackathons', 'Achievements', 'Contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const current = links
        .map((l) => document.getElementById(l.toLowerCase()))
        .filter(Boolean)
        .findLast((el) => el.getBoundingClientRect().top < 140)
      setActive(current ? current.id : '')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-night/80 backdrop-blur-lg' : ''
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-xl font-bold text-white">
          {profile.firstName}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === l.toLowerCase() ? 'bg-white/[0.06] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary hidden !px-5 !py-2 lg:inline-flex">
          Resume
        </a>

        <button
          className="text-2xl text-white lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-line bg-night/95 backdrop-blur-lg lg:hidden"
          >
            {links.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-slate-300 hover:text-white"
                >
                  {l}
                </a>
              </li>
            ))}
            <li className="px-6 pb-5 pt-2">
              <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-primary">
                Resume
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
