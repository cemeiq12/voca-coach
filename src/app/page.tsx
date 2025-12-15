import Link from 'next/link';
import { Instrument_Serif } from 'next/font/google';

const serif = Instrument_Serif({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#2d3748] relative overflow-x-hidden selection:bg-[#0d9488] selection:text-white">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#d1fae5] rounded-full blur-[100px] opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#fef08a] rounded-full blur-[100px] opacity-40 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Navigation / Header */}
        <header className="flex justify-between items-center mb-20 animate-fade-in">
          <div className="text-xl font-bold tracking-tight text-[#0d9488]">Voca-Coach</div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/de-escalation" className="hover:text-[#0d9488] transition-colors">De-escalation</Link>
            <Link href="/biomarkers" className="hover:text-[#0d9488] transition-colors">Biomarkers</Link>
            <Link href="/journal" className="hover:text-[#0d9488] transition-colors">Journal</Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center text-center mb-24 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#0d9488]/20 shadow-sm text-sm font-medium text-[#0f766e]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            AI-Powered Emotional Support
          </div>

          <h1 className={`${serif.className} text-7xl md:text-8xl mb-8 text-[#1a202c] leading-[0.9] tracking-tight`}>
            Find calm <br />
            <span className="text-[#0d9488] italic">in the chaos.</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-2xl leading-relaxed font-light">
            Your personal voice companion for emotional regulation, stress management, and clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/de-escalation" className="btn btn-primary px-10 py-5 text-lg shadow-xl shadow-teal-700/20 hover:shadow-teal-700/30">
              Start Session
            </Link>
            <Link href="/journal" className="btn btn-secondary px-10 py-5 text-lg">
              Daily Check-in
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in pb-12" style={{ animationDelay: '0.2s' }}>
          {/* Card 1 */}
          <Link href="/biomarkers" className="group p-8 rounded-[2rem] bg-white border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-64 justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-4 relative z-10">
              📊
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Biomarkers</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Track vocal patterns to predict stress before it happens.</p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/persona" className="group p-8 rounded-[2rem] bg-white border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-64 justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl mb-4 relative z-10">
              🎙️
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Persona Studio</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Customize your companion's voice for maximum comfort.</p>
            </div>
          </Link>

          {/* Card 3 */}
          <div className="p-8 rounded-[2rem] bg-[#0f766e] text-white shadow-lg shadow-teal-900/20 flex flex-col h-64 justify-between relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="text-3xl mb-4">✨</div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Gemini Core</h3>
              <p className="text-teal-100 text-sm leading-relaxed">Powered by Google's most advanced affective computing models.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
