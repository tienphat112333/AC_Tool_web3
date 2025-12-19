import { Button } from '../ui/button'

interface HeaderGuestProps {
  onConnectClick?: () => void
}

const HeaderGuest = ({ onConnectClick }: HeaderGuestProps) => {
  return (
    <header className="flex justify-between items-center h-[74px] px-6 bg-white">
      <h2 className="w-[60px] h-[58px] font-bold text-xl text-primary-primary2 leading-[57.6px]">
        ACW3
      </h2>
      <Button size={'sm'} onClick={onConnectClick}>
        Connect
      </Button>
    </header>
  )
}
export default HeaderGuest
