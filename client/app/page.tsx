'use client'

import { useEffect } from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signIn, signOut, useSession } from "next-auth/react"
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default async function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if(!session) {
      router.push('/signin')
    }
  }, [session, router])
  // const session = await getServerSession(authOptions)
  // console.log(session)

  if (status === "authenticated") {
    return <p>Signed in as {session?.user?.email}</p>
  }
}
