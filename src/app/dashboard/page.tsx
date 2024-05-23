import React, {FC} from "react";
import Header from "@/components/Header";
import Subnav from "@/components/Subnav";
import TabBar from "@/components/TabBar";
import BuyList from "@/components/Buylist"
import Empty from '@/public/empty_txn.svg'

interface BuyListProps {
    dollar: string;
    naira: string;
    status: 'Declined' | 'Pending' | 'Successful';
    time: string;
  }

const buyListData: BuyListProps[] = [
    { dollar: '$202', naira: '₦280,780', status: 'Declined', time: '1 week, 6 days ago' },
    { dollar: '$320', naira: '₦450,000', status: 'Successful', time: '2 weeks ago' },
  ];

const Dashboard:React.FC = () => {
  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center'>
        <Header />
        <Subnav />
        <div className="w-[90%] mb-6 mt-[45px] md:mt-[61px]">
            <h2 className="text-[#4F4F4F] text-lg font-semibold md:text-[22px]">Transaction History</h2>
        </div>
        <TabBar />
        <div className="w-[90%] overdlow-y-scroll">
        {/* {buyListData.map((item, index) => (
            <BuyList
            key={index}
            dollar={item.dollar}
            naira={item.naira}
            status={item.status}
            time={item.time}
            />
        ))} */}
        <div className="w-full flex justify-center items-center mt-24">
            <img src={Empty.src}/>
        </div>
    </div>
    </main>
  );
}

export default Dashboard;