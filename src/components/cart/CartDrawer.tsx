import { useState } from 'react'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '../../store/useCartStore'
import CheckoutModal from './CheckoutModal'

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-background shadow-2xl z-50 flex flex-col transform transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-accent" />
            <h2 className="text-xl font-bold">Your Cart</h2>
            <span className="bg-accent/10 text-accent text-xs font-semibold px-2 py-0.5 rounded-full">
              {totalItems()} {totalItems() === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-40" />
              </div>
              <h3 className="font-bold text-lg mb-1">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                Looks like you haven't added any smart tags to your cart yet.
              </p>
              <button
                onClick={onClose}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 border border-border p-4 rounded-2xl bg-card hover:border-accent/30 transition-all">
                  <div className="w-20 h-20 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-lg bg-background">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-muted rounded-l-lg transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded-r-lg transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm text-foreground">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg self-start transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 bg-card space-y-4">
            <div className="flex justify-between items-center text-base">
              <span className="font-medium text-muted-foreground">Subtotal</span>
              <span className="font-extrabold text-2xl text-accent">₹{totalPrice()}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping & taxes will be calculated during order confirmation.
            </p>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2"
            >
              Checkout on WhatsApp
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal Integration */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          onClose(); // Close cart drawer as well
        }}
        items={items}
        clearCartOnSuccess={true}
      />
    </>
  )
}
