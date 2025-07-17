import { useState } from 'react';

interface SecretCodeModalProps {
  isOpen: boolean;
  onClose: () => void; // The function to call when the modal should close
  secretCode: string;
}

export const AdminCodeModal = ({ isOpen, onClose, secretCode }: SecretCodeModalProps) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy Code');

  if (!isOpen) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secretCode);
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy Code'), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Failed to copy');
    }
  };

  return (
    // Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 text-center">
        <h3 className="text-xl font-bold text-gray-800">Admin Account Created!</h3>
        <p className="text-sm text-gray-600 mt-2 mb-4">
          Share this secret code with your Waiter and Kitchen staff for them to sign up.
        </p>

        {/* The Secret Code Box */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-md p-4 my-4">
          <p className="text-sm text-gray-500 mb-1">Your Secret Code:</p>
          <p className="text-lg font-mono font-bold text-gray-900 tracking-wider">
            {secretCode}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleCopy}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150"
          >
            {copyButtonText}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
          >
            Proceed to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};