import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// frontend/src/pages/Home.tsx

// ... (imports and component definition)
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch stats');
        }
        return res.json()
      })
      .then(setStats)
      .catch(() => {
        setError('Could not load stats. Please try again later.');
      });
  }, []);

// ... (rest of the component)

      {error && <p className="text-red-500 text-center">{error}</p>}
// ... (rest of the file)
interface Stats {
  documentsRegistered: number
  familiesProtected: number
  acresSecured: number
  lastUpdated: string
}

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('http://localhost:3000/api/stats')
      .then(res => res.json())
      .then(setStats)
      .catch(() => {
        setStats({
          documentsRegistered: 2847,
          familiesProtected: 1293,
          acresSecured: 156000,
          lastUpdated: new Date().toISOString()
        })
      })
  }, [])

  const scrollToImpact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('impact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <section className="container py-14">
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-gold bg-clip-text text-transparent leading-tight">
          Protecting Black family legacies with verifiable digital records
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
          ForeverDocs helps families secure critical documents—wills, deeds, insurance policies—by creating 
          tamper-evident fingerprints and beautiful <span className="text-gold font-semibold">Digital Family Crests</span> 
          without exposing private information.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link className="btn btn-primary text-lg px-6 py-3" to="/demo">
            🏛️ Try the Demo
          </Link>
          <Link className="btn text-lg px-6 py-3" to="/mission">
            📖 Read Our Mission
          </Link>
          <button onClick={scrollToImpact} className="btn text-lg px-6 py-3">
            📊 See the Impact
          </button>
        </div>
      </div>

      <div className="mt-20 grid md:grid-cols-3 gap-8">
        <div className="card p-8 text-center hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">🔐</div>
          <h3 className="text-xl font-bold mb-3">Privacy First</h3>
          <p className="text-muted">
            Your documents never leave your device. We only use secure cryptographic fingerprints 
            to create verifiable records.
          </p>
        </div>
        <div className="card p-8 text-center hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">✦</div>
          <h3 className="text-xl font-bold mb-3">Digital Family Crests</h3>
          <p className="text-muted">
            Generate beautiful, unique crests that prove document existence without revealing 
            sensitive family information.
          </p>
        </div>
        <div className="card p-8 text-center hover:scale-105 transition-transform">
          <div className="text-4xl mb-4">🏘️</div>
          <h3 className="text-xl font-bold mb-3">Community Rooted</h3>
          <p className="text-muted">
            Built specifically for Black families, churches, and community organizations 
            to protect generational wealth.
          </p>
        </div>
      </div>

      <div id="impact" className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">The Crisis We're Addressing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2">1.6M+</div>
            <p className="text-muted">
              Estimated acres of heirs' property across the Black Belt—families at risk without clear titles.
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2">~32%</div>
            <p className="text-muted">
              Americans with a will in 2024; preparedness rates among Black Americans are improving but still low.
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-gold mb-2">56%</div>
            <p className="text-muted">
              Black adults with life insurance—yet claims often fail due to missing paperwork.
            </p>
          </div>
        </div>
      </div>

      {stats && (
        <div className="mt-16 card p-8">
          <h2 className="text-2xl font-bold text-center mb-6">ForeverDocs Impact (Demo)</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gold">
                {stats.documentsRegistered.toLocaleString()}
              </div>
              <p className="text-muted">Documents Protected</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">
                {stats.familiesProtected.toLocaleString()}
              </div>
              <p className="text-muted">Families Secured</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">
                {Math.floor(stats.acresSecured / 1000)}K+
              </div>
              <p className="text-muted">Acres Documented</p>
            </div>
          </div>
          <p className="text-xs text-center text-muted mt-4">
            Last updated: {new Date(stats.lastUpdated).toLocaleString()}
          </p>
        </div>
      )}

      <div className="mt-20 card p-8 text-center bg-gradient-to-r from-gold/10 to-gold/5 border-gold/20">
        <h2 className="text-2xl font-bold mb-4">Ready to Protect Your Family Legacy?</h2>
        <p className="text-muted mb-6 max-w-2xl mx-auto">
          Join families who are taking control of their generational wealth with ForeverDocs' secure document protection.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/demo" className="btn btn-primary text-lg px-8 py-3">
            Start Demo
          </Link>
          <Link to="/waitlist" className="btn text-lg px-8 py-3">
            Join Waitlist
          </Link>
        </div>
      </div>
    </section>
  )
}
