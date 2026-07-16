import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import type { Product, Order } from '../../store/useStore'
import { 
  ShoppingBag, 
  Settings, 
  QrCode, 
  Plus, 
  Edit3, 
  Trash2, 
  TrendingUp, 
  Save, 
  LogOut 
} from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { 
    user, 
    logout,
    products, 
    orders, 
    qrTags, 
    instagramUsername,
    updateOrderStatus,
    upsertProduct,
    deleteProduct,
    updateInstagramUsername,
    fetchInitialData
  } = useStore()

  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'tags' | 'settings'>('products')

  // Product CRUD states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'QR Keychains',
    description: '',
    price: 0,
    stock: 0,
    images: [''],
    features: ['']
  })

  // Settings states
  const [igUsernameInput, setIgUsernameInput] = useState(instagramUsername)
  const [settingsSuccess, setSettingsSuccess] = useState(false)

  // Auth block
  useEffect(() => {
    fetchInitialData()
    if (!user || user.role !== 'admin') {
      navigate('/login')
    }
  }, [user])

  useEffect(() => {
    setIgUsernameInput(instagramUsername)
  }, [instagramUsername])

  if (!user || user.role !== 'admin') return null;

  // Handle product edit click
  const handleEditClick = (prod: Product) => {
    setEditingProduct(prod)
    setProductForm({
      name: prod.name,
      category: prod.category,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      images: [prod.images?.[0] || ''],
      features: prod.features || ['']
    })
  }

  // Handle product save
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...productForm,
      id: editingProduct?.id || undefined
    }
    await upsertProduct(payload)
    setEditingProduct(null)
    setProductForm({
      name: '',
      category: 'QR Keychains',
      description: '',
      price: 0,
      stock: 0,
      images: [''],
      features: ['']
    })
  }

  // Save Settings
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateInstagramUsername(igUsernameInput)
    setSettingsSuccess(true)
    setTimeout(() => setSettingsSuccess(false), 2000)
  }

  // Totals calculations
  const totalSales = orders.reduce((sum, o) => o.order_status !== 'Cancelled' ? sum + o.total_price : sum, 0)
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Side bar */}
      <aside className="w-64 bg-card border-r border-border p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <QrCode className="h-8 w-8 text-accent" />
            <span className="font-extrabold text-lg">Foundly Admin</span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'products' ? 'bg-accent text-white' : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <ShoppingBag className="h-4 w-4" /> Products
            </button>
            
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'orders' ? 'bg-accent text-white' : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <TrendingUp className="h-4 w-4" /> Orders
            </button>


            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'settings' ? 'bg-accent text-white' : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <Settings className="h-4 w-4" /> Settings
            </button>
          </nav>
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-2 text-sm font-bold text-destructive hover:underline p-3"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 md:hidden">
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-accent" />
            <span className="font-extrabold text-sm">Foundly Admin</span>
          </div>
          <button onClick={logout} className="text-destructive font-bold text-xs flex items-center gap-1">
            <LogOut className="h-3 w-3" /> Logout
          </button>
        </header>

        {/* Tab Selector for Mobile */}
        <div className="flex md:hidden border-b border-border mb-6">
          {(['products', 'orders', 'settings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-bold capitalize border-b-2 transition-all ${
                activeTab === tab ? 'border-accent text-accent' : 'border-transparent text-muted-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Total Sales (Demo)</h4>
            <p className="text-3xl font-extrabold">₹{totalSales}</p>
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Inventory Stock</h4>
            <p className="text-3xl font-extrabold">{totalStock} Units</p>
          </div>
        </div>

        {/* Tab Contents: Products */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Products</h2>
              <button 
                onClick={() => {
                  setEditingProduct({} as Product)
                  setProductForm({
                    name: '',
                    category: 'QR Keychains',
                    description: '',
                    price: 0,
                    stock: 0,
                    images: [''],
                    features: ['']
                  })
                }}
                className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 shadow-md shadow-accent/20"
              >
                <Plus className="h-4 w-4" /> Add Product
              </button>
            </div>

            {/* Product List Grid */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border text-xs font-bold uppercase text-muted-foreground">
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm">
                    {products.map(prod => (
                      <tr key={prod.id} className="hover:bg-muted/10">
                        <td className="p-4 font-semibold">{prod.name}</td>
                        <td className="p-4 text-muted-foreground">{prod.category}</td>
                        <td className="p-4 font-medium">₹{prod.price}</td>
                        <td className="p-4">{prod.stock}</td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => handleEditClick(prod)}
                            className="p-1.5 hover:bg-accent/10 hover:text-accent rounded-lg transition-colors inline-block"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors inline-block"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Edit / Add Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
                <div className="relative bg-card border border-border w-full max-w-lg rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
                  <h3 className="text-xl font-bold mb-4">{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h3>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold">Product Name</label>
                      <input 
                        required
                        type="text" 
                        value={productForm.name}
                        onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2.5 border border-border rounded-xl bg-background text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold">Price (₹)</label>
                        <input 
                          required
                          type="number" 
                          value={productForm.price}
                          onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                          className="w-full p-2.5 border border-border rounded-xl bg-background text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold">Stock</label>
                        <input 
                          required
                          type="number" 
                          value={productForm.stock}
                          onChange={(e) => setProductForm(prev => ({ ...prev, stock: Number(e.target.value) }))}
                          className="w-full p-2.5 border border-border rounded-xl bg-background text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold">Category</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full p-2.5 border border-border rounded-xl bg-background text-sm"
                      >
                        <option>QR Keychains</option>
                        <option>Wallet Cards</option>
                        <option>Luggage Tags</option>
                        <option>Helmet Tags</option>
                        <option>Pet Tags</option>
                        <option>Laptop Stickers</option>
                        <option>Vehicle Stickers</option>
                        <option>Spectacles Straps</option>
                        <option>Umbrella Tags</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold">Product Image URL</label>
                      <div className="flex gap-4 items-start">
                        <div className="flex-1">
                          <input 
                            required
                            type="text" 
                            value={productForm.images[0] || ''}
                            onChange={(e) => setProductForm(prev => ({ ...prev, images: [e.target.value] }))}
                            className="w-full p-2.5 border border-border rounded-xl bg-background text-sm"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        {productForm.images[0] && (
                          <div className="w-16 h-16 rounded-xl border border-border overflow-hidden bg-muted flex-shrink-0">
                            <img 
                              src={productForm.images[0]} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150?text=Error')}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold">Description</label>
                      <textarea
                        required
                        rows={3}
                        value={productForm.description}
                        onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full p-2.5 border border-border rounded-xl bg-background text-sm resize-none"
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-4 border-t border-border mt-4">
                      <button 
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/90"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Contents: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Manage Orders</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-20 bg-card border border-border rounded-3xl">
                <h3 className="text-xl font-bold mb-1">No Orders Yet</h3>
                <p className="text-muted-foreground text-sm">Customers have not placed any orders.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-border gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground uppercase font-semibold">Order ID</span>
                        <h4 className="font-extrabold text-sm">{order.id}</h4>
                        <span className="text-[11px] text-muted-foreground">{new Date(order.created_at).toLocaleString()}</span>
                      </div>
                      
                      {/* Status Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground">Status:</span>
                        <select
                          value={order.order_status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['order_status'])}
                          className="bg-muted px-3 py-1.5 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-accent"
                        >
                          <option>Pending</option>
                          <option>Confirmed</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="font-semibold text-muted-foreground">Customer</span>
                        <p className="font-bold text-sm mt-0.5">{order.customer_name}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-muted-foreground">Phone</span>
                        <p className="font-bold text-sm mt-0.5">{order.customer_phone}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-muted-foreground">City/State</span>
                        <p className="font-bold text-sm mt-0.5">{order.city}, {order.state}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-muted-foreground">Pincode</span>
                        <p className="font-bold text-sm mt-0.5">{order.pincode}</p>
                      </div>
                    </div>

                    <div className="text-xs">
                      <span className="font-semibold text-muted-foreground">Delivery Address</span>
                      <p className="font-semibold mt-0.5">{order.delivery_address}</p>
                    </div>

                    {/* Product list */}
                    <div className="bg-muted/30 rounded-2xl p-4 space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Items Ordered</span>
                      {order.product_list.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span>{item.name} <span className="text-muted-foreground">×{item.quantity}</span></span>
                          <span className="font-semibold">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t border-border/60 pt-2 mt-2 flex justify-between font-bold text-sm">
                        <span>Total Price</span>
                        <span className="text-accent">₹{order.total_price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Contents: QR Tags */}
        {activeTab === 'tags' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Activated QR Tags</h2>
            
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted/40 border-b border-border text-xs font-bold uppercase text-muted-foreground">
                      <th className="p-4">QR Code</th>
                      <th className="p-4">Product Type</th>
                      <th className="p-4">Owner Name</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {qrTags.map(tag => (
                      <tr key={tag.id} className="hover:bg-muted/10">
                        <td className="p-4 font-mono font-bold text-xs">{tag.qr_code}</td>
                        <td className="p-4 text-muted-foreground">{tag.product_type}</td>
                        <td className="p-4 font-semibold">{tag.owner_name || '—'}</td>
                        <td className="p-4">{tag.owner_phone || '—'}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            tag.activation_status 
                              ? 'bg-success/10 text-success' 
                              : 'bg-yellow-500/10 text-yellow-500'
                          }`}>
                            {tag.activation_status ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Contents: Settings */}
        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-xl">
            <h2 className="text-2xl font-bold">Admin Settings</h2>

            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <form onSubmit={handleSettingsSubmit} className="space-y-6">
                <h3 className="font-bold text-lg">Instagram Integration</h3>
                <p className="text-xs text-muted-foreground">
                  Update the Instagram username where order requests and messages are routed. Customers will copy their order and paste it in your DMs.
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-bold">Business Instagram Username</label>
                  <input
                    required
                    type="text"
                    value={igUsernameInput}
                    onChange={(e) => setIgUsernameInput(e.target.value)}
                    placeholder="foundly.in"
                    className="w-full p-2.5 border border-border rounded-xl bg-background font-mono text-sm"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-1 shadow-md shadow-accent/20"
                  >
                    <Save className="h-4 w-4" /> Save Settings
                  </button>
                  {settingsSuccess && (
                    <span className="text-success text-xs font-bold flex items-center gap-1">
                      Settings updated successfully
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
