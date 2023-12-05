'use client'

import React, { useRef, useState, useEffect } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Title } from '@tremor/react'
import { inter, quicksand } from '@/utils/font'

export default function LoginPage() {
  const { data: session, status } = useSession()

  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string>('')

  const onLogin = async () => {
    const emailValue = email.current?.value || ''
    const passwordValue = password.current?.value || ''

    try {
      const result = await signIn('credentials', {
        email: emailValue,
        password: passwordValue,
        redirect: true,
        callbackUrl: '/'
      })

      if (result?.error) {
        // ログインエラーがある場合、エラーメッセージを表示
        setErrorMessage('ログインに失敗しました。正しいメールアドレスとパスワードを入力してください。')
      } else {
        setErrorMessage('') // エラーメッセージをクリア
      }
    } catch (error) {
      console.error('ログインエラー:', error)
    }
  }

  console.log(errorMessage)

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/'
    }
  }, [router, status])


  if (status === 'authenticated') {
    return (
      <>
        <button onClick={()=>signOut()}>ログイン済み</button>
      </>
    )
  }

  return (
    <div
      className='fixed w-full top-0 z-50 flex flex-col justify-center items-center h-screen bg-gradient-to-br gap-1 from-white
      to-gray-800'
    >
      <div className='flex flex-col w-10/12 md:w-full items-center justify-center py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white/40 backdrop-blur-md rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <Title
              className={`text-xl leading-tight tracking-tight text-gray-900 text-center
                md:text-2xl dark:text-white font-thin ${quicksand.className}`}
            >
              PSI Measurement
            </Title>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className='space-y-4 md:space-y-6'>
              <div className='mb-6 pt-3 rounded bg-gray-200'>
                <label className='block text-gray-700 text-sm font-light mb-2 ml-3'>Email</label>
                <input
                  type='email'
                  name='Email'
                  ref={email}
                  className='bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-gray-600 transition duration-500 px-3 py-3'
                  placeholder='name@webcrew.co.jp'
                />
              </div>
              <div className='mb-6 pt-3 rounded bg-gray-200'>
                <label className='block text-gray-700 text-sm font-light mb-2 ml-3'>Password</label>
                <input
                  type='password'
                  name='Password'
                  placeholder='••••••••'
                  ref={password}
                  className='bg-white rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-gray-600 transition duration-500 px-3 pb-3 py-3'
                />
              </div>
              <button
                onClick={onLogin}
                className='w-full font-thin bg-gray-950 hover:bg-gray-700 text-white py-2 rounded shadow-lg hover:shadow-xl transition duration-200'>
                  ログイン
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
