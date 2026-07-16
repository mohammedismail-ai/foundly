import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { useCartStore } from '../store/useCartStore'
import { ShoppingCart, Heart, ArrowLeft, Star, ShoppingBag } from 'lucide-react'
import CheckoutModal from '../components/cart/CheckoutModal'

export default function ProductDetails() {
  const { id } = useParams()
  const { 
    products, 
    reviews, 
    addReview, 
    wishlist, 
    toggleWishlist, 
    recentlyViewed, 
    addToRecentlyViewed 
  } = useStore()
  
  const { addItem } = useCartStore()

  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewComment, setReviewComment] = useState('')

  useEffect(() => {
    if (id) {
      const prod = products.find(p => p.id === id)
      if (prod) {
        setProduct(prod)
        addToRecentlyViewed(id)
      }
    }
  }, [id, products])

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
        <p className="text-muted-foreground">Finding product details...</p>
      </div>
    )
  }

  // Related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  // Product reviews
  const productReviews = reviews.filter(r => r.productId === product.id)
  const averageRating = productReviews.length > 0 
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : '5.0'

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewerName || !reviewComment) return;
    await addReview(product.id, reviewerName, rating, reviewComment)
    setReviewerName('')
    setReviewComment('')
  }

  const isWishlisted = wishlist.includes(product.id)

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-accent mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        {/* Product Info Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-3xl overflow-hidden border border-border">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm font-bold text-accent uppercase tracking-wider">{product.category}</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">{product.name}</h1>
              </div>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="p-3 bg-card border border-border rounded-full hover:text-red-500 transition-colors shadow-sm"
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Rating Summary */}
            <div className="flex items-center gap-1.5 mb-6">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(Number(averageRating)) ? 'fill-current' : ''}`} />
                ))}
              </div>
              <span className="text-sm font-bold">{averageRating}</span>
              <span className="text-sm text-muted-foreground">({productReviews.length} {productReviews.length === 1 ? 'review' : 'reviews'})</span>
            </div>

            <p className="text-2xl font-extrabold text-foreground mb-6">₹{product.price}</p>

            <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

            {/* Features list */}
            <div className="mb-8 bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features?.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 mt-auto">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-muted-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-xl bg-card">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 hover:bg-muted rounded-l-xl transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold text-base">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-3 py-1.5 hover:bg-muted rounded-r-xl transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => addItem(product, quantity)}
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-border"
                >
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </button>
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="flex-1 bg-accent hover:bg-accent/90 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-accent/25"
                >
                  <ShoppingBag className="h-5 w-5" /> Order Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 pt-12 border-t border-border">
          {/* Reviews Form */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
            <p className="text-muted-foreground mb-6">Have you purchased this product? Leave a review and share your experience.</p>
            
            <form onSubmit={handleAddReview} className="space-y-4 bg-card border border-border p-6 rounded-2xl">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Your Name</label>
                <input 
                  required
                  type="text" 
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="e.g. John" 
                  className="w-full px-4 py-2 border border-border rounded-xl bg-background"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Rating</label>
                <div className="flex gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star className={`h-6 w-6 ${star <= rating ? 'fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Your Comment</label>
                <textarea 
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="What did you think of this tag?" 
                  className="w-full px-4 py-2 border border-border rounded-xl bg-background resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 rounded-xl transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-bold text-lg">Recent Reviews ({productReviews.length})</h3>
            {productReviews.length === 0 ? (
              <div className="text-center py-10 bg-muted/20 border border-dashed border-border rounded-2xl">
                <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {productReviews.map(review => (
                  <div key={review.id} className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-sm">{review.userName}</h4>
                        <div className="flex text-yellow-500 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map(p => (
                <div key={p.id} className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <Link to={`/product/${p.id}`} className="block relative aspect-square overflow-hidden bg-muted">
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">{p.category}</span>
                    <Link to={`/product/${p.id}`} className="block font-bold text-lg hover:text-accent mt-1 line-clamp-1 transition-colors">{p.name}</Link>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-extrabold">₹{p.price}</span>
                      <button 
                        onClick={() => addItem(p)}
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
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 1 && (
          <div className="border-t border-border pt-12">
            <h2 className="text-xl font-bold mb-6">Recently Viewed</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
              {recentlyViewed
                .filter(viewedId => viewedId !== product.id)
                .map(viewedId => {
                  const p = products.find(prod => prod.id === viewedId);
                  if (!p) return null;
                  return (
                    <div key={p.id} className="flex-shrink-0 w-48 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all">
                      <Link to={`/product/${p.id}`} className="block aspect-square overflow-hidden bg-muted">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="p-4">
                        <Link to={`/product/${p.id}`} className="block font-bold text-sm line-clamp-1 hover:text-accent transition-colors">{p.name}</Link>
                        <span className="font-bold text-sm text-accent mt-1 block">₹{p.price}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal for Single Product Checkout */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={[{
          ...product,
          quantity
        }]}
      />
    </div>
  )
}
