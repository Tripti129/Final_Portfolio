import { FaReact, FaNodeJs, FaJava, FaPython, FaGitAlt, FaHtml5, FaCss3Alt, FaBootstrap, FaGithub } from 'react-icons/fa'
import {
  SiJavascript, SiC, SiCplusplus, SiMongodb, SiMysql, SiExpress, SiTailwindcss, SiRedux,
  SiSocketdotio, SiPostman, SiNumpy, SiPandas, SiJquery, SiJsonwebtokens,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import Section, { Reveal } from './Section'
import { skills } from '../data/portfolio'

const icons = {
  C: [SiC, '#A8B9CC'], 'C++': [SiCplusplus, '#00599C'], Java: [FaJava, '#f89820'], Python: [FaPython, '#3776AB'],
  JavaScript: [SiJavascript, '#F7DF1E'], HTML5: [FaHtml5, '#E34F26'], CSS3: [FaCss3Alt, '#1572B6'],
  'React.js': [FaReact, '#61DAFB'], Redux: [SiRedux, '#764ABC'], 'Tailwind CSS': [SiTailwindcss, '#38BDF8'],
  Bootstrap: [FaBootstrap, '#7952B3'], jQuery: [SiJquery, '#0769AD'], 'Node.js': [FaNodeJs, '#5FA04E'],
  'Express.js': [SiExpress, '#ffffff'], 'JWT Auth': [SiJsonwebtokens, '#d63aff'], 'Socket.IO': [SiSocketdotio, '#ffffff'],
  MongoDB: [SiMongodb, '#47A248'], MySQL: [SiMysql, '#4479A1'], NumPy: [SiNumpy, '#4DABCF'], Pandas: [SiPandas, '#E70488'],
  Git: [FaGitAlt, '#F05032'], GitHub: [FaGithub, '#ffffff'], Postman: [SiPostman, '#FF6C37'], 'VS Code': [VscVscode, '#007ACC'],
}

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="My technical toolkit">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.08} className="card p-6">
            <h3 className="mb-4 text-base font-semibold">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((s) => {
                const [Icon, color] = icons[s] || []
                return (
                  <span
                    key={s}
                    className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-sm text-slate-200 transition-colors hover:border-accent/50"
                  >
                    {Icon && <Icon style={{ color }} />}
                    {s}
                  </span>
                )
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
