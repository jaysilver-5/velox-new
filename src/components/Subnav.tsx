'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SubnavProps {
    onSell:() => void,
    onSwap: () => void,
    onBuy:() => void,
}

const Subnav:React.FC<SubnavProps> = ({onSell, onSwap, onBuy}) => {
  const router = useRouter()
  return (
    <div className="flex flex-row flex-wrap items-center justify-center space-y-6 space-x-0 md:space-y-0 md:space-x-6 lg:justify-between w-[90%] mt-[156px] lg:mt-[180px]">
        <div className="mx-auto">
            <h2 className="text-[#333333] text-center font-semibold text-2xl md:text-4xl">
                terzetto <br className="block md:hidden" />
                <span className="text-[#4F4F4F] text-lg md:text-2xl">What&lsquo;s good?</span>
            </h2>
        </div>
        <div className="grid grid-cols-3 gap-6 w-full max-w-[460px]">
            <button onClick={() => router.push(`/trade?mode=sell`)} className="w-full flex flex-col space-y-3 place-content-center place-items-center cursor-pointer">
                <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="fill-[#F69E521A] stroke-[#F69E521A]" cx="24.6667" cy="24.5" r="24" fill="#F2F2F2"></circle>
                    <path className="stroke-[#E8730C]" d="M24.6667 31.5V17.5M24.6667 17.5L17.6667 24.5M24.6667 17.5L31.6667 24.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <h3 className="text-[#4F4F4F] font-semibold text-sm md:text-xl">Sell Crypto</h3>
            </button>
            <button onClick={() => router.push(`/trade?mode=buy`)} className="w-full flex flex-col space-y-3 place-content-center place-items-center cursor-pointer">
                <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="fill-[#F69E521A] stroke-[#F69E521A]" cx="24" cy="24.5" r="24" fill="#F2F2F2"></circle>
                    <path className="stroke-[#E8730C]" d="M24 16.5V32.5M24 32.5L30 26.5M24 32.5L18 26.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <h3 className="text-[#4F4F4F] font-semibold text-sm md:text-xl">Buy Crypto</h3>
            </button>
            <button onClick={() => router.push(`/trade?mode=swap`)} className="w-full flex flex-col space-y-3 place-content-center place-items-center cursor-pointer">
                <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="fill-[#F69E521A] stroke-[#F69E521A]" cx="24.3333" cy="24.5" r="24" fill="#F2F2F2"></circle>
                    <path className="stroke-[#E8730C]" d="M32.3333 29.5H16.3333M16.3333 29.5L20.3333 25.5M16.3333 29.5L20.3333 33.5M16.3333 19.5H32.3333M32.3333 19.5L28.3333 15.5M32.3333 19.5L28.3333 23.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <h3 className="text-[#4F4F4F] font-semibold text-sm md:text-xl">Swap Crypto</h3>
            </button>
        </div>
    </div>
  );
};

export default Subnav;
