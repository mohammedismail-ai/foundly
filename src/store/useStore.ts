import { create } from 'zustand'

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  features: string[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  user_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address: string;
  city: string;
  state: string;
  pincode: string;
  product_list: {
    product_id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total_price: number;
  order_status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  created_at: string;
}

export interface QRTag {
  id: string;
  qr_code: string;
  product_type: string;
  user_id?: string;
  owner_name?: string;
  owner_phone?: string;
  owner_address?: string;
  activation_status: boolean;
  activated_at?: string;
  created_at: string;
}

interface AppState {
  products: Product[];
  orders: Order[];
  qrTags: QRTag[];
  reviews: Review[];
  instagramUsername: string;
  wishlist: string[]; // Product IDs
  recentlyViewed: string[]; // Product IDs
  
  // Auth state
  user: { id: string; email: string; name?: string; phone?: string; role: 'admin' | 'user' } | null;

  // Actions
  fetchInitialData: () => Promise<void>;
  setUser: (user: any) => void;
  logout: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  addToRecentlyViewed: (productId: string) => void;

  // Review Actions
  addReview: (productId: string, userName: string, rating: number, comment: string) => Promise<void>;

  // QR Actions
  activateTag: (qrCode: string, ownerName: string, phone: string, address?: string) => Promise<{ success: boolean; message: string }>;
  lookupTag: (qrCode: string) => Promise<QRTag | null>;

  // Admin Actions
  updateInstagramUsername: (num: string) => Promise<void>;
  upsertProduct: (product: Omit<Product, 'id'> & { id?: string }) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['order_status']) => Promise<void>;
  createOrder: (order: Omit<Order, 'id' | 'created_at'>) => Promise<Order>;
}

// 15 Default Products matching request
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-house-keychain',
    name: 'House QR Keychain',
    category: 'QR Keychains',
    description: 'Protect your home keys with this premium metal QR keychain. Elegant design, durable finish, and highly visible unique QR code to help finders return your keys instantly.',
    images: ['/images/products/img1.jpeg'],
    price: 199,
    stock: 100,
    features: ['High-grade stainless steel', 'Scratch-proof protective layer', 'Premium matte black finish', 'Weatherproof QR print']
  },
  {
    id: 'prod-car-keychain',
    name: 'Car QR Keychain',
    category: 'QR Keychains',
    description: 'Never worry about losing your expensive car key fob. This heavy-duty smart QR keychain is built for automotive enthusiasts and everyday drivers.',
    images: ['/images/products/img2.jpeg'],
    price: 199,
    stock: 80,
    features: ['Zinc alloy reinforcement', 'Braided leather strap loop', 'Rust-resistant coating', 'High-contrast laser engraving']
  },
  {
    id: 'prod-bike-keychain',
    name: 'Bike QR Keychain',
    category: 'QR Keychains',
    description: 'A rugged, weather-resistant keychain designed for motorcyclists and cyclists. Attaches securely to key rings and stands up to wind, rain, and mud.',
    images: ['/images/products/img3.jpeg'],
    price: 199,
    stock: 90,
    features: ['Flexible silicone body', 'Zero-scratch design for fuel tanks', '100% waterproof', 'Secure split ring']
  },
  {
    id: 'prod-wallet-card',
    name: 'Wallet QR Card',
    category: 'Wallet Cards',
    description: 'An ultra-slim, credit card-sized PVC smart card that fits perfectly in any wallet, card holder, or purse. A finder can scan the card to return your wallet.',
    images: ['/images/products/img4.jpeg'],
    price: 199,
    stock: 100,
    features: ['Ultra-thin 0.8mm profile', 'Durable matte PVC material', 'Standard credit card size', 'UV-protected printing']
  },
  {
    id: 'prod-luggage-tag',
    name: 'Luggage Tag',
    category: 'Luggage Tags',
    description: 'Travel with peace of mind. This premium luggage tag keeps your contact info hidden behind a QR scan, keeping your private details safe until an item is found.',
    images: ['/images/products/img5.jpeg'],
    price: 199,
    stock: 100,
    features: ['Sturdy steel wire cable', 'Synthetic vegan leather protector', 'Privacy flap design', 'Global recovery network access']
  },
  {
    id: 'prod-backpack-tag',
    name: 'Backpack Tag',
    category: 'Luggage Tags',
    description: 'Perfect for school bags, laptop backpacks, and gym bags. Make sure your expensive bags can find their way back to you if left behind.',
    images: ['/images/products/img6.jpeg'],
    price: 199,
    stock: 100,
    features: ['Flexible loop strap', 'Vibrant accent colors', 'Impact-resistant casing', 'Double-sided QR exposure']
  },
  {
    id: 'prod-helmet-tag',
    name: 'Helmet Tag',
    category: 'Helmet Tags',
    description: 'A specialized curved smart tag with strong 3M adhesive that fits seamlessly on motorcycle or bicycle helmets. Essential for safety and ownership identification.',
    images: ['/images/products/img7.jpeg'],
    price: 199,
    stock: 70,
    features: ['Ultra-strong 3M adhesive backing', 'Curved shape matching helmet contour', 'Reflective safety striping', 'Extreme weather resistant']
  },
  {
    id: 'prod-spectacles-strap',
    name: 'Spectacles Sticker',
    category: 'Spectacles Sticker',
    description: 'Never lose your sunglasses or prescription glasses. This smart QR sticker attaches to your frames and lets anyone scan to return them instantly.',
    images: ['/images/products/img8.jpeg'],
    price: 129,
    stock: 90,
    features: ['Strong adhesive backing', 'Ultra-thin profile', 'Universal fit for all frames', 'Waterproof QR print']
  },
  {
    id: 'prod-umbrella-tag',
    name: 'Umbrella Tag',
    category: 'Umbrella Tags',
    description: 'Umbrellas are one of the most commonly misplaced items. Secure yours with this simple, secure loop tag that wraps around the handle.',
    images: ['/images/products/img9.jpeg'],
    price: 199,
    stock: 100,
    features: ['Water-submersible material', 'Easy self-locking loop', 'Soft-touch silicone band', 'Fast drying']
  },
  {
    id: 'prod-pet-tag',
    name: 'Pet Tag',
    category: 'Pet Tags',
    description: 'Ensure your beloved pet always finds their way back. This lightweight, circular collar tag lets anyone scan to find your name and phone number.',
    images: ['/images/products/img10.png'],
    price: 199,
    stock: 100,
    features: ['Ultra-lightweight aluminum', 'Jingle-free design option', 'Includes durable split ring', 'Pet-safe round edges']
  },
  {
    id: 'prod-car-sticker',
    name: 'Car Windshield Sticker',
    category: 'Vehicle Sticker',
    description: 'Place this QR sticker on your car windshield. Useful for parking issues, emergency towing, or accidents, letting people message you without exposing your number.',
    images: ['/images/products/img11.jpeg'],
    price: 129,
    stock: 100,
    features: ['Static-cling application', 'UV-fade resistant inks', 'Visible through tinted glass', 'No-residue removal']
  },
  {
    id: 'prod-family-pack',
    name: 'Family Protection Pack',
    category: 'Combo Packs',
    description: 'The ultimate protection bundle for your family. Includes 1x House QR Keychain, 1x Car QR Keychain, 1x Wallet QR Card, and 1x Backpack Tag at a special combo price.',
    images: ['/images/products/img12.png'],
    price: 749, // Bundled discounted price (Original: 199+199+199+199 = 796)
    stock: 50,
    features: ['Complete family protection', 'Save ₹197 with this bundle', 'Covers keys, bags, and wallets', 'Instant scan & return system']
  },
  {
    id: 'prod-vehicle-safety-pack',
    name: 'Vehicle Safety Pack',
    category: 'Combo Packs',
    description: 'The complete protection kit for your rides. Includes 1x Car QR Keychain, 1x Car Windshield Sticker, and 1x Helmet Tag at a bundled price.',
    images: ['/images/products/img13.png'],
    price: 499, // Bundled discounted price (Original: 199+129+199 = 527)
    stock: 60,
    features: ['Complete vehicle protection', 'Save ₹98 with this bundle', 'Covers cars, bikes, and helmets', 'Instant scan & return system']
  }
];

const DEFAULT_REVIEWS: Review[] = [
  { id: 'rev-1', productId: 'prod-house-keychain', userName: 'Aravind K.', rating: 5, comment: 'Amazing quality! The QR keychain looks very premium. Tested scanning and it works instantly.', date: '2026-06-15' },
  { id: 'rev-2', productId: 'prod-wallet-card', userName: 'Sneha Nair', rating: 5, comment: 'Super thin card, fits right next to my driving license. Highly recommended!', date: '2026-06-20' },
  { id: 'rev-3', productId: 'prod-luggage-tag', userName: 'Rahul Sen', rating: 4, comment: 'Great product for international travel. Privacy feature is really smart.', date: '2026-07-02' }
];

const DEFAULT_TAGS: QRTag[] = [
  { id: 'tag-1', qr_code: 'test-active', product_type: 'House QR Keychain', owner_name: 'John Doe', owner_phone: '9876543210', owner_address: 'ABC Road, Kochi, Kerala, 682001', activation_status: true, activated_at: '2026-06-01T12:00:00Z', created_at: '2026-05-15T09:00:00Z' },
  { id: 'tag-2', qr_code: 'test-inactive', product_type: 'Wallet QR Card', activation_status: false, created_at: '2026-05-15T09:00:00Z' }
];

export const useStore = create<AppState>((set, get) => ({
  products: [],
  orders: [],
  qrTags: [],
  reviews: [],
  instagramUsername: 'foundly.in',
  wishlist: [],
  recentlyViewed: [],
  user: null,

  fetchInitialData: async () => {
    // 1. Try to load from local storage first to prevent delay
    const localProducts = localStorage.getItem('foundly_products');
    const localOrders = localStorage.getItem('foundly_orders');
    const localTags = localStorage.getItem('foundly_qr_tags');
    const localReviews = localStorage.getItem('foundly_reviews');
    const localIg = localStorage.getItem('foundly_instagram_username');
    const localWishlist = localStorage.getItem('foundly_wishlist');
    const localRecentlyViewed = localStorage.getItem('foundly_recently_viewed');

    set({
      products: localProducts ? JSON.parse(localProducts) : DEFAULT_PRODUCTS,
      orders: localOrders ? JSON.parse(localOrders) : [],
      qrTags: localTags ? JSON.parse(localTags) : DEFAULT_TAGS,
      reviews: localReviews ? JSON.parse(localReviews) : DEFAULT_REVIEWS,
      instagramUsername: localIg || 'foundly.in',
      wishlist: localWishlist ? JSON.parse(localWishlist) : [],
      recentlyViewed: localRecentlyViewed ? JSON.parse(localRecentlyViewed) : []
    });
  },

  setUser: (user) => set({ user }),

  logout: async () => {
    set({ user: null, orders: [], qrTags: [] });
  },

  toggleWishlist: (productId) => {
    set((state) => {
      const isAlreadyIn = state.wishlist.includes(productId);
      const newWishlist = isAlreadyIn 
        ? state.wishlist.filter(id => id !== productId)
        : [...state.wishlist, productId];
      localStorage.setItem('foundly_wishlist', JSON.stringify(newWishlist));
      return { wishlist: newWishlist };
    });
  },

  addToRecentlyViewed: (productId) => {
    set((state) => {
      const filtered = state.recentlyViewed.filter(id => id !== productId);
      const newRecentlyViewed = [productId, ...filtered].slice(0, 5); // Keep last 5
      localStorage.setItem('foundly_recently_viewed', JSON.stringify(newRecentlyViewed));
      return { recentlyViewed: newRecentlyViewed };
    });
  },

  addReview: async (productId, userName, rating, comment) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    set((state) => {
      const updatedReviews = [newReview, ...state.reviews];
      localStorage.setItem('foundly_reviews', JSON.stringify(updatedReviews));
      return { reviews: updatedReviews };
    });

  },

  activateTag: async (qrCode, ownerName, phone, address) => {
    const activeTime = new Date().toISOString();
    
    // Check if tag exists locally first
    const currentTags = get().qrTags;
    const existingIndex = currentTags.findIndex(t => t.qr_code.toLowerCase() === qrCode.toLowerCase());

    let updatedTag: QRTag;

    if (existingIndex !== -1) {
      updatedTag = {
        ...currentTags[existingIndex],
        owner_name: ownerName,
        owner_phone: phone,
        owner_address: address,
        activation_status: true,
        activated_at: activeTime
      };
    } else {
      // Create a tag profile on the fly if not generated
      updatedTag = {
        id: `tag-${Date.now()}`,
        qr_code: qrCode,
        product_type: 'House QR Keychain', // default
        owner_name: ownerName,
        owner_phone: phone,
        owner_address: address,
        activation_status: true,
        activated_at: activeTime,
        created_at: activeTime
      };
    }

    set((state) => {
      const newTags = existingIndex !== -1
        ? state.qrTags.map((t, idx) => idx === existingIndex ? updatedTag : t)
        : [...state.qrTags, updatedTag];
      localStorage.setItem('foundly_qr_tags', JSON.stringify(newTags));
      return { qrTags: newTags };
    });

    return { success: true, message: 'Tag activated successfully!' };
  },

  lookupTag: async (qrCode) => {
    // Check locally first
    const tag = get().qrTags.find(t => t.qr_code.toLowerCase() === qrCode.toLowerCase());
    if (tag) return tag;
    return null;
  },

  updateInstagramUsername: async (username) => {
    set({ instagramUsername: username });
    localStorage.setItem('foundly_instagram_username', username);
  },

  upsertProduct: async (product) => {
    let updatedProducts: Product[];
    
    if (product.id) {
      // Edit
      updatedProducts = get().products.map(p => p.id === product.id ? (product as Product) : p);
    } else {
      // Add
      const newProduct = {
        ...product,
        id: `prod-${Date.now()}`
      } as Product;
      updatedProducts = [newProduct, ...get().products];
    }

    set({ products: updatedProducts });
    localStorage.setItem('foundly_products', JSON.stringify(updatedProducts));
  },

  deleteProduct: async (id) => {
    const updated = get().products.filter(p => p.id !== id);
    set({ products: updated });
    localStorage.setItem('foundly_products', JSON.stringify(updated));
  },

  updateOrderStatus: async (orderId, status) => {
    const updatedOrders = get().orders.map(o => o.id === orderId ? { ...o, order_status: status } : o);
    set({ orders: updatedOrders });
    localStorage.setItem('foundly_orders', JSON.stringify(updatedOrders));
  },

  createOrder: async (orderInput) => {
    const newOrder: Order = {
      ...orderInput,
      id: `ord-${Date.now()}`,
      created_at: new Date().toISOString()
    };

    set((state) => {
      const updatedOrders = [newOrder, ...state.orders];
      localStorage.setItem('foundly_orders', JSON.stringify(updatedOrders));
      return { orders: updatedOrders };
    });

    return newOrder;
  }
}));
