import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const familyAnswers = {
  "How do I apply for parole for my family member?": "",
  "What are the visiting hours and rules for the prison?": "",
  "Can I send money or items to my incarcerated family member?": "",
  "How can I check the status of an ongoing appeal?": "",
  "What is the procedure for bail application?": ""
};

const jailerAnswers = {
  "How is inmate behavior credit computed?": "",
  "What are the rules for visitation schedules?": "",
  "How do I report incident details to the government?": "",
  "Where do I log new rehabilitation program assignments?": "",
  "How do I process release approvals?": ""
};

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const FloatingChatbot = () => {
  const location = useLocation();
  const isJailer = location.pathname.startsWith('/jailer');
  const presetQuestions = Object.keys(isJailer ? jailerAnswers : familyAnswers);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Set initial greeting dynamically
  useEffect(() => {
    setMessages([
      { 
        sender: 'bot', 
        text: isJailer 
          ? "Hello Warden! I am your Prison Operations Assistant Bot. I can answer questions about prisoner cell allocations, behavior credits, visitation schedules, and government sync procedures."
          : "Hello! I am your Legal Assistant Bot. I can answer doubts related to prison rules, legal procedures, and inmate rights." 
      }
    ]);
  }, [isJailer]);

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;
    
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');
    setIsLoading(true);

    const systemContext = isJailer
      ? "You are a Prison Operations Assistant for ARGUS, an Indian judicial management system. You help wardens and jail officials with questions about inmate management, behavior credits, visitation schedules, government compliance, release approvals, and prison operations. Answer concisely and professionally."
      : "You are a Legal Assistant for ARGUS, an Indian judicial management platform for families of undertrial prisoners. You help families understand Indian prison rules, bail procedures, parole, legal aid, inmate rights under CrPC and IPC, and how to connect with lawyers. Answer clearly and compassionately.";

    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemContext}\n\nUser question: ${text}` }] }
          ],
          generationConfig: { temperature: 0.7 }
        })
      });

      const data = await response.json();
      console.log('[Gemini API Response]', JSON.stringify(data, null, 2));

      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      } else {
        // Surface the actual API error message so we know what's wrong
        const errMsg = data?.error?.message || JSON.stringify(data);
        setMessages(prev => [...prev, { sender: 'bot', text: `API Error: ${errMsg}` }]);
      }
    } catch (err) {
      console.error('[Gemini Fetch Error]', err);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `Network error: ${err.message}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="floating-chatbot">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span className="font-semibold flex items-center gap-xs"><Bot size={18} /> {isJailer ? "Warden Assistant" : "Legal Assistant"}</span>
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
            {isLoading && (
              <div className="chat-bubble flex gap-xs bot">
                <div style={{ marginTop: '2px', flexShrink: 0 }}><Bot size={16} /></div>
                <div style={{ lineHeight: '1.4', opacity: 0.7 }}>Thinking…</div>
              </div>
            )}
            {/* Quick Actions if only initial greeting exists */}
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
              disabled={isLoading}
            />
            <button className="btn btn-primary" onClick={() => handleSend(input)} style={{ padding: '8px 12px' }} disabled={isLoading}>
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
