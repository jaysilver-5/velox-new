'use client';
import React, { useState, useEffect } from "react";
import Logo from '@/public/black_logo.svg';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [referred, setReferred] = useState(false);
  const [referrerId, setReferrerId] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [clerkId, setClerkId] = useState('');
  const [error, setError] = useState(null);

  const formData = {
    firstName,
    surname,
    emailAddress,
    phoneNumber,
    clerkId,
    username,
    referrerId,
    referred,
  };

  const generateUsername = (email) => {
    const emailPrefix = email.split('@')[0];
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setReferred(referrerId !== null);
    return `${emailPrefix}${randomDigits}`;
  };

  const router = useRouter();

  useEffect(() => {
    setReferred(referrerId !== null);
  }, [referrerId]);

  const onSignupSuccess = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        router.push('/dashboard');
        console.log('User created:', data);
      } else {
        const errorData = await response.json();
        setError(errorData.error); // Store the error
        console.error('Error while posting:', errorData.error);
      }
    } catch (error) {
      setError(error.message); // Store the error
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername(generateUsername(emailAddress));

    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerifying(true);
    } catch (err) {
      setError(JSON.stringify(err, null, 2));
      console.log(error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        setClerkId(completeSignUp.id);
        console.log('This is the clerkID: ' + clerkId);
        await onSignupSuccess();
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/dashboard');
        setVerifying(false);
      } else {
        setError(JSON.stringify(completeSignUp, null, 2));
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      setError(JSON.stringify(err, null, 2));
      console.error('Error:', JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const isFormValid = () => {
    return (
      emailAddress &&
      password &&
      confirmPassword &&
      firstName &&
      surname &&
      phoneNumber &&
      agreeTerms &&
      password === confirmPassword
    );
  };

  if (loading) {
    return (
      <section className="w-full top-0 h-screen z-100 fixed bg-[#fff8] flex justify-center items-center">
        <h1>Loading</h1>
      </section>
    );
  }

  if (verifying) {
    return (
      <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center py-6 xl:py-16'>
        <div className="mx-auto w-[90%] xl:w-full xl:max-w-[720px] max-w-[360px] flex flex-col items-center justify-center xl:gap-y-12 gap-y-8">
          <img src={Logo.src} alt='logo' className="xl:w-[112px] xl:h-[36px] w-[75px] h-[24px]" />
          <h1>Verify your email</h1>
          <form onSubmit={handleVerify} className="w-full flex flex-col items-center justify-between">
            <div className="relative w-full mb-4">
              <label className="text-black text-sm leading-5 font-normal md:text-base" id="code">Enter your verification code</label>
              <input
                className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                value={code}
                id="code"
                name="code"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button type="submit" className="mx-auto mt-4 xl:mt-6 h-[55px] xl:h-[77px] bg-[#E8730C] hover:bg-[#E8730C] rounded-xl text-white font-medium text-base leading-9 w-[80%] md:rounded-2xl md:text-2xl">
              Verify
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (!isLoaded) {
    return (
      <section className="w-full top-0 h-screen z-100 fixed bg-[#fff8] flex justify-center items-center">
        <h1>Loading</h1>
      </section>
    );
  }

  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center py-6 xl:py-16'>
      <div className="mx-auto w-[90%] xl:w-full xl:max-w-[720px] max-w-[360px] flex flex-col items-center justify-center xl:gap-y-12 gap-y-8">
        <img src={Logo.src} alt='logo' className="xl:w-[112px] xl:h-[36px] w-[75px] h-[24px]" />
        <div className="flex items-center justify-center flex-col w-full gap-y-1 xl:gap-y-2">
          <h3 className="font-semibold text-[1.75rem] leading-[135%] xl:text-[2.375rem] text-black">Create an account</h3>
          <p className="font-normal text-sm text-black xl:text-base">Already have an account? <span className="text-[#E8730C]"><Link href="/sign-in">Sign in</Link></span></p>
        </div>

        <form onSubmit={handleSubmit} className="w-[90%] max-w-[354px] flex flex-col items-center justify-center mx-auto mb-10 xl:max-w-[840px]">
          <div className="flex flex-col max-w-[840px] mx-auto xl:gap-y-8 gap-y-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-full">
              <div className="relative w-full">
                <label className="text-black text-sm leading-5 font-normal md:text-base">First name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Your first name"
                  className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="relative w-full">
                <label className="text-black text-sm leading-5 font-normal md:text-base">Surname</label>
                <input
                  type="text"
                  name="surname"
                  placeholder="Your surname"
                  className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>

            <div className="relative w-full">
              <label className="text-black text-sm leading-5 font-normal md:text-base">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            <div className="relative w-full">
              <label className="text-black text-sm leading-5 font-normal md:text-base">Phone number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="relative w-full">
              <label className="text-black text-sm leading-5 font-normal md:text-base">Referrer ID</label>
              <input
                type="text"
                name="referrer_id"
                placeholder="Your referrer ID"
                className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                value={referrerId}
                onChange={(e) => setReferrerId(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-full">
              <div className="relative w-full">
                <label className="text-black text-sm leading-5 font-normal md:text-base">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  className={`mt-2 text-sm border ${passwordMatch ? 'border-[#828282]' : 'border-red-500'} outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]`}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="relative w-full">
                <label className="text-black text-sm leading-5 font-normal md:text-base">Confirm password</label>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  className={`mt-2 text-sm border ${passwordMatch ? 'border-[#828282]' : 'border-red-500'} outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>

            <div className="flex items-center w-full mt-2">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-black text-sm leading-5 font-normal md:text-base">
                I agree to the <a href="#" className="text-[#E8730C]">Terms and Conditions</a>
              </label>
            </div>

            <button type="submit" className="mx-auto mt-4 xl:mt-6 h-[55px] xl:h-[77px] bg-[#E8730C] hover:bg-[#E8730C] rounded-xl text-white font-medium text-base leading-9 w-[80%] md:rounded-2xl md:text-2xl" disabled={!isFormValid()}>
              Create account
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
