import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import backArrow from '@/public/back_arrow.svg';
import caution from '@/public/caution.svg'
import border from '@/public/border_button.svg';
import TradeNav from "@/components/TradeNav";
import Header from "@/components/Header";
import CoinSelect from "@/components/CoinSelect";
import AmountInput from "@/components/AmountInput";
import SellingRate from "@/components/SellingRate";
import Select from '@/components/ui/Select';
import { bankList } from '../../lib/banklist';
import { networkList } from '../../lib/networklist';
import { FaCopy } from "react-icons/fa6";
import axios from "axios";
import imageCompression from 'browser-image-compression';
import SuccessModal from "../ui/SuccessModal";
import LoadingModal from "../ui/LoadingModal";

const SellForm1 = () => {
  const router = useRouter();
  const [currency, setCurrency] = useState('dollar');
  const [coinType, setCoinType] = useState('');
  const [amount, setAmount] = useState('');
  const [dollar, setDollar] = useState(null);
  const [ngn, setNgn] = useState(null);
  const [step, setStep] = useState(1);
  const [amountError, setAmountError] = useState('');
  const [loading, setLoading] = useState(false);
  const [convertedCurrency, setConvertedCurrency] = useState('');
  const [rate, setRate] = useState(1450); // Set the initial rate
  const [network, setNetwork] = useState('');
  const [bankname, setBankname] = useState('');  
  const emailAddress = useSelector((state) => state.user.emailAddress);
  const [accountNumber, setAccountNumber] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [paymentAddress] = useState('0xYourPaymentAddressHere');
  const [copySuccess, setCopySuccess] = useState('');
  const [success, setSuccess] = useState('');

  const generateTransactionId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let transactionId = '';
    for (let i = 0; i < 8; i++) {
      transactionId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return transactionId;
  };

  // Function to handle the image input and display it
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setLoading(true)

    if (file) {
      // Set options for image compression
      const options = {
        maxSizeMB: 1,          // Max file size in MB
        maxWidthOrHeight: 800,  // Max width/height
        useWebWorker: true,     // Use multi-threading to compress faster
      };

      try {
        // Compress the image
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();

        reader.onloadend = () => {
          setSelectedImage(reader.result); // Set the Base64 encoded image
        };
        setLoading(false)
        reader.readAsDataURL(compressedFile); // Convert compressed image to Base64
      } catch (error) {
        alert("Image compression error:", error);
      }
    }
  };

  // Function to handle the copy of the payment address
  const handleCopy = () => {
    navigator.clipboard.writeText(paymentAddress).then(
      () => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Clear after 2 seconds
      },
      () => {
        setCopySuccess('Failed to copy!');
      }
    );
  };

  const handleFinalTransfer = async () => {
    if (!selectedImage) {
      alert("Please complete all fields.");
      return;
    }
 
    setLoading(true)
 
    // Ensure selectedImage is only the Base64 string
    console.log(selectedImage); // Check the value in console before sending
 
    const postData = {
      emailAddress,
      transactionData: {
        transactionId: generateTransactionId(),
        amount_dollar: dollar,
        amount_naira: ngn,
        type: "sell",
        status: "pending",
        coin_name: coinType,
        rate: rate,
        bankname: bankname,
        accountNumber: accountNumber,
        network: network,
        walletAddress: paymentAddress,
        transaction_proof: selectedImage // Should be a string
      }
    };
 
    try {
      const response = await axios.post("/api/transactions/add", postData);
      console.log(response.data);
      setLoading(false)
      setSuccess('true');
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
      setLoading(false);
    }
  };
 

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
    if (accountNumber && bankname && network) {
      setStep(3);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handleProceedStep3 = () => {
    if (!isAgreed) {
      alert('Agree to our terms and conditions before proceeding.');
      return;
    }
    setStep(4);
  };

  return (
    <main className="w-full min-h-screen bg-[#FFFFFF] flex flex-col items-center">
      <Header />
      <div className="mt-32 mb-8 relative mx-auto w-[90%] md:mt-44">
        <button onClick={() => setStep(step - 1)} className="w-[90%] mx-auto">
          <div className="flex max-w-[48px] cursor-pointer w-full h-12 rounded-xl items-center justify-center fixed top-[.9rem] md:top-2 left-[38px] z-50 md:border-2 md:border-[#828282] md:z-0 md:relative md:left-0 md:right-0">
            <img src={backArrow.src} /><img src={border.src} />
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
            <div className="max-w-[354px] space-y-5 w-full mx-auto md:max-w-[480px]">
              <form className="flex flex-col space-y-4" encType="multipart/form-data">
                <div className="flex flex-col space-y-2 mx-auto max-w-[313px] w-full md:max-w-[380px]">
                  <h3 className="text-[#333333] text-center font-semibold text-[28px] md:text-4xl">
                    Selling ${dollar} worth of {coinType} at ₦{ngn}
                  </h3>
                  <p className="text-[#828282] text-center font-normal text-xs md:text-sm">
                    Kindly provide your Bank details
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="network" className="text-[#828282] font-normal text-xs md:text-sm">
                    Network
                  </label>
                  <Select placeholder='Select Network' items={networkList} onChange={(event) => setNetwork(event.target.value)} />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="bankname" className="text-[#828282] font-normal text-xs md:text-sm">
                    Bank
                  </label>
                  <Select placeholder='Select Bank' items={bankList} onChange={(event) => setBankname(event.target.value)} />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="accountnumber" className="text-[#828282] font-normal text-xs md:text-sm">
                    Account Number
                  </label>
                  <input
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="1234567890" type="text"
                    className="rounded-lg py-4 px-6 w-full border border-[#E0E0E0] bg-white outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-xs md:text-sm"
                  />
                </div>
                <div className="w-full h-16">
                <button
                  disabled={!accountNumber || !bankname || !network || loading}
                  type="submit"
                  onClick={handleProceedStep2}
                  className={`bg-[#E8730C] ${!accountNumber || !bankname || !network || loading ? 'cursor-not-allowed' : 'hover:bg-[#E8730C]'} rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base mb-8`}
                >
                  Confirm
                </button>
              </div>
              </form>

              {/* <div className="max-w-[354px] h-14 mx-auto md:h-16 md:max-w-[480px]">
                <button
                  disabled={!accountNumber || !bankname || !network || loading}
                  type="submit"
                  onClick={handleProceedStep2}
                  className={`bg-[#E8730C] ${!accountNumber || !bankname || !network || loading ? 'cursor-not-allowed' : 'hover:bg-[#E8730C]'} rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base mb-8`}
                >
                  Confirm
                </button>
              </div> */}
            </div>
          )}
          {step === 3 && (
            <div className="max-w-[354px] space-y-5 w-full mx-auto md:max-w-[480px]">
              <form className="flex flex-col space-y-4" encType="multipart/form-data">
                <div>
                  <div className="mx-auto w-[73px] h-[73px] md:w-[94px] md:h-[94px]">
                    <img src={caution.src} alt="Caution" />
                  </div>
                  <div className="flex flex-col space-y-2 mx-auto max-w-[313px] w-full md:max-w-[380px]">
                    <h3 className="text-[#333333] text-center font-semibold text-[28px] md:text-4xl">
                      Please, read the instructions below
                    </h3>
                  </div>
                  <div className="flex flex-col mt-6 space-y-1">
                    <ul className="list-disc list-outside">
                      <li className="text-[#4F4F4F] font-normal text-sm md:text-base">
                        Please note that due to price fluctuations, there may be a slight difference between the amount you receive and the estimated amount.
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-row place-items-baseline mt-[151px] space-x-3 w-full max-w-[319px] md:max-w-[380px]">
                    <input
                      type="checkbox"
                      name="iagree"
                      id="agree"
                      required
                      checked={isAgreed}
                      onChange={handleCheckboxChange}
                    />
                    <p>
                      I agree to the instructions above and want to proceed to the payment window.
                    </p>
                  </div>
                </div>
              </form>
              <div className="w-full max-w-[354px] h-14 mx-auto md:h-16 md:max-w-[480px]">
                <button
                  type="button"
                  className="bg-[#E8730C] disabled:bg-[#E0E0E0] disabled:cursor-not-allowed hover:bg-[#E8730C] rounded-xl text-white font-semibold text-sm leading-9 h-full w-full md:rounded-2xl md:text-base"
                  onClick={handleProceedStep3}
                  disabled={!isAgreed}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {step == 4 && (
          <div className="max-w-[100%] space-y-5 w-full mx-auto md:max-w-[480px]">
            <form className="flex flex-col space-y-4">
              <div className="flex flex-col gap-2 mx-auto max-w-[313px] w-full md:max-w-[380px]">
                <h3 className="text-[#E8730C] text-center font-bold text-[38px] md:text-5xl">
                  ${dollar} {coinType}
                </h3>
                <p className="text-[#828282] text-center font-normal text-xs md:text-sm">
                  Crypto withdrawal
                </p>
              </div>

              <div className="mx-auto w-full max-w-[314px] md:max-w-[380px]">
                <p className="text-[#1A1A1A] text-center font-normal text-sm md:text-base">
                  Kindly pay the above amount to the payment details below
                </p>
              </div>

              <div className="bg-[#FAFAFA] py-8 px-7 flex flex-row justify-between">
                <div className="flex flex-col items-start gap-[22px]">
                  <li className="text-[#828282] font-normal list-none text-sm md:text-base">
                    Network
                  </li>
                  <li className="text-[#828282] font-normal list-none text-sm md:text-base">
                    Address
                  </li>
                </div>

                <div className="flex flex-col items-end gap-[22px]" onClick={handleCopy}>
                  <li
                    id="paymentAddress"
                    className="text-[#1A1A1A] w-full justify-end overflow-hidden whitespace-nowrap text-ellipsis font-semibold list-none text-sm md:text-base"
                  >
                    {network}
                  </li>
                  <li
                    id="paymentAddress"
                    className="text-[#1A1A1A] items-center justify-center gap-x-2 overflow-hidden whitespace-nowrap text-ellipsis font-semibold list-none text-sm md:text-base flex w-full"
                  >
                    {paymentAddress}

                    <FaCopy />
                  </li>
                </div>
              </div>
              {copySuccess && <p className="text-green-500 text-center">{copySuccess}</p>}

              <div className="mx-auto w-full max-w-[354px] relative md:max-w-[480px]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-[#F2F2F2] rounded-lg py-4 px-6 w-full border border-[#E0E0E0] outline-none focus:border-[#fdae5c] hover:border-[#fdae5c] appearance-none font-normal text-[#828282] text-sm"
                />
              </div>

              {/* Display uploaded image */}
              {selectedImage && (
                <div className="mt-4 text-center">
                  <h3 className="text-[#333] font-semibold">Selected Image:</h3>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-[200px] h-[200px] mx-auto mt-2 border border-[#E0E0E0] rounded-lg"
                  />
                </div>
              )}

              <button
                  type="button"
                  onClick={handleFinalTransfer} // Call the API when user clicks
                  className={`bg-[#E8730C] h-16 ${!network ? 'cursor-not-allowed' : 'hover:bg-[#E8730C]'} rounded-xl text-white font-semibold text-sm leading-9 w-full md:rounded-2xl md:text-base mb-8`}
                >
                  I Have Transferred the Crypto
                </button>
            </form>
          </div>
        )}
        
        {success == 'true' && (<SuccessModal />)}
        {loading && (<LoadingModal />)}
      </div>
    </main>
  );
};

export default SellForm1;
