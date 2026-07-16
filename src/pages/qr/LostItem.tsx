import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Phone, ShieldAlert } from 'lucide-react'

// Mock Data
const MOCK_TAGS: Record<string, { active: boolean; owner?: string; phone?: string }> = {
  'test-active': {
    active: true,
    owner: 'John Doe',
    phone: '9876543210'
  },
  'test-inactive': {
    active: false
  }
}

export default function LostItem() {
  const { id } = useParams()
  const [tag, setTag] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate Supabase fetch
    setTimeout(() => {
      setTag(MOCK_TAGS[id as string] || null)
      setIsLoading(false)
    }, 1000)
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
        <p className="text-muted-foreground animate-pulse">Loading Tag Info...</p>
      </div>
    )
  }

  if (!tag) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <ShieldAlert className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Invalid Tag</h2>
        <p className="text-muted-foreground">This QR code is not recognized by our system.</p>
      </div>
    )
  }

  if (!tag.active) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-xl">
          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">Tag Not Activated</h2>
          <p className="text-muted-foreground mb-6">
            This QR Tag has not been activated yet. If you are the owner, please activate it.
          </p>
          <a href="/activate" className="inline-block bg-accent text-white px-6 py-2 rounded-full font-medium">
            Activate Now
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] bg-background py-12 px-4 flex justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-destructive mb-2">Item Found!</h1>
          <p className="text-muted-foreground">
            Thank you for scanning. Please contact the owner to return this item.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl text-center">
          <div className="h-20 w-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-background -mt-16">
            <span className="text-4xl">👋</span>
          </div>
          
          <h2 className="text-xl font-medium text-muted-foreground mb-1">Owner</h2>
          <p className="text-2xl font-bold mb-8">{tag.owner}</p>

          <a 
            href={`tel:${tag.phone}`}
            className="w-full flex items-center justify-center gap-2 bg-success text-white py-4 rounded-xl font-bold text-lg hover:bg-success/90 transition-transform hover:scale-105"
          >
            <Phone className="h-6 w-6" />
            Call Owner
          </a>
        </div>
      </div>
    </div>
  )
}
