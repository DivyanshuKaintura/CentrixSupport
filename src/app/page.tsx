import {Hero} from '@/components/home/hero/page';
import Services from '@/components/home/services/page';
import Navbar from '@/components/nav-bar/page';
import Footer from '@/components/footer/page';
import Head from 'next/head';
import { LazyMotion, domAnimation } from 'framer-motion';

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen">
        <Head>
          <title>NexNovel</title>
          <meta name="description" content="We are a design-driven agency creating meaningful digital experiences." />
        </Head>
        <main>
          <Navbar />
          <Hero />
          <Services />
          {/* <Features /> */}
          <Footer />
        </main>
      </div>
    </LazyMotion>
  );
}