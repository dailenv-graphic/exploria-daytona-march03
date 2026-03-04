import {
  Flag,
  Rocket,
  Landmark,
  Umbrella,
  UtensilsCrossed,
  Trophy,
  Church,
  Telescope,
  Gamepad2,
  FerrisWheel,
  Bed,
  Sofa,
  Flame,
  Mountain,
  Home,
  Wifi,
  WashingMachine,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const thingsToDoItems = [
  { icon: Flag, text: 'NASCAR Thrills' },
  { icon: Rocket, text: 'Legendary Space Exploration' },
  { icon: Landmark, text: 'Historic City Discovery' },
  { icon: Umbrella, text: 'Classic Beachfront Fun' },
  { icon: UtensilsCrossed, text: 'Oceanfront Boardwalk Dining' },
  { icon: Trophy, text: 'Daytona 500 Experience' },
  { icon: Church, text: 'St. Augustine Charm' },
  { icon: Telescope, text: 'Legendary Space Program' },
  { icon: Gamepad2, text: 'Vibrant Arcade Games' },
  { icon: FerrisWheel, text: 'Vintage Boardwalk Rides' },
];

const villaItems = [
  { icon: Bed, text: 'Queen Bed' },
  { icon: UtensilsCrossed, text: 'Dining Room' },
  { icon: Sofa, text: 'Sofa Bed' },
  { icon: Sofa, text: 'Living Room' },
  { icon: Flame, text: 'Fireplace' },
  { icon: Mountain, text: 'Private Balcony' },
  { icon: UtensilsCrossed, text: 'Full Kitchen' },
  { icon: Home, text: 'Sleeps 4 Guests' },
  { icon: Wifi, text: 'Free WiFi' },
  { icon: WashingMachine, text: 'Washer & Dryer' },
];

export default function AmenitiesGridSection() {
  const sectionAnimation = useScrollAnimation();

  return (
    <section
      ref={sectionAnimation.ref as React.RefObject<HTMLElement>}
      className={`bg-white py-20 scroll-animate ${sectionAnimation.isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Things To Do</h2>
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {thingsToDoItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="text-gray-800 text-[15px] leading-6">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">One Bedroom Villa</h2>
              <div className="w-20 h-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {villaItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={`${item.text}-${index}`} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-gray-800 text-[15px] leading-6">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
