import { Link } from 'react-router-dom'
import { 
  Key, 
  CreditCard, 
  Luggage, 
  Shield, 
  Dog, 
  Car, 
  Eye, 
  Umbrella 
} from 'lucide-react'

const CATEGORIES_DATA = [
  {
    name: 'QR Keychains',
    description: 'Perfect for house keys, car keys, and office entry passes.',
    icon: Key,
    count: 3,
    color: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-500'
  },
  {
    name: 'Wallet Cards',
    description: 'Slim cards designed to fit right inside your credit card slots.',
    icon: CreditCard,
    count: 1,
    color: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-500'
  },
  {
    name: 'Luggage Tags',
    description: 'Track suitcases, backpacks, duffels, and travel gear globally.',
    icon: Luggage,
    count: 2,
    color: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500'
  },
  {
    name: 'Helmet Tags',
    description: 'Curved decals engineered to secure bike and motorcycle helmets.',
    icon: Shield,
    count: 1,
    color: 'from-red-500/20 to-rose-500/20',
    iconColor: 'text-red-500'
  },
  {
    name: 'Pet Tags',
    description: 'Keep your cats and dogs safe with ultra-light round collar tags.',
    icon: Dog,
    count: 1,
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500'
  },
  {
    name: 'Vehicle Stickers',
    description: 'Windshield and frame stickers for cars, motorcycles, and bicycles.',
    icon: Car,
    count: 1,
    color: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-500'
  },
  {
    name: 'Spectacles Sticker',
    description: 'Smart QR stickers for your glasses, sunglasses, and optical frames.',
    icon: Eye,
    count: 1,
    color: 'from-yellow-500/20 to-amber-500/20',
    iconColor: 'text-yellow-500'
  },
  {
    name: 'Umbrella Tags',
    description: 'Wrap-around water-submersible loops for umbrella handles.',
    icon: Umbrella,
    count: 1,
    color: 'from-sky-500/20 to-indigo-500/20',
    iconColor: 'text-sky-500'
  }
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Browse Categories
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Choose the right smart tag format to protect all your valuable personal belongings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES_DATA.map((cat, index) => {
            const IconComponent = cat.icon;
            return (
              <div 
                key={index}
                className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-8"
              >
                {/* Background glow decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} rounded-bl-full filter blur-xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <div>
                  <div className="h-14 w-14 bg-background border border-border rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <IconComponent className={`h-7 w-7 ${cat.iconColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto pt-6 border-t border-border/40">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {cat.count} {cat.count === 1 ? 'Product' : 'Products'}
                  </span>
                  <Link 
                    to={`/shop?category=${encodeURIComponent(cat.name)}`}
                    className="text-sm font-bold text-accent group-hover:underline flex items-center gap-1"
                  >
                    Shop Category &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
