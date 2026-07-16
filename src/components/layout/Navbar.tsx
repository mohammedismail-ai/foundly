import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart, User, QrCode } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import { useStore } from '../../store/useStore'

interface NavbarProps {
  onCartClick: () => void;
}

export default function Navbar({ onCartClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const totalItems = useCartStore((state) => state.totalItems())
  const { user } = useStore()
  
  const getProfileLink = () => {
    if (!user) return '/login'
    return user.role === 'admin' ? '/admin' : '/profile'
  }

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <QrCode className="h-8 w-8 text-accent" />
              <span className="font-bold text-xl tracking-tight">Foundly</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/shop" className="hover:text-accent transition-colors px-3 py-2 rounded-md font-medium">Shop</Link>
              <Link to="/categories" className="hover:text-accent transition-colors px-3 py-2 rounded-md font-medium">Categories</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={onCartClick} className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to={getProfileLink()} className="p-2 hover:bg-muted rounded-full transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/shop" className="block hover:bg-muted px-3 py-2 rounded-md font-medium">Shop</Link>
            <Link to="/categories" className="block hover:bg-muted px-3 py-2 rounded-md font-medium">Categories</Link>
            <Link to={getProfileLink()} className="block hover:bg-muted px-3 py-2 rounded-md font-medium">
              {user ? 'Profile' : 'Login'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
