'use client';
import React, { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Subnav from "@/components/Subnav";
import TabBar from "@/components/TabBar";
import BuyList from '@/components/Buylist';
import SellList from "@/components/SellList";
import Empty from '@/public/empty_txn.svg';
import SwapComponent from "@/components/SwapComponent";
import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import LoadingModal from '@/components/ui/LoadingModal';
import TransactionList from "@/components/TransactionList";
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

const Dashboard = () => {
  const [tab, setTab] = useState('All');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const fetchUserData = async (emailAddress) => {
    try {
      setLoading(true);
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
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (emailAddress) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/transactions/add?emailAddress=${encodeURIComponent(emailAddress)}`);
      const data = await response.json();
      if (data.success) {
        setTransactions(mapTransactionData(data.data));
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const mapTransactionData = (transactions) => {
    return transactions.map((transaction) => {
      const relativeTime = formatDistanceToNow(new Date(transaction.createdAt || new Date()), { addSuffix: true });
      return {
        dollar: `$${transaction.amount_dollar}`,
        naira: `₦${transaction.amount_naira.toLocaleString()}`,
        status: transaction.status === 'completed' ? 'Successful' : transaction.status === 'pending' ? 'Pending' : 'Declined',
        time: relativeTime,
        type: transaction.type,
        coinName: transaction.coin_name,
        network: transaction.network,
      };
    });
  };

  useEffect(() => {
    if (user.emailAddress) {
      fetchUserData(user.emailAddress);
      fetchTransactions(user.emailAddress);
    }
  }, [user.emailAddress]);

  const renderTabContent = useMemo(() => {
    if (tab === 'Buy') {
      return transactions.filter(txn => txn.type === 'buy').map((item, index) => (
        <TransactionList key={index} {...item} />
      ));
    } else if (tab === 'Sell') {
      return transactions.filter(txn => txn.type === 'sell').map((item, index) => (
        <TransactionList key={index} {...item} />
      ));
    } else if (tab === 'Swap') {
      return <SwapComponent />;
    } else {
      return transactions.map((item, index) => (
        <TransactionList key={index} {...item} />
      ));
    }
  }, [tab, transactions]);

  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center'>
      <Header />
      <Subnav
        onSell={() => setTab('Sell')}
        onBuy={() => setTab('Buy')}
        onSwap={() => setTab('Swap')}
      />
      <div className="w-[90%] mb-6 mt-[45px] md:mt-[61px]">
        <h2 className="text-[#4F4F4F] text-lg font-semibold md:text-[22px]">Transaction History</h2>
      </div>
      <TabBar onAll={() => setTab('All')} onBuy={() => setTab('Buy')} onSell={() => setTab('Sell')} onSwap={() => setTab('Swap')} />
      <div className="w-[90%] overflow-y-scroll">
        {transactions.length ? renderTabContent : (
          <div className="w-full flex justify-center items-center mt-24">
            <img src={Empty.src} alt="No transactions" />
          </div>
        )}
        {loading && <LoadingModal />}
      </div>
    </main>
  );
};

export default Dashboard;
