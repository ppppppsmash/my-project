'use client'

import React, { useRef, useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { data: session, status } = useSession()

  const email = useRef<HTMLInputElement | null>(null)
  const password = useRef<HTMLInputElement | null>(null)

  const router = useRouter()

  const onLogin = async () => {
    const emailValue = email.current?.value || ''
    const passwordValue = password.current?.value || ''
    const result = await signIn('credentials', {
      email: emailValue,
      password: passwordValue,
      redirect: true,
      callbackUrl: '/'
    })

    console.log(email, password)
  }

  console.log(session)


  if (status === 'authenticated') {
    return (
      <>
        {/* {window.location.href = '/'} */}
        <button onClick={()=>signOut()}>Sign Out</button>
      </>
    )
  }

  return (
    <div
      className='flex flex-col justify-center items-center h-screen bg-gradient-to-br gap-1 from-cyan-300
      to-sky-600'
    >
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='w-full bg-white/30 backdrop-blur-sm rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Page Speed Measurement
            </h1>
            <div className='space-y-4 md:space-y-6'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                <input
                  type='email'
                  name='Email'
                  ref={email}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                  placeholder='name@company.com'
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password</label>
                <input
                  type='password'
                  name='Password'
                  placeholder='••••••••'
                  ref={password}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
                />
              </div>
              {/* <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                      <div className='flex items-center h-5'>
                        <input id='remember' aria-describedby='remember' type='checkbox' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800' required='' />
                      </div>
                      <div className='ml-3 text-sm'>
                        <label for='remember' className='text-gray-500 dark:text-gray-300'>Remember me</label>
                      </div>
                  </div>
              </div> */}
            <button
              onClick={onLogin}
              className='w-full text-white bg-gray-950 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'>
                ログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}