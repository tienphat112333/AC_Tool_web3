import { useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { mockLogin, signUp } from '../../utils/auth'

interface AuthModalProps {
  mode: 'register' | 'signin'
  isOpen: boolean
  onClose: () => void
  onModeSwitch: () => void
  onSuccess: () => void
}

const AuthModal = ({ mode, isOpen, onClose, onModeSwitch, onSuccess }: AuthModalProps) => {
  const [walletAddress, setWalletAddress] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      let response
      if (mode === 'register') {
        response = await signUp(walletAddress, password)
      } else {
        response = mockLogin(walletAddress, password)
      }

      if (response.success) {
        onSuccess()
        handleClose()
        console.log('dang ky thanh cong:', response.data)
      } else {
        setError(response.message || 'Authentication failed')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setWalletAddress('')
    setPassword('')
    setConfirmPassword('')
    setError('')
    setShowPassword(false)
    setShowConfirmPassword(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl w-full max-w-[500px] p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-9 right-4 text-black "
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold leading-[28px] text-center mb-6">
          {mode === 'register' ? 'Register' : 'Sign In'}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 borde border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Wallet Address */}
          <div>
            <label
              htmlFor="wallet-address"
              className="block text-base leading-[24px] font-medium mb-2"
            >
              Wallet Address
            </label>
            <Input
              id="wallet-address"
              type="text"
              placeholder="Ox...."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
              hasError={!!error}
              className="w-[452px] h-[52px] rounded-lg px-[10px] py-4"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-base leading-[24px] font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                hasError={!!error}
                className="w-[452px] h-[52px] rounded-lg px-[10px] py-4"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Register mode only) */}
          {mode === 'register' && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="**********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  hasError={!!error}
                  className="w-[452px] h-[52px] rounded-lg px-[10px] py-4"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-primary2 text-white h-12 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : mode === 'register' ? 'Register' : 'Sign'}
          </Button>
        </form>

        {/* Mode Switch Link */}
        <div className="mt-4 text-center">
          <button type="button" onClick={onModeSwitch} className="text-sm text-black underline">
            {mode === 'register' ? 'You already have an Account?' : "You haven't Account?"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
