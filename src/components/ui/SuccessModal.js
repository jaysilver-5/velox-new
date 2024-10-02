import React from 'react';
import { useRouter } from 'next/navigation';

const SuccessModal = () => {
  const router = useRouter()
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[480px] w-[320px] flex flex-col items-center justify-center gap-y-8">
            <h2 className="text-2xl font-bold">Transaction Successful!</h2>
            <p className="text-[#20bd20] text-center">Keep an eye on the dashboard while our team process your transaction.</p>
            <div className="flex items-center justify-center gap-x-4">
                <button onClick={() => router.push('/dashboard')} className="w-36 rounded-full py-2 border-2 border-black text-[20px] font-medium">Dashboard</button>
                {/* <button onClick={() => router.push('/trade')} className="w-36 rounded-full py-2 text-[20px] font-medium bg-[#E8730C] text-white">Trade</button> */}
            </div>
        </div>
    </div>
  )
}

export default SuccessModal