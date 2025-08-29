import { Link, NavLink } from 'react-router-dom'

export default function Nav(){
  const item = 'px-3 py-2 rounded-xl hover:bg-white/10'
  const active = ({isActive}:{isActive:boolean}) => isActive ? item+ ' bg-white/10' : item
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-ink/60 border-b border-white/10">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-gold">✦</span> ForeverDocs
        </Link>
        <div className="hidden md:flex gap-1 text-sm">
          <NavLink to="/mission" className={active}>Mission</NavLink>
          <NavLink to="/demo" className={active}>Demo</NavLink>
          <NavLink to="/waitlist" className={active}>Waitlist</NavLink>
          <NavLink to="/ambassador" className={active}>Ambassador</NavLink>
          <NavLink to="/sponsor" className={active}>Sponsor</NavLink>
        </div>
      </nav>
    </header>
  )
}
