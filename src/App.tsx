import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Footer } from './components/footer'
import { HeaderGuest } from './components/header'
import { ConnectPage } from './pages/connect'
import { DashboardPage } from './pages/dashboard'
import { ProfilePage } from './pages/profile'
import { isAuthenticated } from './utils/auth'
import { AuthModal } from './components/auth'
import { TokenCreator } from './pages/token/create'
import { TokenList } from './pages/token/list'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/" replace />
}

const ConnectPageWithLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'register' | 'signin'>('signin')
  const navigate = useNavigate()

  const handleConnectClick = () => {
    setIsModalOpen(true)
    setModalMode('signin')
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModeSwitch = () => {
    setModalMode((prev) => (prev === 'register' ? 'signin' : 'register'))
  }

  const handleAuthSuccess = () => {
    navigate('/dashboard', {replace: true})
  }

  return (
    <>
      <HeaderGuest onConnectClick={handleConnectClick} />
      <ConnectPage
        onConnectClick={handleConnectClick}
        isModalOpen={isModalOpen}
        modalMode={modalMode}
        onModalClose={handleModalClose}
        onModeSwitch={handleModeSwitch}
        onAuthSuccess={handleAuthSuccess}
      />
      <Footer />
      <AuthModal
        mode={modalMode}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onModeSwitch={handleModeSwitch}
        onSuccess={handleAuthSuccess}
      />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectPageWithLayout />} />
        <Route
          path="/token/creator"
          element={
            <ProtectedRoute>
              <TokenCreator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/token/list"
          element={
            <ProtectedRoute>
              <TokenList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/tokens"
          element={
            <ProtectedRoute>
              <ProfilePage defaultTab="tokens" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/nfts"
          element={
            <ProtectedRoute>
              <ProfilePage defaultTab="nfts" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
