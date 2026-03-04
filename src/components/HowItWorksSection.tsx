import { Calendar, DollarSign, Handshake, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import GlassPanel from './GlassPanel';

interface HowItWorksSectionProps {
  onBookNow: () => void;
}

const steps = [
  {
    number: 1,
    title: 'SELECT DATES',
    description: 'Choose your preferred travel dates before May 17, 2026',
    icon: Calendar,
    accent: 'teal',
  },
  {
    number: 2,
    title: 'REFUNDABLE DEPOSIT',
    description: 'Place a $99 refundable deposit to secure your getaway',
    icon: DollarSign,
    accent: 'orange',
  },
  {
    number: 3,
    title: 'FEEDBACK SESSION',
    description: 'Attend a 60-min Owner Feedback Session during your stay',
    icon: Handshake,
    accent: 'teal',
  },
  {
    number: 4,
    title: 'ENJOY YOUR GETAWAY',
    description: 'Your $99 deposit is refunded after attending the session, plus you receive a bonus 7-night resort vacation certificate!',
    icon: Sparkles,
    accent: 'orange',
  },
];

export default function HowItWorksSection({ onBookNow }: HowItWorksSectionProps) {
  const sectionAnimation = useScrollAnimation();

  return (
    <section
      ref={sectionAnimation.ref as React.RefObject<HTMLElement>}
      id="how-it-works"
      className={`relative overflow-hidden scroll-animate ${sectionAnimation.isVisible ? 'visible' : ''}`}
    >
      <div
        className="relative"
        style={{
          backgroundImage: 'url(/exploria-daytona/exterior2.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative z-10 py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-teal-300 font-semibold tracking-wide uppercase text-sm mb-3">Simple Process</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Four simple steps to your unforgettable Daytona Beach getaway
              </p>
            </div>

            <GlassPanel className="rounded-2xl p-8 md:p-12 mb-10">
              <div className="hidden md:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-0.5 z-0">
                <div className="h-full bg-gradient-to-r from-teal-200 via-orange-200 to-teal-200 rounded-full opacity-50" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isTeal = step.accent === 'teal';

                  return (
                    <div key={step.number} className="relative group">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-5">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                            isTeal
                              ? 'bg-gradient-to-br from-teal-500 to-teal-600'
                              : 'bg-gradient-to-br from-orange-500 to-orange-600'
                          }`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md ${
                            isTeal ? 'bg-teal-700' : 'bg-orange-700'
                          }`}>
                            {step.number}
                          </div>
                        </div>

                        <h3 className="text-gray-900 font-bold text-lg mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-[220px]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassPanel>

            <div className="text-center">
              <button
                onClick={onBookNow}
                className="group bg-orange-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                RESERVE NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
