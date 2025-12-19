import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../components/sidebar'
import { HeaderAuth } from '../../components/header'
import { Button } from '../../components/ui/button'
import { EditProfileModal, type ProfileData } from '../../components/profile'
import { Icon } from '../../components/ui/Icon'
import Avata from '../../assets/images/Avatar.png'
import avt1 from '../../assets/images/avt1.png'
import avt2 from '../../assets/images/avt2.png'
import avt3 from '../../assets/images/avt3.png'
import avt4 from '../../assets/images/avt4.png'
import avt5 from '../../assets/images/avt5.png'
import avt6 from '../../assets/images/avt6.png'

type ProfileTab = 'tokens' | 'nfts'

interface ProfilePageProps {
  defaultTab: ProfileTab
}

const mockProfile: ProfileData = {
  name: 'John',
  biography: '',
}

const mockTokens = [
  {
    id: 1,
    name: 'Goodman',
    symbol: 'GM',
    address: '0x4eb697...A0FB2A',
    balance: 200,
    percent: '100%',
    total: 200,
    avatar: avt1,
  },
  {
    id: 2,
    name: 'Goodman',
    symbol: 'GM',
    address: '0x4eb697...A0FB2A',
    balance: 200,
    percent: '100%',
    total: 200,
    avatar: avt2,
  },
  {
    id: 3,
    name: 'Goodman',
    symbol: 'GM',
    address: '0x4eb697...A0FB2A',
    balance: 200,
    percent: '100%',
    total: 200,
    avatar: avt3,
  },
  {
    id: 4,
    name: 'Goodman',
    symbol: 'GM',
    address: '0x4eb697...A0FB2A',
    balance: 200,
    percent: '100%',
    total: 200,
    avatar: avt4,
  },
]

const mockNfts = [
  {
    id: 1,
    name: 'Tropolis Club',
    address: '0x4eb697...A0FB2A',
    percent: '100%',
    total: 200,
    avatar: avt5,
  },
  {
    id: 2,
    name: 'Lil Pudgy',
    address: '0x4eb697...A0FB2A',
    percent: '100%',
    total: 200,
    avatar: avt4,
  },
  {
    id: 3,
    name: 'Goodman',
    address: '0x4eb697...A0FB2A',
    percent: '100%',
    total: 200,
    avatar: avt6,
  },
]

const ProfilePage = ({ defaultTab }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>(defaultTab)
  const [profile, setProfile] = useState<ProfileData>(mockProfile)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const navigate = useNavigate()

  const handleTabChange = (tab: ProfileTab) => {
    setActiveTab(tab)
    navigate(tab === 'tokens' ? '/profile/tokens' : '/profile/nfts', { replace: true })
  }

  const handleSaveProfile = (data: ProfileData) => {
    setProfile(data)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <HeaderAuth title="Profile" />

        <main className="flex-1 bg-background2 p-3">
          <div className="flex flex-row gap-4 items-start">
            {/* Left profile card */}
            <section className="w-[300px] rounded-[8px] bg-white p-4 shadow-sm min-h-[329.45px] flex-shrink-0 flex flex-col gap-[16px]">
              <div className=" flex items-center gap-3">
                <img src={Avata} alt="avata user" className="w-[40px] h-[40px]" />
                <div className="text-sm">
                  <p className="font-semibold text-[16px]">{profile.name}</p>
                  <p className="text-xs text-secondary-text">0x4aq...gfr6j5lda</p>
                </div>
              </div>

              <div className="flex flex-col gap-[16px] text-sm">
                <div>
                  <p className="text-[18px] leading-[24px] font-medium  mb-[8px]">Balance</p>
                  <p className="text-sm text-secondary-text">200 ZKN</p>
                </div>
                <div>
                  <p className="text-[18px] leading-[24px] font-medium  mb-[8px]">Biography</p>
                  <p className="text-sm text-secondary-text">{profile.biography || 'None'}</p>
                </div>
                <div>
                  <p className="text-[18px] leading-[24px] font-medium  mb-[8px]">Social Links</p>
                  <div className="mt-1 flex gap-2 text-xs text-secondary-text">
                    <Icon name="Twitter" variant={'fill'} />
                    <Icon name="github" variant={'fill'} />
                    <Icon name="Tele" variant={'fill'} />
                  </div>
                </div>
              </div>
              <Button
                className=" h-[40px] w-full rounded-[1000px]"
                size="default"
                onClick={() => setIsEditOpen(true)}
              >
                Edit Profile
              </Button>
            </section>

            {/* Right content: tokens / NFTs */}
            <section className="flex flex-1 flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1 rounded-[8px] bg-white p-4 shadow-sm py-[16px] px-[24px]">
                  <p className="text-[16px] leading-[20px] text-secondary-text">Total Tokens</p>
                  <p className="mt-2 text-[24px] leading-[24px] font-[500]">0</p>
                </div>
                <div className="flex-1 rounded-[8px] bg-white p-4 shadow-sm py-[16px] px-[24px]">
                  <p className="text-[16px] leading-[20px] text-secondary-text">Total NFTs</p>
                  <p className="mt-2 text-2xl font-semibold">0</p>
                </div>
              </div>

              <div className="rounded-[8px] bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-2 rounded-[999px] bg-[#F5F5F5] p-1 text-sm">
                    <button
                      className={`rounded-[999px] px-4 py-1 ${
                        activeTab === 'tokens' ? 'bg-white font-medium shadow-sm' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabChange('tokens')}
                    >
                      Tokens
                    </button>
                    <button
                      className={`rounded-[999px] px-4 py-1 ${
                        activeTab === 'nfts' ? 'bg-white font-medium shadow-sm' : 'text-gray-500'
                      }`}
                      onClick={() => handleTabChange('nfts')}
                    >
                      NFTs
                    </button>
                  </div>
                </div>

                {activeTab === 'tokens' ? (
                  <div className="overflow-hidden ">
                    <div className="divide-y divide-[#F3F4F6]">
                      <div className="grid grid-cols-[1.5fr,1.5fr,1.2fr,1.1fr] py-3 text-[16px] leading-[20px] font-medium text-secondary-text ">
                        <span className="text-black">Token</span>
                        <span className="text-right">Balance</span>
                        <span className="text-right">% of Supply</span>
                        <span className="text-right">Total of Supply</span>
                      </div>
                      {mockTokens.map((token) => (
                        <div
                          key={token.id}
                          className="grid grid-cols-[1.5fr,1fr,1fr,1fr] items-center  py-3 text-[16px] font-[500]"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={token.avatar}
                              alt="user avatar"
                              className="flex h-[48px] w-[48px] items-center justify-center rounded-full"
                            />

                            <div className="flex flex-col">
                              <div className="font-medium text-[16px] flex items-center gap-2">
                                <span className=" leading-[24px]">{token.name}</span>
                                <span className="text-secondary-text leading-[16px]">
                                  {token.symbol}
                                </span>
                              </div>
                              <div className="text-xs flex items-center gap-2 ">
                                <span className="text-black font-[400]">{token.address}</span>
                                <Icon
                                  name="copy"
                                  className="w-[12px] h-[12px] text-secondary-text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-right">{token.balance}</div>
                          <div className="text-right">{token.percent}</div>
                          <div className="text-right">{token.total}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden">
                    <div className="divide-y divide-[#F3F4F6]">
                      <div className="grid grid-cols-[1.5fr,1.2fr,1fr] py-3 text-[16px] leading-[20px] text-secondary-text font-[500]">
                        <span className="text-black">NFT</span>
                        <span className="text-right">% of Supply</span>
                        <span className="text-right">Total of Supply</span>
                      </div>
                      {mockNfts.map((nft) => (
                        <div
                          key={nft.id}
                          className="grid grid-cols-[1.5fr,1fr,1fr] items-center py-3 text-[16px] font-[500]"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={nft.avatar}
                              alt="user avatar"
                              className="flex h-[48px] w-[48px] items-center justify-center rounded-full"
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{nft.name}</span>

                              <div className="text-xs flex items-center gap-2 ">
                                <span className="text-xs text-gray-500">{nft.address}</span>
                                <Icon
                                  name="copy"
                                  className="w-[12px] h-[12px] text-secondary-text"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="text-right">{nft.percent}</div>
                          <div className="text-right">{nft.total}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={profile}
        onSave={handleSaveProfile}
      />
    </div>
  )
}

export default ProfilePage
