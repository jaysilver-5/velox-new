import React, {useState, useEffect} from 'react';
import toggle from '@/public/togle-swap.svg'
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import backArrow from '@/public/back_arrow.svg';
import border from '@/public/border_button.svg';
import TradeNav from "@/components/TradeNav";
import Select from '@/components/ui/Select';
import { coinList } from '../lib/coinlist';
import { bankList } from '../lib/banklist';
import { networkList } from '../lib/networklist';
import CoinSelect from "@/components/CoinSelect";
import AmountInput from "@/components/AmountInput";
import SellingRate from "@/components/SellingRate";

const BuyComponent = () => {
  const [step, setStep] = useState(1);
  const [network, setNetwork] = useState('');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [currency, setCurrency] = useState('dollar');
  const [coinType, setCoinType] = useState('');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(1450);
  const [dollar, setDollar] = useState(null);
  const [ngn, setNgn] = useState(null);
  const [convertedCurrency, setConvertedCurrency] = useState('');
  const [amountError, setAmountError] = useState('');
  const router = useRouter();
  console.log(address, network, coinType, amount)

  useEffect(() => {
    const convertedAmount =
      currency === 'naira'
        ? (parseFloat(amount) / rate).toFixed(2)
        : (parseFloat(amount) * rate).toFixed(2);

    if (currency === 'naira') {
      setNgn(amount);
      setDollar(convertedAmount);
    } else {
      setDollar(amount);
      setNgn(convertedAmount);
    }

    if (step === 0) {
      router.push('/dashboard');  // Redirect to dashboard when step is 0
    }

    setConvertedCurrency(convertedAmount);
  }, [currency, amount, rate, step, router]);

  const handleToggleCurrency = () => {
    setCurrency(currency === 'naira' ? 'dollar' : 'naira');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(amount) || amount.trim() === '') {
      setAmountError('Amount must be a number');
      return;
    }

    setLoading(true);
    setAmountError('');

    // Simulate async task
    setTimeout(() => {
      setLoading(false);
      setStep(2); // Move to the next step (Show SellForm2)
    }, 500); // Simulate a delay
  };

  const handleProceedStep2 = () => {
    if (address && network) {
      setStep(3);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center">
      <Header />
      <div className="mt-32 mb-8 relative mx-auto w-[90%] md:mt-44">
        <button onClick={() => setStep(step - 1)} className="w-[90%] mx-auto">
          <div className="flex max-w-[48px] cursor-pointer w-full h-12 rounded-xl items-center justify-center fixed top-[.9rem] md:top-2 left-[38px] z-50 md:border-2 md:border-[#828282] md:z-0 md:relative md:left-0 md:right-0">
            <img src={backArrow.src} />
            {/* --- */}
            <img src={border.src} />
          </div>
        </button>

        {step === 1 && (
            <div className="w-full h-24">
              <TradeNav />
              <div className="max-w-[354px] space-y-5 w-full mx-auto md:max-w-[480px]">
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                  <CoinSelect coinType={coinType} setCoinType={setCoinType} />
                  <AmountInput 
                    amount={amount} 
                    setAmount={setAmount} 
                    amountError={amountError} 
                    currency={currency} 
                    convertedCurrency={convertedCurrency} 
                    handleToggleCurrency={handleToggleCurrency} 
                  />
                  <SellingRate rate={rate} />
                  <div className="w-full h-14 md:h-16">
                    <button
                      type="submit"
                      className={`rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base ${!coinType || !amount || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#E8730C] hover:bg-[#E8730C]'}`}
                      disabled={!coinType || !amount || loading}
                    >
                      {loading ? 'Processing...' : 'Sell Crypto'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}

        {step === 2 && (
          <div className="w-full h-24">
            <TradeNav />
            <div className="max-w-[354px] space-y-5 w-full mx-auto md:max-w-[480px]">
              <form className="flex flex-col space-y-4" encType="multipart/form-data">
                {/* <div className="flex flex-col space-y-2 mx-auto max-w-[313px] w-full md:max-w-[380px]">
                  <h3 className="text-[#333333] text-center font-semibold text-[28px] md:text-4xl">
                    Selling ${dollar} worth of Bnb Smartchain at ₦{ngn}
                  </h3>
                  <p className="text-[#828282] text-center font-normal text-xs md:text-sm">
                    Kindly provide your Bank details
                  </p>
                </div> */}

                <div className="flex flex-col space-y-2">
                  <label htmlFor="network" className="text-[#828282] font-normal text-xs md:text-sm">
                    Network
                  </label>
                  <Select placeholder='Select Network' items={networkList} onChange={(event) => setNetwork(event.target.value)} />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="address" className="text-[#828282] font-normal text-xs md:text-sm">
                    Wallet Address
                  </label>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="0x......" type="text"
                    className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
                  />
                </div>
              </form>

              <div className="max-w-[354px] h-14 mx-auto md:h-16 md:max-w-[480px]">
                <button
                  // disabled={!address || !bankname || !network || loading}
                  type="button"
                  onClick={handleProceedStep2}
                  // className={`bg-[#E8730C] ${!address || !bankname || !network || loading ? 'cursor-not-allowed' : 'hover:bg-[#E8730C]'} rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base mb-8`}
                  className={`bg-[#E8730C] ${!address || !network ? 'cursor-not-allowed' : 'hover:bg-[#E8730C]'} rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base mb-8`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default BuyComponent;
