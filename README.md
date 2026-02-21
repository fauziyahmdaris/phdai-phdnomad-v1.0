# 🦉 DrPhDAI - World's #1 AI-Powered "PhD" Research Assistant

[![Deploy Status](https://img.shields.io/badge/status-live-brightgreen)](https://drphdai.my)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/qasharis/drphdai)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌟 **World's #1 AI-Powered "PhD" Research Assistant: Your Empathetic AI PhD Coach**

**DrPhDAI** is the world's first AI-powered and AI-empowered coaching and PhD guidance platform. It is an empathetic AI PhD coach and supervisor, helping students navigate the research journey to a successful and timely graduation. Built with cutting-edge AI technology and innovative pedagogical approaches, DrPhDAI revolutionizes how PhD research is conducted, organized, and written.

### 🎯 **Mission Statement**
To revolutionize PhD education by providing the world's most empathetic and intelligent AI-powered coaching platform that guides students through every stage of their research journey, ensuring successful and timely graduation while maintaining joy, wisdom, and personal well-being throughout the process.

---

## 🚀 **Live Platform**
**🌐 Website:** [https://drphdai.my](https://drphdai.my)  
**📧 Support:** qashmyphd@gmail.com  
**👩‍🎓 Creator:** Fauziyah Md Aris (Qash Aris)  
**🚀 Y Combinator Applicant:** Disrupting Higher Education for PhD Students Worldwide

---

## ⚡ Speedrun Summary (MVP-ready)

- **What’s New**
  - **Dashboard as Landing**: root route `/` redirects to `/app` for immediate product experience. See `src/App.tsx`.
  - **About Us**: `src/pages/About.tsx` (moved landing intro/FAQ, no external CTAs).
  - **Founder Story**: `src/pages/FounderStory.tsx` (full manifesto).
  - **Footer Links**: `About Us` and `The Founder Story` added inline with `Privacy Policy` and `Terms of Service` in `src/components/Footer.tsx`.
  - **Projects UX**: Shared `ProjectSwitcher` with full CRUD; integrated in Header and Dashboard (see section below).

- **Run Locally**
  ```bash
  npm install --legacy-peer-deps
  npm run dev
  # Quality checks
  npm run typecheck
  npm run lint
  npm run build
  ```

- **Deploy (Netlify)**
  - Branch: `main` (GitHub: `qasharis/drphdai-mvp`)
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Note: Tailwind is configured via `tailwind.config.js` and `postcss.config.js`.

- **Scripts**
  - `typecheck`: strict TS via `tsc --noEmit`
  - `lint`: ESLint v9 across repo
  - `format`: Prettier write-all

---

## 🧑‍💻 Development Tips (VS Code + Tailwind)

If VS Code shows warnings like "Unknown at rule @tailwind" or "Unknown at rule @apply" in `src/index.css`, configure the editor for Tailwind. The build is already correct (PostCSS processes Tailwind), this is editor-only.

- **Install Extension**
  - Tailwind CSS IntelliSense: `bradlc.vscode-tailwindcss`

- **VS Code Settings (User Settings JSON)**
  - Command Palette → "Preferences: Open Settings (JSON)" and add:
  ```json
  {
    "css.validate": false,
    "css.lint.unknownAtRules": "ignore",
    "files.associations": {
      "*.css": "tailwindcss"
    },
    "tailwindCSS.emmetCompletions": true
  }
  ```

- **Optional per-file workaround**
  - Click the language mode in the status bar for `src/index.css` and switch to "Tailwind CSS" or "PostCSS".

- **Note**
  - `.vscode/` is gitignored; extension recommendations are provided in `.vscode/extensions.json` locally.

---

## ✨ **Core Features**

### 🔬 **Revolutionary FRIN-Scanning Engine** *(PhD Innovation)*
- **World's First** AI-powered "Future Research Is Needed" sentence detection with empathetic coaching
- Upload PDFs, URLs, or DOIs for automatic research gap identification
- Interactive gap mapping with confidence scores
- Integrated empathetic microlearning modules that unlock based on discoveries

### 📊 **Intelligent Literature Matrix**
- AI-powered abstract analysis with empathetic guidance and insight extraction
- Automatic identification of research gaps, methodologies, and frameworks
- Smart categorization and organization of research papers
- Export capabilities for seamless integration with other tools

### ✍️ **AI-Powered Thesis Weaver**
- Automatic APA-style reference generation with coaching support
- AI-driven literature synthesis and review writing
- Intelligent content structuring and organization
- Copy-to-clipboard and download functionality

### 🤖 **AI Research Companion**
- Direct integration with ChatGPT, Perplexity, and Gemini with empathetic prompts
- 10+ specialized research prompts and templates
- Workflow guidance for optimal AI utilization
- Academic integrity guidelines and best practices

### 👥 **Academic Consultants Marketplace** *(NEW)*
- Network of verified empathetic PhD supervisors and research specialists
- Expertise-based matching and filtering
- Secure booking and payment system
- 20% commission model for sustainable platform growth

### 🌍 **Decolonization Auditor** *(Unique Feature)*
- Analyze reference lists for geographic and gender diversity with empathetic recommendations
- Recommendations for inclusive scholarship
- Suggested diverse authors and perspectives
- Diversity scoring and improvement tracking

---

## 🛠 **Technical Architecture**

### **Frontend Stack**
- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS with custom design system
- **Build Tool:** Vite (optimized for Bolt.New environment)
- **Icons:** Lucide React
- **Routing:** React Router DOM

### **Backend & AI Integration**
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth with Google OAuth
- **AI Services:** Google Gemini, OpenAI GPT, Perplexity AI
- **Payment Processing:** Stripe integration via Buy Me a Coffee
- **File Storage:** Supabase Storage

### **Deployment & Infrastructure**
- **Platform:** Bolt.New WebContainer environment
- **Hosting:** Netlify with custom domain
- **CDN:** Global content delivery for optimal performance
- **SSL:** Full SSL encryption and security

---

## 🎓 **Academic Research Foundation**

This platform is the practical implementation of the PhD research:

**"The Development and Evaluation of AI-Powered Microlearning Platform for Postgraduate Education in Literature Review Course"**

**Research Innovation:**
- **FRIN-Scanning Engine:** World's first automated detection of research gap indicators
- **Adaptive Microlearning:** Pedagogically-driven learning modules that unlock based on user progress
- **Decolonized Research Framework:** Promoting inclusive and diverse academic scholarship
- **AI-Human Collaboration Model:** Ethical AI integration maintaining academic integrity

---

## 🚀 **Getting Started**

### **For Users**
1. Visit [https://drphdai.my](https://drphdai.my)
2. Choose between "Guided Setup" (recommended) or "Quick Start"
3. Create your account (Normal or Freemium pilot access)
4. Set up your first research project
5. Start exploring AI-powered research tools

### **For Developers**
```bash
# Clone the repository
git clone https://github.com/qasharis/drphdai.git

# Install dependencies
npm install --legacy-peer-deps
# or
bun install

# Set up environment variables
cp .env.example .env
# Add your Supabase and API keys

# Start development server
npm run dev
# or
bun dev
```

### **Projects Management**

DrPhDAI now includes a unified Projects system to help you organize work across multiple research efforts.

- **Current Project**: The active project in context, shown in the Dashboard and Header.
- **Projects List**: A list of saved projects with metadata such as `title`, optional `area`, `objectives`, and `keywords`.
- **Quick Switch (Header)**: Use the Header dropdown to quickly switch the current project by title.
- **Project Switcher Modal**: Create, edit (rename, update objectives/area/keywords), set current, and remove projects.

Locations:
- Component: `src/components/projects/ProjectSwitcher.tsx`
- Context: `src/contexts/ProjectContext.tsx` (`ProjectMeta`, `projects`, `currentProject`, `createProject`, `updateProject`, `removeProject`)
- Integrations: `src/components/Header.tsx`, `src/pages/Dashboard.tsx`

Usage Notes:
- `ProjectMeta` shape:
  - `title: string`
  - `area?: string`
  - `objectives?: string[]`
  - `keywords?: string[]`
- To create a new project programmatically, call:
  ```ts
  createProject({ title: 'My Thesis', area: 'HCI', objectives: ['Objective 1'], keywords: ['ai', 'education'] })
  ```
- To update an existing project:
  ```ts
  updateProject(prevMeta, nextMeta)
  ```
- To switch current project in the UI, use the Header dropdown or open the Project Switcher.

### **Generate Templates (DOCX/PDF)**

Use this script to generate branded DOCX and PDF documents from Markdown templates.

1. Location of sources: `templates/`
2. Generate documents:

```bash
npm run generate:docs
```

3. Outputs are written to: `public/downloads/`

Generated files include:
- Annotation Rubric: `annotation-rubric.pdf`, `annotation-rubric.docx`
- Critical Appraisal Checklist: `critical-appraisal-checklist.pdf`, `critical-appraisal-checklist.docx`
- Module 1 Offline Pack: `module1-offline.pdf`, `module1-offline.docx`
- PRISMA Flow: `prisma-flow.pdf` (from `prisma-flow.svg`)

Branding options:
- Optional logo: place `public/logo-owl.svg` (preferred) or `public/logo-owl.png`
- The generator applies title, subtitle, per-document subheading, margins, and footer automatically

---

### **Environment Variables**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_GEMINI_API_KEY=your_gemini_api_key
```

---

## 📚 **User Guide & Documentation**

### **Quick Start (5 Minutes)**
1. **Account Setup:** Register with email or Google OAuth
2. **Project Creation:** Define research title, area, and objectives
3. **Literature Matrix:** Add papers and let AI extract insights
4. **AI Tools:** Use specialized prompts for research assistance
5. **Export & Share:** Download references and synthesis

### **Core Workflows**
- **Literature Review:** Navigator → Matrix → Thesis Weaver
- **Gap Analysis:** FRIN Scanner → Gap Map → Microlearning
- **Expert Consultation:** Browse Consultants → Book Sessions → Get Guidance

### **Best Practices**
- Always verify AI-generated content
- Use AI as assistance, not replacement for critical thinking
- Maintain academic integrity and proper citation
- Regular data backup and export

---

## 🔧 **Features in Detail**

### **Research Navigator**
- AI-powered keyword generation
- Google Scholar integration
- Academic database access
- Search optimization tips

### **Literature Matrix**
- Automatic abstract analysis
- Research gap identification
- Methodology extraction
- Framework categorization
- Export to CSV/Google Sheets

### **Thesis Weaver**
- APA reference formatting
- Literature synthesis generation
- Academic writing assistance
- Content organization tools

### **Gap Scanner & Microlearning**
- PDF upload and analysis
- FRIN sentence detection
- Interactive gap visualization
- Adaptive learning modules

### **Academic Consultants**
- Expert verification system
- Specialization matching
- Secure payment processing
- Session management

---

## 🌟 **Unique Selling Points**

1. **World's First FRIN-Scanning Technology**
2. **Integrated Microlearning Ecosystem**
3. **Decolonization-Focused Research Tools**
4. **Academic Consultant Marketplace**
5. **Comprehensive AI Integration**
6. **PhD Research-Backed Methodology**
7. **Academic Integrity-First Design**
8. **Global Accessibility & Inclusion**

---

## 💰 **Monetization Strategy**

### **Current Model (Pre-MVP)**
- **Free Access:** Core features available to all users
- **Freemium Pilot:** Enhanced features for research participants
- **Donations:** Optional "Buy Me a Coffee" support

### **Planned Revenue Streams**
- **Consultant Marketplace:** 20% commission on bookings
- **Premium Subscriptions:** Advanced AI features and analytics
- **Institutional Licensing:** University and research organization plans
- **API Access:** Third-party integration and white-label solutions

---

## 🎯 **Target Audience**

### **Primary Users**
- PhD students and doctoral candidates
- Postgraduate researchers
- Academic supervisors and mentors
- Research institutions and universities

### **Secondary Users**
- Master's degree students
- Academic writers and consultants
- Research support staff
- Educational technology administrators

---

## 🔒 **Privacy & Security**

- **Data Protection:** GDPR and academic privacy compliance
- **Secure Authentication:** Multi-factor authentication options
- **Encrypted Storage:** End-to-end encryption for sensitive data
- **Academic Integrity:** Built-in plagiarism prevention
- **User Control:** Complete data ownership and export rights

---

## 🤝 **Contributing**

We welcome contributions from the academic and developer communities:

### **How to Contribute**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Participate in code review

### **Contribution Areas**
- AI model improvements
- User interface enhancements
- Academic feature development
- Documentation and tutorials
- Testing and quality assurance

---

## 📞 **Support & Contact**

### **Technical Support**
- **Email:** qashmyphd@gmail.com
- **Response Time:** Within 24 hours
- **Available:** Monday-Friday, 9 AM - 5 PM (Malaysia Time)

### **Academic Collaboration**
- **Research Partnerships:** Open to academic collaborations
- **Institutional Pilots:** Custom implementation for universities
- **Conference Presentations:** Available for academic conferences

### **Business Inquiries**
- **Licensing:** Institutional and enterprise solutions
- **Investment:** Funding and partnership opportunities
- **Media:** Press and interview requests

---

## 🏆 **Recognition & Awards**

- **PhD Research Innovation:** Pioneering AI-powered academic tools
- **Academic Excellence:** Research-backed pedagogical approach
- **Technology Innovation:** World's first FRIN-scanning engine
- **Global Impact:** Supporting researchers worldwide

---

## 📈 **Roadmap & Future Development**

### **Phase 1: Pre-MVP (Current)**
- ✅ Core platform development
- ✅ AI integration and testing
- ✅ User interface optimization
- ✅ Academic consultant marketplace
- ✅ Pilot study implementation

### **Phase 2: MVP Launch (Q2 2025)**
- 🔄 Enhanced AI models
- 🔄 Mobile application development
- 🔄 Advanced analytics dashboard
- 🔄 Institutional licensing program
- 🔄 API development for third-party integration

### **Phase 3: Scale & Expansion (Q3-Q4 2025)**
- 📅 Global market expansion
- 📅 Multi-language support
- 📅 Advanced research analytics
- 📅 AI model customization
- 📅 Research collaboration tools

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

### **Academic Support**
- PhD supervisors and research mentors
- Pilot study participants and testers
- Academic community feedback and guidance

### **Technical Contributors**
- Open source community
- AI research community
- Educational technology experts

### **Special Thanks**
- **Global International Technology Sdn Bhd** - Platform development and support
- **Academic institutions** - Research collaboration and validation
- **PhD community** - Continuous feedback and improvement suggestions

---

## 📊 **Statistics & Impact**

- **🎓 Users Supported:** 100+ PhD students in pilot phase
- **📚 Papers Analyzed:** 1,000+ research papers processed
- **🔍 Gaps Identified:** 500+ research gaps discovered
- **⭐ Satisfaction Rate:** 95% user satisfaction in pilot testing
- **🌍 Global Reach:** Users from 15+ countries

---

**Built with ❤️ for the global academic research community**

*Empowering the next generation of researchers through innovative AI technology and pedagogical excellence.*

---

**© 23 Sept. 2025 Fauziyah Md Aris aka Qash Aris, Global International Technology Sdn Bhd. All rights reserved.**