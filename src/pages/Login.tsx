import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { QrCode, Lock, Mail, ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isResetSent, setIsResetSent] = useState(false)
  const { setUser } = useStore()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Standard delay simulation
    await new Promise(resolve => setTimeout(resolve, 800))

    if (isForgotPassword) {
      // For the prototype, update the password in local storage
      if (email !== 'admin@foundly.in') {
        const usersStr = localStorage.getItem('mock_users') || '{}'
        const users = JSON.parse(usersStr)
        users[email] = password
        localStorage.setItem('mock_users', JSON.stringify(users))
      }
      
      alert("Password updated successfully!")
      setIsForgotPassword(false)
      setPassword('')
      setIsLoading(false)
      return
    }

    if (email === 'admin@foundly.in') {
      if (password !== 'admin123' && password !== 'admin') {
        setError('Invalid admin password.')
        setIsLoading(false)
        return
      }
      setUser({
        id: 'admin-usr-1',
        email: 'admin@foundly.in',
        name: 'Foundly Admin',
        phone: '9876543210',
        role: 'admin'
      })
      navigate('/admin')
    } else {
      // Retrieve mock users from local storage to check passwords
      const usersStr = localStorage.getItem('mock_users') || '{}'
      const users = JSON.parse(usersStr)

      // If the email exists, check the password
      if (users[email]) {
        if (users[email] !== password) {
          setError('Incorrect password for this email address.')
          setIsLoading(false)
          return
        }
      } else {
        // First time logging in with this email? Auto-register them in our mock DB
        users[email] = password
        localStorage.setItem('mock_users', JSON.stringify(users))
      }

      // Simulate normal user login
      setUser({
        id: `usr-${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        phone: '9876543210',
        role: 'user'
      })
      navigate('/profile')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-card border border-border w-full max-w-md rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full filter blur-xl" />
        
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-accent/10 text-accent mb-4">
            <QrCode className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold">
            {isForgotPassword ? 'Reset Password' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isForgotPassword 
              ? 'Enter your email and new password' 
              : 'Sign in to manage your smart QR tags'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                required
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">
                {isForgotPassword ? 'New Password' : 'Password'}
              </label>
              {!isForgotPassword && (
                <button 
                  type="button" 
                  onClick={() => setIsForgotPassword(true)} 
                  className="text-xs font-semibold text-accent hover:underline focus:outline-none"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-6"
          >
            {isLoading ? 'Processing...' : isForgotPassword ? 'Update Password' : 'Sign In'} 
            <ArrowRight className="h-5 w-5" />
          </button>
          
          {isForgotPassword && (
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
