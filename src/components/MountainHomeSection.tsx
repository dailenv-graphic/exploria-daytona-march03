import { Flame, Bed, UtensilsCrossed, Wifi, Building2, UtensilsCrossed as Restaurant, Gift, Globe, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState } from 'react';

interface MountainHomeSectionProps {
  onBookNow: () => void;
}

const villaAmenities = [
  { icon: Bed, label: 'Queen Size Bed' },
  { icon: UtensilsCrossed, label: 'Full Kitchen' },
  { icon: Wifi, label: 'Free WiFi' },
];

const resortAmenities = [
  { icon: Restaurant, label: 'Restaurant' },
  { icon: Building2, label: 'On-site Amenities' },
];

const bonusAmenities = [
  { icon: Globe, label: '50+ Resorts' },
  { icon: MapPin, label: 'US, Mexico, Caribbean & Canada' },
];

const carouselImages = [
  '/accomodations/bedroom1.webp',
  '/accomodations/kitchen1.webp',
  '/accomodations copy/bathroom1.webp',
];

const bonusCarouselImages = [
  '/caribbean.jpg',
  '/bonus-condo-images/couple.jpg',
  '/bonus-condo-images/Caribbean2.jpg',
  '/bonus-condo-images/landscape.jpg',
];

export default function MountainHomeSection({ onBookNow }: MountainHomeSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentBonusImageIndex, setCurrentBonusImageIndex] = useState(0);
  const villaAnimation = useScrollAnimation();
  const resortAnimation = useScrollAnimation();
  const bonusAnimation = useScrollAnimation();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const nextBonusImage = () => {
    setCurrentBonusImageIndex((prev) => (prev + 1) % bonusCarouselImages.length);
  };

  const previousBonusImage = () => {
    setCurrentBonusImageIndex((prev) => (prev - 1 + bonusCarouselImages.length) % bonusCarouselImages.length);
  };

  return (
    <section id="accommodations" className="bg-white">
      <div className="pt-20 pb-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Ocean "Home"
          </h2>
        </div>
      </div>

      <div
        ref={villaAnimation.ref as React.RefObject<HTMLDivElement>}
        className={`bg-white py-16 px-4 scroll-animate ${villaAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={carouselImages[currentImageIndex]}
                alt="Studio Room"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-full shadow-lg">
                  <Flame className="w-4 h-4 text-white" />
                  <span className="font-bold text-white text-sm">Beach Retreat</span>
                </span>
              </div>

              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">Newly Renovated 1-Bedroom 'Street view' Room</h3>
              <p className="font-bold text-orange-600 text-lg mb-4">Your Personal Beach Retreat</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our newly renovated 1-bedroom 'Street view' units have a full kitchen, a king-size bed, and queen sofa sleeper. This room is multi-level with stairs inside the room to get to the 2nd floor.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {villaAmenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <span
                      key={amenity.label}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 rounded-full text-gray-600 text-sm"
                    >
                      <Icon className="w-4 h-4" />
                      {amenity.label}
                    </span>
                  );
                })}
              </div>

              <div>
                <button
                  onClick={onBookNow}
                  className="w-64 py-4 bg-orange-600 text-white text-lg font-bold rounded-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  BOOK NOW
                </button>
                <p className="text-sm mt-3">
                  <span className="text-gray-500">Your Refundable Deposit Today: </span>
                  <span className="font-bold text-orange-600">$99 Only</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={resortAnimation.ref as React.RefObject<HTMLDivElement>}
        className={`bg-[#F9FAFC] py-16 px-4 scroll-animate ${resortAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">The Resort</h3>
              <p className="font-bold text-teal-600 text-lg mb-4">Grand Seas By Exploria Resorts</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Discover the ultimate beach escape at Grand Seas Daytona Beach! This stunning oceanfront resort blends the excitement of Florida's most iconic coastal destination with the comfort and relaxation of a premier vacation experience.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {resortAmenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <span
                      key={amenity.label}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-gray-600 text-sm border border-gray-100"
                    >
                      <Icon className="w-4 h-4" />
                      {amenity.label}
                    </span>
                  );
                })}
              </div>

              <div>
                <button
                  onClick={onBookNow}
                  className="w-64 py-4 bg-orange-600 text-white text-lg font-bold rounded-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  BOOK NOW
                </button>
                <p className="text-sm mt-3">
                  <span className="text-gray-500">Your Refundable Deposit Today: </span>
                  <span className="font-bold text-orange-600">$99 Only</span>
                </p>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2">
              <img
                src="/exploria-daytona/exterior1.webp"
                alt="Resort Amenities"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 rounded-full shadow-lg">
                  <Building2 className="w-4 h-4 text-white" />
                  <span className="font-bold text-white text-sm">On-site Amenities</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bonusAnimation.ref as React.RefObject<HTMLDivElement>}
        className={`bg-white py-16 px-4 scroll-animate ${bonusAnimation.isVisible ? 'visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={bonusCarouselImages[currentBonusImageIndex]}
                alt="Resort Condo Stay"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-full shadow-lg">
                  <Gift className="w-4 h-4 text-white" />
                  <span className="font-bold text-white text-sm">Bonus Included</span>
                </span>
              </div>

              <button
                onClick={previousBonusImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>

              <button
                onClick={nextBonusImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {bonusCarouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBonusImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentBonusImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">The Bonus</h3>
              <p className="font-bold text-orange-600 text-lg mb-4">7-Night Resort Condo Stay</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                You'll have 50+ gorgeous resorts to choose from across the US, Mexico, Caribbean, and Canada. Whether you're dreaming of sun-soaked beaches, vibrant cityscapes, or serene mountain retreats, your perfect getaway awaits.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {bonusAmenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <span
                      key={amenity.label}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 rounded-full text-gray-600 text-sm"
                    >
                      <Icon className="w-4 h-4" />
                      {amenity.label}
                    </span>
                  );
                })}
              </div>

              <div>
                <button
                  onClick={onBookNow}
                  className="w-64 py-4 bg-orange-600 text-white text-lg font-bold rounded-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  BOOK NOW
                </button>
                <p className="text-sm mt-3">
                  <span className="text-gray-500">Your Refundable Deposit Today: </span>
                  <span className="font-bold text-orange-600">$99 Only</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
