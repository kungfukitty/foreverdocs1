import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const item = 'px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-200'
  const active = ({ isActive }: { isActive: boolean }) => 
    (isActive ? `${item} bg-white/10 text-gold` : item)

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-ink/60 border-b border-white/10">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <span className="text-gold text-2xl">✦</span> 
          <span>ForeverDocs</span>
        </Link>

        <div className="hidden md:flex gap-1 text-sm">
          <NavLink to="/mission" className={active}>Mission</NavLink>
          <NavLink to="/demo" className={active}>Demo</NavLink>
          <NavLink to="/waitlist" className={active}>Waitlist</NavLink>
          <NavLink to="/ambassador" className={active}>Ambassador</NavLink>
          <NavLink to="/sponsor" className={active}>Sponsor</NavLink>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className="w-6 h-5 flex flex-col justify-center items-center">
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
          </div>
        </button>
      </nav>

      <div className={`md:hidden border-b border-white/10 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container py-4 space-y-1">
          {['mission', 'demo', 'waitlist', 'ambassador', 'sponsor'].map(path => (
            <NavLink 
              key={path}
              to={`/${path}`}
              className={({ isActive }) => `block px-4 py-3 rounded-xl transition-all capitalize ${isActive ? 'bg-white/10 text-gold' : 'hover:bg-white/5'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {path}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}
