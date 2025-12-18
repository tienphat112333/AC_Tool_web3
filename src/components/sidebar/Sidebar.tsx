import { useState } from 'react'
import { Button } from '../ui/button'
import cn from '../../utils/cn'
import { Icon } from '../ui/Icon'

const Sidebar = () => {
  const [activeKey, setActiveKey] = useState<string>('dashboard')
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({
    token: false,
  })
  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }
  const SIDEBAR_ITEMS = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <Icon name="Dashboard" />,
    },
    {
      key: 'token',
      label: 'Token',
      icon: <Icon name="Token" variant={'fill'} />,
      children: [
        { key: 'token-create', label: 'Token Creator' },
        { key: 'token-list', label: 'Token List' },
      ],
    },
    {
      key: 'nft',
      label: 'NFT',
      icon: <Icon name="Nft" variant={'fill'} />,
      children: [
        { key: 'nft-collection', label: 'NFT Collection' },
        { key: 'nft-list', label: 'NFT List' },
      ],
    },
  ]
  return (
    <aside className="w-[208px] h-[768px] bg-white flex flex-col ">
      <div className="flex flex-col justify-center items-center h-[60px] border-b">
        <div className="px-6 py-5 text-xl font-bold text-primary">
          <h2>ACW3</h2>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-[16px] h-[708px]">
        {/* Menu */}
        <nav className="p-[20px] flex flex-col gap-2">
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.key} className="w-[176px]">
              {/* Parent */}
              <Button
                variant={activeKey === item.key ? 'default' : 'ghost'}
                size="default"
                className={cn(
                  'justify-start w-[176px] h-[40px] font-[400] text-[14px] leading-[16px] tracking-[0.1px]'
                )}
                // onClick={() => {setActiveKey(item.key) }}
                onClick={() => {
                  if (item.children) {
                    setActiveKey(item.key)
                    toggleExpand(item.key) // Nếu có con -> Chỉ đóng/mở
                  } else {
                    setActiveKey(item.key) // Nếu không có con -> Active luôn
                  }
                }}
              >
                {item.icon}
                {item.label}
              </Button>

              {/* Children */}
              {item.children && expandedKeys[item.key] && (
                <div className="border-l flex flex-col justify-center items-center ml-auto w-[149px] h-[60px] gap-1 pl-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.key}
                      variant={activeKey === child.key ? 'default' : 'ghost'}
                      className={cn(
                        'justify-start font-[400] h-[28px] w-[122px] text-[14px] leading-[16px] tracking-[0.1px]'
                      )}
                      onClick={() => setActiveKey(child.key)}
                    >
                      {child.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        {/* Bottom */}
        <div className="px-[32px] flex flex-col gap-2 mb-3 text-[14px] leading-[20px]">
          <div className="flex items-center gap-3 text-sm text-black">
            <Icon name="Twitter" variant={'fill'} />
            <span>Twitter / X</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-black">
            <Icon name="Tele" variant={'fill'} />
            <span>Telegram</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
