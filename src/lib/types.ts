export interface ToneAnalysis {
    arousal: number; // 0-1 (Calm to Excited)
    valence: number; // 0-1 (Negative to Positive)
    dominantEmotion: string;
    volume: number;
    pitch: number;
    suggestions: string[];
}

export interface BiomarkerTrend {
    date: string;
    medianPitch: number;
    pauseDuration: number;
    articulationRate: number;
    riskScore: number; // 0-10
}

export interface JournalEntry {
    id: string;
    timestamp: string;
    content: string;
    distortion?: string;
    socraticPrompt?: string;
    userResponse?: string;
}

export interface Persona {
    id: string;
    name: string;
    description: string;
    voiceId: string; // Refers to a TTS voice
}
