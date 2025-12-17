import { Button } from '../ui/button'
import { Icon } from '../ui/Icon'

const Footer = () => {
  return (
    <footer className="flex justify-between items-center h-[60px] py-2 px-6 bg-white">
      <div className="flex justify-between  gap-6 text-[14px] leading-[140%] tracking-[0.2px] text-secondary-text">
        <p>Feature Request</p>
        <p>Contact Us</p>
      </div>
      <div className="text-secondary-text flex justify-center gap-4">
        <Button className="bg-transparent hover:bg-transparent w-[44px] h-[44px] rounded-[100px] p-[10px]">
          <Icon name="Twitter" variant={'fill'} />
        </Button>
        <Button className="bg-transparent hover:bg-transparent w-[44px] h-[44px] rounded-[100px] p-[10px]">
          <Icon name="Tele" variant={'fill'} />
        </Button>
        <Button className="bg-transparent hover:bg-transparent w-[44px] h-[44px] rounded-[100px] p-[10px]">
          <Icon name="Text" variant={'fill'} viewBox="0 0 24 24" />
        </Button>
      </div>
    </footer>
  )
}
export default Footer
