import { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Quote, RotateCcw, Star, Award, MapPin, Building, Building2 } from 'lucide-react';
import HowItWorksSection from '../components/HowItWorksSection';
import MountainHomeSection from '../components/MountainHomeSection';
import AmenitiesGridSection from '../components/AmenitiesGridSection';
import FinalCTASection from '../components/FinalCTASection';
import ExplorePoconosBento from '../components/ExplorePoconosBento';
import OfferShowcaseSection from '../components/OfferShowcaseSection';
import HeroSection from '../components/HeroSection';
import BonusCondoSection from '../components/BonusCondoSection';
import VideoModal from '../components/VideoModal';
import Modal from '../components/Modal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface HomePageProps {
  onBookNow: () => void;
  scrollToSection: (id: string) => void;
  activeSection: 'condo' | 'cruise' | null;
  headerVisible: boolean;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  theme: 'orange' | 'teal';
}

const testimonials: Testimonial[] = [
  {
    quote: "Home away from home. A well maintained timeshare, and very helpful staff. We have been owners since they opened years ago. It's our home away from home.",
    name: "charlie_ribbens",
    title: "Verified Owner",
    theme: "orange"
  },
  {
    quote: "Love the Grand Seas. I have owned their since 1997 and the resort looks amazing with all of the new renovations. The location is awesome on the ocean and across from the shopping center. Enjoy the tiki bar, restaurant and pools overlooking to the beach.. Looking forward for another visit. Laura",
    name: "Scenic766894",
    title: "Verified Owner",
    theme: "teal"
  },
  {
    quote: "Bike Week 2025. The Resort Is The Best I've Ever Seen It. Many New Up Grades!! I've been staying there every year since 2007",
    name: "cuttersedge2",
    title: "Verified Owner",
    theme: "orange"
  },
  {
    quote: "Great beachfront resort. I am an owner of the Exploria Resorts timeshare. I visited the Grand Seas resort several time and so far, it is the best resort I had stayed.",
    name: "Galina W",
    title: "Verified Owner",
    theme: "teal"
  }
];

const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function HomePage({ onBookNow, scrollToSection, activeSection, headerVisible }: HomePageProps) {
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState<number | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const gallerySection = useScrollAnimation();
  const whyOwnersSection = useScrollAnimation();
  const testimonialsSection = useScrollAnimation();
  const trustSection = useScrollAnimation();
  const faqSection = useScrollAnimation();

  const accommodationImages = [
    { src: '/exploria-daytona/exterior1.webp', label: 'Grand Seas Daytona Beach' },
    { src: '/exploria-daytona/exterior2.jpeg', label: 'Grand Seas Daytona Beach' },
    { src: '/exploria-daytona/exterior3.jpeg', label: 'Grand Seas Daytona Beach' },
    { src: '/exploria-daytona/pool1.jpeg', label: 'Grand Seas Daytona Beach' },
    { src: '/exploria-daytona/pool2.jpeg', label: 'Grand Seas Daytona Beach' },
  ];

  const activityImages = [
    { src: '/exploria-daytona/pool3.jpeg', label: 'Pool Paradise' },
    { src: '/exploria-daytona/pool4.jpeg', label: 'Resort Pool' },
    { src: '/exploria-daytona/pool5.webp', label: 'Oceanfront Pool' },
    { src: '/exploria-daytona/gym1.jpeg', label: 'Fitness Center' },
    { src: '/exploria-daytona/hottub1.jpeg', label: 'Hot Tub' },
  ];

  const galleryImages = useMemo(() =>
    [...accommodationImages, ...activityImages].sort(() => Math.random() - 0.5),
    []
  );

  // Auto-scroll effect with looping
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const scrollSpeed = 0.5; // pixels per frame
    let animationFrameId: number;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Check if we've scrolled to the end, then reset to beginning
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoScrolling]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setParallaxOffset(scrolled * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pause auto-scroll on hover
  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  const handlePrevImage = () => {
    setGalleryLightboxIndex((prev) =>
      prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setGalleryLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % galleryImages.length
    );
  };

  const handlePlayVideo = (url: string) => {
    setVideoUrl(url);
    setIsVideoOpen(true);
  };

  return (
    <>
      <HeroSection onBookNow={onBookNow} />

      {/* Scrolling Gallery */}
      <section ref={gallerySection.ref as React.RefObject<HTMLElement>} className={`py-12 bg-white overflow-hidden scroll-animate ${gallerySection.isVisible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold mb-2">Grand Seas Daytona Beach</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Your Daytona Beach Escape Awaits</h2>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex space-x-6 overflow-x-hidden pb-8 px-4 sm:px-6 lg:px-8 scrollbar-hide"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Duplicate images for seamless looping */}
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div
                key={index}
                onClick={() => setGalleryLightboxIndex(index % galleryImages.length)}
                className="flex-shrink-0 w-72 md:w-80 lg:w-96 group cursor-pointer"
              >
                <div className="relative h-56 md:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                  <img
                    src={image.src}
                    alt={image.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute left-0 top-0 bottom-8 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </section>

      <OfferShowcaseSection onBookNow={onBookNow} />

      <HowItWorksSection onBookNow={onBookNow} />

      <MountainHomeSection onBookNow={onBookNow} />

      <AmenitiesGridSection />

      <BonusCondoSection
        onBookNow={onBookNow}
        sectionRef={whyOwnersSection.ref as React.RefObject<HTMLElement>}
      />

      {/* Testimonials Section */}
      <section ref={testimonialsSection.ref as React.RefObject<HTMLElement>} id="reviews" className={`py-24 bg-[#F9FAFC] overflow-hidden scroll-animate ${testimonialsSection.isVisible ? 'visible' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              WHAT OUR OWNERS ARE SAYING
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See what fellow owners and guests have to say about their unforgettable experiences at Club Exploria resorts
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 relative"
              >
                <Quote className={`absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 ${testimonial.theme === 'orange' ? 'text-orange-100' : 'text-teal-100'}`} />
                <div className="relative z-10">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-2">
                    "{truncateText(testimonial.quote, 15)}"
                  </p>
                  <button
                    onClick={() => setSelectedTestimonial(testimonial)}
                    className={`text-sm font-medium mb-4 sm:mb-6 ${testimonial.theme === 'orange' ? 'text-orange-600 hover:text-orange-700' : 'text-teal-600 hover:text-teal-700'} transition-colors cursor-pointer`}
                  >
                    Read more
                  </button>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExplorePoconosBento />

      {/* Trust Indicator Ribbon */}
      <section ref={trustSection.ref as React.RefObject<HTMLElement>} className={`py-12 bg-[#F9FAFC] scroll-animate ${trustSection.isVisible ? 'visible' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                <Award className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Rated 4.8/5</h3>
              <p className="text-gray-600 text-sm">by Owners</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                <MapPin className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">Daytona Beach, FL</h3>
              <p className="text-gray-600 text-sm">Steps from the World's Most Famous Beach</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                <Building className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">28+ Years</h3>
              <p className="text-gray-600 text-sm">of Exploria Hospitality</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                <RotateCcw className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">100% Refundable</h3>
              <p className="text-gray-600 text-sm">$99 Deposit</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSection.ref as React.RefObject<HTMLElement>} className={`py-24 bg-white scroll-animate ${faqSection.isVisible ? 'visible' : ''}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-teal-600 uppercase tracking-widest text-sm font-semibold mb-4">Got Questions?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: 'Is the $99 deposit really refundable?',
                answer: 'Yes! Your $99 deposit is 100% refundable after attending the Owner Feedback Session.'
              },
              {
                question: 'Do I have to know my travel dates now?',
                answer: 'No need to pick dates now. Book now and choose your travel dates later. Valid through May 17, 2026.'
              },
              {
                question: 'Who is eligible for this offer?',
                answer: 'For registered owners of Grand Seas Daytona Beach/Club Exploria.'
              },
              {
                question: 'What is the Owner Update presentation?',
                answer: "A 60-minute Owner Feedback Session where you share your thoughts on resort renovations. Attendance is required for your deposit refund and bonus gifts."
              },
              {
                question: 'What if I need to cancel?',
                answer: "Please refer to the terms in your confirmation email or contact our concierge team for assistance."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection onBookNow={onBookNow} />

      {/* Video Lightbox */}
      <Modal
        isOpen={videoLightboxOpen}
        onClose={() => setVideoLightboxOpen(false)}
        variant="media"
        maxWidth="max-w-4xl"
      >
        <div className="relative w-full aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <video
            className="w-full h-full"
            controls
            autoPlay
            src="https://jonburtondesign.com/Fire-Ice/media/Exploria%20Resort%20Resort%20Walk%20Through%20Winter_1.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>

      {/* Gallery Lightbox */}
      <Modal
        isOpen={galleryLightboxIndex !== null}
        onClose={() => setGalleryLightboxIndex(null)}
        variant="media"
        maxWidth="max-w-5xl"
      >
        {galleryLightboxIndex !== null && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="relative w-full">
              <img
                src={galleryImages[galleryLightboxIndex].src}
                alt={galleryImages[galleryLightboxIndex].label}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                <p className="text-white text-xl font-semibold text-center">{galleryImages[galleryLightboxIndex].label}</p>
                <p className="text-white/70 text-sm text-center mt-1">{galleryLightboxIndex + 1} / {galleryImages.length}</p>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* Testimonial Lightbox */}
      <Modal
        isOpen={selectedTestimonial !== null}
        onClose={() => setSelectedTestimonial(null)}
        variant="content"
        maxWidth="max-w-lg"
      >
        {selectedTestimonial && (
          <>
            <Quote className={`absolute top-6 right-6 w-12 h-12 ${selectedTestimonial.theme === 'orange' ? 'text-orange-100' : 'text-teal-100'}`} />
            <div className="relative z-10">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                "{selectedTestimonial.quote}"
              </p>
              <div className="border-t border-gray-100 pt-6">
                <p className="font-semibold text-gray-900 text-lg">{selectedTestimonial.name}</p>
                <p className="text-gray-500">{selectedTestimonial.title}</p>
              </div>
            </div>
          </>
        )}
      </Modal>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
      />
    </>
  );
}
