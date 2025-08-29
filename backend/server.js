import express from 'express'
import cors from 'cors'
import { createCrestSvg, pseudoBlockNumber } from './utils/crest.js'
import { nanoid } from 'nanoid'

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(express.json({ limit: '50mb' }))

app.get('/api/health', (_, res) => {
  res.json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    service: 'ForeverDocs Backend'
  })
})

app.post('/api/register', (req, res) => {
  try {
    const { hash, filename } = req.body || {}
    
    if (!hash) {
      return res.status(400).json({ 
        error: 'Document hash is required',
        code: 'MISSING_HASH'
      })
    }
    
    if (!/^[a-f0-9]{64}$/i.test(hash)) {
      return res.status(400).json({ 
        error: 'Invalid hash format. Expected SHA-256 hex string.',
        code: 'INVALID_HASH'
      })
    }

    const now = Date.now()
    const blockNumber = pseudoBlockNumber(now)
    const documentId = nanoid(8)
    const txId = hash.slice(0, 16)
    
    const crestSvg = createCrestSvg({ 
      hash, 
      label: filename || 'Family Document',
      blockNumber,
      documentId
    })
    
    const response = {
      success: true,
      document: {
        id: documentId,
        hash,
        filename: filename || 'Untitled Document',
        blockNumber,
        txId,
        timestamp: now,
        timestampISO: new Date(now).toISOString(),
        crestSvg: 'data:image/svg+xml;utf8,' + encodeURIComponent(crestSvg)
      },
      blockchain: {
        network: 'ForeverDocs TestNet',
        confirmations: Math.floor(Math.random() * 3) + 1,
        gasUsed: Math.floor(Math.random() * 50000) + 21000
      }
    }
    
    setTimeout(() => {
      res.json(response)
    }, 1500)
    
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      error: 'Internal server error during document registration',
      code: 'REGISTRATION_FAILED'
    })
  }
})

app.get('/api/verify/:hash', (req, res) => {
  try {
    const { hash } = req.params
    
    if (!/^[a-f0-9]{64}$/i.test(hash)) {
      return res.status(400).json({ 
        error: 'Invalid hash format',
        code: 'INVALID_HASH'
      })
    }

    const mockTimestamp = Date.now() - Math.floor(Math.random() * 86400000)
    
    res.json({
      verified: true,
      hash,
      registrationTime: mockTimestamp,
      blockNumber: pseudoBlockNumber(mockTimestamp),
      status: 'CONFIRMED'
    })
  } catch (error) {
    res.status(500).json({
      error: 'Verification failed',
      code: 'VERIFICATION_ERROR'
    })
  }
})

app.get('/api/stats', (_, res) => {
  res.json({
    documentsRegistered: Math.floor(Math.random() * 1000) + 2500,
    familiesProtected: Math.floor(Math.random() * 500) + 850,
    acresSecured: Math.floor(Math.random() * 50000) + 125000,
    lastUpdated: new Date().toISOString()
  })
})

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({
    error: 'Internal server error',
    code: 'UNKNOWN_ERROR'
  })
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    code: 'NOT_FOUND',
    path: req.path
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🏛️  ForeverDocs backend running on port ${PORT}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`)
  console.log(`📋 Demo ready at: http://localhost:5173`)
})
