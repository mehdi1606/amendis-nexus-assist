import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton = ({ onClick }: ChatbotButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Main Chatbot Button */}
      <Button
        onClick={onClick}
        className="w-16 h-16 rounded-full bg-gradient-primary hover:shadow-glow hover-scale shadow-lg animate-bounce-gentle group"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </Button>
      
      {/* Quick Access to Full Page */}
      <Link to="/chatbot">
        <Button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-success to-success/80 hover:shadow-lg hover-scale shadow-md"
          title="Ouvrir le chat complet"
        >
          <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default ChatbotButton;