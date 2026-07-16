import { useState } from 'react'
import { QrCode, CheckCircle2 } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function ActivateQR() {
  const { activateTag } = useStore()
  const [tagId, setTagId] = useState('')
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    address: ''
  })
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Call store tag activation logic (syncs to Supabase / LocalStorage fallback)
    const result = await activateTag(tagId, formData.ownerName, formData.phone, formData.address)
    
    if (result.success) {
      setMessage(result.message)
      setIsSuccess(true)
    }
    
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Tag Activated!</h2>
          <p className="text-muted-foreground mb-6">
            {message || 'Your QR tag is now linked to your contact details.'}
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 mb-4">
          <QrCode className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Activate Your Tag</h1>
        <p className="text-muted-foreground">
          Link your new QR tag to your contact details so finders can reach you.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleActivate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tag ID / QR Code</label>
            <input 
              required 
              type="text" 
              placeholder="e.g. FND-12345 or test-inactive"
              value={tagId} 
              onChange={(e) => setTagId(e.target.value)} 
              className="w-full p-3 border border-border rounded-xl bg-background" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Owner Name</label>
            <input 
              required 
              type="text" 
              name="ownerName" 
              value={formData.ownerName} 
              onChange={handleInputChange} 
              className="w-full p-3 border border-border rounded-xl bg-background" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mobile Number</label>
            <input 
              required 
              type="tel" 
              name="phone" 
              value={formData.phone} 
              onChange={handleInputChange} 
              className="w-full p-3 border border-border rounded-xl bg-background" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Address (Optional)</label>
            <input 
              type="text" 
              name="address" 
              value={formData.address} 
              onChange={handleInputChange} 
              className="w-full p-3 border border-border rounded-xl bg-background" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Activating...' : 'Activate Tag'}
          </button>
        </form>
      </div>
    </div>
  )
}
