'use client'
import Image from "next/image";
import Logo from '@/public/white_logo.svg'
import iPhone from '@/public/big_phone.png'
import Shield from '@/public/shield-ok.png'
import message from '@/public/comment-text.png'
import card from '@/public/creditcard-no.png'
import phone from '@/public/iPhone.png'
import Telegram from '@/public/telegram.png'
import Instagram from '@/public/instagram.png'
import twitter from '@/public/twitter.png'
import bottomImage from '@/public/bottom_image.png'
const text = 'xl:text-[56px] text-[40px] xl:font-bold font-extrabold text-white xl:leading-[72px] leading-[50px]'
const coltext = 'xl:text-[56px] text-[40px] xl:font-bold font-extrabold text-[#E8730C] xl:leading-[72px] leading-[50px]'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  const routeLogic = () => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    } else {
      router.push('/sign-up')
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard');
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <main className='w-full bg-[#1A1A1A] min-h-screen flex flex-col items-center justify-center'>
      <SignedOut>
        <div className='w-full bg-[#1A1A1A] xl:min-h-screen flex flex-col xl:justify-between'>
          <header className="logo svelte xl:px-[6rem] px-[1.8rem] xl:pt-[4.2rem] pt-[3rem]">
            <img src={Logo.src} className="xl:w-[110px] w-[70px]" alt="Logo" />
          </header>

          <section className="flex flex-col h-full w-full items-center xl:py-[3rem] xl:gap-y-4 gap-y-8 mt-40">
            <div className="flex flex-col h-full w-full items-center">
              <h1 className={text}>Buy and Sell</h1>
              <h1 className={coltext}>Cryptocurency</h1>
              <h1 className={text}>easily with Bank</h1>
              <h1 className={text}>Transfer</h1>
            </div>
            <button onClick={routeLogic} className='bg-[#E8730C] xl:w-[20rem] w-[13rem] h-[3.5rem] xl:h-[4.5rem] xl:rounded-xl rounded-2xl text-white font-medium xl:text-[24px] text-[16px]'>Trade Crypto</button>
          </section>
        </div>

        <img src={iPhone.src} className='relative xl:w-[617px] w-[312px] xl:mt-0 mt-8' alt='iphone-image' />

        <section className='bg-[#000] w-full flex flex-col items-center justify-center pb-24'>
          <h1 className='text-white my-16 xl:text-[16px] text-[14px] text-center xl:w-full w-[360px]'>Depositing and withdrawing from your trading account just got easier with Velox.</h1>
          <div className='flex flex-col gap-y-8 items-center justify-center'>
            <div className='flex xl:flex-row flex-col gap-x-8 gap-y-8'>
              <div className='xl:w-[28rem] w-[21.9rem] xl:h-[19rem] h-[12rem] bg-[#1a1a1a] rounded-xl text-white flex flex-col justify-end xl:gap-y-4 gap-y-3 xl:p-10 p-6'>
                <img src={Shield.src} className='xl:w-12 xl:h-12 h-6 w-6' alt="shield-icon" />
                <h1 className='xl:text-[30px] text-[18px] font-medium'>Safe and Secure</h1>
                <p className='text-[16px] font-thin'>Your data is safe and secured with us. None of your data is shared with a third party company</p>
              </div>

              <div className='xl:w-[28rem] w-[21.9rem] xl:h-[19rem] h-[12rem] bg-[#1a1a1a] rounded-xl text-white flex flex-col justify-end xl:gap-y-4 gap-y-3 xl:p-10 p-6'>
                <img src={phone.src} className='xl:w-12 xl:h-12 h-6 w-6' alt="phone-icon" />
                <h1 className='xl:text-[30px] text-[18px] font-medium'>Easy to Use</h1>
                <p className='text-[16px] font-thin'>The platform is designed to be as simple as possible so our users can trade with ease.</p>
              </div>
            </div>

            <div className='flex xl:flex-row flex-col gap-x-8 gap-y-8'>
              <div className='xl:w-[28rem] w-[21.9rem] xl:h-[19rem] h-[13rem] bg-[#1a1a1a] rounded-xl text-white flex flex-col justify-end xl:gap-y-4 gap-y-3 xl:p-10 p-6'>
                <img src={message.src} className='xl:w-12 xl:h-12 h-6 w-6' alt="customer-sipports" />
                <h1 className='xl:text-[30px] text-[18px] font-medium'>24/7 Customer service</h1>
                <p className='text-[16px] font-thin'>Our customer service representatives are always available every minute of the day to make sure you are attended to.</p>
              </div>
              
              <div className='xl:w-[28rem] w-[21.9rem] xl:h-[19rem] h-[12rem] bg-[#1a1a1a] rounded-xl text-white flex flex-col justify-end xl:gap-y-4 gap-y-3 xl:p-10 p-6'>
                <img src={card.src} className='xl:w-12 xl:h-12 h-6 w-6' alt="card-icon" />
                <h1 className='xl:text-[30px] text-[18px] font-medium'>Customer friendly rates</h1>
                <p className='text-[16px] font-thin'>You receive the best market rates whenever you buy or sell your coins to Velox.</p>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full flex flex-col justify-center items-center bg-[#1A1A1A] xl:gap-y-10 gap-y-6 xl:py-40 py-32'>
          <img src={bottomImage.src} className='xl:w-[20rem] w-[16rem]' alt="image" />
          <h1 className='text-white font-bold xl:text-[40px] text-[30px] text-center'>Introducing The Boys At Velox</h1>
          <p className='text-center text-white font-normal xl:text-[16px] text-[12px] w-full px-[2rem]'>The Boys At Velox Is A Fast Growing Educational And Interactive Community Of The Crypto Community.</p>
          <button className='xl:w-[26rem] w-[18rem] bg-transparent border-2 border-[#814613] xl:rounded-lg rounded-2xl xl:h-[4.5rem] h-[3.5rem] flex items-center justify-center gap-x-4'>
            <img src={Telegram.src} className='xl:w-8 w-6' alt='image'/>
            <h3 className='text-white font-medium xl:text-[20px] text-[16px]'>Join Telegram channel</h3>
          </button>
        </section>

        <section className='w-full xl:h-[24rem] h-[20rem] bg-[#000000] xl:px-[6rem] px-[2rem] flex justify-center xl:items-start items-center flex-col xl:gap-y-20 gap-y-16'>
          <div className='w-full flex xl:flex-row flex-col justify-between'>
            <div className='flex flex-col gap-y-4'>
              <h1 className='text-white xl:text-[32px] text-[20px] font-medium '>Contact</h1>
              <a href='email:support@velox.com.ng' className='cursor-pointer text-white font-medium xl:text-[18px] text-[15px]'>support@velox.com.ng</a>
              <div className='flex items-center gap-x-4'>
                <img className='xl:w-12 w-6' src={Instagram.src} alt="instagram-icon" />
                <img className='xl:w-12 w-6' src={twitter.src} alt="twitter-icon" />
              </div>
            </div>

            <div className='text-white text-[16px] flex flex-col xl:gap-y-8 gap-y-2'>
              <p>Privacy Policy</p>
              <p>Terms and Conditions</p>
            </div>
          </div>
          <div>
            <h1 className='text-white xl:text-[20px] text-[16px]'>Copyright © 2024 Velox</h1>
          </div>
        </section>
      </SignedOut>
    </main>
  );
}
