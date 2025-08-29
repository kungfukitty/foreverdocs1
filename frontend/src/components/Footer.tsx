export default function Footer(){
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container py-10 grid md:grid-cols-3 gap-6 text-sm text-muted">
        <div>
          <div className="font-semibold text-white mb-2">ForeverDocs</div>
          <p>Community-rooted digital vaults protecting Black family legacies.</p>
        </div>
        <nav className="flex flex-col gap-2">
          <a className="link" href="/mission">Mission</a>
          <a className="link" href="/demo">Demo</a>
          <a className="link" href="/waitlist">Waitlist</a>
          <a className="link" href="/ambassador">Ambassador</a>
          <a className="link" href="/sponsor">Sponsor</a>
        </nav>
        <div>
          <p className="text-white">Built for families, faith groups, and community orgs.</p>
          <p className="mt-2">© {new Date().getFullYear()} ForeverDocs</p>
        </div>
      </div>
    </footer>
  )
}
