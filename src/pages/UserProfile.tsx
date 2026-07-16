import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { User, QrCode, LogOut, Package, Shield, Settings } from 'lucide-react'

export default function UserProfile() {
  const { user, setUser, logout, qrTags } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    // If not logged in, or is an admin, redirect
    if (!user) {
      navigate('/login')
    } else if (user.role === 'admin') {
      navigate('/admin')
    }
  }, [user, navigate])

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleEditProfile = () => {
    const newName = prompt('Enter your new name:', user.name)
    if (newName && newName.trim() !== '') {
      setUser({ ...user, name: newName.trim() })
    }
  }

  // Find tags belonging to this user
  const myTags = qrTags.filter(tag => tag.user_id === user.id)

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account and smart QR tags</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-colors font-medium self-start md:self-auto"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: User Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{user.name || 'Foundly User'}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-muted rounded-lg"><Package className="h-4 w-4 text-muted-foreground" /></div>
                  <div>
                    <p className="font-semibold">{myTags.length}</p>
                    <p className="text-muted-foreground text-xs">Active Tags</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-muted rounded-lg"><Shield className="h-4 w-4 text-muted-foreground" /></div>
                  <div>
                    <p className="font-semibold">Secured</p>
                    <p className="text-muted-foreground text-xs">Account Status</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleEditProfile}
                className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-2.5 border border-border hover:bg-muted rounded-xl transition-colors text-sm font-medium"
              >
                <Settings className="h-4 w-4" /> Edit Profile
              </button>
            </div>
          </div>

          {/* Right Column: Tags List */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-3xl p-6 min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-accent" /> My Smart Tags
                </h3>
              </div>

              {myTags.length === 0 ? (
                <div className="text-center py-16 bg-muted/30 rounded-2xl border border-dashed border-border">
                  <QrCode className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h4 className="text-lg font-bold mb-2">No tags activated yet</h4>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                    You haven't linked any smart QR tags to your account yet. When you receive a tag, scan it to link it here.
                  </p>
                  <button 
                    onClick={() => navigate('/shop')}
                    className="px-6 py-2.5 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl transition-colors"
                  >
                    Buy Smart Tags
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myTags.map((tag) => (
                    <div key={tag.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-2xl hover:border-accent/30 transition-colors">
                      <div className="flex items-start sm:items-center gap-4 mb-4 sm:mb-0">
                        <div className="p-3 bg-accent/10 text-accent rounded-xl">
                          <QrCode className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-bold text-base">{tag.product_type} Tag</p>
                          <p className="text-xs text-muted-foreground font-mono">ID: {tag.qr_code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">
                          Active
                        </span>
                        <button className="px-3 py-1.5 border border-border hover:bg-muted text-sm font-medium rounded-lg transition-colors">
                          Manage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
