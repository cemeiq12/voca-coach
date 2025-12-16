
interface StatCardProps {
    percentage: number;
    label: string;
    subtext: string;
    color?: string; // Hex color for the ring
}

export default function StatCard({ percentage, label, subtext, color = '#15803d' }: StatCardProps) {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-white rounded-3xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
                {/* Background Ring */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    {/* Progress Ring */}
                    <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke={color}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>
                <span className="absolute text-xl font-bold text-gray-900">{percentage}%</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
                {/* Icon Placeholder */}
                <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: color }}></div>
                <h4 className="font-bold text-gray-900">{label}</h4>
            </div>

            <p className="text-xs text-gray-400 leading-tight px-2">
                {subtext}
            </p>
        </div>
    );
}
