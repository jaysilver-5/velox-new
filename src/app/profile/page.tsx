'use client'
import React, {FC} from "react";
import Header from "@/components/Header";
import Verified from "@/public/verified.svg"
import { useRouter } from "next/navigation";

const Earnings:React.FC = () => {
  const router = useRouter()
  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center'>
        <Header />

        <div className="w-full flex flex-col space-y-5 mt-[156px] lg:mt-[180px]">
            <div className="mx-auto max-w-[354px] w-full md:max-w-[480px] flex flex-col space-y-8">
                <div className="flex w-full flex-row flex-nowrap gap-2 place-content-center md:gap-8">
                <div className="grid gap-2">
                    <h3 className="text-[#1A1A1A] font-semibold text-[28px] leading-[37.8px] md:text-4xl">
                    Joel Udo
                    </h3>
                    <div className="flex items-center flex-row gap-1">
                    <p className="text-[#4F4F4F] font-normal text-xs leading-4 md:text-sm">
                        Your Account has been verified
                    </p>
                    <div className="inline-flex items-center w-4 h-4 md:w-6 md:h-6">
                        <img src={Verified.src} alt="verified" />
                    </div>
                    </div>
                </div>
                </div>
                <div className="flex place-items-center grid-cols-2 mx-auto gap-4 w-full max-w-[391px] md:max-w-[480px]">
                <button onClick={() => router.push('/my-profile')} className="max-w-[100%] w-full border-[#828282] border-[1px] rounded-xl text-black bg-white font-semibold text-base h-[48px] md:text-[22px] md:h-[77px]">
                    Edit Profile
                </button>
                </div>
            </div>
            <div className="w-[90%] mx-auto flex flex-col space-y-4">
                <div className="w-full flex flex-row justify-between items-center">
                <h5 className="text-left font-semibold text-lg text-black md:text-2xl">
                    Statistics
                </h5>
                <select
                    name="filter_by"
                    id="coin_to_receive"
                    className="max-w-[10rem] rounded-lg py-0 !h-12 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
                    style={{ background: 'url("/Images/Exchange/dropdown-arrow.svg") 93% center no-repeat' }}
                >
                    <option value="all-time">All-Time</option>
                    <option value="this-week">Last 7 days</option>
                    <option value="this-month">This Month</option>
                </select>
                </div>
                <div className="grid grid-cols-2 gap-5">
                <div className="small-statistics-card space-y-3 py-6 px-4 md:px-5 rounded-xl shadow-lg border-[#f1f1f1] border-2">
                    <p className="text-left md:text-center font-normal text-xs md:text-sm text-black">
                    Trade Volume
                    </p>
                    <h3 className="text-[#1A1A1A] text-center font-semibold text-[28px] leading-[37.8px] md:text-3xl">
                    ₦0
                    </h3>
                </div>
                <div className="small-statistics-card space-y-3 py-6 px-4 md:px-5 rounded-xl shadow-lg border-[#f1f1f1] border-2">
                    <p className="text-left md:text-center font-normal text-xs md:text-sm text-black">
                    Most traded coin
                    </p>
                    <h3 className="text-[#1A1A1A] text-center font-semibold text-[28px] break-words whitespace-break-spaces break-all leading-[37.8px] md:text-3xl"></h3>
                </div>
                </div>
            </div>
            <div className="w-[90%] mx-auto !my-16">
                <div className="flex cursor-pointer flex-row gap-4 items-center">
                <h3 className="text-[#E8730C] font-semibold text-sm md:text-base">
                    Change Password
                </h3>
                <svg
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M1.27393 13.75L7.27393 7.75L1.27393 1.75"
                    stroke="#E8730C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </svg>
                </div>
            </div>
        </div>

    </main>
  );
}

export default Earnings;