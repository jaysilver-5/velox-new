'use client'

import React, { useState } from "react";
const tabs = 'w-full h-full rounded-md text-[#828282] flex items-center justify-center text-[20px]'


const TabBar = () => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center w-[90%] bg-[#F2F2F2] xl:h-[76px] h-[48px] rounded-md p-[6px]">
        <div className="w-full h-full flex justify-between items-center gap-x-4">
            <div className={`${tabs} bg-white`}>All</div>
            <div className={tabs}>Buy</div>
            <div className={tabs}>Sell</div>
            <div className={tabs}>Swap</div>
        </div>
    </div>
  );
};

export default TabBar;
