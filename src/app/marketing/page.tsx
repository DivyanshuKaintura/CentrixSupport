import React from 'react';
import HeroSection from '@/components/marketing-component/hero/page';
import ServicesSection from '@/components/marketing-component/services-marketing/page';
import Footer from '@/components/footer/page';
import MarketingInsights from '@/components/marketing-component/insights-marketing/page';

const Marketing = () => {
  return (
    <div>
      <HeroSection/>
      <MarketingInsights/>
      <ServicesSection/>
      <Footer/>
    </div>
  );
}

export default Marketing;