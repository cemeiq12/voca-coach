'use client';

import { useState, useEffect } from 'react';
import TrendChart from '@/components/TrendChart';
import { MOCK_BIOMARKERS } from '@/lib/mockData';
import Link from 'next/link';

export default function BiomarkerDashboard() {
    const [insight, setInsight] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const dates = MOCK_BIOMARKERS.map(d => new Date(d.date).toLocaleDateString(undefined, { weekday: 'short' }));
    const pitches = MOCK_BIOMARKERS.map(d => d.medianPitch);
    const pauses = MOCK_BIOMARKERS.map(d => d.pauseDuration);
    const rates = MOCK_BIOMARKERS.map(d => d.articulationRate);

    useEffect(() => {
        // Auto-fetch insight on load
        async function fetchInsight() {
            setLoading(true);
            try {
                const res = await fetch('/api/analyze-trends', {
                    method: 'POST',
                    body: JSON.stringify({ history: MOCK_BIOMARKERS }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();
                setInsight(data.analysis);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchInsight();
    }, []);

    return (
        <div className="min-h-screen p-8 max-w-5xl mx-auto">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Biomarker Trends</h1>
                    <p className="text-gray-400">Monitoring longitudinal acoustic features for health insights.</p>
                </div>
                <Link href="/" className="btn btn-secondary">Back to Home</Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <TrendChart
                    data={pitches}
                    labels={dates}
                    color="#64ffda"
                    label="Median Pitch (Hz)"
                />
                <TrendChart
                    data={pauses}
                    labels={dates}
                    color="#bd93f9"
                    label="Pause Duration (s)"
                />
                <TrendChart
                    data={rates}
                    labels={dates}
                    color="#ff79c6"
                    label="Articulation Rate (syl/s)"
                />
            </div>

            <div className="glass-panel p-8 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-2xl">✨</span> Gemini Clinical Insight
                </h2>

                {loading ? (
                    <div className="flex items-center gap-3 text-gray-400">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        Generating risk assessment...
                    </div>
                ) : (
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg leading-relaxed whitespace-pre-line">{insight || "Unable to generate insight."}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
