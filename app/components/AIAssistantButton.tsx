'use client';

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types/types';
import { aiSuggestions } from '../data/mockData';
import Icon from './ui/Icon';

const mockResponses: Record<string, string> = {
    'What documents are pending?': 'You have 2 documents pending: Caste Certificate and Transfer Certificate. The Transfer Certificate was rejected — please re-upload with the correct format.',
    'How to get domicile certificate?': 'Visit your local Tehsildar office with proof of residence (ration card, light bill). Processing takes 7-15 days. Fee: ₹50.',
    'When is the fee deadline?': 'The fee payment deadline is Feb 20, 2026. Make sure your documents are verified first.',
    'How to access Google Classroom?': 'Google Classroom access will be available once you reach the LMS stage. Complete Documents → Fees stages first.',
    'What is my current stage?': 'You are currently in the Documents stage. 6 out of 9 documents have been verified.',
};

export default function AIAssistantButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: 'Hi! I\'m your onboarding assistant. How can I help you today?',
            timestamp: new Date().toISOString(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: content.trim(),
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate API delay
        await new Promise((r) => setTimeout(r, 1200));

        const response = mockResponses[content.trim()] || 'I\'m not sure about that. Please check with the admin office or try rephrasing your question.';
        const assistantMsg: ChatMessage = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: response,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl z-50 cursor-pointer"
                style={{ backgroundColor: 'var(--color-accent)' }}
                aria-label="AI Assistant"
            >
                {isOpen ? <Icon name="close" size={28} color="white" /> : <Icon name="robot" size={28} color="white" />}
            </button>

            {/* Chat Panel */}
            <div
                className="fixed bottom-28 right-8 z-50 rounded-lg shadow-2xl border-2 flex flex-col overflow-hidden transition-all duration-300"
                style={{
                    width: '380px',
                    height: isOpen ? '520px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    backgroundColor: 'var(--color-primary)',
                    borderColor: isOpen ? 'var(--color-dark)' : 'transparent',
                    pointerEvents: isOpen ? 'auto' : 'none',
                }}
            >
                {/* Header */}
                <div
                    className="px-5 py-4 flex items-center gap-3 border-b-2 flex-shrink-0"
                    style={{
                        backgroundColor: 'var(--color-dark)',
                        borderColor: 'var(--color-dark)',
                    }}
                >
                    <Icon name="robot" size={22} color="white" />
                    <div>
                        <h3 className="text-sm font-bold text-white">Onboarding Assistant</h3>
                        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            Ask me anything about your onboarding
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className="max-w-[80%] px-4 py-2.5 rounded-lg text-sm"
                                style={{
                                    backgroundColor: msg.role === 'user' ? 'var(--color-accent)' : 'var(--color-secondary)',
                                    color: msg.role === 'user' ? 'white' : 'var(--color-dark)',
                                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
                                    borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '12px',
                                }}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div
                                className="px-4 py-2.5 rounded-lg text-sm flex items-center gap-1"
                                style={{ backgroundColor: 'var(--color-secondary)' }}
                            >
                                <span className="inline-block w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--status-locked)', animationDelay: '0ms' }} />
                                <span className="inline-block w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--status-locked)', animationDelay: '150ms' }} />
                                <span className="inline-block w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--status-locked)', animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Suggestion Chips */}
                {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-2">
                        {aiSuggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => sendMessage(suggestion)}
                                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer"
                                style={{
                                    backgroundColor: 'var(--color-secondary)',
                                    border: '1.5px solid var(--color-accent)',
                                    color: 'var(--color-accent)',
                                }}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div
                    className="px-4 py-3 border-t-2 flex items-center gap-2 flex-shrink-0"
                    style={{ borderColor: 'var(--color-dark)' }}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage(input);
                            }
                        }}
                        placeholder="Ask a question..."
                        className="flex-1 px-3 py-2 rounded-md text-sm outline-none"
                        style={{
                            backgroundColor: 'var(--color-secondary)',
                            border: '1.5px solid var(--color-dark)',
                            color: 'var(--color-dark)',
                        }}
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isTyping}
                        className="w-9 h-9 rounded-md flex items-center justify-center text-white font-bold transition-all duration-200 cursor-pointer flex-shrink-0"
                        style={{
                            backgroundColor: input.trim() ? 'var(--color-accent)' : 'var(--status-locked)',
                            border: '1.5px solid var(--color-dark)',
                        }}
                    >
                        ↑
                    </button>
                </div>
            </div>
        </>
    );
}
