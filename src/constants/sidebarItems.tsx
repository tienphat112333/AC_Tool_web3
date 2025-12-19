import { Icon } from '../components/ui/Icon'

export const SIDEBAR_ITEMS = [
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
