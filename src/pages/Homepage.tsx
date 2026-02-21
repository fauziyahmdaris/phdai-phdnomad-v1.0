import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 text-white">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">🚀</span>
          <span className="text-xl font-bold">drphdai.my</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/about" className="transition hover:text-blue-200">About</Link>
          <Link to="/founder-story" className="transition hover:text-blue-200">Story</Link>
          <a 
            href="https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 font-semibold text-blue-900 transition bg-white rounded-lg hover:bg-blue-100"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-20 mx-auto text-center text-white max-w-7xl">
        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
          Your AI-Powered
          <br />
          <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
            PhD Companion
          </span>
        </h1>
        
        <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed text-blue-100 md:text-2xl">
          Accelerate your research, streamline your writing, and conquer your PhD journey 
          with intelligent AI tools designed specifically for academic success.
        </p>

        <div className="flex flex-col justify-center gap-4 mb-16 sm:flex-row">
          <a 
            href="https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg font-semibold text-white transition transform rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105"
          >
            Start Your Journey - $9.90
          </a>
          <Link 
            to="/app"
            className="px-8 py-4 text-lg font-semibold text-white transition border-2 border-white rounded-lg hover:bg-white hover:text-blue-900"
          >
            Explore Features
          </Link>
        </div>

        <div className="text-sm text-blue-200">
          <p>One-time payment • Lifetime access • No subscription</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 py-20 mx-auto max-w-7xl">
        <h2 className="mb-12 text-3xl font-bold text-center text-white md:text-4xl">
          Everything You Need for PhD Success
        </h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: "📚",
              title: "Research Navigator",
              description: "Find relevant literature and identify research gaps efficiently"
            },
            {
              icon: "✍️",
              title: "Thesis Weaver",
              description: "Structure and write your dissertation with AI assistance"
            },
            {
              icon: "🔍",
              title: "Gap Scanner",
              description: "Identify research opportunities and validate your contributions"
            },
            {
              icon: "🤖",
              title: "AI Companion",
              description: "24/7 research assistant for questions and brainstorming"
            },
            {
              icon: "📊",
              title: "Progress Analytics",
              description: "Track your research progress and stay on schedule"
            },
            {
              icon: "💡",
              title: "Writing Tools",
              description: "Academic writing assistance and style guidance"
            }
          ].map((feature, index) => (
            <div key={index} className="p-6 text-white border bg-white/10 backdrop-blur-lg rounded-xl border-white/20">
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl px-6 py-20 mx-auto text-center">
        <div className="p-12 border bg-white/10 backdrop-blur-lg rounded-2xl border-white/20">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to Transform Your PhD Journey?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Join hundreds of researchers who have accelerated their work with drphdai.my
          </p>
          <a 
            href="https://buy.stripe.com/aFaeVcaD5goN60i6bV6AM00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 text-lg font-semibold text-white transition transform rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105"
          >
            Get Lifetime Access - $9.90
          </a>
          <p className="mt-4 text-sm text-blue-200">
            One payment • Unlimited access • Money-back guarantee
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-blue-200 border-t border-white/20">
        <div className="px-6 mx-auto max-w-7xl">
          <p>&copy; 2024 drphdai.my - AI-Powered PhD Companion</p>
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            <Link to="/privacy-policy" className="transition hover:text-white">Privacy</Link>
            <Link to="/terms-of-service" className="transition hover:text-white">Terms</Link>
            <Link to="/about" className="transition hover:text-white">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;