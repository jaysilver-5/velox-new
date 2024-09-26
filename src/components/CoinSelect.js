import React from 'react';

const CoinSelect = ({ coinType, setCoinType }) => {
  const coinOptions = [
    { id: "0", value: "Solana" },
    { id: "1", value: "Bnb Smartchain" },
    { id: "2", value: "Bitcoin" },
    { id: "3", value: "USDC" },
    { id: "4", value: "DOGECOIN" },
    { id: "5", value: "Ethereum" },
    { id: "6", value: "Litecoin" },
    { id: "7", value: "Tron" },
    { id: "8", value: "USDT(BEP20)" },
    { id: "9", value: "USDT TRC20" },
  ];

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="coin_name" className="text-[#828282] font-normal text-xs md:text-sm">
        Coin type
      </label>
      <select
        name="coin_name"
        id="cointype"
        className={`rounded-lg py-4 px-6 w-full border ${coinType === '' ? 'border-red-500' : 'border-[#E0E0E0]'} bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm`}
        value={coinType}
        onChange={(e) => setCoinType(e.target.value)}
      >
        <option value="">Select coin type</option>
        {coinOptions.map(option => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CoinSelect;
