import { AiOutlineDashboard } from 'react-icons/ai'
import { VscListUnordered } from 'react-icons/vsc'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { MdOutlineCompareArrows } from 'react-icons/md'
import { TbAnalyze } from 'react-icons/tb'
import { RiFileList2Line } from 'react-icons/ri'
import { SiHackaday } from 'react-icons/si'
import { BiTestTube } from 'react-icons/bi'

export const subNavItems = [
  { link: '/list/add', icon: AiOutlineFileAdd, label: 'ページ登録' }
]

export const navItems = [
  { link: '/', icon: AiOutlineDashboard, label: 'ホーム' },
  { link: '/list', icon: VscListUnordered, label: 'ページ一覧', children: subNavItems },
  { link: '/compare', icon: MdOutlineCompareArrows, label: 'ページ比較' },
  { link: '/analysis', icon: TbAnalyze, label: 'URL分析' },
  { link: '/data-register', icon: RiFileList2Line, label: 'データ登録' },
  { link: '/test2', icon: SiHackaday, label: 'テスト' },
  { link: '/apitest', icon: BiTestTube, label: 'API叩き' },
]
