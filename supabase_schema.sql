-- Create tables for Foundly Smart QR Lost & Found platform

-- 1. Users Profile Table (extends Supabase auth.users or stands alone)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow users to insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);


-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL, -- Array of image URLs
  price NUMERIC NOT NULL CHECK (price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  features TEXT[] DEFAULT '{}'::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Allow write access to products for admin only" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@foundly.in' -- Or configure custom admin check
    )
  );


-- 3. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  product_list JSONB NOT NULL, -- JSON array of items: [{product_id, name, quantity, price}]
  total_price NUMERIC NOT NULL CHECK (total_price >= 0),
  order_status TEXT NOT NULL DEFAULT 'Pending' CHECK (order_status IN ('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to view their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id OR customer_phone = (SELECT phone FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Allow public insertion of orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow full access to orders for admin only" ON public.orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@foundly.in'
    )
  );


-- 4. QR Tags Table
CREATE TABLE IF NOT EXISTS public.qr_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code TEXT UNIQUE NOT NULL, -- The unique code scanned, e.g. FND-XXXXXX
  product_type TEXT NOT NULL, -- e.g., 'House QR Keychain'
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Owner ID if registered
  owner_name TEXT,
  owner_phone TEXT,
  owner_address TEXT,
  activation_status BOOLEAN NOT NULL DEFAULT false,
  activated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for QR Tags
ALTER TABLE public.qr_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active QR tags" ON public.qr_tags
  FOR SELECT USING (true);

CREATE POLICY "Allow anyone to activate a tag" ON public.qr_tags
  FOR UPDATE USING (true); -- Can restrict to authenticated if needed, but QR activation can be anonymous/guest as well

CREATE POLICY "Allow full access to QR tags for admin only" ON public.qr_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@foundly.in'
    )
  );


-- 5. Scan History Table
CREATE TABLE IF NOT EXISTS public.scan_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code TEXT REFERENCES public.qr_tags(qr_code) ON DELETE CASCADE,
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  location TEXT -- Optional location details (IP, city, or coordinates if user consents)
);

-- Enable RLS for Scan History
ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow scan history insertion by anyone" ON public.scan_history
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow owner to view scan history for their tags" ON public.scan_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.qr_tags 
      WHERE public.qr_tags.qr_code = scan_history.qr_code 
      AND public.qr_tags.user_id = auth.uid()
    )
  );


-- 6. Settings Table (for Admin Configurable Settings, e.g. WhatsApp business number)
CREATE TABLE IF NOT EXISTS public.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

INSERT INTO public.settings (key, value) VALUES ('whatsapp_number', '919876543210') ON CONFLICT (key) DO NOTHING;

-- Enable RLS for Settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to settings" ON public.settings
  FOR SELECT USING (true);

CREATE POLICY "Allow write access to settings for admin only" ON public.settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'admin@foundly.in'
    )
  );
