import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Info, Phone } from 'lucide-react';
import HomePage from './pages/HomePage';
import Email1PreviewPage from './pages/Email1PreviewPage';
import Email2PreviewPage from './pages/Email2PreviewPage';
import Email3PreviewPage from './pages/Email3PreviewPage';
import RefundableOfferModal from './components/RefundableOfferModal';
import PackageInclusionLoader from './components/PackageInclusionLoader';
import Modal from './components/Modal';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [exitModalShown, setExitModalShown] = useState(false);
  const [showStickyBookNow, setShowStickyBookNow] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<'condo' | 'cruise' | null>(null);
  const [showPackageLoader, setShowPackageLoader] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isEmailCampaignsPage = location.pathname === '/email-1-preview' || location.pathname === '/email-2-preview' || location.pathname === '/email-3-preview';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (exitModalShown || isEmailCampaignsPage) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitModalShown) {
        setExitModalOpen(true);
        setExitModalShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitModalShown, isEmailCampaignsPage]);

  useEffect(() => {
    const handleScroll = () => {
      const condoSection = document.getElementById('bonus-condo');
      const cruiseSection = document.getElementById('bonus-cruise');
      const heroSection = document.getElementById('hero');
      const navOffset = 200;
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (condoSection && cruiseSection) {
        const condoTop = condoSection.getBoundingClientRect().top;
        const cruiseTop = cruiseSection.getBoundingClientRect().top;
        const condoBottom = condoSection.getBoundingClientRect().bottom;
        const cruiseBottom = cruiseSection.getBoundingClientRect().bottom;

        if (condoTop <= navOffset && condoBottom > navOffset) {
          setActiveSection('condo');
        } else if (cruiseTop <= navOffset && cruiseBottom > navOffset) {
          setActiveSection('cruise');
        } else {
          setActiveSection(null);
        }
      }

      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setShowStickyBookNow(heroBottom < 0);
      } else {
        setShowStickyBookNow(currentScrollY > 300);
      }

      if (currentScrollY < 100) {
        setHeaderVisible(true);
      } else if (Math.abs(scrollDelta) > 5) {
        if (scrollDelta > 0) {
          setHeaderVisible(false);
        } else {
          setHeaderVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (exitModalOpen) {
          setExitModalOpen(false);
          return;
        }
        if (termsModalOpen) {
          setTermsModalOpen(false);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [termsModalOpen, exitModalOpen]);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 140;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 140;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleNavBookNow = () => {
    alert('Booking functionality would be connected here');
  };

  const handleBookNow = () => {
    setShowPackageLoader(true);
  };

  const handlePackageComplete = () => {
    setShowPackageLoader(false);
    alert('Booking functionality would be connected here');
  };

  const handlePackageClose = () => {
    setShowPackageLoader(false);
  };

  return (
    <div className="min-h-screen-safe bg-white">
      <RefundableOfferModal
        isOpen={exitModalOpen}
        onClose={() => setExitModalOpen(false)}
        onAccept={() => {
          setExitModalOpen(false);
          handleBookNow();
        }}
      />

      <PackageInclusionLoader
        isVisible={showPackageLoader}
        onComplete={handlePackageComplete}
        onClose={handlePackageClose}
      />

      {!isEmailCampaignsPage && (
        <>
          {/* Main Navbar */}
          <nav className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-transform duration-300 md:translate-y-0 ${
            headerVisible ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 sm:h-20">
                <div className="flex items-center">
                  <Link to="/">
                    <img
                      src="https://jonburtondesign.com/Fire-Ice/Logo/ExploriaResorts-Logo.png"
                      alt="Exploria Resorts"
                      className="h-10 sm:h-12 w-auto"
                    />
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className="font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    HOW IT WORKS
                  </button>
                  <button
                    onClick={() => scrollToSection('accommodations')}
                    className="font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    ACCOMMODATIONS
                  </button>
                  <button
                    onClick={() => scrollToSection('bonus-condo')}
                    className="font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    BONUS
                  </button>
                  <button
                    onClick={() => scrollToSection('reviews')}
                    className="font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    REVIEWS
                  </button>
                  <button
                    onClick={() => scrollToSection('explore')}
                    className="font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    EXPLORE
                  </button>
                  <a
                    href="tel:3862621090"
                    className="flex items-center gap-3 bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg min-h-[44px]"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-xs font-semibold uppercase tracking-wide">Call to Activate</span>
                      <span className="text-lg font-bold">(386) 262-1090</span>
                    </div>
                  </a>
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden text-gray-700"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

          </nav>

          {/* Full-Screen Mobile Menu - outside nav to avoid transform stacking context issues */}
          <div
            className={`md:hidden fixed inset-0 z-[60] bg-white transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          >
            <div className="h-full flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-4 flex-shrink-0 h-16 sm:h-20">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="https://jonburtondesign.com/Fire-Ice/Logo/ExploriaResorts-Logo.png"
                    alt="Exploria Resorts"
                    className="h-10 sm:h-12 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              <div className="relative h-72 flex-shrink-0 overflow-hidden">
                <img
                  src="/exploria-daytona/pool1.jpeg"
                  alt="Resort pool area"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent" />
              </div>

              <div className="flex-1 px-5 py-5 space-y-1">
                {[
                  { id: 'how-it-works', label: 'HOW IT WORKS' },
                  { id: 'accommodations', label: 'ACCOMMODATIONS' },
                  { id: 'bonus-condo', label: 'BONUS' },
                  { id: 'reviews', label: 'REVIEWS' },
                  { id: 'explore', label: 'EXPLORE' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left font-semibold py-3.5 min-h-[48px] text-gray-800 hover:text-orange-600 transition-colors tracking-wide text-sm border-b border-gray-100 last:border-b-0"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="px-5 pb-8 pt-2 flex-shrink-0">
                <a
                  href="tel:3862621090"
                  className="flex items-center justify-center gap-3 bg-orange-600 text-white px-6 py-4 rounded-full font-bold hover:bg-orange-700 transition-all min-h-[48px] shadow-lg w-full"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-xs font-semibold uppercase tracking-wide">Call to Activate</span>
                    <span className="text-lg font-bold">(386) 262-1090</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Page Content */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onBookNow={handleBookNow}
              scrollToSection={scrollToSection}
              activeSection={activeSection}
              headerVisible={headerVisible}
            />
          }
        />
        <Route
          path="/email-1-preview"
          element={<Email1PreviewPage />}
        />
        <Route
          path="/email-2-preview"
          element={<Email2PreviewPage />}
        />
        <Route
          path="/email-3-preview"
          element={<Email3PreviewPage />}
        />
      </Routes>

      {!isEmailCampaignsPage && (
        <>
          {/* Footer */}
          <footer className="bg-white py-16 border-t border-gray-200 md:mb-0 mb-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="mb-8">
                  <img
                    src="https://jonburtondesign.com/Fire-Ice/Logo/ExploriaResorts-Logo.png"
                    alt="Exploria Resorts"
                    className="h-16 w-auto mx-auto"
                  />
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-6 max-w-3xl mx-auto">
                  7-Night Condominium Vacation: Full details and complete terms and conditions for redemption are printed on the promotional certificate. This promotional offer is not free; deposits, government taxes, carrier fees (if applicable) and agency-imposed fees are not included. Fulfillment is the sole obligation of Customer Service Network Group ("CSNG"), which is not affiliated with Exploria Resorts.
                </p>

                <p className="text-gray-700 text-sm leading-relaxed mb-6 max-w-3xl mx-auto">
                  The vacation package being offered is provided by Club Exploria, LLC, the developer and seller of Club Exploria, a multi-site timeshare plan. © 2026 Club Exploria, LLC. All rights reserved.
                </p>

                <p className="text-gray-900 font-bold text-sm leading-relaxed mb-4 max-w-4xl mx-auto tracking-wide">
                  THIS ADVERTISING MATERIAL IS BEING USED FOR THE PURPOSE OF SOLICITING SALES OF A VACATION OWNERSHIP PLAN.
                </p>

                <p className="text-gray-900 font-bold text-sm leading-relaxed mb-8 max-w-4xl mx-auto tracking-wide">
                  THE COMPLETE OFFERING TERMS ARE CONTAINED IN A PUBLIC OFFERING PLAN AVAILABLE FROM THE SPONSOR.
                </p>

                <div className="flex items-center justify-center space-x-4 text-sm">
                  <button
                    onClick={() => setTermsModalOpen(true)}
                    className="text-gray-600 hover:text-teal-700 cursor-pointer transition-colors font-medium underline underline-offset-4"
                  >
                    Terms & Conditions
                  </button>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-gray-600 hover:text-teal-700 cursor-pointer transition-colors font-medium underline underline-offset-4">
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {!isEmailCampaignsPage && (
        <>
          {/* Terms Modal */}
          <Modal
            isOpen={termsModalOpen}
            onClose={() => setTermsModalOpen(false)}
            variant="content"
            maxWidth="max-w-4xl"
          >
            <div className="max-h-[85vh] overflow-hidden">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between z-10 -mx-5 sm:-mx-8 -mt-5 sm:-mt-8 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Terms and Conditions</h2>
                <button
                  onClick={() => setTermsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(85vh-88px)] prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The vacation package being offered is provided by Club Exploria, LLC ("Sponsor"), a Delaware limited liability company whose address is 25 Town Center Boulevard, Suite C., Clermont, FL 34714. Sponsor is the developer and seller of Club Exploria, a multi-site timeshare plan.
                  </p>

                  <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">
                    Grand Seas Daytona Beach Owner Participation Requirement
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All owners on the account are required to travel and attend a minimum 60-minute Owner Feedback Session together. The scheduled times of the Owner Feedback Session depends on the property location. Failure of all parties on the account to travel and attend the required session will result in forfeiture of the package and associated gift(s). Club Exploria property owners' accounts must be in good standing and cannot be in collections, bankruptcy nor have an active loan modification. Club Exploria Owners may not travel on a promotional package within six (6) months of their most recent stay/tour. Only one vacation package per household.
                  </p>

                  <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">
                    Cancellation & Refund Policy
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This offer is non-refundable and non-transferable except as described herein or as required by law. Failure to comply with the rescheduling policy, attend the sales presentation, or meet the eligibility requirements will result in forfeiture of the package price and benefits of the package. You may cancel and request a refund at any time within thirty (30) days following the date that you purchased your vacation package.
                  </p>

                  <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4 uppercase tracking-wide">
                    Cruise Certificate Disclaimer
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Full details and complete terms and conditions for redemption of the Cruise Certificate are printed on the promotional certificate which will be emailed directly to you. This promotional offer is not free, deposits, government taxes, carrier (if applicable) and agency-imposed fees are not included. Fulfillment of this offer is the sole and exclusive obligation of Customer Service Network Group ("CSNG").
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                      Timeshare Disclosure
                    </h3>
                    <p className="text-gray-800 font-bold text-sm leading-relaxed uppercase tracking-wide">
                      This advertising material is being used for the purpose of soliciting sales of a vacation ownership plan. The complete offering terms are contained in an offering plan available from the sponsor.
                    </p>
                  </div>

                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">
                      New York Disclosure
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      This offer is void where prohibited by law. New York residents: This advertisement is not an offering. An offering can only be made by a prospectus filed first with the Department of Law of the State of New York. Such filing does not constitute approval by the Department of Law.
                    </p>
                  </div>
                </div>
              </div>
          </Modal>

          {/* Mobile Sticky Call to Activate Button */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-[45] md:hidden transition-all duration-300 ease-out ${
              showStickyBookNow ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
            }`}
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 pt-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
              <div className="px-4 pb-4">
                <a
                  href="tel:3862621090"
                  className="w-full flex items-center justify-center gap-3 bg-orange-600 text-white px-6 py-3 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg min-h-[44px]"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-xs font-semibold uppercase tracking-wide">Call to Activate</span>
                    <span className="text-lg font-bold">(386) 262-1090</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
