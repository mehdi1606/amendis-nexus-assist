import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import RecruitmentSection from '@/components/RecruitmentSection';
import SuggestionsSection from '@/components/SuggestionsSection';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ChatbotButton from '@/components/ChatbotButton';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <NewsSection />
        <ActivitiesSection />
        <RecruitmentSection />
        <SuggestionsSection />
      </main>
      <Footer />
      
      {/* Chatbot */}
      {!isChatOpen && <ChatbotButton onClick={handleChatOpen} />}
      <Chatbot isOpen={isChatOpen} onClose={handleChatClose} />
    </div>
  );
};

export default Index;