import avt1 from '../assets/images/avt1.png'
import avt2 from '../assets/images/avt2.png'
import avt3 from '../assets/images/avt3.png'
import avt4 from '../assets/images/avt4.png'
import avt5 from '../assets/images/avt5.png'
import avt6 from '../assets/images/avt6.png'
import { Icon } from '../components/ui/Icon'

export const MOCK_TOKENS = [
  {
    id: 1,
    name: 'Goodman',
    symbol: 'GM',
    address: '0x4eb697...A0FB2A',
    balance: 200,
    percent: '100%',
    total: 200,
    avatar: avt1,
    mintProgress: 100,
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
    mintProgress: 0,
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
    mintProgress: 0,
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
    mintProgress: 100,
  },
]

export const MOCK_NFTS = [
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
