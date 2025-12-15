import { useState, useRef, useCallback, useEffect } from 'react';

interface AudioRecorderState {
    isRecording: boolean;
    audioBlob: Blob | null;
    audioUrl: string | null;
    audioBase64: string | null;
    duration: number;
}

export function useAudioRecorder() {
    const [state, setState] = useState<AudioRecorderState>({
        isRecording: false,
        audioBlob: null,
        audioUrl: null,
        audioBase64: null,
        duration: 0,
    });

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Analyser for visualization
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const [visualizerData, setVisualizerData] = useState<Uint8Array>(new Uint8Array(0));

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Setup Visualizer
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            analyser.fftSize = 256;

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            sourceRef.current = source;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateVisualizer = () => {
                if (!analyser) return;
                analyser.getByteFrequencyData(dataArray);
                setVisualizerData(new Uint8Array(dataArray));
                requestAnimationFrame(updateVisualizer);
            };
            updateVisualizer();

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);

                // Convert to Base64
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    // Remove data url prefix (e.g., "data:audio/webm;base64,")
                    const base64Audio = base64String.split(',')[1];

                    setState(prev => ({
                        ...prev,
                        audioBlob: blob,
                        audioUrl: url,
                        audioBase64: base64Audio,
                        isRecording: false,
                    }));
                };

                // Cleanup stream
                stream.getTracks().forEach(track => track.stop());
                if (audioContext.state !== 'closed') audioContext.close();
            };

            mediaRecorder.start();

            setState(prev => ({
                ...prev,
                isRecording: true,
                audioBlob: null,
                audioUrl: null,
                audioBase64: null,
                duration: 0
            }));

            // Timer
            const startTime = Date.now();
            timerRef.current = setInterval(() => {
                setState(prev => ({ ...prev, duration: (Date.now() - startTime) / 1000 }));
            }, 100);

        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            if (timerRef.current) clearInterval(timerRef.current);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    return {
        ...state,
        startRecording,
        stopRecording,
        visualizerData
    };
}
