import { useState } from 'react'
import { HeaderAuth } from '../../../components/header'
import { Sidebar } from '../../../components/sidebar'
import { Button } from '../../../components/ui/button'
import { Icon } from '../../../components/ui/Icon'
import { MOCK_TOKENS } from '../../../constants/profileItems'
import { MinModal } from '../../../components/mint/MintModal'

const TokenList = () => {
  const [openMintModal, setOpenMintModal] = useState(false)
  const [selectedTokenName, setSelectedTokenName] = useState<string | null>(null)
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <HeaderAuth title="Token List" />
        <section className="m-4 flex flex-col gap-2">
          <div className="flex h-14 items-center justify-between rounded-lg bg-white px-4 py-2">
            <div className="flex w-full items-center justify-between">
              <p className="font-medium">Tokens</p>
              <div className="flex items-center justify-between gap-12 text-center text-secondary-text">
                <p className="w-[100px]">Balance</p>
                <p className="w-[100px]">% of Supply</p>
                <p className="w-[164px]">Mint Progress</p>
                <p className="w-[76px]">Action</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-colorDivide rounded-lg bg-white">
            {MOCK_TOKENS.map((token) => (
              <div
                className="flex h-[76px] items-center justify-between p-4 font-medium"
                key={token.id}
              >
                <div className="flex items-center justify-center gap-4">
                  <img src={token.avatar} alt="user avatar" className="rounded-[200px]" />
                  <div>
                    <div className="flex gap-2">
                      <p>{token.name}</p>
                      <p className="text-sm text-secondary">{token.symbol}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-xs font-normal">{token.address}</p>
                      <Icon name="copy" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-12 text-center">
                  <span className="w-[100px]">{token.balance}</span>
                  <span className="w-[100px]">{token.percent}</span>
                  <div className="h-[9px] w-[164px] overflow-hidden rounded-[100px] bg-[#F5FBFB]">
                    <div
                      className="h-full rounded-[100px] bg-primary transition-all"
                      style={{ width: `${token.mintProgress}%` }}
                    />
                  </div>
                  <Button
                    size={'sm'}
                    variant={'secondary'}
                    className="h-8 w-[76px] text-sm"
                    onClick={() => {
                      setSelectedTokenName(token.name)
                      setOpenMintModal(true)
                    }}
                  >
                    Mint
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <MinModal
        open={openMintModal}
        tokenName={selectedTokenName}
        onClose={() => {
          setOpenMintModal(false)
          setSelectedTokenName(null)
        }}
      />
    </main>
  )
}
export default TokenList
