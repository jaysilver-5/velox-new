import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineSwapHoriz } from "react-icons/md";
import { IoMdSwap } from "react-icons/io";

const SellComponent = () => {
  const [currency, setCurrency] = useState('naira');
  const [coinType, setCoinType] = useState('');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get emailAddress from Redux store
  const emailAddress = useSelector((state) => state.user.emailAddress);

  const handleToggleCurrency = () => {
    setCurrency(currency === 'naira' ? 'dollar' : 'naira');
  };

  const generateTransactionId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(amount)) {
      setAmountError('Amount must be a number');
      return;
    }

    setLoading(true);
    setAmountError('');

    const transactionId = generateTransactionId();
    const transactionData = {
      transactionId,
      amount: parseFloat(amount),
      type: 'deposit',
      status: 'completed',
      coin_name: coinType,
      rate: 5000, // assuming a fixed rate for example purposes
    };

    try {
      const res = await fetch('/api/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailAddress,
          transactionData,
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert('Transaction successful!');
      } else {
        alert('Transaction failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting transaction:', error);
      alert('An error occurred while submitting the transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[354px] space-y-5 w-full mx-auto md:max-w-[480px]">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex flex-col space-y-2">
          <label htmlFor="coin_name" className="text-[#828282] font-normal text-xs md:text-sm">
            Coin type
          </label>
          <select
            name="coin_name"
            id="cointype"
            className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
            value={coinType}
            onChange={(e) => setCoinType(e.target.value)}
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
              placeholder="Enter Amount"
              className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="w-10 absolute top-[24%] right-[5%] flex cursor-pointer flex-row items-center place-content-end flex-nowrap space-x-2">
              <h3 className="text-[#BDBDBD] font-normal text-right text-sm md:text-lg">{currency === 'dollar' ? 'USD' : 'NGN'}</h3>
            </div>
          </div>
          {amountError && (
            <div className="text-red-500 text-xs mt-1">
              {amountError}
            </div>
          )}
          <div className="flex flex-row justify-between -mt-[22px] md:-mt-[26px] w-full">
            <label htmlFor="amount" className="text-[#828282] font-normal text-xs md:text-sm w-full">
              Amount in {currency === 'naira' ? 'Dollar' : 'Naira'}
            </label>
            <div className="flex justify-end items-center cursor-pointer flex-row w-full">
              <label htmlFor="amount" className="text-[#E8730C] font-normal text-xs md:text-sm" onClick={handleToggleCurrency}>
                Set by {currency}
              </label>
              {currency === 'naira' ? <MdOutlineSwapHoriz className='text-[24px] text-[#E8730C]' onClick={handleToggleCurrency} /> : <IoMdSwap className='text-[24px] text-[#E8730C]' onClick={handleToggleCurrency} />}
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
        <div className="w-full h-14 md:h-16">
          <button
            type="submit"
            className={`rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base ${!coinType || !amount || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E8730C] hover:bg-[#E8730C]'}`}
            disabled={!coinType || !amount || loading}
          >
            {loading ? 'Processing...' : 'Sell Crypto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellComponent;
