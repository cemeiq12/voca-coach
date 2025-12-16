'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    distortion?: string;
}

export default function JournalPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello. I'm here to listen. What's on your mind today?" }
    ]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch('/api/journal-insight', {
                method: 'POST',
                body: JSON.stringify({ message: userMsg, context: messages.slice(-3) }), // Send limited context
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.socraticPrompt,
                distortion: data.distortion
            }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble thinking right now. Could you say that again?" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col p-6 max-w-3xl mx-auto">
            <header className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">Socratic Journal</h1>
                <Link href="/" className="text-sm opacity-50 hover:opacity-100">Exit</Link>
            </header>

            <div className="flex-1 overflow-y-auto mb-6 space-y-6 pr-2" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                        {m.distortion && (
                            <span className="text-xs text-secondary mb-1 uppercase tracking-wider font-bold animate-fade-in">
                                DETECTED: {m.distortion}
                            </span>
                        )}
                        <div
                            className={`
                        max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                        ${m.role === 'user'
                                    ? 'bg-[#15803d] text-white rounded-tr-none'
                                    : 'bg-white border border-green-100 text-green-900 rounded-tl-none'}
                    `}
                        >
                            {m.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none flex gap-2 border border-green-100">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your thoughts..."
                    className="w-full bg-white border border-green-200 rounded-full py-4 px-6 focus:outline-none focus:border-[#15803d] transition-colors text-[#064e3b] placeholder-green-700/40 shadow-sm"
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={!input || loading}
                    className="absolute right-2 top-2 bottom-2 aspect-square rounded-full bg-[#15803d] text-white flex items-center justify-center disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 shadow-md"
                >
                    →
                </button>
            </form>
        </div>
    );
}
