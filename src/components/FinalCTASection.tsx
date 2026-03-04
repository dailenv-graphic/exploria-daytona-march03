import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface FinalCTASectionProps {
  onBookNow: () => void;
}

export default function FinalCTASection({ onBookNow }: FinalCTASectionProps) {
  const sectionAnimation = useScrollAnimation();

  return (
    <section ref={sectionAnimation.ref as React.RefObject<HTMLElement>} className={`relative py-16 sm:py-20 md:py-28 overflow-hidden scroll-animate ${sectionAnimation.isVisible ? 'visible' : ''}`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/exploria-daytona/exterior2.jpeg)' }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 drop-shadow-lg">
          Ready for Your Beach Escape?
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-md">
          Secure your complimentary 4-day/3-night condo getaway.
        </p>

        <button
          onClick={onBookNow}
          className="w-full sm:w-64 bg-orange-600 text-white py-4 sm:py-5 rounded-lg text-base sm:text-lg font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl"
        >
          BOOK NOW
        </button>
        <p className="text-white/70 text-sm mt-3">
          Your Refundable Deposit Today: <span className="font-bold text-orange-400">$99 Only</span>
        </p>

        <p className="text-xs sm:text-sm md:text-base text-white/90 drop-shadow-md mt-4">
          No blackout dates • Book and travel by May 17, 2026 • 100% refundable
        </p>
      </div>
    </section>
  );
}
