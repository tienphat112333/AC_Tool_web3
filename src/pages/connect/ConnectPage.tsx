import Bg1 from '../../assets/images/BG1.png'
import { Button } from '../../components/ui/button'

interface ConnectPageProps {
  onConnectClick: () => void
  isModalOpen?: boolean
  modalMode?: 'register' | 'signin'
  onModalClose?: () => void
  onModeSwitch?: () => void
  onAuthSuccess?: () => void
}

const ConnectPage = ({ onConnectClick }: ConnectPageProps) => {
  return (
    <main className="flex flex-col justify-center items-center px-2 relative">
      <img
        src={Bg1}
        alt="background color with mountain and river"
        className="py-2 rounded-lg w-full h-[613px] relative"
      />
      <div className="absolute w-[610px] h-[220px] top-[200px] flex flex-col justify-center items-center gap-8">
        <h1 className="font-medium text-[40px] leading-[48px]">Tokens & NFT with Ease</h1>
        <div className="text-2xl leading-[30px] w-[610px] flex flex-col justify-center items-center">
          <p>Launch Token, Liquidity, Airdrops and much more.</p>
          <p>Effortless and without coding.</p>
        </div>

        <Button
          size={'sm'}
          className="w-[216px] h-14 bg-white text-primary hover:text-white"
          onClick={onConnectClick}
        >
          Connect Your Wallet
        </Button>
      </div>
    </main>
  )
}
export default ConnectPage
