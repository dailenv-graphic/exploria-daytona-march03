import { ShieldCheck, Check } from 'lucide-react';
import Modal from './Modal';

interface RefundableOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function RefundableOfferModal({ isOpen, onClose, onAccept }: RefundableOfferModalProps) {
  const checklistItems = [
    '$99 deposit 100% refunded after Owner Feedback Session',
    'Book and travel by May 17, 2026',
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="content" maxWidth="max-w-md">
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-full flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-teal-700" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
        Wait! Your $99 is Fully Refundable.
      </h2>

      <p className="text-gray-500 text-center mb-4 sm:mb-6 px-1 sm:px-2 text-sm sm:text-base">
        Secure your Daytona Beach getaway now. Pick your dates later. No blackout dates through May 17, 2026.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-4 sm:mb-6">
        <ul className="space-y-2 sm:space-y-3">
          {checklistItems.map((item, index) => (
            <li key={index} className="flex items-start gap-2 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onAccept}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase py-3 rounded-xl transition-colors text-sm sm:text-base"
      >
        RESERVE NOW
      </button>

      <button
        onClick={onClose}
        className="w-full mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 hover:text-gray-600 hover:underline transition-colors"
      >
        No thanks, I'll pass on this promotional offer
      </button>
    </Modal>
  );
}
