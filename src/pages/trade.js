'use client'
import React, {FC} from "react";
import Header from "@/components/Header";
import TradeNav from "@/components/TradeNav";
import BuyComponent from "@/components/BuyComponent";
import SellComponent from "@/components/SellComponent";
import SwapComponent from "@/components/SwapComponent";
import { useSearchParams } from 'next/navigation';
import backArrow from '@/public/back_arrow.svg';
import border from '@/public/border_button.svg';
import { useRouter } from "next/navigation";

const Trade = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center'>
        <Header />

        <div className="mt-32 mb-8 relative mx-auto w-[90%] md:mt-44">
            <button  onClick={() => router.push('/dashboard')} className="w-[90%] mx-auto">
                <div className="flex max-w-[48px] cursor-pointer w-full h-12 rounded-xl items-center justify-center fixed top-[.9rem] md:top-2 left-[38px] z-50 md:border-2 md:border-[#828282] md:z-0 md:relative md:left-0 md:right-0">
                    <img src={backArrow.src} />
                    {/* --- */}
                    <img src={border.src} />
                </div>
            </button>
            <div className="w-full h-24"> 
                <TradeNav />
                {mode == 'sell' && <SellComponent />}
                {mode == 'buy' && <BuyComponent />}
                {mode == 'swap' && <SwapComponent />}
            </div>
        </div>


    </main>
  );
}

export default Trade;