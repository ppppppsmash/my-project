'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import Loading from '@/components/Loader/Loading'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== 'signin') {
      console.log(status)
      router.push('/signin')
    }
  }, [router, status])
  if (status === 'loading') return <Loading />

  return (
    <>
      {children}
    </>
  )
}

export default AuthGuard