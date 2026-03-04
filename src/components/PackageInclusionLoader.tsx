import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Home, DollarSign, Percent, Gift } from 'lucide-react';
import Modal from './Modal';

interface PackageInclusionLoaderProps {
  onComplete: () => void;
  onClose: () => void;
  isVisible: boolean;
}

const packageItems = [
  { text: '4-Day/3-Night Grand Seas Condo Stay', icon: Home },
  { text: 'Locked-in Rate: $99 Refundable Deposit', icon: DollarSign },
  { text: 'Up to $796 Value — Yours for $99', icon: Percent },
  { text: 'Bonus: 7-Night Resort Condo Getaway', icon: Gift },
];

export default function PackageInclusionLoader({ onComplete, onClose, isVisible }: PackageInclusionLoaderProps) {
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [loadingItem, setLoadingItem] = useState<number | null>(null);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setCompletedItems([]);
      setLoadingItem(null);
      setShowComplete(false);
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    packageItems.forEach((_, index) => {
      const loadStart = 500 + index * 1000;
      const loadEnd = loadStart + 600;

      timers.push(
        setTimeout(() => setLoadingItem(index), loadStart),
        setTimeout(() => {
          setLoadingItem(null);
          setCompletedItems(prev => [...prev, index]);
        }, loadEnd)
      );
    });

    const completeTime = 500 + packageItems.length * 1000 + 200;
    timers.push(
      setTimeout(() => setShowComplete(true), completeTime)
    );

    timers.push(
      setTimeout(() => onComplete(), completeTime + 1200)
    );

    return () => timers.forEach(clearTimeout);
  }, [isVisible, onComplete]);

  return (
    <Modal isOpen={isVisible} onClose={onClose} variant="clean" maxWidth="max-w-md">
      <h2 className="text-2xl font-bold text-teal-800 text-center mb-8">
        Your Vacation Package Includes
      </h2>

      <div className="space-y-3 mb-8">
        {packageItems.map((item, index) => {
          const isLoading = loadingItem === index;
          const isCompleted = completedItems.includes(index);
          const isItemVisible = isLoading || isCompleted || completedItems.length > index;
          const ItemIcon = item.icon;

          return (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-500 ${
                isCompleted
                  ? 'border-teal-200 bg-teal-50'
                  : isLoading
                    ? 'border-orange-200 bg-orange-50'
                    : 'border-gray-100 bg-gray-50'
              } ${isItemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isCompleted
                  ? 'bg-teal-100'
                  : isLoading
                    ? 'bg-orange-100'
                    : 'bg-gray-100'
              }`}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                ) : (
                  <ItemIcon className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isCompleted ? 'text-gray-800' : isLoading ? 'text-gray-700' : 'text-gray-400'
              }`}>
                {item.text}
              </span>
            </div>
          );
        })}
      </div>

      <div className={`text-center transition-all duration-500 ${
        showComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <p className="text-base font-semibold text-teal-700">Package Secured!</p>
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
        </div>
        <p className="text-sm text-gray-500">Redirecting to checkout...</p>
      </div>

      <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full opacity-20 blur-xl" />
      <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 blur-xl" />
    </Modal>
  );
}
