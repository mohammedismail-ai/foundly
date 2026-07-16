import { useState, useEffect } from 'react'
import { Search, Filter, SlidersHorizontal, Heart, Eye } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useCartStore } from '../store/useCartStore'
import { Link, useLocation } from 'react-router-dom'

const CATEGORIES = [
  'All',
  'QR Keychains',
  'Wallet Cards',
  'Luggage Tags',
  'Helmet Tags',
  'Pet Tags',
  'Vehicle Stickers',
  'Spectacles Sticker',
  'Umbrella Tags'
];

export default function Shop() {
  const { products, wishlist, toggleWishlist, addToRecentlyViewed, fetchInitialData } = useStore()
  const { addItem } = useCartStore()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  // Read category from URL and validate it exists in our list
  const urlCategory = new URLSearchParams(location.search).get('category') || 'All'
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.includes(urlCategory) ? urlCategory : 'All'
  )

  useEffect(() => {
    fetchInitialData()
  }, [])

  // Reset to 'All' if URL category is no longer valid
  useEffect(() => {
    const cat = new URLSearchParams(location.search).get('category') || 'All'
    setSelectedCategory(CATEGORIES.includes(cat) ? cat : 'All')
  }, [location.search])

  // Filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // Default Featured (natural ID sort)
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Banner */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-accent),transparent)] opacity-40" />
          <div className="relative max-w-xl z-10">
            <span className="bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Foundly Smart Tech
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold mt-4 mb-4 tracking-tight">
              Foundly Shop
            </h1>
            <p className="text-gray-300 text-lg">
              Equip your keys, bags, vehicles, and pets with pre-activated smart QR tags. No setup required—just attach and go.
            </p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8 pb-6 border-b border-border">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search lost & found tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>

          {/* Sort & Quick Filter Toggle */}
          <div className="flex gap-4 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 border border-border px-3 py-2 rounded-xl bg-card">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Categories */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-accent" /> Categories
              </h3>
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-left text-sm font-medium transition-all w-full ${
                      selectedCategory === category
                        ? 'bg-accent text-white shadow-md shadow-accent/20'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products List */}
          <div className="flex-1">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-card border border-border rounded-3xl">
                <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-30" />
                <h3 className="text-xl font-bold mb-2">No Products Found</h3>
                <p className="text-muted-foreground">Try clearing filters or changing search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map(product => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 relative"
                    >
                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-md rounded-full shadow-md text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      {/* Image Area */}
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => addToRecentlyViewed(product.id)}
                        className="relative aspect-square overflow-hidden bg-muted block"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-background text-foreground text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                            <Eye className="h-4 w-4" /> View Details
                          </span>
                        </div>
                      </Link>

                      {/* Info Area */}
                      <div className="p-6 flex-1 flex flex-col">
                        <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">
                          {product.category}
                        </span>
                        <Link
                          to={`/product/${product.id}`}
                          onClick={() => addToRecentlyViewed(product.id)}
                          className="text-lg font-bold hover:text-accent transition-colors mb-2 line-clamp-1 block"
                        >
                          {product.name}
                        </Link>
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-1">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-2xl font-extrabold text-foreground">
                            ₹{product.price}
                          </span>
                          <button
                            onClick={() => addItem(product)}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
