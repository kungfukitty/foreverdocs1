import express from 'express'
import cors from 'cors'
import { createCrestSvg, pseudoBlockNumber } from './utils/crest.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

app.get('/api/health', (_,res)=>res.json({ ok:true }))

app.post('/api/register', (req, res) => {
  const { hash, filename } = req.body || {}
  if(!hash) return res.status(400).json({ error: 'hash required' })
  const now = Date.now()
  const blockNumber = pseudoBlockNumber(now)
  const crestSvg = createCrestSvg({ hash, label: filename || 'Family Document' })
  const txId = hash.slice(0,16)
  return res.json({ hash, blockNumber, crestSvg: 'data:image/svg+xml;utf8,' + encodeURIComponent(crestSvg), timestamp: now, txId })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log('ForeverDocs backend on :' + PORT))