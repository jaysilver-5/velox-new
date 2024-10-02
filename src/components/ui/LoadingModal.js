
import HashLoader from 'react-spinners/HashLoader';
import React, { useState, CSSProperties } from "react";


const LoadingModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <HashLoader
        color={'#e8730c'}
        loading={true}

        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default LoadingModal