import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-blue-500 to-cyan-400 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-20 bg-white/5 backdrop-blur border-b border-white/10">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto text-white">
          <a href="/" className="flex items-center gap-3 font-semibold">
            <img src="/1-QASH ARIS_Profile Photo.png" alt="DrPhDAI" className="inline-block w-8 h-8 rounded-lg object-cover" />
            DrPhDAI
          </a>
          <nav className="hidden gap-6 text-sm sm:flex">
            <a href="#toolkit" className="hover:underline">Toolkit</a>
            <a href="#pathfinder" className="hover:underline">Pathfinder</a>
            <a href="#testimonials" className="hover:underline">Testimonials</a>
            <a href="#faq" className="hover:underline">FAQ</a>
            <a href="https://drphdai.my/starter-kit" target="_blank" rel="noopener noreferrer" className="hover:underline">Starter Kit</a>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden px-2 py-1 text-xs font-semibold text-indigo-950 rounded bg-amber-300 sm:inline">Pricing: Free for MVP</span>
            <a href="/login" className="px-3 py-2 text-sm font-semibold rounded bg-white/10 ring-1 ring-white/20 hover:bg-white/20">Login</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="container px-4 pt-20 pb-16 mx-auto sm:pt-24 sm:pb-24">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-3 py-1 mb-5 text-sm font-medium bg-white/10 rounded-full ring-1 ring-white/20 backdrop-blur">
              Welcome to DrPhDAI MVP Launch!
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Your DrPhDAI Journey Starts Here!
            </h1>
            <div className="max-w-3xl mx-auto mt-5 text-lg leading-relaxed text-white/90 space-y-4 text-left sm:text-center">
              <p>
                Hello and a massive welcome to <strong>drphdai.my</strong>! 🤗
              </p>
              <p>
                As someone who is also navigating the PhD path, I created this space with a deep understanding of the highs and lows we all face. This platform is my answer to the question: "How can we make our PhD journey an exciting and empowering experience?"
              </p>
              <p>
                You've just stepped into the future of PhD studies. Welcome to the world's first <strong>AI-Powered Thesis Writing Coach</strong> and <strong>AI-Empowered Research Supervisor</strong>—a digital guide built with empathy at its core. 🎓🤖 It's powered by the heart and soul of my own research: the <strong>QASHARIS E9 Concept</strong>, the <strong>QASHARIS-Lens AI-Pedagogical Framework</strong>, and our unique <strong>Diagnostic Engine</strong>. 💡❤️
              </p>
              <p>
                We couldn't be more excited that you're one of the first to experience our powerful MVP Engine. Thank you for joining our mission to make the PhD process smarter and kinder. As you explore this early version, know that your presence is helping us grow and build this together. 🌱🤝
              </p>
              <p>
                With love and support from Taiping, the 'Raintown' of Perak, Malaysia, <strong>Fauziyah Md Aris aka Qash Aris</strong> 🌧️❤️
              </p>
              <p className="text-base opacity-90">
                <strong>P.S.</strong> Your sincere feedback is invaluable and will help shape the future of postgraduate education. Let's embark on this mission together! 🚀
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 mt-10 sm:flex-row">
              <a
                href="https://forms.gle/xqjpP5HjerehocLS6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-8 py-3 text-base font-semibold text-indigo-950 bg-white rounded-lg shadow-sm sm:w-auto hover:bg-indigo-50"
                aria-label="I Want Access to DrPhDAI"
              >
                I Want Access to DrPhDAI
              </a>
              <a
                href="https://drphdai.my/starter-kit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-8 py-3 text-base font-semibold text-white rounded-lg sm:w-auto bg-emerald-500 hover:bg-emerald-600"
                aria-label="PhD Starter Kit - Step 1 of 5"
              >
                PhD Starter Kit – Step 1 of 5
                <span className="ml-2 px-2 py-0.5 text-xs font-bold text-emerald-900 bg-white rounded">FREE</span>
              </a>
              <a
                href="https://buymeacoffee.com/qasharis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-8 py-3 text-base font-semibold text-white rounded-lg sm:w-auto bg-black/30 ring-1 ring-white/30 hover:bg-black/40"
                aria-label="PREMIUM Access"
              >
                PREMIUM Access
              </a>
            </div>

            <div className="grid grid-cols-3 max-w-xl mx-auto gap-6 mt-10 text-sm text-white/90">
              <div className="text-center"><div className="text-2xl font-bold">10,000+</div><div className="opacity-80">Active Researchers</div></div>
              <div className="text-center"><div className="text-2xl font-bold">500K+</div><div className="opacity-80">Project Insights</div></div>
              <div className="text-center"><div className="text-2xl font-bold">95%</div><div className="opacity-80">Success Feelings</div></div>
            </div>

            {/* Promo Cards from previous announcement */}
            <div className="grid max-w-4xl grid-cols-1 gap-4 mx-auto mt-10 sm:grid-cols-2">
              <div className="p-5 text-indigo-950 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-xl">
                <h3 className="text-lg font-extrabold">🎯 Limited Special MVP Offer</h3>
                <p className="mt-1 text-sm font-semibold">Only USD1 (RM4.50) until Dec 31, 2025!</p>
                <p className="mt-1 text-xs">Full MVP access + FREE DRPHDAI Templates • Limited to first 1,000 users</p>
              </div>
              <div className="p-5 text-white bg-white/10 rounded-xl ring-1 ring-white/20">
                <h3 className="flex items-center text-lg font-semibold">🏆 Prof. Dr. Zoraini Wati Abas Scholarship</h3>
                <p className="mt-1 text-sm text-white/90">One lucky contributor wins <strong>USD100 (RM450) cash</strong> via our CSR initiative, honoring her legacy as our EdTech Guru and Malaysia e-Learning/ODL Pioneer.</p>
              </div>
            </div>
          </div>
        </div>

        {/* White curved divider */}
        <div className="h-12 bg-gradient-to-b from-white/0 to-white/30 dark:to-gray-900" />
      </section>

      {/* Toolkit Cards */}
      <section id="toolkit" className="bg-white dark:bg-gray-950">
        <div className="container px-4 py-16 mx-auto">
          <h2 className="mb-8 text-2xl font-semibold text-center text-gray-900 sm:text-3xl dark:text-white">
            Your Empathetic AI PhD Coaching Toolkit
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <a href="/app/navigator" className="block p-6 transition border rounded-xl hover:shadow-md bg-white/70 dark:bg-gray-900 border-gray-200/80 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Research Navigator</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Explore questions, goals, and research direction.</p>
              <span className="inline-block mt-4 text-sm font-medium text-indigo-600">Open →</span>
            </a>

            <a href="/app/matrix" className="block p-6 transition border rounded-xl hover:shadow-md bg-white/70 dark:bg-gray-900 border-gray-200/80 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Evidence Matrix</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Synthesize literature and identify gaps clearly.</p>
              <span className="inline-block mt-4 text-sm font-medium text-indigo-600">Open →</span>
            </a>

            <a href="/app/thesis-weaver" className="block p-6 transition border rounded-xl hover:shadow-md bg-white/70 dark:bg-gray-900 border-gray-200/80 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Thesis Weaver</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Draft chapters with coherent academic structure.</p>
              <span className="inline-block mt-4 text-sm font-medium text-indigo-600">Open →</span>
            </a>

            <a href="/app/ai-companion" className="block p-6 transition border rounded-xl hover:shadow-md bg-white/70 dark:bg-gray-900 border-gray-200/80 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Companion</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Brainstorm, unblock, and maintain research momentum.</p>
              <span className="inline-block mt-4 text-sm font-medium text-indigo-600">Open →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Research Pathfinder teaser */}
      <section id="pathfinder" className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-sky-500">
          <div className="container px-4 py-16 mx-auto">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="text-white">
                <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-semibold uppercase rounded-full bg-white/20 ring-1 ring-white/30">New</span>
                <h3 className="text-3xl font-bold sm:text-4xl">Research Pathfinder</h3>
                <p className="mt-3 text-white/90">A guided, step-by-step flow to define your topic, align methods, and chart next actions in under 10 minutes.</p>
                <ul className="mt-4 space-y-2 text-white/90">
                  <li>• Select Research Focus</li>
                  <li>• Clarify Questions & Objectives</li>
                  <li>• Choose Methodology & Data Plan</li>
                  <li>• Get a 7-Day Momentum Plan</li>
                </ul>
                <div className="flex flex-col gap-3 mt-6 sm:flex-row">
                  <button onClick={() => (window.location.href = '/app/pathfinder')} className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-indigo-950 bg-white rounded-lg hover:bg-indigo-50">
                    Try Pathfinder
                  </button>
                  <a
                    href="https://drphdai.my/starter-kit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-emerald-500 hover:bg-emerald-600"
                  >
                    PhD Starter Kit – Step 1 of 5
                  </a>
                  <button onClick={() => (window.location.href = '/app')} className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-black/30 ring-1 ring-white/30 hover:bg-black/40">
                    Launch Free MVP
                  </button>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-xl dark:bg-gray-900">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-900">
                      <div className="font-semibold text-gray-900 dark:text-white">Step 1</div>
                      <div className="mt-1 text-gray-600 dark:text-gray-300">Pick a research area and describe your context.</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-900">
                      <div className="font-semibold text-gray-900 dark:text-white">Step 2</div>
                      <div className="mt-1 text-gray-600 dark:text-gray-300">Define research questions and scope clearly.</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-900">
                      <div className="font-semibold text-gray-900 dark:text-white">Step 3</div>
                      <div className="mt-1 text-gray-600 dark:text-gray-300">Select methods and data collection plan.</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-900">
                      <div className="font-semibold text-gray-900 dark:text-white">Step 4</div>
                      <div className="mt-1 text-gray-600 dark:text-gray-300">Get a personalized 7-day action roadmap.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white dark:bg-gray-950">
        <div className="container px-4 py-16 mx-auto">
          <h2 className="mb-10 text-2xl font-semibold text-center text-gray-900 sm:text-3xl dark:text-white">Loved by PhD learners worldwide</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[1,2,3].map((i) => (
              <div key={i} className="p-6 border rounded-xl bg-white/70 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300">“DrPhDAI helped me clarify my topic and write with confidence. The toolkit saves hours every week.”</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-200" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">PhD Candidate</div>
                    <div className="text-xs text-gray-500">Education</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white dark:bg-gray-950">
        <div className="container px-4 py-16 mx-auto">
          <h2 className="mb-8 text-2xl font-semibold text-center text-gray-900 sm:text-3xl dark:text-white">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="p-4 border rounded-lg bg-white/70 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <summary className="font-medium cursor-pointer">Is the MVP really free?</summary>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Yes. Core tools are free to use during MVP. No credit card required.</p>
            </details>
            <details className="p-4 border rounded-lg bg-white/70 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <summary className="font-medium cursor-pointer">Do I need prior experience?</summary>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">No. The Starter Kit and Pathfinder guide you step-by-step.</p>
            </details>
            <details className="p-4 border rounded-lg bg-white/70 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <summary className="font-medium cursor-pointer">Can I export my work?</summary>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Yes. You can copy and export summaries as you progress.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA and footer */}
      <section className="bg-white dark:bg-gray-950">
        <div className="container px-4 py-14 mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">Join the Global PhD Success Revolution</h3>
          <p className="max-w-3xl mx-auto mt-3 text-gray-600 dark:text-gray-300">
            Register for updates or jump right in. You can try the MVP free today—your progress matters more than perfection.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 mt-8 sm:flex-row">
            <button onClick={() => (window.location.href = '/login')} className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-700">
              Register (FREE)
              <span className="ml-2 px-2 py-0.5 text-xs font-bold text-indigo-700 bg-white rounded">FREE</span>
            </button>
            <button onClick={() => (window.location.href = '/app')} className="inline-flex items-center px-6 py-3 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100">
              Use MVP for Free
              <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white rounded bg-emerald-500">FREE</span>
            </button>
          </div>
          <p className="mt-6 text-xs text-gray-500">No credit card required • Works on desktop and mobile • Built with empathy 💙</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;