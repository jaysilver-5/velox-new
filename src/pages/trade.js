'use client'
import React, {useEffect} from "react";
import Header from "@/components/Header";
import TradeNav from "@/components/TradeNav";
import BuyComponent from "@/components/BuyComponent";
import SellComponent from "@/components/SellComponent";
import SwapComponent from "@/components/SwapComponent";
import { useSearchParams } from 'next/navigation';
import backArrow from '@/public/back_arrow.svg';
import border from '@/public/border_button.svg';
import { useRouter } from "next/navigation";

const Trade = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  useEffect(() => {
    router.push('/trade?mode=sell')
  }, [router])

  return (
    <div>
        {mode == 'sell' && <SellComponent />}
        {mode == 'buy' && <BuyComponent />}
        {mode == 'swap' && <SwapComponent />}
    </div>
  );
}

export default Trade;