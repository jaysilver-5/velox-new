import React, { useState } from 'react';
import SellForm1 from "@/components/Forms/SellForm1";
import SellForm2 from "@/components/Forms/SellForm2";

const SellComponent = () => {
  const [steps, setSteps] = useState(1);
  const [sNaira, setSNaira] = useState(null);
  const [sDollar, setSDollar] = useState(null);
  console.log(sDollar, sNaira)

  return (
    <div className="w-full">
      {steps === 1 && <SellForm1 setSteps={setSteps} setSNaira={setSNaira} setSDollar={setSDollar} />}
      {steps === 2 && <SellForm2 setSteps={setSteps} sNaira={sNaira} sDollar={sDollar} />}
    </div>
  );
};

export default SellComponent;
