import { memo } from "react";

const Popup = ({ message = "Something went wrong", onClose, open }) => {
  return (
    <>
      {open && (
        <div className="z-40 fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg p-6">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Popup Title</h2>
            <p className="text-gray-800">{message}</p>
          </div>
        </div>
        // <div className="popup wrapper h-screen w-full opacity-50 bg-black absolute left-0 top-0 flex justify-center  items-center">
        //   <div className="bg-white sm:w-60 sm:h-fit md:w-1/4 md:h-1/5 rounded-xl p-2 relative">
        //     <div className="h-12 border-b border-black flex justify-center items-center text-xl font-bold">
        //       Header
        //     </div>
        //     <button className="absolute top-2 right-2" onClick={onClose}>
        //       X
        //     </button>
        //     <div className="p-2">
        //       <span>{message}</span>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default memo(Popup);
