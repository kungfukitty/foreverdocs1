export function pseudoBlockNumber(ts) {
  return Math.floor(50_000 + (ts / 1000))
}

function colorFrom(hash, offset) {
  const v = parseInt(hash.slice(offset, offset + 6), 16)
  const hue = v % 360
  const saturation = 70 + (v % 30)
  const lightness = 45 + (v % 20)
  return `hsl(${hue} ${saturation}% ${lightness}%)`
}

function generatePattern(hash) {
  const patterns = []
  for (let i = 0; i < 6; i++) {
    const val = parseInt(hash.slice(i * 4, i * 4 + 4), 16)
    const x = (val % 200) + 200
    const y = (val % 150) + 125
    const size = (val % 30) + 20
    patterns.push({ x, y, size, opacity: (val % 40) + 20 })
  }
  return patterns
}

export function createCrestSvg({ hash, label, blockNumber, documentId }) {
  const c1 = colorFrom(hash, 0)
  const c2 = colorFrom(hash, 8)
  const c3 = colorFrom(hash, 16)
  const c4 = colorFrom(hash, 24)
  
  const words = (label || 'Family Document').split(/[\s\-_]+/).filter(w => w.length > 0)
  let initials = words.slice(0, 3).map(w => w[0].toUpperCase()).join('')
  if (initials.length < 2) initials = 'FD'
  
  const patterns = generatePattern(hash)
  const patternElements = patterns.map((p, i) => 
    `<circle cx="${p.x}" cy="${p.y}" r="${p.size}" fill="${i % 2 === 0 ? c3 : c4}" opacity="${p.opacity / 100}" />`
  ).join('')
  
  const shieldPath = "M300 80 L450 150 L450 280 C450 320 380 360 300 370 C220 360 150 320 150 280 L150 150 Z"
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
    <linearGradient id="main-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="33%" stop-color="${c2}"/>
      <stop offset="66%" stop-color="${c3}"/>
      <stop offset="100%" stop-color="${c4}"/>
    </linearGradient>
    <radialGradient id="shield-gradient" cx="50%" cy="40%">
      <stop offset="0%" stop-color="${c2}" stop-opacity="0.3"/>
      <stop offset="70%" stop-color="${c1}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="${c3}" stop-opacity="0.05"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <rect width="600" height="400" fill="url(#bg-gradient)"/>
  ${patternElements}
  <path d="${shieldPath}" fill="url(#shield-gradient)" stroke="${c2}" stroke-width="3" opacity="0.8"/>
  <circle cx="300" cy="200" r="100" fill="none" stroke="url(#main-gradient)" stroke-width="4" filter="url(#glow)"/>
  <circle cx="300" cy="200" r="80" fill="url(#main-gradient)" opacity="0.15"/>
  <text x="300" y="210" text-anchor="middle" font-size="48" fill="white" font-family="serif" font-weight="bold" filter="url(#glow)">${initials}</text>
  <text x="300" y="240" text-anchor="middle" font-size="10" fill="#ffd700" font-family="sans-serif" font-weight="600">FAMILY LEGACY</text>
  <text x="300" y="300" text-anchor="middle" font-size="9" fill="#888" font-family="monospace">BLOCK #${blockNumber}</text>
  <text x="300" y="315" text-anchor="middle" font-size="8" fill="#666" font-family="monospace">${hash.slice(0, 8)}...${hash.slice(-8)}</text>
  <g stroke="${c1}" stroke-width="2" fill="none" opacity="0.6">
    <path d="M50 50 L80 50 L80 80"/>
    <path d="M550 50 L520 50 L520 80"/>
    <path d="M50 350 L80 350 L80 320"/>
    <path d="M550 350 L520 350 L520 320"/>
  </g>
  <text x="300" y="380" text-anchor="middle" font-size="8" fill="#444" font-family="sans-serif">ForeverDocs Digital Family Crest</text>
  <text x="50" y="25" font-size="8" fill="#555" font-family="monospace">ID: ${documentId}</text>
  <text x="550" y="25" text-anchor="end" font-size="8" fill="#555" font-family="monospace">${new Date().getFullYear()}</text>
</svg>`
}
