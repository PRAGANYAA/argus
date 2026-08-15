import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const familyAnswers = {
  "How do I apply for parole for my family member?": "To apply for parole, submit a written application to the Superintendent of the concerned jail along with supporting documents such as identity proof, address proof, and reason for parole. The application is then reviewed by the District Magistrate and relevant authorities under the State Parole Rules.",
  "What are the visiting hours and rules for the prison?": "Visiting hours are typically on weekdays between 10:00 AM – 12:00 PM and 2:00 PM – 4:00 PM. Visitors must carry a valid government-issued ID. Only approved family members are permitted. Contact the specific prison's administration office to confirm their schedule.",
  "Can I send money or items to my incarcerated family member?": "Yes. Money can be deposited through the prison's official account or cashier window. Allowed items vary by facility — generally basic clothing, hygiene products, and approved food items are permitted. Prohibited items include electronics, sharp objects, and narcotics.",
  "How can I check the status of an ongoing appeal?": "You can check appeal status through the respective High Court's case status portal, or by contacting the court's registry. A lawyer or legal aid counsel can also access case details on your behalf through the eCourts system at ecourts.gov.in.",
  "What is the procedure for bail application?": "A bail application is filed in the Magistrate's Court (for bailable offences) or Sessions/High Court (for non-bailable offences). Your lawyer submits the application with supporting documents. The court then hears arguments from both sides and decides. Legal aid is available free of cost from DLSA if you cannot afford a lawyer."
};

const jailerAnswers = {
  "How is inmate behavior credit computed?": "Behavior credits are computed based on daily conduct reports submitted by block wardens. Points are awarded for discipline, participation in rehabilitation programs, work in prison workshops, and zero incidents. Credits can reduce sentence duration as per the state's Remission Rules.",
  "What are the rules for visitation schedules?": "Visitation schedules are managed by the Prison Superintendent. Approved visitors are registered in the system. Standard slots are provided on designated days. High-security inmates may have restricted or supervised visitation only. Schedules must be logged and submitted to the regional authority monthly.",
  "How do I report incident details to the government?": "Incidents must be recorded in the Prison Incident Register within 24 hours. A formal report is submitted to the Inspector General of Prisons and the District Magistrate. Critical incidents (violence, escape attempts, deaths) require immediate escalation to the Home Department.",
  "Where do I log new rehabilitation program assignments?": "New rehabilitation assignments are logged in the Inmate Rehabilitation Module under the ARGUS Jailer Dashboard. Each inmate's participation is tracked against their profile. Completed programs are certified and submitted to the review board during parole hearings.",
  "How do I process release approvals?": "Release approvals are initiated from the Jailer Approvals section. Verify the inmate's sentence completion, behavior record, and court order. Submit the release form to the Superintendent for countersignature, then forward to the District Court and Home Department for final clearance."
};

const FloatingChatbot = () => {
  const location = useLocation();
  const isJailer = location.pathname.startsWith('/jailer');
  const presetQuestions = Object.keys(isJailer ? jailerAnswers : familyAnswers);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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

  const handleSend = (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInput('');

    const answers = isJailer ? jailerAnswers : familyAnswers;
    const reply = answers[text] || "I'm sorry, I can only answer the preset questions listed above. Please select one of the available options or contact the prison administration directly for further assistance.";

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 400);
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
