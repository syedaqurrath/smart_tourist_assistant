import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { getChatbotResponse } from '../data/chatbot';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const botResponse: Message = {
      role: 'bot',
      content: getChatbotResponse(input)
    };

    setMessages([...messages, userMessage, botResponse]);
    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = { role: 'user', content: question };
    const botResponse: Message = {
      role: 'bot',
      content: getChatbotResponse(question)
    };

    setMessages([...messages, userMessage, botResponse]);
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
        </div>
        <span className="text-sm">{isOpen ? '▼' : '▲'}</span>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600">Ask me anything about the Taj Mahal!</p>

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
                <div className="font-semibold mb-1">
                  {message.role === 'user' ? 'You' : 'Assistant'}
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-700">Quick Questions:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickQuestion('Who built the Taj Mahal?')}
                className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
              >
                Who built it?
              </button>
              <button
                onClick={() => handleQuickQuestion('Best photo spots?')}
                className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
              >
                Best photo spots?
              </button>
              <button
                onClick={() => handleQuickQuestion('How long does a tour take?')}
                className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
              >
                How long to visit?
              </button>
              <button
                onClick={() => handleQuickQuestion('When was it built?')}
                className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
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
