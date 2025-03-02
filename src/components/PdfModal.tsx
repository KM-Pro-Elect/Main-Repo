import React from "react";

interface PdfModalProps {
  pdfUrl: string;
  onClose: () => void;
}

export const PdfModal: React.FC<PdfModalProps> = ({ pdfUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] h-[90%] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-md"
        >
          Close
        </button>
        <iframe src={pdfUrl} className="w-full h-full" />
      </div>
    </div>
  );
};
