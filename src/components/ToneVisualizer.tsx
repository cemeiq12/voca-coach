'use client';

import { useEffect, useRef } from 'react';

interface ToneVisualizerProps {
    data: Uint8Array;
}

export default function ToneVisualizer({ data }: ToneVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const barWidth = (width / data.length) * 2.5;
        let x = 0;

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Draw Bars
        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#bd93f9');
        gradient.addColorStop(1, '#64ffda');

        ctx.fillStyle = gradient;

        for (let i = 0; i < data.length; i++) {
            const value = data[i];
            const barHeight = (value / 255) * height;

            ctx.fillRect(x, height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }

    }, [data]);

    return (
        <div className="glass-panel p-4 flex flex-col items-center justify-center w-full h-48 relative overflow-hidden">
            <canvas
                ref={canvasRef}
                width={600}
                height={150}
                className="w-full h-full"
            />
            <div className="absolute top-2 left-4 text-xs font-mono text-gray-400">ACOUSTIC SENSOR</div>
        </div>
    );
}
