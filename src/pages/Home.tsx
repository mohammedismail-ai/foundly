import { ArrowRight, ShieldCheck, Smartphone, Zap, Star, Key, CreditCard, Luggage, Shield, Dog, Car, Eye, Umbrella } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { useCartStore } from '../store/useCartStore'

const FEATURED_CATEGORIES = [
  { name: 'QR Keychains', icon: Key, color: 'from-blue-500/20 to-indigo-500/20', text: 'For Keys' },
  { name: 'Wallet Cards', icon: CreditCard, color: 'from-purple-500/20 to-pink-500/20', text: 'For Wallets' },
  { name: 'Luggage Tags', icon: Luggage, color: 'from-amber-500/20 to-orange-500/20', text: 'For Travel Bags' },
  { name: 'Helmet Tags', icon: Shield, color: 'from-red-500/20 to-rose-500/20', text: 'For Bike Safety' },
  { name: 'Pet Tags', icon: Dog, color: 'from-emerald-500/20 to-teal-500/20', text: 'For Pets' },
  { name: 'Vehicle Stickers', icon: Car, color: 'from-violet-500/20 to-purple-500/20', text: 'For Windshields' },
  { name: 'Spectacles Sticker', icon: Eye, color: 'from-yellow-500/20 to-amber-500/20', text: 'For Glasses' },
  { name: 'Umbrella Tags', icon: Umbrella, color: 'from-sky-500/20 to-indigo-500/20', text: 'For Umbrellas' }
];

export default function Home() {
  const navigate = useNavigate()
  const { products, reviews, addToRecentlyViewed } = useStore()
  const { addItem } = useCartStore()

  // Get first 4 products for homepage display
  const featuredProducts = products.slice(0, 4)

  // Get homepage reviews
  const homeReviews = reviews.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-24 sm:py-36">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block mb-6">
            Smart Lost & Found Decals
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Never Lose Your <br />
            <span className="text-accent bg-clip-text">Valuables Again</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-gray-300 mb-10 leading-relaxed">
            Smart QR Lost & Found products that instantly connect finders with owners without exposing private info. Protect keys, bags, and pets.
          </p>
          <div className="flex justify-center">
            <Link to="/shop" className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-accent/25 hover:translate-y-[-2px]">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-14 w-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent">
                <Smartphone className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Instant Scanning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Finders simply scan the tag QR code using any smartphone. No special apps needed.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-14 w-14 bg-success/10 rounded-2xl flex items-center justify-center mb-6 text-success">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Owner Privacy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Your address and email are hidden. You control what information is displayed to finders.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-14 w-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 text-amber-500">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Lifetime Active</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">One-time purchase, activated for life. Zero monthly subscriptions or hidden charges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight">Featured Categories</h2>
            <p className="text-muted-foreground mt-2">Explore our range of smart QR tags tailored for all your gear.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {FEATURED_CATEGORIES.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={idx}
                  onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.name)}`)}
                  className="group flex flex-col items-center text-center p-4 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-accent/40 transition-all w-[calc(50%-8px)] sm:w-32"
                >
                  <div className={`h-12 w-12 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <IconComponent className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="text-[11px] font-bold tracking-tight line-clamp-2 leading-tight">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/20 border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Best Sellers</h2>
              <p className="text-muted-foreground mt-2">Protect your valuables with our most popular smart QR tags.</p>
            </div>
            <Link to="/shop" className="text-sm font-bold text-accent hover:underline flex items-center gap-1">
              View All Shop &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <div 
                key={product.id}
                className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <Link 
                  to={`/product/${product.id}`}
                  onClick={() => addToRecentlyViewed(product.id)}
                  className="aspect-square bg-muted overflow-hidden block relative"
                >
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                </Link>
                
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{product.category}</span>
                    <Link 
                      to={`/product/${product.id}`} 
                      className="block font-bold text-base hover:text-accent mt-1 line-clamp-1 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <span className="font-extrabold text-base">₹{product.price}</span>
                    <button 
                      onClick={() => addItem(product)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight">Loved by Customers</h2>
            <p className="text-muted-foreground mt-2">See how Foundly is helping owners recover their lost assets.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeReviews.map(review => (
              <div key={review.id} className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
                <div className="flex justify-between items-center border-t border-border/40 pt-4 text-xs font-bold">
                  <span>{review.userName}</span>
                  <span className="text-muted-foreground">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
