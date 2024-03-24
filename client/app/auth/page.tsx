import { TabsAuthForm } from "@/app/auth/_components/TabsAuthForm"

export default function AuthPage() {
  return (
    <div className='top-0 z-50 flex flex-col justify-center items-center
      h-[100svh] gap-1'>
        <div className='w-[460px] h-[410px] bg-white p-4 rounded-lg'>
          <TabsAuthForm />
        </div>
    </div>
  )
}
