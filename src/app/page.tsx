import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen font-sans bg-surface-alt">

      {/* A. Dark Hero Section (TalkHelp Style) */}
      <div className="relative bg-gradient-to-r from-emerald-900 to-emerald-600 min-h-[90vh] flex flex-col">
        <Navbar />

        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-400 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center place-items-center relative z-10 w-full h-full">
            {/* Left: Text */}
            <div className="text-center lg:text-left text-white">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Find peace with <br /> conversation.
              </h1>
              <p className="text-xl text-emerald-100 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                At Voca-Coach, we make it easy to open up and feel heard. Connect with AI tools that listen, understand, and help you find calm through meaningful conversations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/dashboard" className="px-8 py-4 rounded-full bg-secondary text-emerald-900 font-bold text-lg hover:bg-white shadow-xl hover:-translate-y-1 transition-all">
                  Get Started
                </Link>
                <Link href="/de-escalation" className="px-8 py-4 rounded-full bg-transparent border-2 border-emerald-400 text-white font-bold text-lg hover:bg-emerald-800/50 transition-all">
                  Check De-escalation
                </Link>
              </div>

              <div className="mt-16 flex justify-center lg:justify-start gap-12 border-t border-emerald-500/30 pt-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">Therapy Sessions</p>
                  <p className="text-3xl font-bold">500,000</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-300 mb-1">Members Helped</p>
                  <p className="text-3xl font-bold">200,000</p>
                </div>
              </div>
            </div>

            {/* Right: Circular Diagram */}
            <div className="flex justify-center items-center">
              <div className="relative w-[500px] h-[500px] animate-fade-in">
                <Image
                  src="/assets/diagram-circle.svg"
                  alt="Wellness Diagram"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
                {/* Central Figure Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src="/assets/avatar-client-1.svg"
                    alt="Calm Person"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover bg-emerald-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* B. "All Support" Feature Section (White) */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto bg-white">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left: Text & List */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-heading mb-8 leading-tight">
              All the Support You <br /> Need, Right Here at <br /> <span className="text-primary">Voca-Coach</span>
            </h2>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs mt-1">✓</div>
                <div>
                  <strong className="text-heading block mb-1">Access to real-time de-escalation</strong>
                  <p className="text-gray-500 text-sm">Monitor your tone and stress levels instantly.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs mt-1">✓</div>
                <div>
                  <strong className="text-heading block mb-1">Biomarker Analysis</strong>
                  <p className="text-gray-500 text-sm">Track trends in your vocal patterns over time.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs mt-1">✓</div>
                <div>
                  <strong className="text-heading block mb-1">Socratic Journaling</strong>
                  <p className="text-gray-500 text-sm">Challenge negative thoughts with AI guidance.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs mt-1">✓</div>
                <div>
                  <strong className="text-heading block mb-1">Persona Practice</strong>
                  <p className="text-gray-500 text-sm">Practice conversations with simulated personas.</p>
                </div>
              </li>
            </ul>

            <div className="mt-10">
              <Link href="/dashboard" className="px-10 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary-hover shadow-lg transition-all inline-block">
                Get Started with Voca-Coach Today
              </Link>
            </div>
          </div>

          {/* Right: Coach Image */}
          <div className="flex-1 w-full relative">
            <div className="absolute top-10 right-10 w-20 h-20 bg-secondary rounded-full blur-xl opacity-50"></div>
            <Image
              src="/assets/coach-hero.svg"
              alt="Doctor/Coach using laptop"
              width={600}
              height={500}
              className="rounded-3xl shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-700 w-full"
            />
          </div>

        </div>
      </section>

      {/* C. Direct Module Links (Cards) */}
      <section className="py-24 bg-surface-alt px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-heading">Explore Our Modules</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link href="/de-escalation" className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-emerald-100 group">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🌬️</div>
              <h3 className="font-bold text-heading mb-2">De-escalation</h3>
              <p className="text-sm text-gray-500">Real-time tone assistance.</p>
            </Link>
            <Link href="/biomarkers" className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-emerald-100 group">
              <div className="w-12 h-12 bg-purple-100 rounded-xl mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📊</div>
              <h3 className="font-bold text-heading mb-2">Biomarkers</h3>
              <p className="text-sm text-gray-500">Track vocal health trends.</p>
            </Link>
            <Link href="/journal" className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-emerald-100 group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📓</div>
              <h3 className="font-bold text-heading mb-2">Journal</h3>
              <p className="text-sm text-gray-500">Socratic dialogue & reflection.</p>
            </Link>
            <Link href="/persona" className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-emerald-100 group">
              <div className="w-12 h-12 bg-orange-100 rounded-xl mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🎭</div>
              <h3 className="font-bold text-heading mb-2">Persona</h3>
              <p className="text-sm text-gray-500">Simulate difficult conversations.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <footer className="bg-footer py-16 px-4 text-center text-white border-t border-emerald-800/30">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center hover:bg-primary cursor-pointer transition-colors text-xl">🐦</div>
            <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center hover:bg-primary cursor-pointer transition-colors text-xl">📘</div>
            <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center hover:bg-primary cursor-pointer transition-colors text-xl">📸</div>
          </div>

          <div className="flex gap-8 text-sm text-emerald-100 font-medium">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Support</Link>
          </div>

          <p className="text-sm text-emerald-400/60">© 2025 Voca-Coach. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
