import React from "react";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessModal: React.FC<ModalProps> = ({
  showModal = false,
  setShowModal = () => {},
}: ModalProps) => {
  return (
    <div
      id="successModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        showModal ? "flex" : "hidden"
      } justify-center items-center fixed inset-0 z-50`}
    >
      <div className="absolute bg-gray-800 opacity-50 inset-0"></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 text-center">
          <button
            type="button"
            className="absolute top-2.5 right-2.5 bg-gray-200 text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => setShowModal(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="w-12 h-12 rounded-full bg-green-100 p-2 flex items-center justify-center mx-auto mb-3.5">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Success</span>
          </div>
          <p className="mb-4 text-lg font-semibold text-gray-900">
            Email Sent! Thank you for your contact!
          </p>
          <button
            type="button"
            className="py-2 px-3 text-sm font-medium text-center text-gray-900 rounded-lg bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300"
            onClick={() => setShowModal(false)}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
