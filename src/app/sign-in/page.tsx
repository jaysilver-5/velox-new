import React, {FC} from "react";
import Image from "next/image";
import Logo from '@/public/black_logo.svg'
const text = "Can't remember password?"

const Signin:React.FC = () => {
  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center'>
        <div className="mx-auto w-[90%] xl:w-full xl:max-w-[500px] max-w-[360px] flex flex-col items-center justify-center xl:gap-y-12 gap-y-8">
            <img src={Logo.src} alt='logo' className="xl:w-[112px] xl:h-[36px] w-[75px] h-[24px]"/>
            <div className="flex items-center justify-center flex-col w-full gap-y-1 xl:gap-y-2">
                <h3 className="font-semibold text-[1.75rem] leading-[135%] xl:text-[2.375rem] text-black">Welcome back!</h3>
                <p className="font-normal text-sm text-black xl:text-base">New to Velox? <span className="text-[#E8730C]"><a href="/sign-up">Create an account</a></span></p>
            </div>

            <div className="w-full">
                <div className="flex flex-col justify-end xl:gap-y-6 gap-y-4">
                    <div className="relative w-full "><label className="text-sm text-black leading-5 font-normal md:text-base">Email address</label><input type="email" name="email" placeholder="example@email.com" className="mt-2 text-sm border border-[#828282] outline-none text-black focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]" /></div>
                    <div className="relative w-full"><label className="text-black text-sm leading-5 font-normal md:text-base">Password</label><input type="password" name="password" className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] text-black md:text-base md:rounded-2xl md:h-[65px]" />
                        <span className="absolute cursor-pointer bottom-[10px] top-[33px] w-6 right-0 self-center mx-[27px] h-[55px] md:h-[65px]">
                            <svg className="w-full text-black h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                        </span>
                    </div>
                    <button className="text-[#e8827a] text-right">{text}</button>
                </div>

                <button type="submit" className="mt-4 xl:mt-6 h-[55px] xl:h-[77px] bg-[#E8730C] hover:bg-[#E8730C] rounded-xl text-white font-medium text-base leading-9 w-full md:rounded-2xl md:text-2xl">Sign in</button>
            </div>
        </div>
    </main>
  );
}

export default Signin;