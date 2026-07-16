import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSent, setIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate contact submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSent(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg">
            Have questions about bulk orders or need recovery assistance? Reach out to our support team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Info Details */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card border border-border p-8 rounded-3xl space-y-6">
              <h3 className="font-bold text-xl mb-4">Support & Info</h3>
              
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-accent/10 rounded-xl text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground">Email Support</h4>
                  <a href="mailto:support@foundly.in" className="text-base font-semibold hover:underline mt-1 block">
                    support@foundly.in
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-success/10 rounded-xl text-success">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground">WhatsApp Business</h4>
                  <a href="https://wa.me/919876543210" className="text-base font-semibold hover:underline mt-1 block">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-violet-500/10 rounded-xl text-violet-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-muted-foreground">Office Address</h4>
                  <p className="text-sm font-semibold leading-relaxed mt-1">
                    Foundly Technologies,<br />
                    ABC Road, Kochi, Kerala, 682001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border p-8 rounded-3xl shadow-xl">
              {isSent ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. Our support team will contact you back in 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSent(false)}
                    className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl transition-all"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="font-bold text-xl mb-4">Send a Message</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">Your Name *</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold">Email Address *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Subject *</label>
                    <input
                      required
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Bulk order inquiry"
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold">Your Message *</label>
                    <textarea
                      required
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type details about your inquiry..."
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
