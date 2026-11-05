import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { HiDownload, HiArrowRight } from 'react-icons/hi'
import { profile } from '../data/portfolio'
import { Tilt, Magnetic } from './Interactive'

const socials = [
  { href: profile.socials.github, icon: FaGithub, label: 'GitHub' },
  { href: profile.socials.linkedin, icon: FaLinkedinIn, label: 'LinkedIn' },
  { href: profile.socials.leetcode, icon: SiLeetcode, label: 'LeetCode' },
]

export default function Hero() {
  return (
    <section id="home" className="flex min-h-screen items-center pb-16 pt-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <span className="chip mb-6 inline-flex items-center gap-2 !text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to internship opportunities
          </span>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </h1>

          <div className="mt-4 h-9 text-xl font-semibold text-slate-200 sm:text-2xl">
            <TypeAnimation
              sequence={profile.roles.flatMap((r) => [r, 1800])}
              speed={45}
              repeat={Infinity}
              wrapper="span"
            />
            <span className="text-accent2">_</span>
          </div>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-slate-400 lg:mx-0">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Magnetic>
              <a href="#projects" className="btn-primary">
                View my work <HiArrowRight />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resume} download className="btn-ghost">
                <HiDownload /> Download CV
              </a>
            </Magnetic>
          </div>

          <div className="mt-8 flex justify-center gap-3 lg:justify-start">
            {socials.map(({ href, icon: Icon, label }) => (
              <Magnetic key={label} strength={0.5}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-lg text-slate-300 transition-all hover:-translate-y-1 hover:border-accent hover:text-white"
              >
                <Icon />
              </a>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 mx-auto lg:order-2"
        >
          <Tilt max={14} className="relative h-64 w-64 sm:h-80 sm:w-80">
            <div className="absolute -inset-1 animate-[spin_8s_linear_infinite] rounded-full bg-gradient-to-tr from-accent via-fuchsia-500 to-accent2 opacity-80 blur-sm" />
            <div className="absolute inset-0 rounded-full bg-night" />
            <img
              src={profile.photo}
              alt={profile.name}
              className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-full object-cover object-top"
              style={{ transform: 'translateZ(40px)' }}
            />
          </Tilt>
        </motion.div>
      </div>
    </section>
  )
}
