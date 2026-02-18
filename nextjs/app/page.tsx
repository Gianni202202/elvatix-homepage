import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import PainPoints from '@/components/sections/PainPoints';
import WedgeSection from '@/components/sections/WedgeSection';
import Features from '@/components/sections/Features';
import Comparison from '@/components/sections/Comparison';
import Stats from '@/components/sections/Stats';
import LeadMagnet from '@/components/sections/LeadMagnet';
import Solutions from '@/components/sections/Solutions';
import Testimonials from '@/components/sections/Testimonials';
import QuoteBanner from '@/components/sections/QuoteBanner';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <PainPoints />
      <WedgeSection />
      <Features />
      <Comparison />
      <Stats />
      <LeadMagnet />
      <Solutions />
      <Testimonials />
      <QuoteBanner />
      <CTA />
      <Footer />
    </>
  );
}
