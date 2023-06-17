import { AiOutlineDashboard } from 'react-icons/ai'
import { VscListUnordered } from 'react-icons/vsc'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { MdOutlineCompareArrows } from 'react-icons/md'
import { TbAnalyze } from 'react-icons/tb'
import { RiFileList2Line } from 'react-icons/ri'
import { SiHackaday } from 'react-icons/si'
import { BiTestTube } from 'react-icons/bi'

export const subNavItems = [
  { href: '/list/add', icon: AiOutlineFileAdd, label: 'ページ登録' }
]

export const navItems = [
  { href: '/', icon: AiOutlineDashboard, label: 'ホーム' },
  { href: '/list', icon: VscListUnordered, label: 'ページ一覧', children: subNavItems },
  { href: '/compare', icon: MdOutlineCompareArrows, label: 'ページ比較' },
  { href: '/analysis', icon: TbAnalyze, label: 'URL分析' },
  { href: '/data-register', icon: RiFileList2Line, label: 'データ登録' },
  { href: '/test2', icon: SiHackaday, label: 'テスト' },
  { href: '/apitest', icon: BiTestTube, label: 'API叩き' },
]
