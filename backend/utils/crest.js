export function pseudoBlockNumber(ts){
  return Math.floor(10_000 + (ts / 1000))
}

function colorFrom(hash, offset){
  const v = parseInt(hash.slice(offset, offset+6), 16)
  const hue = v % 360
  return `hsl(${hue} 80% 50%)`
}

export function createCrestSvg({ hash, label }){
  const c1 = colorFrom(hash, 0)
  const c2 = colorFrom(hash, 6)
  const c3 = colorFrom(hash, 12)
  const initials = (label||'FD').split(/\s+/).map(w=>w[0]).join('').slice(0,3).toUpperCase()
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="50%" stop-color="${c2}"/>
        <stop offset="100%" stop-color="${c3}"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="#0f0f0f"/>
    <circle cx="300" cy="200" r="160" fill="url(#g)" opacity="0.25"/>
    <circle cx="300" cy="200" r="120" fill="none" stroke="${c2}" stroke-width="6" opacity="0.6"/>
    <text x="300" y="190" text-anchor="middle" font-size="72" fill="#fff" font-family="ui-sans-serif,system-ui" font-weight="700">${initials}</text>
    <text x="300" y="230" text-anchor="middle" font-size="14" fill="#ddd" font-family="ui-sans-serif,system-ui">Document Fingerprint</text>
    <text x="300" y="260" text-anchor="middle" font-size="12" fill="#bbb" font-family="ui-sans-serif,system-ui">${hash.slice(0,16)}…</text>
  </svg>`
}