import { Button } from '../ui/button'
import { Icon } from '../ui/Icon'
import { Input } from '../ui/input'

type MintModalProps = {
  open: boolean
  onClose: () => void
  tokenName: string | null
}

export const MinModal = ({ open, onClose, tokenName }: MintModalProps) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex h-[356px] w-[500px] flex-col gap-6 rounded-2xl bg-white p-6">
        <div className="relative w-full">
          <h2 className="text-center text-xl font-bold">{tokenName} Tokens</h2>
          <button onClick={onClose} className="absolute right-0 top-0">
            <Icon name="close" variant={'fill'} className="h-6 w-6" viewBox="0 0 24 24" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p>Amount Per Mint</p>
            <Input className="h-[52px] px-[10px] py-4" placeholder="10" />
          </div>
          <div className="flex flex-col gap-1">
            <p>Mint Fee</p>
            <Input className="h-[52px] px-[10px] py-4" placeholder="0.012" suffix="ZKN" />
          </div>
        </div>
        <Button className="h-14 w-full font-medium">Mint</Button>
      </div>
    </div>
  )
}
