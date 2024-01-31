import Providers from '../Providers'
import AuthGuard from '@/components/Auth/AuthGuard'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='ja'>
      <body>
        <Providers>
          <AuthGuard>
            {children}
          </AuthGuard>
        </Providers>
      </body>
    </html>
  )
}