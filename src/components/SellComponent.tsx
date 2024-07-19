import React from 'react';
import toggle from '@/public/togle-swap.svg'

const SellComponent:React.FC = () => {
  return (
    <div className="max-w-[354px] space-y-5 w-full mx-auto md:max-w-[480px]">
      <form className="flex flex-col space-y-4" encType="multipart/form-data">
        <div className="flex flex-col space-y-2">
          <label htmlFor="coin_name" className="text-[#828282] font-normal text-xs md:text-sm">
            Coin type
          </label>
          <select
            name="coin_name"
            id="cointype"
            className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
            style={{
              background: 'url("/Images/Exchange/dropdown-arrow.svg") 93% center no-repeat',
            }}
          >
            <option value="">Select coin type</option>
            <option id="0" value="Solana">Solana</option>
            <option id="1" value="Bnb Smartchain">Bnb Smartchain</option>
            <option id="2" value="Bitcoin">Bitcoin</option>
            <option id="3" value="USDC">USDC</option>
            <option id="4" value="DOGECOIN">DOGECOIN</option>
            <option id="5" value="Ethereum">Ethereum</option>
            <option id="6" value="Litecoin">Litecoin</option>
            <option id="7" value="Tron">Tron</option>
            <option id="8" value="USDT(BEP20)">USDT(BEP20)</option>
            <option id="9" value="USDT TRC20">USDT TRC20</option>
          </select>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row justify-between">
            <label htmlFor="amount" className="text-[#828282] font-normal text-xs md:text-sm">
              Amount
            </label>
          </div>
          <div className="relative w-full h-14 md:h-16">
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter Amount"
              className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
            />
            <div className="w-10 absolute top-[30%] right-[5%] flex cursor-pointer flex-row items-center place-content-end flex-nowrap space-x-2">
              <h3 className="text-[#BDBDBD] font-normal text-right text-sm md:text-lg">USD</h3>
            </div>
          </div>
          <div className="flex flex-row justify-between -mt-[22px] md:-mt-[26px]">
            <label htmlFor="amount" className="text-[#828282] font-normal text-xs md:text-sm">
              Amount in Naira ---
            </label>
            <div className="flex cursor-pointer flex-row gap-[5.3px]">
              <label htmlFor="amount" className="text-[#E8730C] font-normal text-xs md:text-sm">
                Set by Naira
              </label>
              <img src={toggle.src} alt="toggle" />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between flex-nowrap">
          <div>
            <h3 className="text-[#6B6B6B] font-normal text-sm">Selling rate</h3>
          </div>
          <div>
            <label htmlFor="rate" className="text-[#333333] font-normal text-sm md:text-base">
              ₦1450/$
            </label>
          </div>
        </div>
      </form>
      <div className="max-w-[354px] h-14 mx-auto md:h-16 md:max-w-[480px]">
        <button
          type="submit"
          className="bg-[#E0E0E0] disabled:bg-[#E0E0E0] disabled:cursor-not-allowed hover:bg-[#E8730C] rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base"
        >
          Sell Crypto
        </button>
      </div>
    </div>
  );
};

export default SellComponent;
