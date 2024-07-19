import React, {FC} from "react";
import Header from "@/components/Header";
import Subnav from "@/components/Subnav";
import TabBar from "@/components/TabBar";
import BuyList from "@/components/Buylist";
import Empty from '@/public/empty_txn.svg';
import Copy from "@/public/copy.svg"

const Earnings = () => {
  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center'>
        <Header />

        <div className="mx-auto w-full mt-[156px] lg:mt-[180px]">
            <div>
                <h2 className="text-[#E8730C] leading-[51px] text-center font-bold text-[38px] md:text-5xl">
                ₦0
                </h2>
                <p className="text-[#828282] text-xs text-center font-normal md:text-sm">
                Withdrawable balance
                </p>
            </div>
            <div>
                <p className="font-medium text-red-600 text-sm md:text-base text-center max-w-xs mx-auto">
                Please verify your account and make at least one trade before you can withdraw your reward
                </p>
            </div>
        </div>

        <div className="w-[90%] my-8">
            <ul className="w-full flex grid-cols-2 cursor-pointer gap-3 items-center rounded-lg bg-[#F2F2F2] h-[48px] md:grid md:max-w-full md:h-[77px]">
                <li className="py-[10px] md:py-[18px] active-filter font-semibold text-sm list-none rounded-md text-[#828282] md:text-lg md:w-[95%] w-full text-center p-[22px]">
                    Referrals
                </li>
                <li className="font-normal text-sm list-none rounded-md text-[#828282] md:text-lg md:w-[95%] w-full text-center p-[22px]">
                    Cashback
                </li>
            </ul>
        </div>

        <div className="bg-[#FAFAFA] h-auto w-[90%]">
            <div className="pt-[30px]">
                <h5 className="text-center font-semibold text-sm text-black md:text-base">
                No. of Referrals
                </h5>
            </div>
            <div className="grid grid-cols-2">
                <div className="pt-6 pb-[30px]">
                <h3 className="text-[#1A1A1A] text-center font-semibold text-[28px] leading-[37.8px] md:text-3xl">
                    0
                </h3>
                <p className="text-[#828282] text-center font-normal text-xs md:text-sm">
                    This week
                </p>
                </div>
                <div className="pt-6 pb-[30px]">
                <h3 className="text-[#1A1A1A] text-center font-semibold text-[28px] leading-[37.8px] md:text-3xl">
                    0
                </h3>
                <p className="text-[#828282] text-center font-normal text-xs md:text-sm">
                    All time
                </p>
                </div>
            </div>
            <div className="max-w-[11rem] w-full mx-auto flex space-x-2 items-center place-content-center cursor-pointer">
                <h3 className="text-[#E8730C] font-semibold text-sm md:text-base">
                See referral history
                </h3>
                <svg
                className="!stroke-[#E8730C]"
                width="8"
                height="13"
                viewBox="0 0 8 13"
                stroke="#E8730C"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.361938 1.63802L1.30475 0.695211L7.10949 6.49995L1.30475 12.3047L0.361938 11.3619L5.22387 6.49995L0.361938 1.63802Z"
                    fill="#E8730C"
                ></path>
                </svg>
            </div>
        </div>

        <div className="bg-[#FAFAFA] h-auto w-[90%] mt-2">
            <div className="pt-[30px]">
                <h5 className="text-center font-semibold text-sm text-black md:text-base">
                Earnings
                </h5>
            </div>
            <div className="grid grid-cols-2">
                <div className="pt-6 pb-[30px]">
                <h3 className="text-[#1A1A1A] text-center font-semibold text-[28px] leading-[37.8px] md:text-3xl">
                    ₦0
                </h3>
                <p className="text-[#828282] text-center mx-auto font-normal max-w-[7rem] w-full md:w-auto md:max-w-max text-xs md:text-sm">
                    Total Referrals Trade Volume
                </p>
                </div>
                <div className="pt-6 pb-[30px]">
                <h3 className="text-[#1A1A1A] text-center font-semibold text-[28px] leading-[37.8px] md:text-3xl">
                    ₦0
                </h3>
                <p className="text-[#828282] text-center font-normal text-xs md:text-sm">
                    Total Earnings
                </p>
                </div>
            </div>
        </div>

        <div className="h-auto mb-16 max-w-[246px] w-full mx-auto md:max-w-[360px]">
            <div className="pt-[30px] mb-4">
                <h5 className="text-center font-normal text-sm text-black md:text-base">
                Earn 0.1% commission every time your referrals trade
                </h5>
            </div>
            <div className="bg-[#FDEEE2] py-3 rounded-xl text-center mx-auto w-full max-w-[158px] h-[84px] md:max-w-[200px]">
                <p className="text-[#6B6B6B] font-normal text-xs">Referral ID</p>
                <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
                <h3 id="referralID" className="text-[#E8730C] text-ellipsis overflow-hidden w-28 font-medium text-[28px] md:text-4xl">
                    udojoel3
                </h3>
                <div>
                    <img src={Copy.src} alt="copy" />
                </div>
                </div>
            </div>
        </div>

    </main>
  );
}

export default Earnings;