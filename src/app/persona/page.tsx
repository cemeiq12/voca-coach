'use client';

import { useState, useEffect } from 'react';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import ToneVisualizer from '@/components/ToneVisualizer';
import Link from 'next/link';

interface Persona {
    id: string;
    name: string;
    type: 'preset' | 'cloned';
    status: 'ready' | 'training';
}

const PRESETS: Persona[] = [
    { id: 'p1', name: 'Calm Mentor', type: 'preset', status: 'ready' },
    { id: 'p2', name: 'Empathetic Friend', type: 'preset', status: 'ready' },
];

export default function PersonaPage() {
    const [personas, setPersonas] = useState<Persona[]>(PRESETS);
    const [activePersona, setActivePersona] = useState<string>('p1');
    const [isCreating, setIsCreating] = useState(false);

    // Recorder for cloning
    const { startRecording, stopRecording, isRecording, visualizerData, audioBase64 } = useAudioRecorder();
    const [cloningStep, setCloningStep] = useState<'idle' | 'recording' | 'processing' | 'done'>('idle');

    const startCloneProcess = () => {
        setIsCreating(true);
        setCloningStep('idle');
    };

    const handleStartRecord = () => {
        startRecording();
        setCloningStep('recording');
    };

    const handleStopRecord = () => {
        stopRecording();
        setCloningStep('processing');

        // Simulate API "Training" call
        setTimeout(() => {
            const newPersona: Persona = {
                id: `c-${Date.now()}`,
                name: 'My Custom Voice',
                type: 'cloned',
                status: 'ready'
            };
            setPersonas([...personas, newPersona]);
            setActivePersona(newPersona.id);
            setCloningStep('done');
            setIsCreating(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen p-8 max-w-4xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Persona Studio</h1>
                    <p className="text-gray-400">Select or clone a comforting voice for your companion.</p>
                </div>
                <Link href="/" className="btn btn-secondary">Back to Home</Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Available Voices</h2>
                    {personas.map(p => (
                        <div
                            key={p.id}
                            onClick={() => setActivePersona(p.id)}
                            className={`
                            p-4 rounded-xl border cursor-pointer transition-all flex justify-between items-center
                            ${activePersona === p.id
                                    ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(100,255,218,0.2)]'
                                    : 'bg-white/5 border-white/5 hover:bg-white/10'}
                        `}
                        >
                            <div>
                                <div className="font-bold">{p.name}</div>
                                <div className="text-xs text-gray-500 uppercase">{p.type}</div>
                            </div>
                            {activePersona === p.id && <div className="text-primary">● Active</div>}
                        </div>
                    ))}

                    <button
                        onClick={startCloneProcess}
                        disabled={isCreating}
                        className="w-full py-4 rounded-xl border border-dashed border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                        + Clone New User Voice
                    </button>
                </div>

                {/* Cloning / Details Area */}
                <div className="glass-panel p-6 flex flex-col justify-center min-h-[400px]">
                    {!isCreating ? (
                        <div className="text-center opacity-50">
                            <div className="text-6xl mb-4">🎙️</div>
                            <p>Select a voice to preview or create a new one.</p>
                        </div>
                    ) : (
                        <div className="animate-fade-in flex flex-col items-center w-full">
                            <h3 className="text-lg font-bold mb-6">Voice Cloning</h3>

                            {cloningStep === 'idle' && (
                                <div className="text-center">
                                    <p className="mb-6 text-gray-300">Please read the following sentence clearly:</p>
                                    <blockquote className="p-4 bg-white/5 rounded-lg italic mb-8 border-l-2 border-primary">
                                        "I am calm, grounded, and ready to face whatever comes my way with patience."
                                    </blockquote>
                                    <button onClick={handleStartRecord} className="btn btn-primary w-full">Start Recording</button>
                                </div>
                            )}

                            {cloningStep === 'recording' && (
                                <div className="w-full flex flex-col items-center">
                                    <div className="w-full mb-4">
                                        <ToneVisualizer data={visualizerData} />
                                    </div>
                                    <div className="flex items-center gap-2 text-red-400 mb-4 animate-pulse">
                                        ● Recording...
                                    </div>
                                    <button onClick={handleStopRecord} className="btn btn-secondary w-full">Stop & Process</button>
                                </div>
                            )}

                            {cloningStep === 'processing' && (
                                <div className="text-center">
                                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                                    <h4 className="text-xl font-bold mb-2">Fine-tuning Persona...</h4>
                                    <p className="text-sm text-gray-400">Analyzing timbre, pitch, and cadence.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
