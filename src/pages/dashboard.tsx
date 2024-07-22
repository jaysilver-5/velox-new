'use client'
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Subnav from "@/components/Subnav";
import TabBar from "@/components/TabBar";
import BuyList from '@/components/Buylist';
import SellList from "@/components/SellList";
import Empty from '@/public/empty_txn.svg'
import SwapComponent from "@/components/SwapComponent";
import { useUser } from '@clerk/nextjs';

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

const Dashboard: React.FC = () => {
  const [clerkId, setClerkId] = useState<string | null>(null);
  const { user, isLoaded } = useUser(); // user is the correct object to access user details
  const [tab, setTab] = useState<string>('All');
  const [nav, setNav] = useState<string>('');

  useEffect(() => {
    if (user) {
      setClerkId(user.id); // Access user ID from the user object
    } else {
      setClerkId(null);
    }
  }, [user]);

  console.log(clerkId)

  useEffect(() => {
    if (clerkId) {
      // Fetch user info based on clerkId
      fetch(`/api/getUser?clerkId=${clerkId}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error('Error fetching user info:', data.error);
          } else {
            console.log('User Info:', data);
          }
        })
        .catch(error => console.error('Error:', error));
    } else {
      console.log('Clerk ID is null, skipping fetch.');
    }
  }, [clerkId]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center'>
      <Header />
      <Subnav onSell={() => console.log('')} onBuy={() => console.log('')} onSwap={() => console.log('')} />
      <div className="w-[90%] mb-6 mt-[45px] md:mt-[61px]">
        <h2 className="text-[#4F4F4F] text-lg font-semibold md:text-[22px]">Transaction History</h2>
      </div>
      <TabBar onAll={() => setTab('All')} onBuy={() => setTab('Buy')} onSell={() => setTab('Sell')} onSwap={() => setTab('Swap')} />
      <div className="w-[90%] overflow-y-scroll">
        {tab === 'All' && buyListData && buyListData.map((item, index) => (
          <BuyList
            key={index}
            dollar={item.dollar}
            naira={item.naira}
            status={item.status}
            time={item.time}
          />
        ))}

        {tab === 'Buy' && buyListData && buyListData.map((item, index) => (
          <BuyList
            key={index}
            dollar={item.dollar}
            naira={item.naira}
            status={item.status}
            time={item.time}
          />
        ))}

        {tab === 'Sell' && buyListData && buyListData.map((item, index) => (
          <SellList
            key={index}
            dollar={item.dollar}
            naira={item.naira}
            status={item.status}
            time={item.time}
          />
        ))}

        {buyListData == null && 
        <div className="w-full flex justify-center items-center mt-24">
          <img src={Empty.src} />
        </div>}
        
        {tab === 'Swap' && <SwapComponent />}
      </div>
    </main>
  );
}

export default Dashboard;
