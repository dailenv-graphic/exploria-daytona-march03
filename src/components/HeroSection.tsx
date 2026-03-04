import { useRef, useEffect, useCallback } from 'react';
import { ArrowRight, Palmtree, Gift, Clock } from 'lucide-react';
import GlassPanel from './GlassPanel';

interface HeroSectionProps {
  onBookNow: () => void;
}

export default function HeroSection({ onBookNow }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true });
    document.addEventListener('scroll', tryPlay, { once: true });
    return () => {
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('scroll', tryPlay);
    };
  }, [tryPlay]);

  return (
    <section id="hero" className="relative min-h-screen lg:h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/media/hero1.webm" type="video/webm" />
        <source src="/media/hero1.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/20 z-[1]" />

      <img
        src="/owner-badge.png"
        alt="Owner Feedback Getaway"
        className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 xl:w-44 2xl:w-[18rem] pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:h-screen">
        <div className="relative flex items-center justify-center lg:items-center lg:justify-start min-h-[50vh] lg:min-h-0 lg:h-full pt-24 pb-16 lg:pt-0 lg:pb-0">
          <div className="absolute bg-black/50" />

          <div className="relative z-[3] p-6 sm:p-12 lg:p-16 xl:p-20 text-center lg:text-left">
            <span className="inline-block bg-[#00897b] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded mb-3 lg:mb-5">
              Grand Seas Daytona Beach
            </span>
            <h3 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black text-white leading-[0.95] tracking-tight">
              Experience<br />Daytona Beach
            </h3>
            <p className="text-white/80 mt-2 lg:mt-4 text-sm sm:text-lg font-medium">
              Owner Feedback Getaway
            </p>
            <button
              onClick={onBookNow}
              className="lg:hidden mt-6 bg-[#1A6489] text-white px-10 py-4 rounded-lg text-base font-extrabold inline-flex items-center gap-2 transition-all duration-300 hover:bg-[#14506d] active:translate-y-0"
            >
              RESERVE NOW
              <ArrowRight className="w-4 h-4" strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="lg:hidden relative z-50 flex justify-center -mt-20 -mb-16">
          <img
            src="/owner-badge.png"
            alt="Owner Feedback Getaway"
            className="w-40 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
          />
        </div>

        <div className="relative flex items-center justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-12 lg:py-0">
          <GlassPanel className="absolute inset-0 border-l" />
          <div className="relative z-10 w-full max-w-[480px] p-8 sm:p-10">
            <p className="text-gray-500 text-lg mb-1">
              Hi, <strong className="text-gray-900">%First_Name%</strong>!
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-gray-900 leading-tight mb-1">
              Claim Your $99<br />Daytona Beach Getaway
            </h1>

            <div className="flex items-center gap-3 my-6 lg:my-8">
              <span className="text-[2.5rem] font-bold text-orange-600 self-start mt-2">$</span>
              <span className="text-[5rem] sm:text-[6rem] lg:text-[7rem] font-black text-orange-600 leading-[0.75] tracking-[-4px]">
                99
              </span>
              <div className="flex flex-col text-xs font-extrabold uppercase text-gray-400 tracking-wide">
                <span>Total</span>
                <span>Package</span>
                <span className="mt-1.5 bg-orange-600 text-white text-[0.6rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full w-fit">
                  Refundable Deposit
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-emerald-200">
                  <Palmtree className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-gray-600 text-[1.05rem]">
                  <strong className="text-gray-900">3-Night Stay</strong> at Grand Seas Daytona Beach
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-emerald-200">
                  <Gift className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-emerald-700 text-[1.05rem] font-semibold">
                  <strong>BONUS:</strong> 7-Night Resort Getaway at 50+ Resorts
                </p>
              </div>
            </div>

            <div className="bg-amber-50/80 border border-dashed border-amber-500/50 rounded-xl px-5 py-4 mb-7 text-left">
              <div className="flex items-start gap-2 text-gray-700">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  Book and travel by <strong className="text-amber-700">May 17, 2026</strong> and get a BONUS 7-Night Resort Condo Getaway
                </span>
              </div>
            </div>

            <button
              onClick={onBookNow}
              className="w-full bg-[#1A6489] text-white py-5 rounded-lg text-lg font-extrabold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#14506d] hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(26,100,137,0.4)] active:translate-y-0"
            >
              RESERVE NOW
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </button>

            <p className="text-center text-gray-400 text-xs mt-4 tracking-wide">
              Promotion requires resort feedback session. Terms apply.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
