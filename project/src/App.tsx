import { lazy, Suspense, useState, useCallback } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import CookieBanner from './components/CookieBanner';
import SkipLink from './components/SkipLink';
import MobileStickyCTA from './components/MobileStickyCTA';
import { ScrollToTop } from './components/Button';
import type { CalculatorId } from './lib/pricing';

const MasonAssistant = lazy(() => import('./components/MasonAssistant'));

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Estimate = lazy(() => import('./pages/Estimate'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const Faq = lazy(() => import('./pages/Faq'));
const ServiceAreas = lazy(() => import('./pages/ServiceAreas'));
const Privacy = lazy(() => import('./pages/Privacy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const CookieSettings = lazy(() => import('./pages/CookieSettings'));
const Terms = lazy(() => import('./pages/Terms'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="h-8 w-8 animate-spin rounded-full border-3 border-slate-200 border-t-orange-500" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

function AppShell() {
  const [contactOpen, setContactOpen] = useState(false);

  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/estimate" element={<Estimate />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<Faq onContact={openContact} />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/service-areas/:location" element={<ServiceAreas />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/cookie-settings" element={<CookieSettings />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer onContact={openContact} />
      <ContactModal open={contactOpen} onClose={closeContact} />
      <CookieBanner />
      <MobileStickyCTA />
      <Suspense fallback={null}>
        <MasonAssistant />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  );
}

export { Link };
export type { CalculatorId };
