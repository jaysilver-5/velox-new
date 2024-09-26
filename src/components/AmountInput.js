import React from 'react';
import { MdOutlineSwapHoriz } from "react-icons/md";
import { IoMdSwap } from "react-icons/io";

const AmountInput = ({ amount, setAmount, amountError, currency, convertedCurrency, handleToggleCurrency }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row justify-between">
        <label htmlFor="amount" className="text-[#828282] font-normal text-xs md:text-sm">
          Amount
        </label>
      </div>
      <div className="relative w-full h-14 md:h-16">
        <input
          placeholder="Enter Amount"
          className={`rounded-lg py-4 px-6 w-full border ${amountError ? 'border-red-500' : 'border-[#E0E0E0]'} bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="w-10 absolute top-[24%] right-[5%] flex cursor-pointer flex-row items-center place-content-end flex-nowrap space-x-2">
          <h3 className="text-[#BDBDBD] font-normal text-right text-sm md:text-lg">{currency === 'dollar' ? 'USD' : 'NGN'}</h3>
        </div>
      </div>
      {amountError && (
        <div className="text-red-500 text-xs -mt-[20px]">
          {amountError}
        </div>
      )}
      <div className="flex flex-row justify-between -mt-[22px] md:-mt-[26px] w-full">
        <label htmlFor="amount" className="text-[#828282] font-normal text-xs md:text-sm w-full">
          Amount in {currency === 'naira' ? 'Dollar' : 'Naira'} : {convertedCurrency}
        </label>
        <div className="flex justify-end items-center cursor-pointer flex-row w-full">
          <label htmlFor="amount" className="text-[#E8730C] font-normal text-xs md:text-sm" onClick={handleToggleCurrency}>
            Set by {currency}
          </label>
          {currency === 'naira' ? <MdOutlineSwapHoriz className="text-[24px] text-[#E8730C]" onClick={handleToggleCurrency} /> : <IoMdSwap className="text-[24px] text-[#E8730C]" onClick={handleToggleCurrency} />}
        </div>
      </div>
    </div>
  );
};

export default AmountInput;
