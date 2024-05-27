import React from 'react';
import toggle from '@/public/togle-swap.svg'

const SwapComponent:React.FC = () => {
  return (
    <div className="w-full mx-auto flex flex-col place-content-center place-items-center py-16">
      <svg
        className="max-w-[5rem]"
        fill="none"
        strokeWidth="1.5"
        stroke="black"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <h4 className="font-semibold text-black text-sm md:text-base">Coming Soon...</h4>
    </div>
  );
};

export default SwapComponent;
