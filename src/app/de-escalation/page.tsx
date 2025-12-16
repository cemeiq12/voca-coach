'use client';

import { useState, useEffect, useRef } from 'react';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import ToneVisualizer from '@/components/ToneVisualizer';
import { getModel } from '@/lib/vertex'; // Client-side safe? No, server action needed usually.
// Actually, using API Key on client is risky but for prototype/Google AI SDK it's often done. 
// Ideally we move AI calls to a Server Action.

export default function DeEscalationPage() {
    const { startRecording, stopRecording, isRecording, visualizerData, audioBase64 } = useAudioRecorder();
    const [arousalLevel, setArousalLevel] = useState(0);
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Simple client-side arousal detection (Volume based)
    useEffect(() => {
        if (!visualizerData.length) return;

        // Calculate RMS (volume)
        let sum = 0;
        for (let i = 0; i < visualizerData.length; i++) {
            sum += visualizerData[i] * visualizerData[i];
        }
        const rms = Math.sqrt(sum / visualizerData.length);
        const normalizedVolume = Math.min(rms / 128, 1);

        setArousalLevel(prev => (prev * 0.8) + (normalizedVolume * 0.2)); // Smooth it
    }, [visualizerData]);

    // Handle high arousal trigger (Simulated intervention)
    useEffect(() => {
        if (arousalLevel > 0.8 && !isProcessing && isRecording) {
            // Threshold Triggered
            console.log('High arousal detected!');
            // In a real app, this might trigger an interruption.
        }
    }, [arousalLevel, isProcessing, isRecording]);

    const handleAnalyze = async () => {
        if (!audioBase64) return;
        setIsProcessing(true);

        try {
            // Call API Route (we'll implement this next)
            const response = await fetch('/api/analyze-tone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ audio: audioBase64 })
            });
            const data = await response.json();
            setAiResponse(data.text);

            // Simple TTS
            if (data.text) {
                const ut = new SpeechSynthesisUtterance(data.text);
                ut.rate = 0.8; // Slow down
                ut.pitch = 0.9; // Lower pitch
                window.speechSynthesis.speak(ut);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen p-8 flex flex-col items-center gap-8">
            <header className="w-full max-w-2xl text-center">
                <h1 className="text-3xl font-bold mb-2">Dynamic Tone De-escalation</h1>
                <p className="text-gray-400">Speak freely. If tension rises, I'll help you slow down.</p>
            </header>

            <div className="w-full max-w-2xl">
                <ToneVisualizer data={visualizerData} />

                {/* Arousal Meter */}
                <div className="mt-4 flex items-center gap-4">
                    <span className="text-xs font-mono text-gray-400">AROUSAL LEVEL</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full transition-all duration-200"
                            style={{
                                width: `${arousalLevel * 100}%`,
                                backgroundColor: arousalLevel > 0.6 ? '#ff5555' : '#22c55e'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                {!isRecording ? (
                    <button onClick={startRecording} className="btn btn-primary w-32">
                        Start
                    </button>
                ) : (
                    <button onClick={stopRecording} className="btn btn-primary bg-red-500 hover:bg-red-600 w-32 text-white">
                        Stop
                    </button>
                )}

                {audioBase64 && !isRecording && (
                    <button onClick={handleAnalyze} disabled={isProcessing} className="btn btn-secondary">
                        {isProcessing ? 'Analyzing...' : 'Analyze Session'}
                    </button>
                )}
            </div>

            {aiResponse && (
                <div className="max-w-2xl w-full glass-panel p-6 animate-fade-in mt-4">
                    <h3 className="text-primary text-sm font-bold mb-2 uppercase tracking-wider">AI Intervention</h3>
                    <p className="text-lg italic leading-relaxed">"{aiResponse}"</p>
                </div>
            )}
        </div>
    );
}
