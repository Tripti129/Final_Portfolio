import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { HiArrowUp } from 'react-icons/hi'
import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. Built with React & Tailwind CSS.
        </p>
        <div className="flex items-center gap-4 text-lg text-slate-400">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white"><FaGithub /></a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white"><FaLinkedinIn /></a>
          <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode" className="hover:text-white"><SiLeetcode /></a>
          <a href="#home" aria-label="Back to top" className="ml-2 grid h-9 w-9 place-items-center rounded-full border border-line hover:border-accent hover:text-white"><HiArrowUp /></a>
        </div>
      </div>
    </footer>
  )
}
