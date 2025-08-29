export default function Mission() {
  return (
    <section className="container py-14">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Mission & Purpose
        </h2>
        <div className="text-center mb-12">
          <p className="text-xl text-muted max-w-3xl mx-auto">
            ForeverDocs addresses the urgent crisis of missing documentation that has erased 
            generations of Black wealth, particularly in the American South.
          </p>
        </div>

        <div className="card p-8 mb-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20">
          <h3 className="text-2xl font-bold mb-4 text-center">The Problem</h3>
          <div className="space-y-4 text-muted">
            <p>
              In the American South, heirs' property and missing paperwork have systematically 
              erased generations of Black wealth. When families lack proper documentation for 
              wills, deeds, and insurance policies, their hard-earned assets disappear.
            </p>
            <p>
              <strong className="text-white">Heirs' property</strong> occurs when land is passed down 
              without a will, creating fractional ownership among dozens of relatives. Without clear 
              title, families can't access loans, sell property, or protect their land from exploitation.
            </p>
          </div>
        </div>

        <div className="card p-8 mb-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Our Solution</h3>
          <p className="text-muted text-center mb-6">
            ForeverDocs provides a community-rooted digital vault and privacy-safe 
            "Digital Family Crest" system that proves document preparedness without 
            exposing sensitive family information.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-3 text-gold">How It Works</h4>
              <ol className="list-decimal pl-5 space-y-3 text-muted">
                <li>
                  <strong className="text-white">Secure Upload:</strong> Families upload copies 
                  of wills, deeds, or insurance policies. We compute a secure SHA-256 hash locally.
                </li>
                <li>
                  <strong className="text-white">Blockchain Registration:</strong> Only the 
                  document fingerprint is sent to create a tamper-evident record.
                </li>
                <li>
                  <strong className="text-white">Digital Family Crest:</strong> Families receive 
                  a beautiful, shareable crest that proves they have proper documentation.
                </li>
              </ol>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-3 text-gold">Privacy Protection</h4>
              <div className="space-y-3 text-muted">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <h5 className="font-semibold text-green-400 mb-2">✅ What We DO</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Create secure document fingerprints</li>
                    <li>• Generate beautiful family crests</li>
                    <li>• Provide blockchain verification</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <h5 className="font-semibold text-red-400 mb-2">🚫 What We DON'T Store</h5>
                  <ul className="text-sm space-y-1">
                    <li>• Your actual documents</li>
                    <li>• Personal identifying information</li>
                    <li>• Document contents or details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Join the Movement</h3>
          <p className="text-muted mb-6 max-w-2xl mx-auto">
            Help us build a future where every Black family has the tools and knowledge 
            to protect their generational wealth through proper documentation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/demo" className="btn btn-primary">Try the Demo</a>
            <a href="/ambassador" className="btn">Become an Ambassador</a>
            <a href="/sponsor" className="btn">Support Families</a>
          </div>
        </div>
      </div>
    </section>
  )
}
