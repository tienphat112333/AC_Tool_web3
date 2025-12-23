import { useState } from 'react'
import { Button } from '../ui/button'
import cn from '../../utils/cn'
import { Icon } from '../ui/Icon'
import { SIDEBAR_ITEMS } from '../../constants/sidebarItems'
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
    <aside className="w-[208px] max-h-full bg-white flex flex-col ">
      <div className="flex flex-col justify-center items-center h-[60px] border-b">
        <div className="px-6 py-5 text-xl font-bold text-primary">
          <h2>ACW3</h2>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-4 h-full">
        {/* Menu */}
        <nav className="p-5 flex flex-col gap-2">
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.key} className="w-[176px]">
              {/* Parent */}
              <Button
                variant={activeKey === item.key ? 'default' : 'ghost'}
                size="default"
                className={cn(
                  'justify-start w-[176px] h-10 font-normal text-sm leading-[16px] tracking-[0.1px]'
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
                <div className="border-l flex flex-col justify-center items-center ml-auto w-[149px] h-[60px] gap-1 pl-1">
                  {item.children.map((child) => (
                    <Button
                      key={child.key}
                      variant={activeKey === child.key ? 'default' : 'ghost'}
                      className={cn(
                        'justify-start font-normal h-7 w-[122px] text-sm leading-[16px] tracking-[0.1px]'
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
        <div className="px-8 flex flex-col gap-2 mb-3 text-sm leading-[20px]">
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
