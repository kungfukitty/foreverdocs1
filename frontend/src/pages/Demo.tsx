import { useRef, useState, useEffect } from 'react'
// frontend/src/pages/Demo.tsx

// ... (imports and component definition)

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          throw new Error(`Server error: ${response.status}`);
        }
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }
// ... (rest of the file)
interface RegistrationResult {
  success: boolean
  document: {
    id: string
    hash: string
    filename: string
    blockNumber: number
    txId: string
    timestamp: number
    timestampISO: string
    crestSvg: string
  }
  blockchain: {
    network: string
    confirmations: number
    gasUsed: number
  }
}

export default function Demo() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<RegistrationResult | null>(null)
  const [error, setError] = useState<string | undefined>()
  const [dragActive, setDragActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (processing) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [processing])

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (file.size > maxSize) return 'File size must be less than 10MB'
    if (!allowedTypes.includes(file.type)) return 'File type not supported. Please use PDF, Word, or image files.'
    return null
  }

  async function handleUpload(file: File) {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setProcessing(true)
    setError(undefined)
    setResult(null)
    
    try {
      const buffer = await file.arrayBuffer()
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
      const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')

      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          hash: hashHex, 
          filename: file.name 
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const data: RegistrationResult = await response.json()
      setProgress(100)
      
      setTimeout(() => {
        setResult(data)
      }, 500)

    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to process document')
    } finally {
      setTimeout(() => {
        setProcessing(false)
        setProgress(0)
      }, 1000)
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return
    await handleUpload(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleUpload(files[0])
    }
  }

  const downloadCrest = () => {
    if (!result) return
    const link = document.createElement('a')
    link.href = result.document.crestSvg
    link.download = `${result.document.filename}-crest.svg`
    link.click()
  }

  return (
    <section className="container py-14">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Create Your Digital Family Crest
        </h2>
        <p className="text-muted text-center mb-8">
          Upload any important family document to generate a unique, shareable digital crest.
          Your document never leaves your device—only a secure fingerprint is used.
        </p>

        <div className="card p-6 mb-8">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive 
                  ? 'border-gold bg-gold/5' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="text-4xl">📄</div>
                <div>
                  <p className="text-lg font-semibold">Drop your document here</p>
                  <p className="text-muted">or click to browse files</p>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="btn btn-primary w-full text-lg py-3"
            >
              {processing ? 'Processing...' : 'Generate Family Crest'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}
        </div>

        {processing && (
          <div className="card p-8 mb-8">
            <div className="text-center space-y-4">
              <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto"></div>
              <div>
                <p className="font-semibold">Creating your Digital Family Crest</p>
                <p className="text-muted text-sm">
                  {progress < 30 && "Computing document fingerprint..."}
                  {progress >= 30 && progress < 60 && "Simulating blockchain registration..."}
                  {progress >= 60 && progress < 90 && "Generating unique crest design..."}
                  {progress >= 90 && "Finalizing crest..."}
                </p>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gold h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Your Digital Family Crest</h3>
              <div className="bg-black/20 rounded-xl p-4 mb-4">
                <img 
                  src={result.document.crestSvg} 
                  alt="Digital Family Crest" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={downloadCrest}
                  className="btn btn-primary"
                >
                  Download Crest
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(result.document.crestSvg)}
                  className="btn"
                >
                  Copy Link
                </button>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Document Proof</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Document:</span>
                  <span className="font-mono text-right">{result.document.filename}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Document ID:</span>
                  <span className="font-mono">{result.document.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Fingerprint:</span>
                  <span className="font-mono text-xs break-all">
                    {result.document.hash.slice(0, 16)}...
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Block Number:</span>
                  <span className="font-mono">{result.document.blockNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Transaction:</span>
                  <span className="font-mono">{result.document.txId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Network:</span>
                  <span>{result.blockchain.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Confirmations:</span>
                  <span className="text-green-400">{result.blockchain.confirmations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Registered:</span>
                  <span>{new Date(result.document.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-green-400 text-center font-semibold">✅ Document Successfully Registered</p>
                <p className="text-green-300 text-xs text-center mt-1">
                  Your family legacy is now protected with a verifiable digital record
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="card p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-semibold mb-1">Private & Secure</h4>
            <p className="text-muted text-sm">Your documents never leave your device</p>
          </div>
          <div className="card p-4">
            <div className="text-2xl mb-2">🏛️</div>
            <h4 className="font-semibold mb-1">Blockchain Verified</h4>
            <p className="text-muted text-sm">Tamper-proof digital records</p>
          </div>
          <div className="card p-4">
            <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
            <h4 className="font-semibold mb-1">Family Focused</h4>
            <p className="text-muted text-sm">Designed for generational wealth protection</p>
          </div>
        </div>
      </div>
    </section>
  )
}
