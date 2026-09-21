import { createFileRoute } from '@tanstack/react-router';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import KeyFeatures from '@/components/KeyFeatures';
import CrewGrid from '@/components/CrewGrid';
import InteractiveDemo from '@/components/InteractiveDemo';
import HowItWorks from '@/components/HowItWorks';
import SecurityCommitment from '@/components/SecurityCommitment';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Workshops from '@/components/Workshops';
import TargetAudience from '@/components/TargetAudience';
import Footer from '@/components/Footer';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <KeyFeatures />
        <CrewGrid />
        <InteractiveDemo />
        <HowItWorks />
        <SecurityCommitment />
        <Workshops />
        <TargetAudience />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
