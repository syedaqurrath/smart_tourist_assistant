import { useState } from 'react';
import { Send, MessageCircle, Loader2 } from 'lucide-react';
import { useChatbot } from '../hooks/useApi';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function EnhancedChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { sendMessage, loading, error } = useChatbot();

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Use API instead of static responses
      const response = await sendMessage(input);
      
      if (response) {
        const botMessage: Message = {
          role: 'bot',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      const errorMessage: Message = {
        role: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleQuickQuestion = async (question: string) => {
    const userMessage: Message = { 
      role: 'user', 
      content: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await sendMessage(question);
      
      if (response) {
        const botMessage: Message = {
          role: 'bot',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      const errorMessage: Message = {
        role: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-amber-700 text-white hover:bg-amber-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold">AI Tour Assistant</span>
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        </div>
        <span className="text-sm">{isOpen ? '▼' : '▲'}</span>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">Ask me anything about the Taj Mahal!</p>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              Error: {error}
            </div>
          )}

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {messages.slice(-6).map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-sm ${
                  message.role === 'user'
                    ? 'bg-blue-50 text-blue-900 ml-8'
                    : 'bg-gray-100 text-gray-900 mr-8'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="font-semibold">
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-700">Quick Questions:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickQuestion('Who built the Taj Mahal?')}
                disabled={loading}
                className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors disabled:opacity-50"
              >
                Who built it?
              </button>
              <button
                onClick={() => handleQuickQuestion('Best photo spots?')}
                disabled={loading}
                className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors disabled:opacity-50"
              >
                Best photo spots?
              </button>
              <button
                onClick={() => handleQuickQuestion('How long does a tour take?')}
                disabled={loading}
                className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors disabled:opacity-50"
              >
                How long to visit?
              </button>
              <button
                onClick={() => handleQuickQuestion('When was it built?')}
                disabled={loading}
                className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors disabled:opacity-50"
              >
                When was it built?
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
