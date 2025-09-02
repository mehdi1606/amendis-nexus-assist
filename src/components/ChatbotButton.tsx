import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatbotButtonProps {
  onClick: () => void;
}

const ChatbotButton = ({ onClick }: ChatbotButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-primary hover:shadow-blue hover-scale shadow-lg z-40 animate-bounce-gentle"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  );
};

export default ChatbotButton;