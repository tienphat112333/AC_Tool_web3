import { Icon } from '../components/ui/Icon'

export const SIDEBAR_ITEMS = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <Icon name="Dashboard" />,
    navigate: '/dashboard',
  },
  {
    key: 'token',
    label: 'Token',
    icon: <Icon name="Token" variant={'fill'} />,
    children: [
      { key: 'token-create', label: 'Token Creator', navigate: '/token/creator' },
      { key: 'token-list', label: 'Token List', navigate: '/token/list' },
    ],
    navigate: '/token/create',
  },
  {
    key: 'nft',
    label: 'NFT',
    icon: <Icon name="Nft" variant={'fill'} />,
    children: [
      { key: 'nft-collection', label: 'NFT Collection', navigate: '/nft/collection' },
      { key: 'nft-list', label: 'NFT List', naviagte: '/nft/list' },
    ],
  },
]
