'use client';

interface TrendChartProps {
    data: number[];
    labels: string[];
    color: string;
    label: string;
}

export default function TrendChart({ data, labels, color, label }: TrendChartProps) {
    const max = Math.max(...data) * 1.2;
    const min = Math.min(...data) * 0.8;
    const range = max - min;

    const width = 100; // percent
    const height = 100; // viewBox units

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 300; // 300 width viewBox
        const y = 100 - ((val - min) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="glass-panel p-4 flex flex-col gap-2">
            <h3 className="text-xs uppercase tracking-wider font-bold opacity-70" style={{ color }}>{label}</h3>
            <div className="relative h-24 w-full">
                <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                    {/* Path */}
                    <polyline
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                        points={points}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-lg"
                    />

                    {/* Dots */}
                    {data.map((val, i) => {
                        const x = (i / (data.length - 1)) * 300;
                        const y = 100 - ((val - min) / range) * 100;
                        return (
                            <circle key={i} cx={x} cy={y} r="4" fill="#0a0e17" stroke={color} strokeWidth="2" />
                        );
                    })}
                </svg>
            </div>
            <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">{labels[0]}</span>
                <span className="text-xs text-gray-500">{labels[labels.length - 1]}</span>
            </div>
        </div>
    );
}
