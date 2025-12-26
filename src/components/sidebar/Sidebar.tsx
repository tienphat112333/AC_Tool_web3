import { useState } from 'react'
import { Button } from '../ui/button'
import cn from '../../utils/cn'
import { Icon } from '../ui/Icon'
import { SIDEBAR_ITEMS } from '../../constants/constant'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const [activeKey, setActiveKey] = useState<string>('dashboard')
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({
    token: false,
  })
  const navigate = useNavigate()
  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <aside className="flex max-h-full w-[208px] flex-col bg-white">
      <div className="flex h-[60px] flex-col items-center justify-center border-b">
        <div className="px-6 py-5 text-xl font-bold text-primary">
          <h2>ACW3</h2>
        </div>
      </div>
      <div className="flex h-full flex-col items-center justify-between gap-4">
        {/* Menu */}
        <nav className="flex flex-col gap-2 p-5">
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.key} className="w-[176px]">
              {/* Parent */}
              <Button
                variant={activeKey === item.key ? 'default' : 'ghost'}
                size="default"
                className={cn(
                  'h-10 w-[176px] justify-start text-sm font-normal leading-[16px] tracking-[0.1px]'
                )}
                onClick={() => {
                  if (item.children) {
                    setActiveKey(item.key)
                    toggleExpand(item.key)
                  } else {
                    setActiveKey(item.key)
                    navigate(item.navigate)
                  }
                }}
              >
                {item.icon}
                {item.label}
              </Button>

              {/* Children */}
              {item.children && expandedKeys[item.key] && (
                <div className="ml-auto flex h-[60px] w-[149px] flex-col items-center justify-center gap-1 border-l pl-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.key}
                      variant={activeKey === child.key ? 'default' : 'ghost'}
                      className={cn(
                        'h-7 w-[122px] justify-start text-sm font-normal leading-[16px] tracking-[0.1px]'
                      )}
                      onClick={() => {
                        setActiveKey(child.key)
                        if (child.navigate) navigate(child.navigate)
                      }}
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
        <div className="mb-3 flex flex-col gap-2 px-8 text-sm leading-[20px]">
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
