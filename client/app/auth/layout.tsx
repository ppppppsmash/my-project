import Providers from '../Providers'
import AuthGuard from '@/components/Auth/AuthGuard'
import '../globals.css'

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
            <div>
              {children}
            </div>
          </AuthGuard>
        </Providers>
      </body>
    </html>
  )
}