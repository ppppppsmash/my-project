'use client'

import {
  Card,
  Title,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
  Color,
} from '@tremor/react'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { signIn, signOut, useSession } from "next-auth/react"
import { getCsrfToken } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamicImport from 'next/dynamic'
import PsiHistory from '@/components/PsiHistory'

const queryClient = new QueryClient()

 const DynamicComponent = dynamicImport(() => import('@/components/PsiHistory'))

export default async function Home() {
  const { data: session, status } = useSession()
  // const session = await getServerSession(authOptions)
  console.log(session)

  if (status === 'authenticated') {
    return (
      <QueryClientProvider client={queryClient}>
        <div className='w-full mx-auto'>
          {status === 'authenticated' &&
            <>
              <Text>ようこそ🤟 {session?.user?.name}</Text>
              <Text className='mt-4'>Email: {session?.user?.email}</Text>
              <DynamicComponent />
            </>
          }
        </div>
      </QueryClientProvider>
    )
  }
}
