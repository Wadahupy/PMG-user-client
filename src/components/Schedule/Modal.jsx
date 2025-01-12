import React from 'react';

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-[700px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
