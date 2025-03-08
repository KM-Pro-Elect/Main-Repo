import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HeroSection from './HeroSection';
import ChatMessage, { Message } from './ChatMessage';
import ChatInput from './ChatInput';
import PolicyChip from './PolicyChip';
import { useToast } from "@/components/ui/use-toast";

const GuestHome = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: "Hello! I'm Poli. How can I help you today? You can ask me about attendance, dress code, grading, extracurricular activities, or any other school policies.",
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const suggestedQuestions = [
    "What's the attendance policy?",
    "How does the grading system work?",
    "What's the dress code?",
    "How do I report bullying?",
    "When are the parent-teacher conferences?",
    "What's the homework policy?",
  ];

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response with a delay
    setTimeout(() => {
      let responseContent = '';

      // Simple keyword-based responses
      const lowerContent = content.toLowerCase();
      
      if (lowerContent.includes('attendance')) {
        responseContent = "Our attendance policy requires students to maintain at least 90% attendance. If a student is absent, parents must notify the school by 9 AM. After three unexcused absences, parents will be contacted for a meeting with the administration.";
      } else if (lowerContent.includes('dress code')) {
        responseContent = "Our dress code requires students to wear the school uniform Monday through Thursday. Friday is casual day, but inappropriate clothing such as clothing with offensive slogans, revealing attire, or torn items are not permitted. For more details, please refer to the student handbook.";
      } else if (lowerContent.includes('grading')) {
        responseContent = "Our grading system uses the following scale: A (90-100%), B (80-89%), C (70-79%), D (60-69%), and F (below 60%). Assessments include exams (40%), quizzes (20%), homework (20%), and class participation (20%).";
      } else if (lowerContent.includes('bullying')) {
        responseContent = "Bullying is taken very seriously at our school. Students experiencing or witnessing bullying should report it immediately to a teacher, counselor, or administrator. All reports are kept confidential and investigated promptly.";
      } else if (lowerContent.includes('parent-teacher') || lowerContent.includes('conference')) {
        responseContent = "Parent-teacher conferences are scheduled twice a year, in October and March. Additional meetings can be arranged by contacting the teacher directly via email or through the school administration.";
      } else if (lowerContent.includes('homework')) {
        responseContent = "Our homework policy states that students should expect to spend approximately 10 minutes per grade level on homework each night (e.g., 6th grade = 60 minutes). Late assignments will be accepted with a 10% deduction per day, up to 5 days.";
      } else {
        responseContent = "I don't have specific information about that in my knowledge base. Please contact the school administration office at admin@school.edu or check the student handbook for more detailed information on this topic.";
      }

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePolicyChipClick = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 flex flex-col items-center pb-16">
        <HeroSection />
        
        <div className="w-full max-w-4xl px-4 mx-auto">
          <div className="flex flex-wrap gap-2 justify-center mb-8 animate-fade-in">
            {suggestedQuestions.map((question) => (
              <PolicyChip 
                key={question} 
                text={question} 
                onClick={handlePolicyChipClick}
              />
            ))}
          </div>

          <div className="glass-panel rounded-2xl shadow-lg border border-border/50 overflow-hidden">
            <div 
              ref={chatContainerRef}
              className="chat-container h-[500px] p-6 overflow-y-auto"
            >
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-center my-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              )}
            </div>
            
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuestHome;
