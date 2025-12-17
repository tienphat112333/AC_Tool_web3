import Avatar from '../../assets/images/Avatar.png'
import ArrowDown from '../../assets/icons/arrow-down.svg'
const HeaderAuth = () => {
  return (
    <header className="flex justify-between items-center w-[1209px] h-[60px] pr-[16px] pl-[24px] bg-white">
      <h2 className="font-bold text-[24px] leading-[28px]">New Transaction</h2>
      <div className="w-[223px] px-[24px] pt-[20px] pb-4 gap-2 flex justify-center items-center">
        <img src={Avatar} alt="user avatar" />
        <div className="flex justify-between items-center w-[135px] h-[36px] gap-6">
          <div className="w-[95px] h-[36px] text-[12px] leading-[18px]">
            <h3 className="font-medium">0x4aq...gfr6j5lda</h3>
            <p className="text-secondary-text">200 ZKN</p>
          </div>
          <img src={ArrowDown} alt="arrow down icon" />
        </div>
      </div>
    </header>
  )
}
export default HeaderAuth
