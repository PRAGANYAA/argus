import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const mockAnswers = {
  "How do I apply for parole for my family member?": "To apply for parole, a formal application must be submitted to the prison superintendent stating valid grounds. Our 'Legal Documents' section provides the required application templates.",
  "What are the visiting hours and rules for the prison?": "Standard visiting hours are Tuesday to Sunday, 9:00 AM to 4:00 PM. Visitors must be on the approved list and bring a valid government ID.",
  "Can I send money or items to my incarcerated family member?": "Yes, you can deposit money into the inmate's prison commissary account via money order or approved online payment portals.",
  "How can I check the status of an ongoing appeal?": "You can check the status of an ongoing appeal through the eCourts portal using your CNR number, or consult with your designated lawyer.",
  "What is the procedure for bail application?": "A bail application must be filed by a legal representative in the court where the trial is pending. Access the 'Connect with Lawyers' tab for immediate assistance."
};

const presetQuestions = Object.keys(mockAnswers);

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I am your Legal Assistant Bot. I can answer doubts related to prison rules, legal procedures, and inmate rights." }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');

    setTimeout(() => {
      const response = mockAnswers[text] || "I'm sorry, I don't have a specific answer for that. Please consult the 'Know Your Rights' page or connect with a lawyer for detailed advice.";
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
    }, 600);
  };

  return (
    <div className="floating-chatbot">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span className="font-semibold flex items-center gap-xs"><Bot size={18} /> Legal Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble flex gap-xs ${msg.sender}`}>
                <div style={{ marginTop: '2px', flexShrink: 0 }}>
                  {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div style={{ lineHeight: '1.4' }}>{msg.text}</div>
              </div>
            ))}
            {/* Quick Actions if only one message */}
            {messages.length === 1 && (
              <div className="flex flex-col gap-xs mt-sm">
                <span className="text-xs text-muted font-semibold mb-xs">Common Questions:</span>
                {presetQuestions.map((q, idx) => (
                  <button 
                    key={idx} 
                    className="btn btn-outline text-xs" 
                    style={{ textAlign: 'left', padding: '6px 10px', display: 'block', whiteSpace: 'normal' }}
                    onClick={() => handleSend(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="chatbot-input">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type your question..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
              style={{ padding: '8px 12px' }}
            />
            <button className="btn btn-primary" onClick={() => handleSend(input)} style={{ padding: '8px 12px' }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
};

export default FloatingChatbot;
