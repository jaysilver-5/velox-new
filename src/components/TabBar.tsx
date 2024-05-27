'use client'

import React, { useState } from "react";
const tabs = 'w-full h-full rounded-md text-[#828282] flex items-center justify-center text-[20px] cursor-pointer'

interface TabBarProps {
  onAll: () => void,
  onBuy: () => void,
  onSell: () => void,
  onSwap: () => void,
}

const TabBar:React.FC<TabBarProps> = ({ onAll, onBuy, onSell, onSwap }) => {
  const [ tab, setTab ] = useState('All')
  return (
    <div className="flex flex-row flex-wrap items-center justify-center w-[90%] bg-[#F2F2F2] xl:h-[76px] h-[48px] rounded-md p-[6px]">
        <div className="w-full h-full flex justify-between items-center gap-x-4">
            <div onClick={() => {onAll(); setTab('All')}} className={`${tabs} ${tab == 'All' && 'bg-white'}`}>All</div>
            <div onClick={() => {onBuy(); setTab('Buy')}} className={`${tabs} ${tab == 'Buy' && 'bg-white'}`}>Buy</div>
            <div onClick={() => {onSell(); setTab('Sell')}} className={`${tabs} ${tab == 'Sell' && 'bg-white'}`}>Sell</div>
            <div onClick={() => {onSwap(); setTab('Swap')}} className={`${tabs} ${tab == 'Swap' && 'bg-white'}`}>Swap</div>
        </div>
    </div>
  );
};

export default TabBar;
