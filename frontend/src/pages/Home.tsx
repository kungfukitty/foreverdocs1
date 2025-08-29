import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <section className="container py-14">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Protecting Black family legacies with a simple, verifiable digital record.
      </h1>
      <p className="mt-4 text-muted max-w-2xl">
        ForeverDocs lets families log the existence of critical documents—wills, deeds, insurance—by uploading a file to create
        a tamper-evident fingerprint and a public <span className="text-gold font-semibold">Digital Family Crest</span> (no private data).
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link className="btn btn-primary" to="/demo">Try the Demo</Link>
        <Link className="btn" to="/mission">Read the Mission</Link>
        <a className="btn" href="#impact">See the Impact</a>
      </div>

      <div id="impact" className="grid md:grid-cols-3 gap-4 mt-10">
        <div className="card p-5">
          <div className="text-3xl font-bold">1.6M+</div>
          <p className="text-muted">Estimated acres of heirs' property across the Black Belt—families at risk without clear title.</p>
        </div>
        <div className="card p-5">
          <div className="text-3xl font-bold">~32%</div>
          <p className="text-muted">Americans with a will in 2024. Rates among Black Americans are rising—but still too low.</p>
        </div>
        <div className="card p-5">
          <div className="text-3xl font-bold">56%</div>
          <p className="text-muted">Black adults who own life insurance—yet many report needing more coverage documentation.</p>
        </div>
      </div>
    </section>
  )
}
