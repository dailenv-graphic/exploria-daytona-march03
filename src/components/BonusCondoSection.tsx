import { useRef, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

interface BonusCondoSectionProps {
  onBookNow: () => void;
  sectionRef?: React.RefObject<HTMLElement>;
}

export default function BonusCondoSection({ onBookNow, sectionRef }: BonusCondoSectionProps) {
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
      },
      { threshold: 0.25 }
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, [tryPlay]);

  return (
    <section
      id="bonus-condo"
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-[1]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/media/caribean-beach.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

      <main className="relative z-[2] w-[90%] max-w-[1000px]">
        <div className="bg-white/[0.89] backdrop-blur-[24px] border border-white/15 py-12 px-6 sm:py-16 sm:px-10 md:py-20 md:px-10 rounded-[30px] sm:rounded-[60px] text-center">
          <p className="uppercase tracking-[5px] text-[0.85rem] mb-6 sm:mb-[30px] text-gray-500">
            Book and travel by <span className="text-[#00897b] font-extrabold">May 17, 2026</span>
          </p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extralight leading-[1.1] mb-8 sm:mb-10 text-gray-900 tracking-[-0.5px]">
            and get a BONUS
            <strong className="block font-black text-3xl sm:text-4xl md:text-5xl mt-2 tracking-[-1px]">
              7-night Resort Condo Getaway
            </strong>
          </h2>

          <p className="text-[1.1rem] leading-[1.7] max-w-[650px] mx-auto mb-10 sm:mb-[50px] text-gray-500 font-light">
            As a special thank you for giving us your feedback, we're also including a bonus 7-night
            Condo Getaway at your choice of more than 50 beautiful resorts in the US, Mexico,
            Caribbean, and Canada.
          </p>

          <button
            onClick={onBookNow}
            className="mx-auto bg-[#1A6489] text-white py-5 px-12 rounded-lg text-lg font-extrabold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#14506d] hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(26,100,137,0.4)] active:translate-y-0"
          >
            RESERVE NOW
            <ArrowRight className="w-5 h-5" strokeWidth={3} />
          </button>
        </div>
      </main>
    </section>
  );
}
