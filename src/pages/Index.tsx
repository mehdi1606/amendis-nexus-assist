import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
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
        <Hero />
        <Services />
        <Contact onChatOpen={handleChatOpen} />
      </main>
      <Footer />
      
      {/* Chatbot */}
      {!isChatOpen && <ChatbotButton onClick={handleChatOpen} />}
      <Chatbot isOpen={isChatOpen} onClose={handleChatClose} />
    </div>
  );
};

export default Index;