import { Button } from '../ui/button'
import { Icon } from '../ui/Icon'

const Footer = () => {
  return (
    <footer className="flex justify-between items-center h-[60px] py-2 px-6 bg-white">
      <div className="flex justify-between  gap-6 text-sm leading-[140%] tracking-[0.2px] text-secondary-text">
        <p>Feature Request</p>
        <p>Contact Us</p>
      </div>
      <div className=" flex justify-center gap-4">
        <Button className="bg-transparent hover:bg-transparent w-11 h-11 rounded-[100px] p-[10px] text-secondary-text">
          <Icon name="Twitter" variant={'fill'} />
        </Button>
        <Button className="bg-transparent hover:bg-transparent w-11 h-11 rounded-[100px] p-[10px] text-secondary-text">
          <Icon name="Tele" variant={'fill'} />
        </Button>
        <Button className="bg-transparent hover:bg-transparent w-11 h-11 rounded-[100px] p-[10px] text-secondary-text">
          <Icon name="Text" variant={'fill'} viewBox="0 0 24 24" />
        </Button>
      </div>
    </footer>
  )
}
export default Footer
