import { ShoppingBag, QrCode, PhoneCall, ArrowRight, ShieldCheck, Mail, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Recovery Platform
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            How Foundly Works
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Recovering your lost valuables is as easy as 1, 2, 3. No app downloads or monthly subscription fees.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 relative">
          
          {/* Step 1 */}
          <div className="bg-card border border-border p-8 rounded-3xl relative hover:shadow-lg transition-shadow">
            <span className="absolute -top-6 left-8 bg-accent text-white text-xl font-bold h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/25">
              1
            </span>
            <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center mt-4 mb-6">
              <ShoppingBag className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Attach to Valuables</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Order keychains, cards, tags, or stickers from our shop and attach them to your keys, wallet, luggage, helmet, or pet collar.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-card border border-border p-8 rounded-3xl relative hover:shadow-lg transition-shadow">
            <span className="absolute -top-6 left-8 bg-accent text-white text-xl font-bold h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/25">
              2
            </span>
            <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center mt-4 mb-6">
              <QrCode className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Activate via Scan</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Scan the physical QR code with your smartphone camera. Fill out the 60-second activation form to secure your tag profile.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-card border border-border p-8 rounded-3xl relative hover:shadow-lg transition-shadow">
            <span className="absolute -top-6 left-8 bg-accent text-white text-xl font-bold h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/25">
              3
            </span>
            <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center mt-4 mb-6">
              <PhoneCall className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Recover instantly</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              When someone finds your lost item, they scan the QR code and are prompted to call or send a WhatsApp message to you directly.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-16 mb-20 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--color-accent),transparent)] opacity-40" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 tracking-tight">
                Why choose Foundly?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Strict Privacy Controls</h4>
                    <p className="text-sm text-gray-300">Your phone number is secure. Keep your private address or name hidden from finders if you prefer.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">No Subscriptions</h4>
                    <p className="text-sm text-gray-300">No monthly fees or recurring costs. Buy the tag once, and enjoy lifetime activation privileges.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Eco-friendly & Durable</h4>
                    <p className="text-sm text-gray-300">Our tags are constructed using recycled stainless steel and premium materials designed to survive elements.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Call To Action */}
            <div className="bg-card border border-white/10 p-8 rounded-2xl text-foreground flex flex-col justify-between h-80 relative shadow-2xl">
              <div>
                <span className="text-accent font-bold text-xs uppercase tracking-wider">Ready to protect your gear?</span>
                <h3 className="text-2xl font-extrabold mt-2 mb-4 leading-snug">
                  Get your Foundly smart QR pack today.
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Join thousands of users who have protected their house keys, cars, luggage, and pets.
                </p>
              </div>
              <Link 
                to="/shop" 
                className="bg-accent hover:bg-accent/90 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 mt-6 transition-all"
              >
                Explore Smart Tags <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
