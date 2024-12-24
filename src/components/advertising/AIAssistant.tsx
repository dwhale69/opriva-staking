import React, { useState } from 'react';
import { MessageSquare, Send, Bot } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your ad assistant. I can help you create engaging ads that resonate with your audience. What type of ad would you like to create today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const suggestions = [
        "Consider highlighting your unique value proposition in the ad description.",
        "Your target audience might respond well to more direct calls-to-action.",
        "Based on your description, I'd recommend a 24-hour campaign for maximum impact.",
        "You could emphasize the benefits more in your messaging.",
      ];
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: suggestions[Math.floor(Math.random() * suggestions.length)]
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="glass-effect rounded-xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="text-[#8396FA]" size={20} />
        <h3 className="text-white font-medium">AI Ad Assistant</h3>
      </div>

      <div className="h-[300px] overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-2 ${
              message.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-[#8396FA] text-white'
                  : 'bg-[#1f2023] text-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div className="bg-[#1f2023] text-gray-200 p-3 rounded-lg">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask for suggestions..."
          className="flex-1 bg-[#1f2023] border border-[#8396FA]/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#8396FA] transition-colors"
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-lg bg-[#8396FA] text-white hover:bg-[#899CFA] transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};