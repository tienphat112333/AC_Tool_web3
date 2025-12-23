import { HeaderAuth } from '../../../components/header'
import { Sidebar } from '../../../components/sidebar'
import { Button } from '../../../components/ui/button'
import { Icon } from '../../../components/ui/Icon'
import { Input } from '../../../components/ui/input'

const TokenCreator = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <HeaderAuth title="Token Creator" />
        <main className="mt-10 flex flex-col items-center justify-center">
          <section className="h-[1036px] w-[852px] rounded-lg bg-white py-10">
            <div className="mb-4 flex flex-col items-center gap-2">
              <h2 className="text-2xl font-bold leading-[28px]">Token Creator</h2>
              <p className="text-base leading-[20px] text-secondary-text">
                Easily Create your own Token in just 7+1 steps without Coding.
              </p>
            </div>
            <div className="flex w-full flex-col gap-6 px-10 pt-6">
              <section className="flex flex-col gap-4 pb-6">
                <div className="flex gap-4">
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Name
                    </p>
                    <Input placeholder="Ex: Zoken" className="h-[52px]" />
                    <p className="ml-2 text-xs text-secondary-subText">
                      Max 32 characters in your name
                    </p>
                  </div>
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Symbol
                    </p>
                    <Input placeholder="Ex: ZKN" className="h-[52px]" />
                    <p className="ml-2 text-xs text-secondary-subText">
                      Max 8 characters in your symbol
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Decimal
                    </p>
                    <Input placeholder="6" className="h-[52px]" />
                    <p className="ml-2 text-xs text-secondary-subText">Most token use 6 decimals</p>
                  </div>
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Supply
                    </p>
                    <Input placeholder="1" className="h-[52px]" />
                    <p className="ml-2 text-xs text-secondary-subText">Most token use 10B</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium">
                    <span className="text-secondaryRed">*</span> Amount per mint
                  </p>
                  <Input placeholder="6" className="h-[52px]" />
                </div>
                <div className="flex gap-4">
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Image
                    </p>
                    <label
                      htmlFor="image-upload"
                      className="flex h-[120px] cursor-pointer flex-col items-center justify-center rounded-lg border-[1.5px] border-dashed border-secondary-subText px-4 py-6 text-secondary-subText"
                    >
                      <div className="flex w-[200px] flex-col items-center justify-center">
                        <Icon name="Logout" variant={'fill'} className="h-6 w-6" />
                        <p className="text-sm font-medium text-secondary-text">
                          Drag and drop here to upload
                        </p>
                        <p className="text-xs text-[#616161]">png, .jpg, 1000x1000px</p>
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/png, image/jpeg"
                          className="hidden"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="flex w-2/4 flex-col gap-1">
                    <p className="text-base font-medium">
                      <span className="text-secondaryRed">*</span> Description
                    </p>
                    <textarea
                      className="h-full rounded-lg bg-input px-[16px] pb-4 pt-2"
                      placeholder="Ex: First community token on Zoken..."
                    />
                  </div>
                </div>
              </section>
              <section className="flex flex-col gap-4">
                <div className="flex h-12 flex-col justify-between">
                  <h2 className="text-lg font-medium">Add Social Links & Tags</h2>
                  <p className="text-sm text-secondary-subText">Max 32 characters in your name</p>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div className="flex items-center justify-center gap-4">
                    <span className="min-w-[72px] text-base font-medium">Website:</span>
                    <Input icon={<Icon name="web" />} placeholder="https://" className="h-[42px]" />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <span className="min-w-[72px] text-base font-medium">Telegram:</span>
                    <Input
                      icon={<Icon name="telegram" variant={'fill'} />}
                      placeholder="https://t.me/"
                      className="h-[42px]"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <span className="min-w-[72px] text-base font-medium">Discord:</span>
                    <Input
                      icon={<Icon name="discord" />}
                      placeholder="https://"
                      className="h-[42px]"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <span className="min-w-[72px] text-base font-medium">Twitter:</span>
                    <Input icon={<Icon name="web" />} placeholder="https://" className="h-[42px]" />
                  </div>
                </div>
              </section>
              <Button className="w-full">Create</Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
export default TokenCreator
