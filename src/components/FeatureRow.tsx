import Link from 'next/link';
import Image from 'next/image';

interface FeatureRowProps {
    title: string;
    description: string;
    imageIcon: string; // Emoji or icon for now
    reversed?: boolean;
    buttonText?: string;
    buttonLink?: string;
    bgColor?: string; // Optional background color for the image container
}

export default function FeatureRow({
    title,
    description,
    imageIcon,
    reversed = false,
    buttonText,
    buttonLink,
    bgColor = 'bg-yellow-100' // Default to a warm yellow like headspace
}: FeatureRowProps) {
    return (
        <section className={`py-12 md:py-24 px-4 md:px-12 max-w-7xl mx-auto`}>
            <div className={`flex flex-col gap-12 items-center ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                {/* Content Side */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                        {description}
                    </p>
                    {buttonText && buttonLink && (
                        <Link
                            href={buttonLink}
                            className="inline-block px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 text-sm uppercase tracking-wide"
                        >
                            {buttonText}
                        </Link>
                    )}
                </div>

                {/* Visual Side */}
                <div className="flex-1 w-full flex justify-center">
                    <div className={`relative w-full max-w-md aspect-square ${bgColor} rounded-full flex items-center justify-center`}>
                        {/* Simple Circle Shape */}
                        <div className="text-[100px] md:text-[150px] animate-bounce" style={{ animationDuration: '4s' }}>
                            {imageIcon}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
