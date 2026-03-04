import { useState, useEffect } from 'react';
import { Star, Waves, ShoppingBag, Trees, X, MapPin, Clock, ExternalLink, Rocket, Landmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface BentoItem {
  id: number;
  icon: LucideIcon;
  title: string;
  text: string;
  image: string;
  className: string;
  details: {
    description: string;
    location: string;
    hours?: string;
    highlights: string[];
  };
}

const bentoItems: BentoItem[] = [
  {
    id: 1,
    icon: Star,
    title: 'Daytona International Speedway',
    text: 'Home of the Daytona 500 and NASCAR\'s most legendary racing experience.',
    image: 'https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    className: 'md:col-span-2',
    details: {
      description: 'Experience the thrill of Daytona International Speedway, the World Center of Racing. Home of the iconic Daytona 500, this legendary motorsports venue offers year-round tours, events, and the DAYTONA Motorsports Experience. Feel the roar of engines and the excitement of NASCAR history.',
      location: 'Daytona Beach, FL - Minutes from resort',
      hours: 'Tour hours vary - Check Speedway website',
      highlights: ['Daytona 500 Experience', 'Behind-the-scenes tours', 'Year-round racing events', 'Motorsports Hall of Fame'],
    },
  },
  {
    id: 2,
    icon: Waves,
    title: 'Daytona Beach Boardwalk & Pier',
    text: 'Oceanfront entertainment, dining, and classic beach fun for the whole family.',
    image: '/exploria-daytona/daytona-pier.jpeg',
    className: 'md:row-span-2',
    details: {
      description: 'The Daytona Beach Boardwalk and Pier is a classic beachfront destination featuring rides, arcade games, and oceanfront dining. Enjoy stunning Atlantic Ocean views from the historic pier, take a ride on the giant Ferris wheel, or simply soak in the sun and surf.',
      location: 'Daytona Beach, FL - Steps from resort',
      hours: 'Open daily - Hours vary by season',
      highlights: ['Iconic pier & Ferris wheel', 'Arcade games & rides', 'Oceanfront dining', 'Live entertainment'],
    },
  },
  {
    id: 3,
    icon: Rocket,
    title: 'Kennedy Space Center',
    text: 'America\'s legendary launch site and one of Florida\'s most awe-inspiring attractions.',
    image: 'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    className: '',
    details: {
      description: 'Explore America\'s legendary space program at Kennedy Space Center Visitor Complex. Walk beneath a massive Saturn V rocket, meet a real astronaut, experience a simulated shuttle launch, and witness history where humans first launched to the Moon. Just an hour south of Daytona Beach.',
      location: 'Cape Canaveral, FL - About 1 hour south',
      hours: 'Daily 9am - 6pm (hours vary)',
      highlights: ['Space Shuttle Atlantis exhibit', 'Astronaut encounters', 'Rocket launches', 'Bus tour to Launch Complex 39'],
    },
  },
  {
    id: 4,
    icon: Landmark,
    title: 'St. Augustine',
    text: 'The nation\'s oldest city, rich with history, charming streets, and stunning architecture.',
    image: '/st-augustine.jpg',
    className: '',
    details: {
      description: 'Discover the charm and history of St. Augustine, the nation\'s oldest city. Stroll along cobblestone streets, explore the iconic Castillo de San Marcos, visit Flagler College\'s stunning Spanish Renaissance architecture, and enjoy world-class dining and boutique shopping. Just 45 minutes from Daytona Beach.',
      location: 'St. Augustine, FL - About 45 minutes north',
      hours: 'Attractions vary',
      highlights: ['Castillo de San Marcos', 'Historic downtown walks', 'Flagler College', 'St. George Street shopping'],
    },
  },
  {
    id: 5,
    icon: ShoppingBag,
    title: 'Tanger Outlets Daytona Beach',
    text: 'Daytona Beach Outlet Mall and top retail destinations just minutes away.',
    image: '/exploria-daytona/daytona-outlets.jpg',
    className: 'md:col-span-2',
    details: {
      description: 'Shop till you drop at Daytona Beach\'s premier outlet malls and retail destinations. From Tanger Outlets to the Volusia Mall and One Daytona lifestyle center, you\'ll find brand-name stores, boutiques, and great dining options all just minutes from the resort.',
      location: 'Multiple locations near Daytona Beach',
      hours: 'Mon-Sat 10am-9pm, Sun 11am-6pm',
      highlights: ['Tanger Outlets', 'One Daytona lifestyle center', 'Dining & entertainment', 'Brand-name savings'],
    },
  },
  {
    id: 6,
    icon: Trees,
    title: 'Marine Science Center',
    text: 'Up-close encounters with sea turtles, shore birds, and Florida\'s native coastal wildlife.',
    image: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    className: '',
    details: {
      description: 'The Marine Science Center in Ponce Inlet is dedicated to the rehabilitation of sea turtles and seabirds. Explore interactive exhibits, touch tanks, and learn about Florida\'s diverse marine ecosystems. A wonderful educational experience for the whole family.',
      location: 'Ponce Inlet, FL - 15 minutes from resort',
      hours: 'Tue-Sat 10am - 4pm',
      highlights: ['Sea turtle rehabilitation', 'Bird of prey exhibits', 'Interactive touch tanks', 'Educational programs'],
    },
  },
];

interface LightboxProps {
  item: BentoItem;
  onClose: () => void;
}

function Lightbox({ item, onClose }: LightboxProps) {
  const IconComponent = item.icon;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 safe-bottom safe-top"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-56 md:h-72">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                {item.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-18rem)]">
          <p className="text-gray-700 leading-relaxed mb-6">
            {item.details.description}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">{item.details.location}</span>
            </div>
            {item.details.hours && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{item.details.hours}</span>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.details.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-600">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePoconosBento() {
  const [selectedItem, setSelectedItem] = useState<BentoItem | null>(null);
  const sectionAnimation = useScrollAnimation();

  return (
    <section id="explore" ref={sectionAnimation.ref as React.RefObject<HTMLElement>} className={`py-16 md:py-20 bg-white scroll-animate ${sectionAnimation.isVisible ? 'visible' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Daytona Beach
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover world-class beaches, attractions, and year-round adventures located right on Florida's iconic Atlantic Coast.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 auto-rows-[180px] md:auto-rows-[200px]">
          {bentoItems.map((item) => {
            const IconComponent = item.icon;
            const gridClass = item.id === 1 || item.id === 5
              ? 'col-span-2'
              : item.id === 2
                ? 'row-span-2'
                : '';
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${gridClass}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-md" />
                    <h3 className="text-sm md:text-xl font-bold text-white drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-base text-white/90 leading-relaxed line-clamp-2">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedItem && (
        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  );
}
