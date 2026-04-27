import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 h-[80px] bg-slate-900/80 backdrop-blur-xl border-b border-white/[0.06]">
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer no-underline text-white group">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0 transition-transform group-hover:scale-105">
          <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
          <path d="M9 22L13 13L17 17L23 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="23" cy="9" r="2" fill="white" />
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
        <span className="text-[22px] font-extrabold tracking-tight transition-colors group-hover:text-blue-400">FundSense</span>
      </Link>

      <div className="hidden sm:flex items-center gap-8">
        <Link href="/" className="text-white no-underline text-sm font-medium hover:text-blue-400 transition-colors">Home</Link>
        <Link href="/compare" className="text-white no-underline text-sm font-medium hover:text-blue-400 transition-colors">Compare</Link>
        <Link href="/sip" className="text-white no-underline text-sm font-medium hover:text-blue-400 transition-colors">SIP Calculator</Link>
        <Link href="/quiz" className="text-white no-underline text-sm font-medium hover:text-blue-400 transition-colors">Risk Quiz</Link>
        <Link href="/portfolio" className="text-white no-underline text-sm font-medium hover:text-blue-400 transition-colors">Portfolio</Link>
      </div>
    </nav>
  );
}
