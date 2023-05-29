import { AiOutlineDashboard } from 'react-icons/ai'
import { TbAnalyze } from 'react-icons/tb'
import { RiFileList2Line } from 'react-icons/ri'
import { SiHackaday } from 'react-icons/si'
import { BiTestTube } from 'react-icons/bi'

export const navItems = [
  { href: '/', icon: AiOutlineDashboard, label: 'ホーム'},
  { href: '/analysis', icon: TbAnalyze, label: 'URL分析'},
  { href: '/data-register', icon: RiFileList2Line, label: 'データ登録'},
  { href: '/test2', icon: SiHackaday, label: 'テスト'},
  { href: '/apitest', icon: BiTestTube, label: 'API叩き'},
]
