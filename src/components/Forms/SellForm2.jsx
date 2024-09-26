import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import backArrow from '@/public/back_arrow.svg';
import border from '@/public/border_button.svg';
import Select from '@/components/ui/Select';
import { bankList } from '../../lib/banklist';

const SellForm2 = ({ sNaira, sDollar, setSteps }) => {
  const router = useRouter();

  console.log('Naira:', sNaira);
  console.log('Dollar:', sDollar);

  return (
    <main className="w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center">
      <Header />
      <div className="mt-32 mb-8 relative mx-auto w-[90%] md:mt-44">
        <button onClick={() => setSteps(1)} className="w-[90%] mx-auto">
          <div className="flex max-w-[48px] cursor-pointer w-full h-12 rounded-xl items-center justify-center fixed top-[.9rem] md:top-2 left-[38px] z-50 md:border-2 md:border-[#828282] md:z-0 md:relative md:left-0 md:right-0">
            <img src={backArrow.src} />{/*----*/}<img src={border.src} />
          </div>
        </button>

        <div className="w-full h-24">
          {/* Wrapped Form Component */}
          <div className="max-w-[354px] space-y-5 w-full mx-auto md:max-w-[480px]">
            <form className="flex flex-col space-y-4" encType="multipart/form-data">
              <div className="flex flex-col space-y-2 mx-auto max-w-[313px] w-full md:max-w-[380px]">
                <h3 className="text-[#333333] text-center font-semibold text-[28px] md:text-4xl">
                  Selling ${sDollar} worth of Bnb Smartchain at ₦{sNaira}
                </h3>
                <p className="text-[#828282] text-center font-normal text-xs md:text-sm">
                  Kindly provide your Bank details
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="network" className="text-[#828282] font-normal text-xs md:text-sm">
                  Network
                </label>
                <select className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm">
                  <option value="">Select address network</option>
                  <option value="BEP -20">BEP -20</option>
                  <option value="BEP-2">BEP-2</option>
                </select>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="bankname" className="text-[#828282] font-normal text-xs md:text-sm">
                  Bank
                </label>
                {/* <select
                  name="bankname"
                  id="bankname"
                  className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
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
                </select> */}
                <Select name="bankname" id="bankname" items={bankList} />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="accountnumber" className="text-[#828282] font-normal text-xs md:text-sm">
                  Account Number
                </label>
                <input
                  required
                  name="accountnumber"
                  type="number"
                  placeholder="1234567890"
                  className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="note" className="text-[#828282] font-normal text-xs md:text-sm">
                  Note (Optional)
                </label>
                <input
                  name="note"
                  type="text"
                  placeholder="Any message at all"
                  className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
                />
              </div>
            </form>

            <div className="max-w-[354px] h-14 mx-auto md:h-16 md:max-w-[480px]">
              <button
                type="submit"
                className="bg-[#E0E0E0] disabled:bg-[#E0E0E0] disabled:cursor-not-allowed hover:bg-[#E8730C] rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base mb-8"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellForm2;
