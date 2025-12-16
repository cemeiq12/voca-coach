'use client';

import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';
import EmotionRow from '@/components/EmotionRow';
import ToneVisualizer from '@/components/ToneVisualizer'; // Reusing our green visualizer
import { useState } from 'react';

export default function DashboardPage() {
    const [isRecording, setIsRecording] = useState(false);

    return (
        <div className="flex bg-[#f0fdf4] min-h-screen font-sans text-foreground">
            {/* Sidebar - fixed width */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-start mb-10">
                    <div>
                        <div className="flex gap-2 mb-2">
                            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">ADHD</span>
                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Anxiety</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-1">Mia's 10am session</h1>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-white transition-colors bg-white">view all</button>
                        <button className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all">Start session</button>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-12 gap-8">

                    {/* Left Column (Stats & Emotions) - Spans 8 cols */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">

                        {/* Points of Improvement */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Points of Improvement</h2>
                            <p className="text-gray-400 text-sm mb-6">here are things we recommend you to improve on based on your previous conversation.</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <StatCard
                                    percentage={62}
                                    label="Language"
                                    subtext="based on how understandable your conversations were."
                                    color="#8b5cf6" // Keep specific colors for metrics or move to green? Let's use image colors but tweaked
                                />
                                <StatCard
                                    percentage={81}
                                    label="Empathy"
                                    subtext="based on how engaged you were with your client"
                                    color="#f472b6"
                                />
                                <StatCard
                                    percentage={80}
                                    label="Sensitivity"
                                    subtext="based on how culturally sensitive you were."
                                    color="#22d3ee"
                                />
                            </div>
                        </section>

                        {/* Emotions Scale */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Emotions scale</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <EmotionRow emoji="😃" label="Happy" minutes={8} percentage={78} color="#8b5cf6" />
                                <EmotionRow emoji="😃" label="Happy" minutes={8} percentage={78} color="#f472b6" />
                                <EmotionRow emoji="😃" label="Happy" minutes={8} percentage={78} color="#8b5cf6" />
                                <EmotionRow emoji="😃" label="Happy" minutes={8} percentage={78} color="#22d3ee" />
                            </div>
                        </section>

                        {/* Live Session Control (From 3rd image) */}
                        <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                            {/* Gradient Overlay for Green Theme */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            <div className="flex justify-between items-center mb-6 relative z-10">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Record a Live Session</h3>
                                    <p className="text-gray-400 text-sm">Press <span className="bg-purple-100 text-purple-600 px-1 rounded font-bold">Record</span> to start a live session.</p>
                                </div>
                            </div>

                            {/* Visualizer Block */}
                            <div className="bg-gray-50 rounded-2xl p-8 mb-6 flex flex-col items-center justify-center relative">
                                {/* Fake Waveform */}
                                <div className="flex gap-1 items-center h-16 mb-4">
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="w-1.5 bg-secondary rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                                    ))}
                                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mx-4 cursor-pointer hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                                    </div>
                                    {[...Array(20)].map((_, i) => (
                                        <div key={i} className="w-1.5 bg-purple-300 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                                    ))}
                                </div>
                                <div className="flex gap-4 text-xs font-bold text-gray-400">
                                    <span className="bg-white px-2 py-1 rounded shadow-sm">40 words</span>
                                    <span className="bg-white px-2 py-1 rounded shadow-sm">2:41 min</span>
                                </div>
                            </div>

                            {/* Transcript */}
                            <div className="bg-white border boundary-gray-100 rounded-2xl p-6 relative z-10">
                                <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">live transcript</span>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    Dealing with ADHD can be a <span className="bg-purple-100 px-1 rounded font-bold text-gray-900">rollercoaster</span> of emotions. There are days when it's frustrating—I get scattered thoughts and feel overwhelmed.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Column (Profile & Sidebar Stats) */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

                        {/* Profile Card */}
                        <div className="bg-white rounded-[2.5rem] p-8 text-center border border-gray-100 shadow-sm">
                            <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 overflow-hidden relative">
                                {/* Placeholder Avatar */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-pink-200"></div>
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" alt="Mia" className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mia Brown</h2>

                            <div className="flex items-start gap-4 text-left mb-4">
                                <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">communication style</p>
                                    <p className="font-bold text-gray-900">Initiator</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 text-left mb-6">
                                <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">learning style</p>
                                    <p className="font-bold text-gray-900">Collaborative Learner</p>
                                </div>
                            </div>

                            <div className="text-left">
                                <p className="font-bold text-gray-900 mb-2">Interests</p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg text-xs font-bold">reading</span>
                                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg text-xs font-bold">coding</span>
                                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-lg text-xs font-bold">baking</span>
                                </div>
                            </div>
                        </div>

                        {/* Live Statistics */}
                        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Live Statistics</h3>

                            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 mb-4 shadow-sm">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-xl">😤</div>
                                <div>
                                    <p className="text-xs text-gray-400">Patient Mood</p>
                                    <p className="font-bold text-gray-900">Frustrated</p>
                                </div>
                            </div>

                            <h4 className="font-bold text-gray-900 mt-6 mb-4">Your Stats</h4>
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-purple-100 p-1 rounded text-purple-600"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></span>
                                    <span className="text-xs text-gray-500 font-medium">speaking time</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-400 w-3/4 rounded-full"></div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-purple-100 p-1 rounded text-purple-600"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20m10-10H2"></path></svg></span>
                                    <span className="text-xs text-gray-500 font-medium">your engagement</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-11/12 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm relative">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-purple-100 p-1.5 rounded-lg text-purple-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                                </span>
                                <h3 className="font-bold text-gray-900">Recommendations</h3>
                            </div>

                            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 mb-2">
                                <span className="bg-purple-200 text-purple-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mb-2 inline-block">overtime</span>
                                <p className="text-xs font-bold text-gray-900 leading-snug">You have been talking for the past 2 minutes. Allow the patient to talk</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
