import { Inter, Montserrat, Noto_Sans_JP, Zen_Kaku_Gothic_New, Quicksand } from 'next/font/google'

export const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
  })

export const zenKaku = Zen_Kaku_Gothic_New({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap'
})

export const quicksand = Quicksand({
  weight: ['500'],
  subsets: ['latin'],
  display: 'swap'
})
