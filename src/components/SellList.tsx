import React from 'react';

// Define the prop types for SellList
interface SellListProps {
  dollar: string;
  naira: string;
  status: 'Declined' | 'Pending' | 'Successful';
  time: string;
}

// Define the SellList component
const SellList: React.FC<SellListProps> = ({ dollar, naira, status, time }) => {
  // Determine the status color based on the status prop
  const statusColor = status === 'Declined' ? 'text-[#EB5757]' : (status === 'Pending' ? 'text-[#F2C94C]' : 'text-[#6FCF97]');

  return (
    <div className="h-[72px] flex cursor-pointer flex-row justify-between items-center md:h-[97px]">
      <div>
        <h3 className="text-[#333333] font-semibold text-sm md:text-lg">Sold {dollar}</h3>
        <h5 className="text-[#828282] font-normal text-xs md:text-base">
          USDT TRC20 <span className={statusColor}>. {status}</span>
        </h5>
      </div>
      <div>
        <h3 className="text-[#333333] font-semibold text-right text-lg md:text-xl">{naira}</h3>
        <h5 className="text-[#828282] font-normal text-right text-xs md:text-base">{time}</h5>
      </div>
    </div>
  );
};


export default SellList;
