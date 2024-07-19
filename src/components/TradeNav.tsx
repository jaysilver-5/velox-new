'use client'
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
const tabs = 'font-semibold text-sm md:text-base bg-[#F2F2F2] w-full h-full rounded-lg text-[#333333]'
interface tradeHubProps {}

const TradeNav:React.FC = () => {
  const searchParams = useSearchParams() 
  const mode = searchParams.get('mode')
  const router = useRouter()
  return (
    <div className="bg-[#F2F2F2] mb-4 md:max-w-[30rem] gap-2 w-full h-12 p-1 mx-auto place-content-center justify-items-center items-center rounded-lg grid grid-cols-3 max-w-[320px] md:h-16">
        <a className="bg-[#F2F2F2] w-full h-10 md:h-14 text-[#333333]">
            <button onClick={() => router.push(`/trade?mode=buy`)} className={`${tabs} ${mode== 'buy' && 'bg-white'}`}>
                Buy
            </button>
        </a>
        <a className="bg-[#F2F2F2] w-full h-10 md:h-14 text-[#333333]">
            <button onClick={() => router.push(`/trade?mode=sell`)} className={`${tabs} ${mode== 'sell' && 'bg-white'}`}>
                Sell
            </button>
        </a>
        <a className="bg-[#F2F2F2] w-full h-10 md:h-14 text-[#333333]">
            <button onClick={() => router.push(`/trade?mode=swap`)} className={`${tabs} ${mode== 'swap' && 'bg-white'}`}>
                Swap
            </button>
        </a>
    </div>
  )
}

export default TradeNav