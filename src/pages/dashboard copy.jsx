'use client';
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Subnav from "@/components/Subnav";
import TabBar from "@/components/TabBar";
import BuyList from '@/components/Buylist';
import SellList from "@/components/SellList";
import Empty from '@/public/empty_txn.svg';
import SwapComponent from "@/components/SwapComponent";
import { useDispatch, useSelector } from 'react-redux';
import {
  setFirstName,
  setSurname,
  setEmailAddress,
  setPhoneNumber,
  setClerkId,
  setUsername,
  setReferred,
  setReferralId,
  setBankname,
  setAccountNumber,
  setTransactions,
  setReferralActivities,
} from '../features/user/userSlice'; // Adjust the path if necessary

const buyListData = [
    { dollar: '$202', naira: '₦280,780', status: 'Declined', time: '1 week, 6 days ago' },
    { dollar: '$320', naira: '₦450,000', status: 'Successful', time: '2 weeks ago' },
];

const Dashboard = () => {
    const [tab, setTab] = useState('All');
    const [nav, setNav] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const emailAddress = user.emailAddress; // Replace with dynamic value if needed
            console.log(emailAddress)
            try {
                const response = await fetch(`/api/user/getUser?emailAddress=${encodeURIComponent(emailAddress)}`);
                const data = await response.json();
                if (response.ok) {
                    dispatch(setFirstName(data.firstName));
                    dispatch(setSurname(data.surname));
                    dispatch(setEmailAddress(data.emailAddress));
                    dispatch(setPhoneNumber(data.phoneNumber));
                    dispatch(setClerkId(data.clerkId || ''));
                    dispatch(setUsername(data.username));
                    dispatch(setReferred(data.referred));
                    dispatch(setReferralId(data.referralId || ''));
                    dispatch(setBankname(data.bankname || ''));
                    dispatch(setAccountNumber(data.accountNumber || ''));
                    dispatch(setTransactions(data.transactions || []));
                    dispatch(setReferralActivities(data.referralActivities || []));
                } else {
                    console.error('Failed to fetch user data', data);
                    // If user data not found, push to signup route
                    await registerUser(user); 
                }
            } catch (error) {
                console.error('Error fetching user data', error);
                // If error occurs, push to signup route
                await registerUser(user);
            } finally {
                setLoading(false); // Ensure loading state is set to false after fetching
            }
        };

        const registerUser = async (userData) => {
            try {
                const response = await fetch('/api/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log('User registered successfully:', data);
                    dispatch(setFirstName(data.firstName));
                    dispatch(setSurname(data.surname));
                    dispatch(setEmailAddress(data.emailAddress));
                    dispatch(setPhoneNumber(data.phoneNumber));
                    dispatch(setClerkId(data.clerkId || ''));
                    dispatch(setUsername(data.username));
                    dispatch(setReferred(data.referred));
                    dispatch(setReferralId(data.referralId || ''));
                    dispatch(setBankname(data.bankname || ''));
                    dispatch(setAccountNumber(data.accountNumber || ''));
                    dispatch(setTransactions(data.transactions || []));
                    dispatch(setReferralActivities(data.referralActivities || []));
                } else {
                    console.error('Failed to register user', data);
                }
            } catch (error) {
                console.error('Error registering user', error);
            }
        };

        const getTransaction = async () => {
            const response = await fetch(
              'http://localhost:3000/api/transactions/add?emailAddress=udojoshua3@gmail.com',
              {
                method: 'GET', // GET is the default, so this is optional
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
          
            const data = await response.json();
            console.log(data); // Handle the response data
        };
        
        getTransaction();
        fetchUserData();
    }, [dispatch, user.emailAddress]);

    if (loading) {
        return (
            <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center'>
                {/* Display a loading spinner or placeholder */}
                <div className='spinner-border' role='status'>
                    <span className='sr-only'>Loading...</span>
                </div>
            </main>
        );
    }

    return (
        <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center'>
            <Header />
            <Subnav
                onSell={() => console.log('Sell')}
                onBuy={() => console.log('Buy')}
                onSwap={() => console.log('Swap')}
            />

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
