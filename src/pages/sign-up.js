'use client';
import React, { useState, useEffect } from "react";
import Logo from '@/public/black_logo.svg';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import LoadingModal from "../components/ui/LoadingModal";
import { useSelector, useDispatch } from 'react-redux';
import {
  setFirstName,
  setSurname,
  setEmailAddress,
  setUsername,
  setPhoneNumber,
  setReferred,
  setReferralId,
} from '../features/user/userSlice';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddressLocal] = useState('');
  const [password, setPasswordLocal] = useState('');
  const [confirmPassword, setConfirmPasswordLocal] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [firstName, setFirstNameLocal] = useState('');
  const [surname, setSurnameLocal] = useState('');
  const [phoneNumber, setPhoneNumberLocal] = useState('');
  const [username, setUsernameLocal] = useState('');
  const [referred, setReferredLocal] = useState(false);
  const [referrerId, setReferrerIdLocal] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const formData = {
    firstName,
    surname,
    emailAddress,
    phoneNumber,
    username,
    referrerId,
    referred,
  };

  const generateUsername = (email) => {
    const emailPrefix = email.split('@')[0];
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setReferredLocal(referrerId !== null);
    return `${emailPrefix}${randomDigits}`;
  };

  const router = useRouter();

  useEffect(() => {
    setReferredLocal(referrerId !== null);
  }, [referrerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generatedUsername = generateUsername(emailAddress);
    setUsernameLocal(generatedUsername);
    dispatch(setUsername(generatedUsername));

    if (!isLoaded) return;
    setLoading(true);
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
      const errorMessage = err.errors?.[0]?.message || 'An error occurred';
      setError(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
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
        await onSignupSuccess(completeSignUp.createdSessionId);
        await setActive({ session: completeSignUp.createdSessionId });
        setVerifying(false);
      } else {
        const errorMessage = completeSignUp.errors?.[0]?.message || 'An error occurred';
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      console.error('Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onSignupSuccess = async (sessionId) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.errors?.[0]?.message || 'Unable to create your account, please check your network connection.';
        setError(errorMessage);
        console.error('Error while posting:', errorMessage);

        // Remove the user from Clerk
        await signUp.delete();
        
        return;
      } else {
        router.push('/dashboard');
      }

      const data = await response.json();
      console.log('User created:', data);
    } catch (error) {
      const errorMessage = error.message || 'Unable to create your account, please check your network connection.';
      setError(errorMessage);
      console.error('Error:', errorMessage);

      // Remove the user from Clerk
      await signUp.delete();
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordLocal(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordLocal(e.target.value);
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

  const handleInputChange = (e, setState, action) => {
    const value = e.target.value;
    setState(value);
    dispatch(action(value));
  };

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
              {loading ? 'Loading...' : 'Verify'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center py-6 xl:py-16'>
      <div className="mx-auto w-[90%] xl:w-full xl:max-w-[720px] max-w-[360px] flex flex-col items-center justify-center xl:gap-y-12 gap-y-8">
        <img src={Logo.src} alt='logo' className="xl:w-[112px] xl:h-[36px] w-[75px] h-[24px]" />
        <div className="flex flex-col items-center justify-center gap-y-3">
          <h3 className="font-semibold text-[1.75rem] leading-[135%] xl:text-[2.375rem] text-black">Create an account</h3>
          <p className="font-normal text-sm text-black xl:text-base">Already have an account? <span className="text-[#E8730C]"><Link href="/sign-in">Sign in</Link></span></p>
        </div>

        <form onSubmit={handleSubmit} className="w-[90%] max-w-[354px] flex flex-col items-center justify-center mx-auto mb-10 xl:max-w-[840px]">
          <div className="flex flex-col max-w-[840px] mx-auto xl:gap-y-8 gap-y-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 w-full">
              <div className="relative w-full">
                <label className="text-black text-sm leading-5 font-normal md:text-base">First name</label>
                <input
                  className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                  value={firstName}
                  onChange={(e) => handleInputChange(e, setFirstNameLocal, setFirstName)}
                  required
                />
              </div>
              <div className="relative w-full">
                <label className="text-black text-sm leading-5 font-normal md:text-base">Surname</label>
                <input
                  className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                  value={surname}
                  onChange={(e) => handleInputChange(e, setSurnameLocal, setSurname)}
                  required
                />
              </div>
            </div>
            <div className="relative w-full">
              <label className="text-black text-sm leading-5 font-normal md:text-base">Email address</label>
              <input
                className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                value={emailAddress}
                type="email"
                onChange={(e) => handleInputChange(e, setEmailAddressLocal, setEmailAddress)}
                required
              />
            </div>
            <div className="relative w-full">
              <label className="text-black text-sm leading-5 font-normal md:text-base">Phone number</label>
              <input
                className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                value={phoneNumber}
                onChange={(e) => handleInputChange(e, setPhoneNumberLocal, setPhoneNumber)}
                required
              />
            </div>
            <div className="relative w-full">
              <label className="text-black text-sm leading-5 font-normal md:text-base">Password</label>
              <input
                type="password"
                className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="relative w-full">
              <label className="text-black text-sm leading-5 font-normal md:text-base">Confirm Password</label>
              <input
                type="password"
                className={`mt-2 text-sm border ${passwordMatch ? 'border-[#828282]' : 'border-red-500'} outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {!passwordMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>}
            </div>
            <div className="relative w-full">
              <label className="text-black text-sm leading-5 font-normal md:text-base">Referral ID (Optional)</label>
              <input
                className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
                value={referrerId}
                onChange={(e) => setReferrerIdLocal(e.target.value)}
              />
            </div>
            <div className="relative w-full flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agreeTerms" className="text-black text-sm leading-5 font-normal md:text-base">I agree to the terms and conditions</label>
            </div>
          </div>
            {error && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[480px] w-[320px] flex flex-col items-center justify-center gap-y-8">
                <h2 className="text-2xl font-bold">Error</h2>
                <p className="text-[#ff0000]">{error}</p>
                <div className="flex items-center justify-center gap-x-4">
                  <button onClick={() => router.push('/sign-in')} className="px-6 rounded-full py-2 border-2 border-black text-[20px] font-medium">Sign In</button>
                  <button onClick={() => setError(null)} className="px-6 rounded-full py-2 text-[20px] font-medium bg-[#E8730C] text-white">Try Again</button>
                </div>
              </div>
            </div>}

            {!isLoaded && <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full top-0 h-screen z-100 bg-[#fff8]">
              <h1>Loading</h1>
            </section>}

            {loading && <LoadingModal />}

            {!verifying && !isLoaded && <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full top-0 h-screen z-100 bg-[#fff8]">
              <h1>Loading</h1>
            </section>}
          <button type="submit" className="mx-auto mt-4 xl:mt-6 h-[55px] xl:h-[77px] bg-[#E8730C] hover:bg-[#E8730C] rounded-xl text-white font-medium text-base leading-9 w-[80%] md:rounded-2xl md:text-2xl" disabled={!isFormValid()}>
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;

// 'use client';
// import React, { useState, useEffect } from "react";
// import Logo from '@/public/black_logo.svg';
// import { useSignUp } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
// import Link from "next/link";
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   setFirstName,
//   setSurname,
//   setEmailAddress,
//   setUsername,
//   setPhoneNumber,
//   setReferred,
//   setReferralId,
// } from '../features/user/userSlice';

// const SignUp = () => {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const [emailAddress, setEmailAddressLocal] = useState('');
//   const [password, setPasswordLocal] = useState('');
//   const [confirmPassword, setConfirmPasswordLocal] = useState('');
//   const [verifying, setVerifying] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [code, setCode] = useState('');
//   const [firstName, setFirstNameLocal] = useState('');
//   const [surname, setSurnameLocal] = useState('');
//   const [phoneNumber, setPhoneNumberLocal] = useState('');
//   const [username, setUsernameLocal] = useState('');
//   const [referred, setReferredLocal] = useState(false);
//   const [referrerId, setReferrerIdLocal] = useState('');
//   const [passwordMatch, setPasswordMatch] = useState(true);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [error, setError] = useState(null);

//   const dispatch = useDispatch();

//   const formData = {
//     firstName,
//     surname,
//     emailAddress,
//     phoneNumber,
//     username,
//     referrerId,
//     referred,
//   };

//   const generateUsername = (email) => {
//     const emailPrefix = email.split('@')[0];
//     const randomDigits = Math.floor(1000 + Math.random() * 9000);
//     setReferredLocal(referrerId !== '');
//     return `${emailPrefix}${randomDigits}`;
//   };

//   const router = useRouter();

//   useEffect(() => {
//     setReferredLocal(referrerId !== '');
//   }, [referrerId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const generatedUsername = generateUsername(emailAddress);
//     setUsernameLocal(generatedUsername);
//     dispatch(setUsername(generatedUsername));

//     if (!isLoaded) return;
//     setLoading(true);
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       });

//       await signUp.prepareEmailAddressVerification({
//         strategy: 'email_code',
//       });
//       setVerifying(true);
//     } catch (err) {
//       const errorMessage = err.errors?.[0]?.message || 'An error occurred';
//       setError(errorMessage);
//       console.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!isLoaded) return;

//     try {
//       const completeSignUp = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       if (completeSignUp.status === 'complete') {
//         await onSignupSuccess(completeSignUp.createdSessionId);
//         await setActive({ session: completeSignUp.createdSessionId });
//         setVerifying(false);
//       } else {
//         const errorMessage = completeSignUp.errors?.[0]?.message || 'An error occurred';
//         setError(errorMessage);
//         console.error(errorMessage);
//       }
//     } catch (err) {
//       const errorMessage = err.message || 'An error occurred';
//       setError(errorMessage);
//       console.error('Error:', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSignupSuccess = async (sessionId) => {
//     try {
//       const response = await fetch('/api/user/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           sessionId,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         const errorMessage = errorData.errors?.[0]?.message || 'Unable to create your account, please check your network connection.';
//         setError(errorMessage);
//         console.error('Error while posting:', errorMessage);

//         // Remove the user from Clerk
//         await fetch('/api/delete-user', {
//           method: 'DELETE',
//         });
        
//         return;
//       } else {
//         router.push('/dashboard');
//       }

//       const data = await response.json();
//       console.log('User created:', data);
//     } catch (error) {
//       const errorMessage = error.message;
//       setError(errorMessage);
//       console.error('Error:', errorMessage);
//     }
//   };

//   const handlePasswordChange = (e) => {
//     setPasswordLocal(e.target.value);
//     setPasswordMatch(e.target.value === confirmPassword);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPasswordLocal(e.target.value);
//     setPasswordMatch(e.target.value === password);
//   };

//   const isFormValid = () => {
//     return (
//       emailAddress &&
//       password &&
//       confirmPassword &&
//       firstName &&
//       surname &&
//       phoneNumber &&
//       agreeTerms &&
//       password === confirmPassword
//     );
//   };

//   const handleInputChange = (e, setState, action) => {
//     const value = e.target.value;
//     setState(value);
//     dispatch(action(value));
//   };

//   if (verifying) {
//     return (
//       <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center py-6 xl:py-16'>
//         <div className="mx-auto w-[90%] xl:w-full xl:max-w-[720px] max-w-[360px] flex flex-col items-center justify-center xl:gap-y-12 gap-y-8">
//           <img src={Logo.src} alt='logo' className="xl:w-[112px] xl:h-[36px] w-[75px] h-[24px]" />
//           <h1>Verify your email</h1>
//           <form onSubmit={handleVerify} className="w-full flex flex-col items-center justify-between">
//             <div className="relative w-full mb-4">
//               <label className="text-black text-sm leading-5 font-normal md:text-base" id="code">Enter your verification code</label>
//               <input
//                 className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
//                 value={code}
//                 id="code"
//                 name="code"
//                 onChange={(e) => setCode(e.target.value)}
//               />
//             </div>
//             <button type="submit" className="mx-auto mt-4 xl:mt-6 h-[55px] xl:h-[77px] bg-[#E8730C] hover:bg-[#E8730C] rounded-xl text-white font-medium text-base leading-9 w-[80%] md:rounded-2xl md:text-2xl">
//               {loading ? 'Loading...' : 'Verify'}
//             </button>
//           </form>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center justify-center py-6 xl:py-16'>
//       <div className="mx-auto w-[90%] xl:w-full xl:max-w-[720px] max-w-[360px] flex flex-col items-center justify-center xl:gap-y-12 gap-y-8">
//         <img src={Logo.src} alt='logo' className="xl:w-[112px] xl:h-[36px] w-[75px] h-[24px]" />
//         <div className="mt-4">
//           Already have an account? <Link href="/sign-in" className="text-[#E8730C]">Login</Link>
//         </div>
//         <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-between">
//           <div className="w-full flex flex-col items-start gap-y-6">
//             <div className="w-full flex items-center justify-center gap-x-3">
//               <div className="relative w-full">
//                 <label className="text-black text-sm leading-5 font-normal md:text-base" id="firstName">First Name</label>
//                 <input
//                   className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
//                   value={firstName}
//                   id="firstName"
//                   name="firstName"
//                   onChange={(e) => handleInputChange(e, setFirstNameLocal, setFirstName)}
//                 />
//               </div>
//               <div className="relative w-full">
//                 <label className="text-black text-sm leading-5 font-normal md:text-base" id="surname">Last Name</label>
//                 <input
//                   className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
//                   value={surname}
//                   id="surname"
//                   name="surname"
//                   onChange={(e) => handleInputChange(e, setSurnameLocal, setSurname)}
//                 />
//               </div>
//             </div>
//             <div className="relative w-full">
//               <label className="text-black text-sm leading-5 font-normal md:text-base" id="emailAddress">Email Address</label>
//               <input
//                 className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
//                 value={emailAddress}
//                 id="emailAddress"
//                 name="emailAddress"
//                 onChange={(e) => handleInputChange(e, setEmailAddressLocal, setEmailAddress)}
//               />
//             </div>
//             <div className="relative w-full">
//               <label className="text-black text-sm leading-5 font-normal md:text-base" id="phoneNumber">Phone Number</label>
//               <input
//                 className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
//                 value={phoneNumber}
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 onChange={(e) => handleInputChange(e, setPhoneNumberLocal, setPhoneNumber)}
//               />
//             </div>
//             <div className="relative w-full">
//               <label className="text-black text-sm leading-5 font-normal md:text-base" id="password">Password</label>
//               <input
//                 className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
//                 type="password"
//                 value={password}
//                 id="password"
//                 name="password"
//                 onChange={handlePasswordChange}
//               />
//             </div>
//             <div className="relative w-full">
//               <label className="text-black text-sm leading-5 font-normal md:text-base" id="confirmPassword">Confirm Password</label>
//               <input
//                 className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
//                 type="password"
//                 value={confirmPassword}
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 onChange={handleConfirmPasswordChange}
//               />
//               {!passwordMatch && (
//                 <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
//               )}
//             </div>
//             <div className="relative w-full">
//               <label className="text-black text-sm leading-5 font-normal md:text-base" id="referrerId">Referral Code (Optional)</label>
//               <input
//                 className="mt-2 text-sm border border-[#828282] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] rounded-xl w-full h-[55px] px-6 py-[18px] md:text-base md:rounded-2xl md:h-[65px]"
//                 value={referrerId}
//                 id="referrerId"
//                 name="referrerId"
//                 onChange={(e) => handleInputChange(e, setReferrerIdLocal, setReferralId)}
//               />
//             </div>
//             <div className="relative w-full flex items-center">
//               <input
//                 className="mr-2"
//                 type="checkbox"
//                 checked={agreeTerms}
//                 onChange={() => setAgreeTerms(!agreeTerms)}
//               />
//               <label className="text-black text-sm leading-5 font-normal md:text-base">I agree to the <Link href="/terms" className="text-[#E8730C]">Terms and Conditions</Link></label>
//             </div>
            // {error && <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            //   <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[480px] w-[320px] flex flex-col items-center justify-center gap-y-8">
            //     <h2 className="text-2xl font-bold">Error</h2>
            //     <p className="text-[#ff0000]">{error}</p>
            //     <div className="flex items-center justify-center gap-x-4">
            //       <button onClick={() => router.push('/sign-in')} className="px-6 rounded-full py-2 border-2 border-black text-[20px] font-medium">Sign In</button>
            //       <button onClick={() => setError(null)} className="px-6 rounded-full py-2 text-[20px] font-medium bg-[#E8730C] text-white">Try Again</button>
            //     </div>
            //   </div>
            // </div>}

            // {!isLoaded && <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full top-0 h-screen z-100 bg-[#fff8]">
            //   <h1>Loading</h1>
            // </section>}

            // {loading && <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full top-0 h-screen z-100 bg-[#fff8]">
            //   <h1>Loading</h1>
            // </section>}

            // {!verifying && !isLoaded && <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 w-full top-0 h-screen z-100 bg-[#fff8]">
            //   <h1>Loading</h1>
            // </section>}
//           </div>
          // <button type="submit" className={`mx-auto mt-4 xl:mt-6 h-[55px] xl:h-[77px] ${isFormValid() ? 'bg-[#E8730C] hover:bg-[#E8730C]' : 'bg-gray-400'} rounded-xl text-white font-medium text-base leading-9 w-[80%] md:rounded-2xl md:text-2xl`} disabled={!isFormValid() || loading}>
          //   {loading ? 'Loading...' : 'Create Account'}
          // </button>
//         </form>
//       </div>
//     </main>
//   );
// };

// export default SignUp;
