export type LiteratureEntry = {
  cluster: string;
  title: string;
  authors?: string;
  year?: string;
  venue?: string;
  doi?: string;
  url: string;
  note: string;
};

export const phdResearchContext = {
  researcher: {
    name: 'Fauziyah Md Aris (Qash Aris)',
    workingTitle:
      'AI as Relational Life Partner for Human Flourishing: A Nomadic Practice-as-Research Study of Cognition, Creativity, and Identity Expansion - A Transformative Framework for Doctoral Learning and Human Flourishing',
    mode: ['Nomadic', 'Sovereign', 'Interdisciplinary'],
    lens: ['QASHARIS Framework', 'E9 Principles', 'AI-Pedagogical Diagnostic Engine'],
  },
  primaryResearchQuestion:
    'How can AI function as a relational life partner that expands human cognition, creativity, and identity toward human flourishing through embodied creative practice?',
  keywordsByCluster: {
    'AI Relationality & Partnering': [
      'Relational AI',
      'Human-AI co-creation',
      'AI as cognitive partner',
      'Human-AI symbiosis',
      'Agentic AI / Adaptive AI systems',
      'Parasocial AI interaction',
      'AI anthropomorphism',
    ],
    'Human Flourishing & Well-being': [
      'Human flourishing + AI',
      'AI and well-being',
      'Positive technology',
      'AI and emotional intelligence',
      'Eudaimonic well-being + digital environments',
      'AI and identity expansion',
    ],
    'Cognition, Creativity & Identity': [
      'Extended creativity (AI-augmented)',
      'Distributed cognition + AI',
      'Human-AI co-creative systems',
      'Cognitive augmentation',
      'Creative identity + technology',
      'AI and self-authorship',
      'Generative AI and creative practice',
    ],
    'Embodied Creative Practice': [
      'Embodied creative practice',
      'Practice-as-Research (PaR)',
      'Arts-based research methodology',
      'Embodied learning + digital media',
      'Creative pedagogy + AI',
      'Filmmaking as research',
      'Arts-led inquiry',
    ],
    'Nomadic & Transdisciplinary Methodology': [
      'Nomadic inquiry',
      'Nomadic subjectivity (Braidotti)',
      'Transdisciplinary research methodology',
      'Design-Development Research (DDR)',
      'Autoethnography + AI',
      'Mobile / rhizomatic learning',
    ],
    'AI Pedagogy & Doctoral Learning': [
      'AI in doctoral education',
      'Postgraduate pedagogy + AI',
      'Agentic-adaptive learning frameworks',
      'AI-enhanced doctoral supervision',
      'Generative AI in higher education',
      'AI literacy + metacognition',
      'AI writing pedagogy',
    ],
  },
  recommendedLiteratureByCluster: [
    {
      cluster: 'Human-AI Co-Creation & Relational Dynamics',
      title: 'Introducing the concept of relational processes in Human-AI creativity.',
      authors: 'Valverde-Valencia, À.',
      year: '2025',
      venue: 'Hipertext.net, 31, 55–66',
      doi: '10.31009/hipertext.net.2025.i31.06',
      url: 'https://doi.org/10.31009/hipertext.net.2025.i31.06',
      note:
        'Reviews creativity as mutual influence processes where human and AI collaborate iteratively; anchors AI as relational partner (not tool).',
    },
    {
      cluster: 'Human-AI Co-Creation & Relational Dynamics',
      title: 'Human–AI collaboration reshapes the very fabric of intersubjectivity.',
      year: '2025',
      doi: '10.3389/fpsyg.2025.1736730',
      url: 'https://doi.org/10.3389/fpsyg.2025.1736730',
      note:
        'Frames AI beyond tool into quasi-subjective partner; supports co-evolving identity/cognition partner framing.',
    },
    {
      cluster: 'Human-AI Co-Creation & Relational Dynamics',
      title: 'Augmented Learning for Joint Creativity in Human-GenAI Co-Creation.',
      authors: 'Luan, L., Kim, Y.J., & Zhou, J.',
      year: '2025',
      venue: 'Information Systems Research',
      doi: '10.1287/isre.2024.0984',
      url: 'https://doi.org/10.1287/isre.2024.0984',
      note:
        'Reconceptualizes augmented learning and provides evidence for how co-creation enhances joint creativity over time; supports AI-expanded cognition.',
    },
    {
      cluster: 'Human-AI Co-Creation & Relational Dynamics',
      title:
        'From Humans to AI: Understanding why AI is perceived as the preferred co-creation partner.',
      year: '2025',
      url: 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1695532',
      note:
        'Shows co-creation preferences are context-dependent; supports nomadic/variable conditions of AI partnership.',
    },
    {
      cluster: 'Extended Creativity & Cognitive Augmentation',
      title: 'Extended Creativity: A Conceptual Framework',
      year: '2025',
      venue: 'arXiv:2506.10249',
      url: 'https://arxiv.org/abs/2506.10249',
      note:
        'Proposes Support → Synergy → Symbiosis taxonomy; use as scaffold for relational life partner continuum (symbiosis end).',
    },
    {
      cluster: 'Extended Creativity & Cognitive Augmentation',
      title: 'Human-AI coevolution.',
      authors: 'Pedreschi et al.',
      year: '2024',
      venue: 'Artificial Intelligence, 339, 104244',
      doi: '10.1016/j.artint.2024.104244',
      url: 'https://doi.org/10.1016/j.artint.2024.104244',
      note:
        'Theoretical grounding for co-evolution framing (identity/cognition/creativity expanding together).',
    },
    {
      cluster: 'Extended Creativity & Cognitive Augmentation',
      title:
        'Designing creative AI partners with COFI: A framework for modeling interaction in human-AI co-creative systems.',
      authors: 'Rezwana, J. & Maher, M.L.',
      year: '2023',
      venue: 'ACM Transactions on Computer-Human Interaction, 30(5)',
      doi: '10.1145/3519026',
      url: 'https://doi.org/10.1145/3519026',
      note:
        'Formal interaction framework for co-creative systems; useful comparator for QASHARIS Framework.',
    },
    {
      cluster: 'AI Pedagogy, Doctoral Learning & Postgraduate Education',
      title: "Negotiating Meaning with Machines: AI's Role in Doctoral Writing Pedagogy.",
      year: '2024',
      venue: 'International Journal of Artificial Intelligence in Education (Springer Nature)',
      doi: '10.1007/s40593-024-00425-x',
      url: 'https://doi.org/10.1007/s40593-024-00425-x',
      note:
        'Doctoral writing pedagogy + AI; supports O.M.A.R. integration and agentic-adaptive doctoral support framing.',
    },
    {
      cluster: 'AI Pedagogy, Doctoral Learning & Postgraduate Education',
      title: 'Use of AI Tools by Doctoral Students',
      year: '2025',
      venue: 'Journal of Further and Higher Education (Taylor & Francis)',
      doi: '10.1080/0309877X.2025.2515135',
      url: 'https://doi.org/10.1080/0309877X.2025.2515135',
      note:
        'Provides adoption statistic shift (2024→2025); supports Chapter 1 framing and doctoral-specific patterns of use.',
    },
    {
      cluster: 'AI Pedagogy, Doctoral Learning & Postgraduate Education',
      title:
        'Generative Artificial Intelligence in Pedagogical Practices: A Systematic Review of Empirical Studies (2022–2024).',
      year: '2025',
      url: 'https://www.researchgate.net/publication/390568217',
      note:
        'Systematic review anchor for broader landscape and gap justification.',
    },
    {
      cluster: 'Human Flourishing & AI Well-being',
      title: 'AI and Flourishing.',
      year: '2025',
      venue: 'Harvard Human Flourishing Program',
      url: 'https://hfh.fas.harvard.edu',
      note:
        'Institutional legitimacy anchor for AI + flourishing framing; useful for theoretical positioning and Chapter 1.',
    },
    {
      cluster: 'Human Flourishing & AI Well-being',
      title: 'Symbiotic AI: The Future of Human-AI Collaboration.',
      year: '2025',
      venue: 'AI Asia Pacific Institute',
      url: 'https://aiasiapacific.org/2025/05/28/symbiotic-ai-the-future-of-human-ai-collaboration/',
      note:
        'Supports symbiotic/collective intelligence argument and human flourishing orientation.',
    },
    {
      cluster: 'Nomadic Methodology & Practice-as-Research (Foundational)',
      title: 'Nomadic Theory',
      authors: 'Rosi Braidotti',
      year: '2011',
      url: 'https://www.wiley.com/en-us/Nomadic+Theory%3A+The+Portable+Rosi+Braidotti-p-9780230238414',
      note: 'Foundational nomadic ontology reference.',
    },
    {
      cluster: 'Nomadic Methodology & Practice-as-Research (Foundational)',
      title: 'Practice as Research in the Arts',
      authors: 'Robin Nelson',
      year: '2013',
      url: 'https://link.springer.com/book/10.1057/9781137282910',
      note: 'Methodological bedrock for PaR framing.',
    },
    {
      cluster: 'Nomadic Methodology & Practice-as-Research (Foundational)',
      title: 'A Thousand Plateaus',
      authors: 'Gilles Deleuze & Félix Guattari',
      url: 'https://www.upress.umn.edu/9780816614028/a-thousand-plateaus/',
      note: 'Rhizomatic/nomadic theory underpinning transdisciplinary stance.',
    },
    {
      cluster: 'Nomadic Methodology & Practice-as-Research (Foundational)',
      title: 'Staying with the Trouble',
      authors: 'Donna Haraway',
      year: '2016',
      url: 'https://www.dukeupress.edu/staying-with-the-trouble',
      note: 'Entangled human-nonhuman relations; aligns with relational AI framing.',
    },
    {
      cluster: 'Nomadic Methodology & Practice-as-Research (Foundational)',
      title: 'Meeting the Universe Halfway',
      authors: 'Karen Barad',
      url: 'https://www.dukeupress.edu/meeting-the-universe-halfway',
      note: 'Posthuman performativity; supports identity expansion claims.',
    },
  ] satisfies LiteratureEntry[],
} as const;

export const phdResearchKeywordsFlat = Object.values(
  phdResearchContext.keywordsByCluster,
).flat();
