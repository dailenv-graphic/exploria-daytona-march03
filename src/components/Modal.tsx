import { X } from 'lucide-react';
import { useEffect, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: 'media' | 'content' | 'clean';
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  variant = 'media',
  maxWidth = 'max-w-4xl'
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && variant !== 'clean') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, variant]);

  if (!isOpen) return null;

  const getContentClasses = () => {
    switch (variant) {
      case 'content':
        return 'relative bg-white rounded-2xl shadow-2xl p-5 sm:p-8';
      case 'clean':
        return 'relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8';
      case 'media':
      default:
        return 'relative';
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={variant !== 'clean' ? onClose : undefined}
    >
      {variant !== 'clean' && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-300 transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-8 h-8 sm:w-10 sm:h-10" />
        </button>
      )}

      <div
        className={`w-full ${maxWidth} ${getContentClasses()}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
