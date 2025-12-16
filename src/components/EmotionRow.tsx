
interface EmotionRowProps {
    emoji: string;
    label: string;
    minutes: number;
    percentage: number;
    color: string;
}

export default function EmotionRow({ emoji, label, minutes, percentage, color }: EmotionRowProps) {
    return (
        <div className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-50 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
                {emoji}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900 text-sm">{label}</span>
                    <div className="flex gap-2 text-xs">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500">{minutes} minutes</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500">{percentage}%</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full"
                        style={{ width: `${percentage}%`, backgroundColor: color }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
