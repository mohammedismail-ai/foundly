import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sun, 
  Moon, 
  QrCode, 
  Heart 
} from 'lucide-react'

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Sync state with HTML class list
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDarkMode(true)
    }
  }

  return (
    <footer className="bg-card border-t border-border mt-auto pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <QrCode className="h-7 w-7 text-accent" />
              <span className="font-extrabold text-xl tracking-tight">Foundly</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Smart QR Lost & Found tags designed to keep your personal valuables safe. Instantly connects finders and owners with zero privacy exposure.
            </p>
            
            {/* Socials - Using inline SVGs for reliability */}
            <div className="flex gap-4 pt-2">
              <a 
                href="https://instagram.com/foundly" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-muted hover:bg-accent hover:text-white rounded-xl transition-all"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop" className="hover:text-accent transition-colors">Shop Tags</Link></li>
              <li><Link to="/categories" className="hover:text-accent transition-colors">Categories</Link></li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Info</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} Foundly. Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for your security.
          </p>

          {/* Theme Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-border"
          >
            {isDarkMode ? (
              <>
                <Sun className="h-4 w-4 text-yellow-500" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-indigo-500" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </div>


    </footer>
  )
}
