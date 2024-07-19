import React, {FC} from "react";
import Header from "@/components/Header";

const MyProfile = () => {
  return (
    <main className='w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center'>
        <Header />

        <div className="mt-32 mb-8 relative mx-auto w-[90%] md:mt-44">
            <div className="w-[90%] mx-auto">
                <div className="flex max-w-[48px] cursor-pointer w-full h-12 rounded-xl items-center justify-center fixed top-[.9rem] md:top-2 left-[38px] z-50 md:border-2 md:border-[#828282] md:z-0 md:relative md:left-0 md:right-0">
                <svg
                    className="hidden md:block"
                    width="11"
                    height="18"
                    viewBox="0 0 11 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.707 16.293L9.29282 17.7072L0.585707 9.00007L9.29282 0.292969L10.707 1.70718L3.41414 9.00007L10.707 16.293Z"
                    fill="#828282"
                    ></path>
                </svg>
                <svg
                    className="block md:hidden"
                    width="11"
                    height="18"
                    viewBox="0 0 11 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.707 16.293L9.29282 17.7072L0.585707 9.00007L9.29282 0.292969L10.707 1.70718L3.41414 9.00007L10.707 16.293Z"
                    fill="white"
                    ></path>
                </svg>
                </div>
            </div>
            <div>
                <div>
                <div className="mb-2">
                    <h3 className="text-[#333333] font-semibold text-[28px] text-center leading-[37.8px] md:text-4xl">
                    Edit Profile
                    </h3>
                </div>
                </div>
                <div className="max-w-[354px] mt-8 w-full mx-auto md:max-w-[480px]">
                <form className="flex flex-col space-y-8">
                    <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="firstName"
                        className="text-[#828282] font-normal text-xs md:text-sm"
                    >
                        First Name
                    </label>
                    <input
                        name="first_name"
                        required
                        type="text"
                        placeholder="First name"
                        className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-black text-sm"
                        value="Joel"
                    />
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="lastName"
                        className="text-[#828282] font-normal text-xs md:text-sm"
                    >
                        Last Name
                    </label>
                    <input
                        name="surname"
                        required
                        type="text"
                        placeholder="Last name"
                        className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-black text-sm"
                        value="Udo"
                    />
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="Username"
                        className="text-[#828282] font-normal text-xs md:text-sm"
                    >
                        Username
                    </label>
                    <input
                        name="username"
                        required
                        type="text"
                        placeholder="Username"
                        className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-black text-sm"
                        value="terzetto"
                    />
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="email"
                        className="text-[#828282] font-normal text-xs md:text-sm"
                    >
                        Email Address
                    </label>
                    <input
                        name="email"
                        readOnly
                        required
                        type="email"
                        placeholder="Email"
                        className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-black text-sm"
                        value="udojoel3@gmail.com"
                    />
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="phoneNumber"
                        className="text-[#828282] font-normal text-xs md:text-sm"
                    >
                        Phone Number
                    </label>
                    <input
                        name="phone_number"
                        required
                        type="number"
                        placeholder="Phone Number"
                        className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-black text-sm"
                        value="09152310104"
                    />
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="Bank_name"
                        className="text-[#828282] font-normal text-xs md:text-sm"
                    >
                        Bank Name
                    </label>
                    <select
                        required
                        name="Bank_name"
                        id="Bank_name"
                        className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-black text-xs md:text-sm"
                        style={{ background: 'url("/Images/Exchange/dropdown-arrow.svg") 93% center no-repeat' }}
                    >
                        <option value="">Select bank</option>
                        <option value="Kuda Microfinance">Kuda Microfinance</option>
                        <option value="Moniepoint">Moniepoint</option>
                        <option value="Opay">Opay</option>
                        <option value="PalmPay">PalmPay</option>
                        <option value="ACCESS BANK">Access Bank</option>
                        <option value="Citibank Nigeria">Citibank</option>
                        <option value="diamond">Diamond Bank</option>
                        <option value="ecobank">Ecobank</option>
                        <option value="Fidelity Bank">Fidelity Bank</option>
                        <option value="First bank">First Bank</option>
                        <option value="FCMB">First City Monument Bank (FCMB)</option>
                        <option value="GT-BANK">Guaranty Trust Bank (GTB)</option>
                        <option value="Heritage Bank">Heritage Bank</option>
                        <option value="Keystone Bank">Keystone Bank</option>
                        <option value="Polaris Bank">Polaris Bank</option>
                        <option value="providus">Providus Bank</option>
                        <option value="Stanbic IBTC Bank">Stanbic IBTC Bank</option>
                        <option value="Standard Chartered">Standard Chartered Bank</option>
                        <option value="Sterling Bank">Sterling Bank</option>
                        <option value="suntrust">Suntrust Bank</option>
                        <option value="Union bank">Union Bank</option>
                        <option value="UBA">United Bank for Africa (UBA)</option>
                        <option value="Unity Bank">Unity Bank</option>
                        <option value="Wema Bank">Wema Bank</option>
                        <option value="Zenith Bank">Zenith Bank</option>
                        <option value="VFD Bank">VFD Bank</option>
                    </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="Account_number"
                        className="text-[#828282] font-normal text-xs md:text-sm"
                    >
                        Account Number
                    </label>
                    <input
                        required
                        name="Account_number"
                        type="number"
                        placeholder="Phone Number"
                        className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-black text-sm"
                        value="7811724028"
                    />
                    </div>
                    <div></div>
                    <div className="h-[55px] md:h-[77px] mt-8 mb-[38px] md:mt-10">
                    <button
                        type="submit"
                        className="bg-[#E0E0E0] hover:bg-[#E8730C] rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base"
                    >
                        Update Profile
                    </button>
                    </div>
                </form>
                </div>
            </div>
        </div>


    </main>
  );
}

export default MyProfile;