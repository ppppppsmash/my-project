'use client'

import React, { useRef, useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function LoginPage() {
  const { data: session, status } = useSession()

  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)

  const onSubmit = async () => {
    const emailValue = email.current?.value || ''
    const passwordValue = password.current?.value || ''
    const result = await signIn('credentials', {
      email: emailValue,
      password: passwordValue,
      redirect: false,
      callbackUrl: '/'
    })

    console.log(email, password)
  }


  if (status === "authenticated") {
    return (
      <>
      <p>Signed in as {session?.user?.email}</p>
      <button onClick={()=>signOut()}>Sign Out</button>
      </>
    )
  }


  return (
    <div
      className='flex flex-col justify-center items-center h-screen bg-gradient-to-br gap-1 from-cyan-300
      to-sky-600'
    >
      <div className='px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2'>
        <input
          name='Email'
          ref={email}
        />

        <input
          name='Password'
          ref={password}
          type='password'
        />

        <button
          onClick={onSubmit}
        >
          ログイン
        </button>
      </div>
    </div>
  )
}
