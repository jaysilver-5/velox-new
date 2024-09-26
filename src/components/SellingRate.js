import React from 'react';

const SellingRate = ({ rate }) => {
  return (
    <div className="flex flex-row justify-between flex-nowrap">
      <div>
        <h3 className="text-[#6B6B6B] font-normal text-sm">Selling rate</h3>
      </div>
      <div>
        <label htmlFor="rate" className="text-[#333333] font-normal text-sm md:text-base">
          ₦{rate}/$
        </label>
      </div>
    </div>
  );
};

export default SellingRate;
