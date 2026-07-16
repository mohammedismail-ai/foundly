import { useState } from 'react'
import { X, Send } from 'lucide-react'
import { formatInstagramMessage, openInstagramCheckout } from '../../lib/instagram'
import { useStore } from '../../store/useStore'
import { useCartStore } from '../../store/useCartStore'
import type { CartItem } from '../../types'

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  clearCartOnSuccess?: boolean;
}

export default function CheckoutModal({ isOpen, onClose, items, clearCartOnSuccess = false }: CheckoutModalProps) {
  const { instagramUsername, createOrder } = useStore()
  const { clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen || items.length === 0) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Calculate details
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    const orderPayload = {
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email || undefined,
      delivery_address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      product_list: items.map(item => ({
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.images[0]
      })),
      total_price: totalPrice,
      order_status: 'Pending' as const
    }

    try {
      // Save order to store (syncs with Supabase if configured)
      await createOrder(orderPayload)

      // Format Instagram Message
      const message = formatInstagramMessage(items, formData)
      
      // Open Instagram click to chat
      openInstagramCheckout(message, instagramUsername)

      if (clearCartOnSuccess) {
        clearCart()
      }

      onClose()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold">Checkout Details</h2>
            <p className="text-sm text-muted-foreground mt-1">Complete your details to place order on Instagram</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Customer Name *</label>
            <input
              required
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Mobile Number *</label>
              <input
                required
                type="tel"
                name="phone"
                placeholder="10-digit number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Email (Optional)</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Delivery Address *</label>
            <input
              required
              type="text"
              name="address"
              placeholder="House, Street, Area"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">City *</label>
              <input
                required
                type="text"
                name="city"
                placeholder="e.g. Kochi"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">State *</label>
              <input
                required
                type="text"
                name="state"
                placeholder="e.g. Kerala"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Pincode *</label>
            <input
              required
              type="text"
              name="pincode"
              placeholder="6-digit pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Order Summary inside Modal */}
          <div className="mt-6 border-t border-border pt-4">
            <h4 className="font-bold text-sm mb-2 text-muted-foreground uppercase tracking-wider">Order Summary</h4>
            <div className="bg-muted/40 rounded-2xl p-4 space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span>{item.name} <span className="text-muted-foreground">×{item.quantity}</span></span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base">
                <span>Total Amount</span>
                <span className="text-accent">₹{items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-success hover:bg-success/90 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 mt-6 transition-all disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
            {isSubmitting ? 'Processing...' : 'Place Order on Instagram'}
          </button>
        </form>
      </div>
    </div>
  )
}
