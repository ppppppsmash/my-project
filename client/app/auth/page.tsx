import { TabsAuthForm } from '@/app/auth/_components/TabsAuthForm'

export default function AuthPage() {
  return (
    <div className='relative w-full h-[100svh] overflow-hidden'>
      <div className='col-span-1 bg-white top-0 z-50 flex flex-col justify-center items-center h-[100svh] gap-1 border-l-2 border-l-gray-200'>
          <div className='p-4 rounded-lg'>
            <h1 className='text-center text-2xl mb-5'>PSI MEASUREMENT</h1>
            <TabsAuthForm />
          </div>
      </div>
    </div>
  )
}
