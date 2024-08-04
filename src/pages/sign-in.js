'use client';

import React, { useState } from "react";
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Logo from '@/public/black_logo.svg';
import { useDispatch } from 'react-redux';
import { setEmailAddress } from '../features/user/userSlice';

const text = "Can't remember password?";

const Signin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize dispatch

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    setLoading(true); // Start loading state
    setErrorMessage(null); // Reset error message

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        dispatch(setEmailAddress(email)); // Dispatch the email address to Redux store
        router.push('/dashboard'); // Redirect to '/dashboard'
      } else {
        if (signInAttempt.errors?.length > 0) {
          const message = signInAttempt.errors[0].message;
          setErrorMessage(message);
          console.error(message);
        }
      }
    } catch (err) {
      const message = err.errors?.[0]?.message || 'An unknown error occurred.';
      setErrorMessage(message);
      console.error(message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center'>
      <div className="mx-auto w-[90%] xl:w-full xl:max-w-[500px] max-w-[360px] flex flex-col items-center justify-center xl:gap-y-12 gap-y-8">
        <img src={Logo.src} alt='logo' className="xl:w-[112px] xl:h-[36px] w-[75px] h-[24px]" />
        <div className="flex items-center justify-center flex-col w-full gap-y-1 xl:gap-y-2">
          <h3 className="font-semibold text-[1.75rem] leading-[135%] xl:text-[2.375rem] text-black">Welcome back!</h3>
          <p className="font-normal text-sm text-black xl:text-base">New to Velox? <span className="text-[#E8730C]"><Link href="/sign-up">Create an account</Link></span></p>
        </div>

        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col justify-end xl:gap-y-6 gap-y-4">
            <div className="relative w-full">
              <label className="text-sm text-black leading-5 font-normal md:text-base">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                aria-label="Email address"
                className="mt-2 text-sm border border-[#828282] outline-none text-black focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <label className="text-black text-sm leading-5 font-normal md:text-base">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] text-black md:text-base md:rounded-2xl md:h-[65px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span 
                className="absolute cursor-pointer bottom-[10px] top-[33px] w-6 right-0 self-center mx-[27px] h-[55px] md:h-[65px]"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg className="w-full text-black h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showPassword ? "M3 3l18 18M4.93 4.93A10.097 10.097 0 0112 3c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-5.411-2.411A3 3 0 119 9.88l-4.24 4.24M9.88 9.88l4.24-4.24" : "M12 19c-4.478 0-8.268-2.943-9.543-7a10.025 10.025 0 014.132-5.411m15.824 5.411a9.973 9.973 0 00-1.563-3.029m-1.563 3.029a3 3 0 11-4.243-4.243M9.88 9.88l4.24-4.24m0 0a9.973 9.973 0 00-1.562-1.563m0 0a9.973 9.973 0 00-3.03-1.563M3 3l18 18"}/>
                </svg>
              </span>
            </div>
            <button className="text-[#e8827a] text-right">{text}</button>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button type="submit" className="mt-4 xl:mt-6 h-[55px] xl:h-[77px] bg-[#E8730C] hover:bg-[#E8730C] rounded-xl text-white font-medium text-base leading-9 w-full md:rounded-2xl md:text-2xl">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
      {errorMessage && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[480px] w-[320px] flex flex-col items-center justify-center gap-y-8">
            <h2 className="text-2xl font-bold">Error</h2>
            <p className="text-[#ff0000]">{errorMessage}</p>
            <div className="flex items-center justify-center gap-x-4">
              <button onClick={() => router.push('/sign-up')} className="lg:px-6 rounded-full lg:py-2 border-2 border-black lg:text-[20px] text-[12px] px-3 py-1 font-medium">Sign Up</button>
              <button onClick={() => setErrorMessage(null)} className="lg:px-6 rounded-full lg:py-2 lg:text-[20px] text-[12px] px-3 py-1 font-medium bg-[#E8730C] text-white">Try Again</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Signin;
