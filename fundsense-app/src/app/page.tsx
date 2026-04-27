import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-[30%] -left-[10%] w-[600px] h-[600px] glow-indigo rounded-full pointer-events-none z-0"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] glow-sky rounded-full pointer-events-none z-0"></div>

      <div className="text-center z-10 max-w-4xl w-full">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 gradient-text-heading leading-tight pb-2">
          Discover the Best Mutual Funds
        </h1>
        <p className="text-xl sm:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto">
          AI-powered mutual fund analyzer for Indian investors
        </p>
        
        {/* Search Bar Placeholder */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center bg-slate-800/80 border border-white/[0.08] rounded-2xl p-2 backdrop-blur-xl transition-all focus-within:border-indigo-500/50 shadow-xl">
            <div className="pl-4 pr-2 text-slate-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for any mutual fund (e.g. Parag Parikh Flexi Cap)..." 
              className="flex-1 bg-transparent border-none outline-none text-base text-white py-3 px-2 w-full placeholder:text-slate-500"
            />
            <Link href="/search" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-colors no-underline">
              Search
            </Link>
          </div>
        </div>

        {/* Popular chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="text-slate-500 font-medium">Popular:</span>
          <span className="bg-white/[0.04] border border-white/[0.06] text-slate-300 px-4 py-1.5 rounded-full cursor-pointer hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors">Quant Small Cap</span>
          <span className="bg-white/[0.04] border border-white/[0.06] text-slate-300 px-4 py-1.5 rounded-full cursor-pointer hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors">Parag Parikh Flexi</span>
          <span className="bg-white/[0.04] border border-white/[0.06] text-slate-300 px-4 py-1.5 rounded-full cursor-pointer hover:bg-indigo-500/20 hover:text-indigo-300 transition-colors">Nippon India Small</span>
        </div>
      </div>
    </main>
  );
}
