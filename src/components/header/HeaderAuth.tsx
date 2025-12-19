import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../assets/images/Avatar.png'
import ArrowDown from '../../assets/icons/arrow-down.svg'
import { logout } from '../../utils/auth'
import { Icon } from '../ui/Icon'

interface HeaderAuthProps {
  title?: string
}

const HeaderAuth = ({ title = 'New Transaction' }: HeaderAuthProps) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleToggle = () => {
    setOpen((prev) => !prev)
  }

  const handleGoProfile = () => {
    setOpen(false)
    navigate('/profile/tokens')
  }

  const handleLogout = () => {
    setOpen(false)
    logout()
    navigate('/')
  }

  return (
    <header className="flex items-center justify-between w-full h-[60px] pr-[16px] pl-[24px] bg-white">
      <h2 className="text-[24px] font-bold leading-[28px]">{title}</h2>
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          className="flex w-[223px] items-center justify-center gap-2 px-[24px] pt-[20px] pb-4"
        >
          <img src={Avatar} alt="user avatar" />
          <div className="flex w-[135px] items-center justify-between gap-6 h-[36px]">
            <div className="h-[36px] w-[95px] text-[12px] leading-[18px] text-left">
              <h3 className="font-medium">0x4aq...gfr6j5lda</h3>
              <p className="text-secondary-text">200 ZKN</p>
            </div>
            <img src={ArrowDown} alt="arrow down icon" />
          </div>
        </button>

        {open && (
          <div className="absolute right-0 top-[66px] z-20 w-[199px] rounded-[8px] bg-white py-2 text-sm shadow-lg">
            <button
              type="button"
              onClick={handleGoProfile}
              className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-[#F5FBFB] text-[16px] leading-[20px]"
            >
              <Icon name="Profile" />
              <span>Profile</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-[#F5FBFB] text-[16px] leading-[20px]"
            >
              <Icon name="Logout" variant={'fill'} />
              <span>Log out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
export default HeaderAuth
