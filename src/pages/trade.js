'use client'
import React, {FC} from "react";
import Header from "@/components/Header";
import TradeNav from "@/components/TradeNav";
import BuyComponent from "@/components/BuyComponent";
import SellComponent from "@/components/SellComponent";
import SwapComponent from "@/components/SwapComponent";
import { useSearchParams } from 'next/navigation'

const Trade = () => {
  const searchParams = useSearchParams() 
  const mode = searchParams.get('mode')
  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center'>
        <Header />

        <div className="mt-32 mb-8 relative mx-auto w-[90%] md:mt-44">
            <div className="w-[90%] mx-auto">
                <div className="flex max-w-[48px] cursor-pointer w-full h-12 rounded-xl items-center justify-center fixed top-[.9rem] md:top-2 left-[38px] z-50 md:border-2 md:border-[#828282] md:z-0 md:relative md:left-0 md:right-0">
                    <svg
                        className="hidden md:block"
                        width="11"
                        height="18"
                        viewBox="0 0 11 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.707 16.293L9.29282 17.7072L0.585707 9.00007L9.29282 0.292969L10.707 1.70718L3.41414 9.00007L10.707 16.293Z"
                        fill="#828282"
                        ></path>
                    </svg>
                    {/* --- */}
                    <svg
                        className="block md:hidden"
                        width="11"
                        height="18"
                        viewBox="0 0 11 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.707 16.293L9.29282 17.7072L0.585707 9.00007L9.29282 0.292969L10.707 1.70718L3.41414 9.00007L10.707 16.293Z"
                        fill="white"
                        ></path>
                    </svg>
                </div>
            </div>
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