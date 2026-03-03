import { useNavigate } from 'react-router-dom'
import Bg1 from '../../assets/images/BG1.png'
import { Button } from '../../components/ui/button'
import { useEffect } from 'react'
import { isAuthenticated } from '../../utils/auth'

interface ConnectPageProps {
  onConnectClick: () => void
  isModalOpen?: boolean
  modalMode?: 'register' | 'signin'
  onModalClose?: () => void
  onModeSwitch?: () => void
  onAuthSuccess?: () => void
}

const ConnectPage = ({ onConnectClick }: ConnectPageProps) => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuthenticated()){
      navigate('/dashboard', {replace: true})
    }
  },[navigate])
  return (
    <main className="flex flex-1 h-full justify-center items-center px-0 sm:px-2 py-6">
      <section className="relative w-full">
        <img
          src={Bg1}
          alt="background color with mountain and river"
          className="w-full h-auto max-h-[613px] rounded-lg object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="font-medium text-3xl sm:text-4xl leading-tight">
            Tokens & NFT with Ease
          </h1>
          <div className="text-lg sm:text-2xl leading-snug max-w-xl">
            <p>Launch Token, Liquidity, Airdrops and much more.</p>
            <p>Effortless and without coding.</p>
          </div>
          <Button
            size={'sm'}
            className="w-full sm:w-[216px] h-12 sm:h-14 bg-white text-primary hover:text-white"
            onClick={onConnectClick}
          >
            Connect Your Wallet
          </Button>
        </div>
      </section>
    </main>
  )
}
export default ConnectPage
