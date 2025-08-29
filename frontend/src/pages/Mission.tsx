export default function Mission(){
  return (
    <section className="container py-14 space-y-6">
      <h2 className="text-3xl font-bold">Mission & Purpose</h2>
      <div className="card p-6">
        <p className="text-muted">
          In the American South, heirs' property and missing paperwork have erased generations of Black wealth.
          ForeverDocs provides a community-rooted digital vault and a public, privacy-safe "Digital Family Crest"
          so families can prove preparedness without exposing sensitive details.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">How it Works</h3>
          <ol className="list-decimal pl-5 text-muted space-y-2">
            <li>Upload a copy of a will, deed, or insurance policy (PDF/JPG). We compute a secure hash locally.</li>
            <li>We send only the hash to the backend to generate a mock on-chain record and a shareable crest.</li>
            <li>Families can display the crest publicly, while keeping the actual document private.</li>
          </ol>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-2">What We Don't Store</h3>
          <p className="text-muted">
            We don't store your document or PII in this MVP. Only a fingerprint (hash) leaves your device. The demo simulates a
            blockchain transaction for education and fundraising.
          </p>
        </div>
      </div>
    </section>
  )
}
