export const PROMPTS = {
  proposal: {
    name: 'PhD Research Proposal',
    steps: [
      {
        title: 'Explore a Research Area & Generate Keywords',
        body:
          `Your Task: "I am interested in the broad topic of [e.g., The Impact of Generative AI on Workforce Skills and Education]. Please act as a research assistant. Generate a list of 20-25 core keywords and key phrases associated with this topic, drawing on current trends and real-time developments in AI (leverage Grok's capabilities for up-to-date insights if available). Group them into expanded categories like 'Technological Concepts,' 'Educational Theories,' 'Economic Impacts,' 'Societal and Ethical Implications,' 'Workforce Dynamics,' and 'Research Methodologies.' For each category, provide 4-6 keywords/phrases and a brief explanation of their relevance to the topic. Ensure keywords incorporate multicultural aspects, such as global education disparities (using Qwen's multilingual strengths if connected)."`,
        recommended: ['Claude', 'ChatGPT', 'Grok', 'Qwen']
      },
      {
        title: 'Analyze the Field and Identify the Research Gap',
        body:
          `Your Task: "Using the keywords from the previous step, conduct a preliminary analysis of the research landscape on [e.g., Generative AI's impact on workforce skills development in higher education]. Synthesize the key themes, dominant theoretical frameworks (e.g., Human Capital Theory or Technological Acceptance Model), and common methodologies (e.g., surveys, case studies). Most importantly, explicitly identify and summarize at least four specific, under-researched gaps that could form the basis of a PhD project, incorporating real-time data on emerging AI trends (via Grok) and cross-cultural comparisons (via Qwen). For each gap, explain why it is a gap, what question remains unanswered, and how it relates to global workforce education challenges. Cite sources where possible, adapting from foundational references."`,
        recommended: ['Claude', 'ChatGPT', 'Grok', 'Qwen']
      },
      {
        title: 'Craft a Research Title and Formulate Questions',
        body:
          `Your Task: "Based on the following research gap: [Paste your selected gap].\n\nPlease do the following, utilizing Claude's nuanced synthesis for academic tone and ChatGPT's reasoning for structured questioning:\n1. Generate 7-10 compelling and academic titles for a PhD thesis that addresses this gap, ensuring they are interdisciplinary and incorporate real-time AI applications (via Grok).\n2. Formulate one main research question and four specific, answerable sub-questions that would guide the investigation, integrating ethical considerations.\n3. Frame the questions using a clear structure (e.g., PICO, SPIDER, or variables), and suggest how multicultural data (via Qwen) could enhance them."`,
        recommended: ['Claude', 'ChatGPT', 'Grok', 'Qwen']
      },
      {
        title: 'Develop Aims and Objectives',
        body:
          `Your Task: "My primary research question is: [Insert RQ]. Please break this down into a clear 'Aim' and 4-5 specific, measurable, achievable, relevant, and time-bound (SMART) 'Objectives'. The aim should state the overall purpose of the study, incorporating global perspectives (via Qwen), and the objectives should be the concrete steps I will take to achieve that aim, including real-time trend analysis (via Grok) for timeliness."`,
        recommended: ['Claude', 'ChatGPT', 'Grok', 'Qwen']
      }
    ]
  },
  navigator: {
    name: 'Research Navigator',
    steps: [
      {
        title: 'Formulate a Precise Search Query',
        body:
          `Your Task: "I need to find academic papers for my literature review. My research question is: [Insert RQ]. Please generate 3-5 precise, natural-language queries suitable for a semantic search engine like Elicit or SciSpace to find the most relevant papers. Tailor queries to include fact-checked elements (via Gemini) and real-time trends in AI education (via Grok). Adapted from [cite: 14, 83].\n\nExample Query: "What is the evidence for the effectiveness of integrating generative AI tools into vocational training programs to enhance adaptive skills and lifelong learning in global workforces, including recent developments post-2023?"`,
        recommended: ['ChatGPT', 'Gemini', 'Grok']
      },
      {
        title: 'Get a Thematic Overview of Search Results',
        body:
          `Your Task: "I have a list of 50-75 paper abstracts from my initial search. Please analyze these abstracts using ChatGPT's reasoning for thematic synthesis and Gemini's data analysis for pattern identification. Generate a high-level thematic map or 'List of Concepts,' including visual suggestions like mind maps if multimodal (Gemini). Identify the core themes, recurring variables, main methodologies mentioned, and emerging trends (via Grok)."`,
        recommended: ['ChatGPT', 'Gemini', 'Grok']
      },
      {
        title: 'Extract Key Insights from a Single Paper',
        body:
          `Your Task: [Upload or paste a single paper]. "Please provide a structured summary of this paper, leveraging ChatGPT for technical drafts and Gemini for fact-verification of claims. Include: Main Contribution; Methodology with rigor critique; 3-4 Key Findings (with real-time relevance via Grok); Stated Limitations with mitigations; Relevance to my topic with global implications (Qwen)."`,
        recommended: ['ChatGPT', 'Gemini', 'Qwen', 'Grok']
      }
    ]
  },
  matrix: {
    name: 'Literature Matrix',
    steps: [
      {
        title: 'Define Your Data Extraction Columns',
        body:
          `Your Task: "I am preparing to build a literature review matrix on the topic of [Your Topic]. Please suggest a comprehensive set of 12-15 data extraction columns, using Claude's synthesis for logical grouping and Gemini's analysis for relevance. Include universal columns and 5-7 domain-specific columns (e.g., 'AI Model Used,' 'Pedagogical Framework,' 'Skill Domain Assessed,' 'Cultural Context,' 'Ethical Considerations'). Explain how each column aids in global synthesis (via Qwen)."`,
        recommended: ['Claude', 'Gemini', 'Qwen']
      },
      {
        title: 'The Master Synthesis Prompt for Your Dataset',
        body:
          `Your Task: [Upload your CSV]. "Analyze overall trends; compare interventions & outcomes; evaluate methodological rigor; identify research gaps; and draft 4-5 APA7 paragraphs weaving insights with in-text citations based on the 'Study ID' column. Use Claude for synthesis and Gemini for data trends; integrate Grok and Qwen for real-time and multicultural dimensions."`,
        recommended: ['Claude', 'Gemini', 'Grok', 'Qwen']
      },
      {
        title: 'Two-Part Prompt for Complex Datasets',
        body:
          `Your Task: Part 1 - Analyze CSV structure with Gemini, group columns, explain relevance including multicultural insights (Qwen). Part 2 - Generate a tailored advanced synthesis prompt (Claude) to extract deep thematic insights, compare intervention types, relate to theoretical models (e.g., CLT, TAM), use supporting quote fields, and integrate real-time trends (Grok).`,
        recommended: ['Gemini', 'Claude', 'Qwen', 'Grok']
      }
    ]
  },
  thesis: {
    name: 'Thesis Weaver',
    steps: [
      {
        title: 'Draft Chapter 2 (Literature Review)',
        body:
          `Your Task: [Upload your CSV]. "Based exclusively on the provided articles, write Chapter 2 on [Your Topic]. Structure with: Introduction, Theoretical Foundations, Review of Empirical Studies, Methodological Trends, Cultural and Ethical Dimensions, Research Gaps, Conclusion. Use APA7 in-text citations managed via Manus. Incorporate global perspectives (Qwen). Do not include any information beyond the provided articles."`,
        recommended: ['Claude', 'ChatGPT', 'Manus', 'Qwen']
      },
      {
        title: 'Draft Chapter 3 (Methodology Justification)',
        body:
          `Your Task: "My LR shows limits in [e.g., small samples, lack of qualitative depth, cross-sectional designs, limited global representation]. I plan to use a [e.g., sequential explanatory mixed-methods design with multicultural sampling]. Draft a 600-800 word justification leveraging Manus for research methods; show how this addresses gaps, integrates real-time data (Grok), and connects to RQs with ethical considerations (Claude)."`,
        recommended: ['Manus', 'Claude', 'Grok']
      },
      {
        title: 'Draft Chapter 5 (Discussion)',
        body:
          `Your Task: "I need a discussion draft. My key findings: [3-4 bullets]. Gap addressed: [statement]. Please interpret findings vs literature (with Manus citations), explain how the gap is filled with global implications (Qwen), discuss theoretical/practical implications with creative extensions (Grok), and propose 4-5 directions for future research."`,
        recommended: ['ChatGPT', 'Claude', 'Manus', 'Qwen', 'Grok']
      }
    ]
  },
  companion: {
    name: 'AI Companion',
    steps: [
      {
        title: "Overcoming Writer's Block",
        body:
          `Your Task: "I'm experiencing writer's block while writing the [section]. Act as a Socratic brainstorming partner using Claude's nuanced questions and Grok's creative prompts. Ask 8-10 probing questions about research design, philosophical stance, choices made, real-time AI trends affecting methods, and cross-cultural adaptations, to help me structure my thoughts."`,
        recommended: ['Claude', 'Grok']
      },
      {
        title: 'Preparing for a Supervisor Meeting',
        body:
          `Your Task: "I have a supervisor meeting in two days. Help me structure a 1-2 page document covering: progress with timelines; current challenge with solutions; four questions to ask (with ethical angles via Claude); and a 2-4 week plan with milestones and real-time adjustments."`,
        recommended: ['ChatGPT', 'Claude', 'Grok']
      }
    ]
  },
  notice: {
    title: 'Important Notice for DrPhDAI Users',
    body: `The Guided Prompts within 'How DrPhDAI GAIs Work' were assisted by GAI-powered tools, inspired by and adapted from the structured academic writing templates developed by Chew (2025). Reference:\nChew, C. S. (2025, June 22). Supercharge Your Literature Review with ChatGPT, AI Tools & Advanced Prompt (SciSpace, Elicit and ChatGPT). [Lecture notes]. Online workshop conducted by E-Research Skills.`
  }
};
