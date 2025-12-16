import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4 px-6 md:px-12 max-w-7xl mx-auto sticky top-0 z-50 bg-[#10B981]/90 backdrop-blur-md border-b border-emerald-600">
            {/* Logo - White for Dark BG */}
            <Link href="/" className="flex items-center gap-3 group">
                <div className="bg-white p-1.5 rounded-full flex items-center justify-center shrink-0">
                    <Image src="/assets/logo-leaf-mic.svg" alt="Leaf Mic Logo" width={24} height={24} className="h-6 w-6" />
                </div>
                <span className="text-white text-xl font-bold tracking-tight group-hover:opacity-90 transition-opacity leading-none pt-0.5">Voca-Coach</span>
            </Link>

            {/* Center Links (Desktop) - White text */}
            <div className="hidden md:flex gap-8 text-sm font-semibold text-emerald-50">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>

                {/* Module Links */}
                <Link href="/de-escalation" className="hover:text-white transition-colors">De-escalation</Link>
                <Link href="/biomarkers" className="hover:text-white transition-colors">Biomarkers</Link>
                <Link href="/journal" className="hover:text-white transition-colors">Journal</Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <Link href="/dashboard" className="text-sm font-bold text-white hover:text-emerald-100 transition-colors hidden sm:block">
                    Login
                </Link>
                <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-white text-primary text-sm font-bold hover:bg-emerald-50 shadow-lg transition-all hover:-translate-y-0.5">
                    Get Started
                </Link>
            </div>
        </nav>
    );
}
