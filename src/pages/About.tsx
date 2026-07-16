import { Target, Heart, ShieldCheck, Sparkles } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4 mb-4">
            About Foundly
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            We are on a mission to ensure that your lost belongings always find their way back home.
          </p>
        </div>

        {/* Brand narrative block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Bridging the gap between Finders and Owners.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Every day, thousands of keys, wallets, bags, and pets are lost. In most cases, the finders want to return these items but have no way to contact the owner without compromising privacy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Foundly was created to solve this problem. Our Smart QR technology enables a safe, immediate, and frictionless connection. By scanning a unique QR code on the item, finders can quickly initiate a call or send a WhatsApp message to the owner, keeping both parties secure.
            </p>
          </div>
          <div className="relative aspect-video lg:aspect-square bg-muted rounded-3xl overflow-hidden border border-border">
            <img 
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop" 
              alt="Foundly technology" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-card border border-border p-6 rounded-2xl">
            <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 text-accent">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Our Mission</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To reduce lost property anxiety globally using simple, durable, smart recovery tags.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl">
            <div className="h-12 w-12 bg-success/10 rounded-xl flex items-center justify-center mb-4 text-success">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Privacy First</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Protecting owner identity is core to our product design and database architecture.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl">
            <div className="h-12 w-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4 text-violet-500">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Customer Loved</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Crafting premium accessories you are proud to carry on your car keys, bags, and pets.
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl">
            <div className="h-12 w-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-4 text-yellow-500">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Zero Maintenance</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              No batteries to charge, no monthly subscription fees, and no complicated apps to install.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
