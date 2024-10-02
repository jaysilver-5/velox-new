import React from 'react';

const TransactionList = ({ dollar, naira, status, time, type, coinName, network }) => {
  // Determine the status color based on the status prop
  const statusColor = status === 'Declined' ? 'text-[#EB5757]' : (status === 'Pending' ? 'text-[#F2C94C]' : 'text-[#6FCF97]');

  return (
    <div className="h-[72px] flex cursor-pointer flex-row justify-between items-center md:h-[97px]">
      <div>
        <h3 className="text-[#333333] font-semibold text-sm md:text-lg">{type == 'buy' ? <p>Bought</p> : <p>Sold</p>} {dollar}</h3>
        <h5 className="text-[#828282] font-normal text-xs md:text-base">
          {coinName} {network} <span className={statusColor}>. {status}</span>
        </h5>
      </div>
      <div>
        <h3 className="text-[#333333] font-semibold text-right text-lg md:text-xl">{naira}</h3>
        <h5 className="text-[#828282] font-normal text-right text-xs md:text-base">{time}</h5>
      </div>
    </div>
  );
};


export default TransactionList;
