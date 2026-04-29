"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type QuizOption = {
  text: string;
  points: number;
};

type QuizQuestion = {
  text: string;
  options: QuizOption[];
};

type Recommendation = {
  title: string;
  desc: string;
};

type ResultConfig = {
  type: string;
  badgeClass: string;
  desc: string;
  recommended: Recommendation[];
};

const questions: QuizQuestion[] = [
  {
    text: "What is your investment goal?",
    options: [
      { text: "Save for retirement", points: 3 },
      { text: "Build wealth", points: 2 },
      { text: "Beat inflation", points: 1 },
      { text: "Emergency fund", points: 0 },
    ],
  },
  {
    text: "How long can you stay invested?",
    options: [
      { text: "More than 10 years", points: 3 },
      { text: "5-10 years", points: 2 },
      { text: "1-5 years", points: 1 },
      { text: "Less than 1 year", points: 0 },
    ],
  },
  {
    text: "If your investment drops 20%, what do you do?",
    options: [
      { text: "Buy more", points: 3 },
      { text: "Wait and watch", points: 2 },
      { text: "Sell some", points: 1 },
      { text: "Sell everything", points: 0 },
    ],
  },
  {
    text: "What is your monthly income?",
    options: [
      { text: "Above ₹1 Lakh", points: 3 },
      { text: "₹50k-1 Lakh", points: 2 },
      { text: "₹25k-50k", points: 1 },
      { text: "Below ₹25k", points: 0 },
    ],
  },
  {
    text: "How much of savings can you risk?",
    options: [
      { text: "More than 50%", points: 3 },
      { text: "25-50%", points: 2 },
      { text: "10-25%", points: 1 },
      { text: "Less than 10%", points: 0 },
    ],
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => setResultVisible(true), 50);
      return () => clearTimeout(timer);
    }
    setResultVisible(false);
    return undefined;
  }, [showResult]);

  const progressPct = ((currentQuestion + 1) / questions.length) * 100;

  const resultConfig = useMemo<ResultConfig>(() => {
    if (totalScore >= 12) {
      return {
        type: "Aggressive Investor",
        badgeClass:
          "bg-red-500/15 text-red-400 border border-red-500/25 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
        desc:
          "You are willing to take significant risks for potentially higher returns. Short-term market volatility doesn't bother you much as you are focused on long-term wealth creation.",
        recommended: [
          { title: "Small Cap", desc: "High growth potential but highly volatile. Best for long term." },
          { title: "Mid Cap", desc: "Balance of good growth and moderate to high risk." },
          { title: "Sectoral", desc: "Targeted high-risk bets on specific market sectors." },
        ],
      };
    }

    if (totalScore >= 7) {
      return {
        type: "Moderate Investor",
        badgeClass:
          "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
        desc:
          "You seek a balance between capital appreciation and capital preservation. You can handle some market fluctuations but prefer a degree of stability.",
        recommended: [
          { title: "Flexi Cap", desc: "Dynamically shifts across all market caps based on conditions." },
          { title: "Hybrid Funds", desc: "Mix of equity and debt for balanced growth and safety." },
          { title: "Large & Mid", desc: "Stability of large companies with the growth of mid caps." },
        ],
      };
    }

    return {
      type: "Conservative Investor",
      badgeClass:
        "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
      desc:
        "Your primary goal is capital preservation. You prefer steady, predictable returns over high-risk, high-reward opportunities. You dislike seeing your portfolio value drop.",
      recommended: [
        { title: "Liquid Funds", desc: "Extremely low risk, similar to a high-yield savings account." },
        { title: "Debt Funds", desc: "Steady returns by lending to solid companies and government." },
        { title: "Large Cap", desc: "Invests in top 100 bluechip, highly stable companies." },
      ],
    };
  }, [totalScore]);

  const handleAnswer = (points: number) => {
    if (isFading) return;
    setIsFading(true);
    setTotalScore((prev) => prev + points);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setIsFading(false);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const handleRetake = () => {
    setShowResult(false);
    setIsFading(true);
    setTimeout(() => {
      setCurrentQuestion(0);
      setTotalScore(0);
      setIsFading(false);
    }, 300);
  };

  const current = questions[currentQuestion];

  return (
    <>
      <style jsx global>{`
        .fade-out {
          opacity: 0;
          pointer-events: none;
        }
        .fade-in {
          opacity: 1;
          pointer-events: auto;
        }
        body > nav {
          display: none;
        }
      `}</style>

      <div className="fixed -top-[30%] -left-[10%] w-[600px] h-[600px] glow-indigo rounded-full pointer-events-none z-0"></div>
      <div className="fixed -bottom-[20%] -right-[10%] w-[500px] h-[500px] glow-sky rounded-full pointer-events-none z-0"></div>

      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 py-4 bg-slate-900/75 backdrop-blur-xl border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2.5 cursor-pointer no-underline">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
            <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
            <path
              d="M9 22L13 13L17 17L23 9"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="23" cy="9" r="2" fill="white" />
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-[22px] font-extrabold tracking-tight gradient-text-logo">FundSense</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/portfolio"
            className="text-slate-400 no-underline text-sm font-medium transition-colors duration-200 hover:text-slate-200"
          >
            Portfolio
          </Link>
          <Link href="/quiz" className="text-indigo-400 no-underline text-sm font-medium">
            Risk Quiz
          </Link>
          <Link
            href="/sip"
            className="text-slate-400 no-underline text-sm font-medium transition-colors duration-200 hover:text-slate-200"
          >
            SIP Calculator
          </Link>
          <Link
            href="/compare"
            className="text-slate-400 no-underline text-sm font-medium transition-colors duration-200 hover:text-slate-200"
          >
            Compare
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 no-underline text-sm font-medium transition-colors duration-200 hover:text-slate-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span className="hidden sm:inline">Back to Search</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-[1] pt-[120px] pb-20 px-6 max-w-3xl mx-auto min-h-[80vh] flex flex-col justify-center">
        <div
          className={`text-center mb-10 transition-opacity duration-300 ${
            showResult ? "opacity-0 pointer-events-none hidden" : "opacity-100"
          }`}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight gradient-text-heading">
            Risk Profiler
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Discover your investing style to find the mutual funds that suit you best.
          </p>
        </div>

        <div
          className={`card-glass border border-white/[0.06] rounded-2xl p-6 sm:p-10 backdrop-blur-lg transition-opacity duration-300 ${
            showResult ? "hidden" : isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-indigo-400 font-semibold text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full mb-8 overflow-hidden border border-white/[0.04]">
            <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-tight">{current.text}</h2>

          <div className="flex flex-col gap-4">
            {current.options.map((opt) => (
              <button
                key={opt.text}
                onClick={() => handleAnswer(opt.points)}
                className="w-full text-left px-5 py-4 bg-slate-800/50 border border-white/[0.04] rounded-xl text-slate-200 font-medium hover:bg-indigo-500/15 hover:border-indigo-500/30 hover:text-indigo-100 transition-all cursor-pointer group flex justify-between items-center"
              >
                <span>{opt.text}</span>
                <svg
                  className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div
          className={`transition-opacity duration-500 ${showResult ? "" : "pointer-events-none"} ${
            resultVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="card-glass border border-white/[0.06] rounded-2xl p-8 sm:p-12 backdrop-blur-lg text-center mb-8">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-5">Your Profile</p>
            <div className="inline-block mb-6">
              <span className={`px-5 py-2.5 text-sm font-bold rounded-full ${resultConfig.badgeClass}`}>
                {resultConfig.type}
              </span>
            </div>
            <p className="text-slate-300 text-base max-w-lg mx-auto leading-relaxed">{resultConfig.desc}</p>
          </div>

          <h3 className="text-lg font-bold text-white mb-5 pl-2 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Recommended Categories
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {resultConfig.recommended.map((rec) => (
              <div
                key={rec.title}
                className="bg-slate-800/40 border border-white/[0.04] p-5 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <h4 className="text-white font-bold mb-2">{rec.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{rec.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleRetake}
              className="w-full sm:w-auto px-6 py-3.5 text-[15px] font-semibold text-slate-300 bg-slate-800 border border-white/[0.08] rounded-xl hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              Retake Quiz
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 text-[15px] font-semibold text-white gradient-btn border-none rounded-xl hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(99,102,241,0.45)] transition-all text-center no-underline block"
            >
              Find these funds
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
