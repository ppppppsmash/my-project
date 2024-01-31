'use client'

import React, { useRef, useState, useEffect } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Title } from '@tremor/react'
import { inter, quicksand } from '@/utils/font'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import Dialog from '@/components/Dialog/Dialog'

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
        redirect: false,
      })

      if (result?.error) {
        setErrorMessage('正しいメールアドレスとパスワードを入力してください.')
      } else {
        setErrorMessage('')
      }
    } catch (error) {
      console.error('ログインエラー:', error)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/'
    }
  }, [router, status])

  document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onLogin()
    }
  })

  return (
    <div
      id='login'
      className='fixed w-full top-0 z-50 flex flex-col justify-centeritems-center
      h-screen gap-1'
    >
      {errorMessage &&
        <Dialog
          className='w-10/12 md:w-1/2 mx-auto absolute top-16 -translate-x-1/2 left-1/2 opacity-0 animate-slide-in-sec'
          title='ログインに失敗しました'
          color='red'
          icon={ExclamationTriangleIcon}
          message={errorMessage}
        />
      }
      <div className='flex flex-col w-10/12 md:w-full items-center justify-center
        sm:py-8 mx-auto md:h-screen lg:py-0 pt-[150px]'>
        <div className='w-full bg-gray-400/30 backdrop-blur-lg rounded-xl shadow-3xl
          dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 border border-gray-400/30
          dark:border-gray-700 hover:scale-[1.01] transition duration-300'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <Title
              className={`text-xl leading-tight tracking-tight text-white text-center
                md:text-2xl dark:text-white font-semibold ${quicksand.className}`}
            >
              PSI Measurement
            </Title>
            <div className='space-y-4 md:space-y-6'>
              <div className='mb-6 pt-3 rounded bg-gray-900'>
                <label className='block text-white text-sm font-light mb-2 ml-3'>Email</label>
                <input
                  type='email'
                  name='Email'
                  ref={email}
                  className='bg-white rounded w-full text-gray-700 focus:outline-none
                    border-b-4 border-gray-300 focus:border-gray-600 transition
                    duration-500 px-3 py-3 placeholder:text-xs'
                  placeholder='name@webcrew.co.jp'
                />
              </div>
              <div className='mb-6 pt-3 rounded bg-gray-900'>
                <label className='block text-white text-sm font-light mb-2 ml-3'>Password</label>
                <input
                  type='password'
                  name='Password'
                  placeholder='••••••••'
                  ref={password}
                  className='bg-white rounded w-full text-gray-700 focus:outline-none
                  border-b-4 border-gray-300 focus:border-gray-600 transition
                  duration-500 px-3 pb-3 py-3 placeholder:text-xs'
                />
              </div>
              <button
                onClick={onLogin}
                className={`w-full bg-gray-950 text-white py-2 rounded hover:shadow-xl transition
                  duration-300 hover:shadow-gray-300 font-extrabold ${inter.className}`}>
                  ログイン
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
