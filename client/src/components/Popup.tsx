import { memo } from "react";

const Popup = ({
  title = "",
  message = "Something went wrong",
  onClose,
  open,
  onConfirm = null,
}) => {
  return (
    <>
      {open && (
        <div className="z-40 fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg p-6 min-w-[300px] min-h-[150px]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              X
            </button>
            <h2 className="text-xl font-bold border-b border-gray-400 pb-1">
              {title}
            </h2>
            <p className="text-gray-800 mt-4 font-light">{message}</p>
            {onConfirm ? (
              <div className="gap-4 flex justify-end mt-4">
                <button
                  className="p-1 bg-gray-200 rounded-md"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="p-1 bg-green-600 text-white font-medium rounded-md"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Popup);
