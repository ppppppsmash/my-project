'use client'

import React, { useRef, useState, useEffect, ChangeEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Title } from '@tremor/react'
import { inter, quicksand } from '@/utils/font'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Dialog from '@/components/Dialog/Dialog'

export default function LoginPage() {
  const [isRevealPassword, setIsRevealPassword] = useState<boolean>(false)

  const [emailSaved, setEmailSaved] = useState<string>('')
  const [passwordSaved, setPasswordSaved] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const { data: session, status } = useSession()

  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState<string>('')

  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailSaved(event.target.value)
  }

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordSaved(event.target.value)
  }

  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState)
  }

  const checkHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  const onLogin = async () => {
    const emailValue = email.current?.value || ''
    const passwordValue = password.current?.value || ''

    try {
      const result = await signIn('credentials', {
        email: emailValue,
        password: passwordValue,
        redirect: false
      })

      if (result?.error) {
        setErrorMessage('正しいメールアドレスとパスワードを入力してください.')
      } else {
        setErrorMessage('')

        if (isChecked) {
          localStorage.email = emailValue
          localStorage.password = passwordValue
          localStorage.checkbox = isChecked
        } else {
          localStorage.email = ''
          localStorage.password = ''
        }
      }
    } catch (error) {
      console.error('ログインエラー:', error)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/'
    }

    if (localStorage.checkbox && localStorage.email !== '') {
      setIsChecked(true)
      setEmailSaved(localStorage.email)
      setPasswordSaved(localStorage.password)
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
        <div className='dark:bg-gray-800 w-10/12 mx-auto sm:w-[280px]'>
          <div className='space-y-4 md:space-y-6'>
            <Title
              className={`text-xl leading-tight tracking-tight text-white text-center
                md:text-2xl dark:text-white font-extrabold`}
            >
              PSI Measurement
            </Title>
            <div className='space-y-4 md:space-y-6'>
              <div className='mb-6 pt-3 bg-gray-900 hover:scale-[1.05] transition duration-200'>
                <label className='block text-white text-sm font-light mb-2 ml-3'>Email</label>
                <input
                  type='email'
                  name='Email'
                  ref={email}
                  value={emailSaved}
                  onChange={emailChangeHandler}
                  className='bg-white w-full text-gray-700 focus:outline-none
                    border-b-4 border-gray-300 focus:border-gray-600 transition
                    duration-500 px-3 py-3 placeholder:text-xs'
                  placeholder='name@webcrew.co.jp'
                />
              </div>
              <div className='mb-6 pt-3 bg-gray-900 relative hover:scale-[1.05] transition duration-200 group'>
                <label className='block text-white text-sm font-light mb-2 ml-3'>Password</label>
                <input
                  type={isRevealPassword ? 'text' : 'password'}
                  name='Password'
                  placeholder='••••••••'
                  ref={password}
                  value={passwordSaved}
                  onChange={passwordChangeHandler}
                  className='bg-white w-full text-gray-700 focus:outline-none
                    border-b-4 border-gray-300 focus:border-gray-600 transition
                    duration-500 px-3 pb-3 py-3 placeholder:text-xs'
                />
                <span
                  className='absolute right-2 bottom-4 hidden group-hover:block duration-300 transition-all'
                  onClick={togglePassword}
                >
                    {isRevealPassword ? (
                  <EyeSlashIcon className='w-5 h-5' />
                    ) : (
                  <EyeIcon className='w-5 h-5' />
                    )}
              </span>
              </div>

              <div className='flex gap-x-1'>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={checkHandler}
                />
                <p>
                  remember me
                </p>
              </div>

              <div className='w-full mx-auto'>
                <button
                  onClick={onLogin}
                  className={`w-full bg-gray-950 text-white py-2 hover:shadow-xl transition
                    duration-300 hover:shadow-gray-300/50 font-extrabold ${inter.className}`}>
                    ログイン
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
