import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-blue-500 to-cyan-400 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Top Navigation (simple) */}
      <header className="sticky top-0 z-20 bg-white/5 backdrop-blur border-b border-white/10">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto text-white">
          <a href="/app" className="flex items-center gap-3 font-semibold">
            <img src="/1-QASH ARIS_Profile Photo.png" alt="DrPhDAI" className="inline-block w-8 h-8 rounded-lg object-cover" />
            DrPhDAI
          </a>
          <nav className="hidden gap-6 text-sm sm:flex">
            <a href="/app" className="hover:underline">Dashboard</a>
            <a href="/app/navigator" className="hover:underline">Toolkit</a>
            <a href="#faq" className="hover:underline">FAQ</a>
          </nav>
        </div>
      </header>

      {/* About hero (moved landing message here, minus external CTAs) */}
      <section className="relative">
        <div className="container px-4 pt-16 pb-12 mx-auto sm:pt-20 sm:pb-16">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-3 py-1 mb-5 text-sm font-medium bg-white/10 rounded-full ring-1 ring-white/20 backdrop-blur">
              About DrPhDAI
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Your DrPhDAI Journey Starts Here
            </h1>
            <div className="max-w-3xl mx-auto mt-5 text-lg leading-relaxed text-white/90 space-y-4 text-left sm:text-center">
              <p>
                Hello and a massive welcome to <strong>drphdai.my</strong>! 🤗
              </p>
              <p>
                As someone who is also navigating the PhD path, this platform was created with a deep understanding of the highs and lows we all face. It is our answer to the question: “How can we make our PhD journey an exciting and empowering experience?”
              </p>
              <p>
                Welcome to the world's first <strong>AI-Powered Thesis Writing Coach</strong> and <strong>AI-Empowered Research Supervisor</strong>—a digital guide built with empathy at its core. It’s powered by the heart and soul of our research: the <strong>QASHARIS E9 Concept</strong>, the <strong>QASHARIS-Lens AI-Pedagogical Framework</strong>, and our unique <strong>Diagnostic Engine</strong>.
              </p>
              <p>
                We’re excited you’re one of the first to experience our MVP Engine. Thank you for joining our mission to make the PhD process smarter and kinder. 🌱🤝
              </p>
              <p>
                With love and support from Taiping, the 'Raintown' of Perak, Malaysia, <strong>Fauziyah Md Aris aka Qash Aris</strong> 🌧️❤️
              </p>
              <p className="text-base opacity-90">
                <strong>P.S.</strong> Your sincere feedback will help shape the future of postgraduate education. Let’s embark on this mission together! 🚀
              </p>
            </div>
          </div>
        </div>
        <div className="h-12 bg-gradient-to-b from-white/0 to-white/30 dark:to-gray-900" />
      </section>

      {/* FAQ (kept from landing style) */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
