import { useRef, useState } from 'react'

export default function Demo(){
  const fileRef = useRef<HTMLInputElement|null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string|undefined>()

  async function handleUpload(e: React.FormEvent){
    e.preventDefault()
    const f = fileRef.current?.files?.[0]
    if(!f) return
    setProcessing(true); setError(undefined)
    try{
      const buf = await f.arrayBuffer()
      const hashBuf = await crypto.subtle.digest('SHA-256', buf)
      const hashHex = Array.from(new Uint8Array(hashBuf)).map(b=>b.toString(16).padStart(2,'0')).join('')
      const res = await fetch(import.meta.env.VITE_API_BASE + '/register', {
        method: 'POST', headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ hash: hashHex, filename: f.name })
      })
      if(!res.ok) throw new Error('Server error')
      const data = await res.json(); setResult(data)
    } catch(err:any){ setError(err.message) }
    finally{ setProcessing(false) }
  }

  return (
    <section className="container py-14">
      <h2 className="text-3xl font-bold">Demo: Create Your Digital Family Crest</h2>
      <form onSubmit={handleUpload} className="card p-6 mt-6 space-y-4">
        <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="block w-full file:btn file:btn-primary file:mr-3" required />
        <button disabled={processing} className="btn btn-primary">{processing? 'Processing…' : 'Generate Crest'}</button>
        {error && <p className="text-red-400">{error}</p>}
      </form>

      {processing && (
        <div className="card p-6 mt-6 animate-pulse">
          <p className="text-muted">Simulating block inclusion… minting crest…</p>
        </div>
      )}

      {result && (
        <div className="card p-6 mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold">Your Crest</h3>
            <img src={result.crestSvg} alt="Digital Family Crest" className="mt-3 w-full h-auto" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Proof</h3>
            <ul className="mt-3 text-sm text-muted space-y-1">
              <li><span className="text-white">Document Hash:</span> {result.hash}</li>
              <li><span className="text-white">Mock Tx:</span> {result.txId}</li>
              <li><span className="text-white">Block #:</span> {result.blockNumber}</li>
              <li><span className="text-white">Timestamp:</span> {new Date(result.timestamp).toLocaleString()}</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
