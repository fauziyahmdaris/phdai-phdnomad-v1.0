import { Module } from '../types/microlearning';

export const microlearningModules: Module[] = [
  {
    id: 'M1',
    title: 'Mastering the Literature Review',
    description: 'Equip postgraduate students with the skills and AI tools to conduct a comprehensive, critical, and compelling literature review that identifies significant research gaps and provides a strong rationale for their thesis.',
    objective: 'Master the art of literature review writing with AI-powered tools and critical thinking frameworks',
    order: 1,
    totalDuration: 45,
    completionBadge: '🎓',
    topics: [
      {
        id: 'T1.1',
        moduleId: 'M1',
        title: 'Understanding the Purpose of a Literature Review',
        description: 'Define the core purpose of a literature review, beyond mere summarization, and introduce the concept of identifying research gaps.',
        objective: 'To define the core purpose of a literature review, beyond mere summarization, and introduce the concept of identifying research gaps.',
        order: 1,
        estimatedDuration: 6,
        learningBites: [
          {
            id: 'LB1.1.1',
            topicId: 'T1.1',
            title: 'Beyond Summarizing: Why Lit Review Matters',
            content: `Many students see the literature review as just a summary of what others have written. But it's far more than that! A literature review is your chance to show deep understanding of your field, identify existing knowledge, and, most importantly, pinpoint where your research fits in. It sets the stage for your original contribution. Think of it as building a persuasive case for why your research needs to happen.`,
            duration: 1.5,
            type: 'text',
            keywords: ['literature review', 'research purpose', 'academic writing'],
            aiIntegration: {
              prompts: ["DrPhDAI, what's the key difference between a good literature review and a mere summary?"],
              tools: ['AI Literature Review Planner'],
              activities: ['Use the AI Literature Review Planner to draft 3 bullet points on what a strong literature review achieves for a PhD thesis.']
            },
            gagneEvents: ['Gain Attention', 'Inform Objectives'],
            arcsElements: ['Attention (intriguing question)', 'Relevance (direct link to thesis)'],
            isDownloadable: true,
            order: 1
          },
          {
            id: 'LB1.1.2',
            topicId: 'T1.1',
            title: 'The "Gap": Identifying What\'s Missing in Research',
            content: `The heart of a strong literature review is identifying a 'gap' in the existing research. This means finding what hasn't been studied, what's contradictory, or what needs further investigation. Your entire thesis hinges on filling this gap. It's about showing that while much research exists, there's a specific, significant question or problem that your study will address. Without a clear gap, your research lacks a compelling rationale.

Example: "The process of developing a topic is ultimately one of establishing a gap in current research that a thesis could aim to address."`,
            duration: 2,
            type: 'text',
            keywords: ['research gap', 'thesis rationale', 'literature analysis'],
            aiIntegration: {
              prompts: ["DrPhDAI, give me an example of a research gap you've seen in a recent interdisciplinary study."],
              tools: ['AI Gap Analyzer'],
              activities: ['Using the AI Gap Analyzer, analyze the following short paragraph describing existing research and identify potential gaps or unexplored areas.']
            },
            gagneEvents: ['Present Content', 'Provide Guidance'],
            arcsElements: ['Relevance (critical to thesis success)', 'Confidence (tool to help identify)'],
            isDownloadable: true,
            order: 2
          },
          {
            id: 'LB1.1.3',
            topicId: 'T1.1',
            title: 'Building Your Research Rationale: The "Why" of Your Study',
            content: `Once you identify the gap, you need to articulate your research rationale. This is the 'why' – why your specific study is necessary and important. It connects the identified gap directly to your proposed research questions and objectives. A strong rationale persuades your readers (and examiners!) that your contribution is significant and original. It's the logical bridge between 'what's known' and 'what you will investigate'.

Example: A research proposal should include "a brief literature review that highlights the gap in research that your research aims to address, the scope of your research, aims and objectives, proposed methodology, data analysis and implications of the research."`,
            duration: 2.5,
            type: 'text',
            keywords: ['research rationale', 'thesis justification', 'academic argument'],
            aiIntegration: {
              prompts: [],
              tools: ['AI Rationale Builder'],
              activities: ['Based on your identified research gap, draft a 3-sentence rationale for your study. Focus on its significance and contribution to the field.']
            },
            gagneEvents: ['Present Content', 'Elicit Performance', 'Provide Feedback'],
            arcsElements: ['Confidence (structured approach to writing)', 'Satisfaction (seeing their rationale take shape)'],
            isDownloadable: true,
            order: 3
          }
        ]
      },
      {
        id: 'T1.2',
        moduleId: 'M1',
        title: 'Strategies for Effective Literature Searching',
        description: 'Equip students with advanced search techniques and awareness of diverse literature sources to build a robust literature base.',
        objective: 'To equip students with advanced search techniques and awareness of diverse literature sources to build a robust literature base.',
        order: 2,
        estimatedDuration: 5,
        learningBites: [
          {
            id: 'LB1.2.1',
            topicId: 'T1.2',
            title: 'From Keywords to Goldmines: Advanced Search Techniques',
            content: `Effective literature searching goes beyond simple keywords. Master advanced techniques like Boolean operators (AND, OR, NOT), wildcards (*), truncation, and phrase searching ('exact phrase'). Explore subject-specific databases (e.g., PubMed for medicine, PsycINFO for psychology, Scopus/Web of Science for broad coverage) in addition to general academic search engines like Google Scholar. Each database has its own strengths and search functionalities.`,
            duration: 1.5,
            type: 'text',
            keywords: ['literature search', 'Boolean operators', 'academic databases'],
            aiIntegration: {
              prompts: ['DrPhDAI, suggest 3 advanced search string examples for "adaptive microlearning in postgraduate education".'],
              tools: ['AI Keyword Expander'],
              activities: ['Use the AI Keyword Expander to generate synonyms and related terms for your research topic.']
            },
            gagneEvents: ['Present Content', 'Provide Guidance'],
            arcsElements: ['Relevance (direct application to research)', 'Confidence (providing tools for better search)'],
            isDownloadable: true,
            order: 1
          },
          {
            id: 'LB1.2.2',
            topicId: 'T1.2',
            title: 'Beyond Databases: Grey Literature & Niche Sources',
            content: `Not all valuable research is published in peer-reviewed journals. 'Grey literature' – such as conference proceedings, theses and dissertations, technical reports, government documents, and policy papers – can offer unique insights and very current information. Also, explore professional association websites, specialized archives, and even connect with experts in your field for recommendations. Be critical of all sources, but don't limit your scope.`,
            duration: 1.5,
            type: 'text',
            keywords: ['grey literature', 'conference proceedings', 'research sources'],
            aiIntegration: {
              prompts: ['DrPhDAI, where would I find grey literature on AI-Pedagogy frameworks?'],
              tools: ['AI Source Suggestor'],
              activities: ['Input your research topic and get suggestions for relevant grey literature sources and specialized databases.']
            },
            gagneEvents: ['Present Content', 'Stimulate Recall'],
            arcsElements: ['Relevance (widens research scope)', 'Self-Directed (encourages broader exploration)'],
            isDownloadable: true,
            order: 2
          },
          {
            id: 'LB1.2.3',
            topicId: 'T1.2',
            title: 'Keeping Track: Introduction to Citation Management',
            content: `As you gather literature, effective organization is key. Citation management tools (e.g., Zotero, Mendeley, EndNote) are essential. They help you:

• Collect and organize references
• Generate citations and bibliographies in various styles (APA, MLA, Chicago, etc.)
• Annotate PDFs and add notes

Starting early saves immense time and stress later in your thesis writing process.`,
            duration: 2,
            type: 'text',
            keywords: ['citation management', 'Zotero', 'reference organization'],
            aiIntegration: {
              prompts: ['DrPhDAI, what are the top 3 features I should look for in a citation manager for my PhD research?'],
              tools: ['Citation Manager Setup Guide'],
              activities: ['Follow the step-by-step guide to set up your preferred citation management tool.']
            },
            gagneEvents: ['Provide Guidance', 'Assess Performance'],
            arcsElements: ['Confidence (practical skill, tool provision)'],
            isDownloadable: true,
            order: 3
          }
        ]
      },
      {
        id: 'T1.3',
        moduleId: 'M1',
        title: 'Critical Reading & Annotation',
        description: 'Develop students\' ability to critically evaluate and effectively annotate research literature.',
        objective: 'To develop students\' ability to critically evaluate and effectively annotate research literature.',
        order: 3,
        estimatedDuration: 6,
        learningBites: [
          {
            id: 'LB1.3.1',
            topicId: 'T1.3',
            title: 'Beyond Reading: Active Annotation Techniques',
            content: `Passive reading won't cut it for a PhD. You need to actively engage with the text. Annotation is your dialogue with the paper. Techniques include:

• Highlighting key arguments, findings, and methodologies
• Writing questions, counter-arguments, and connections to your own research in the margins
• Summarizing sections in your own words
• Identifying strengths, weaknesses, and potential biases

This builds your critical thinking and helps you recall information later.`,
            duration: 1.5,
            type: 'interactive',
            keywords: ['annotation', 'critical reading', 'active learning'],
            aiIntegration: {
              prompts: [],
              tools: ['Interactive Annotation Practice'],
              activities: ['Practice annotating a sample academic paragraph with AI feedback on annotation quality and depth.']
            },
            gagneEvents: ['Present Content', 'Elicit Performance'],
            arcsElements: ['Confidence (practical skill)', 'Self-Regulated (encourages active engagement)'],
            isDownloadable: true,
            order: 1
          },
          {
            id: 'LB1.3.2',
            topicId: 'T1.3',
            title: 'Deconstructing Research: Identifying Strengths and Weaknesses',
            content: `A critical reader evaluates every paper. Don't just accept findings; question them. Ask:

• What are the authors' assumptions?
• Are the methods robust and appropriate?
• Are the conclusions supported by the evidence presented?
• What are the limitations acknowledged (or unacknowledged)?
• How does this study relate to (or contradict) other research?

This deep analysis forms the basis of your own critical synthesis in your literature review.`,
            duration: 2,
            type: 'text',
            keywords: ['critical analysis', 'research evaluation', 'methodology assessment'],
            aiIntegration: {
              prompts: ['DrPhDAI, I\'ve just read a paper using a qualitative case study method. What are common strengths and weaknesses I should look for in this type of research?'],
              tools: [],
              activities: ['Analyze a research paper using the provided critical evaluation checklist.']
            },
            gagneEvents: ['Provide Guidance', 'Stimulate Recall'],
            arcsElements: ['Confidence (structured approach to critique)'],
            isDownloadable: true,
            order: 2
          },
          {
            id: 'LB1.3.3',
            topicId: 'T1.3',
            title: 'Spotting "Strategic Vagueness": What Authors Don\'t Say',
            content: `Academic writing can sometimes employ 'strategic vagueness' – where authors are less specific to make their claims appear stronger or to avoid providing information that might contradict their argument. Be alert to vague phrases like 'it has been found that...' or 'many studies suggest...'. As a critical reader, ask: 'Who found this? Which studies? How many?' Seeking specificity helps you assess the true strength and depth of the evidence.

Example: "A reader might ask why the author hasn't spelt out more about these studies: the number of them, the countries in which they were carried out, the degree to which their results supported each other's findings, and so on."`,
            duration: 2.5,
            type: 'interactive',
            keywords: ['strategic vagueness', 'critical analysis', 'academic writing'],
            aiIntegration: {
              prompts: [],
              tools: ['Vagueness Detector'],
              activities: ['Use the AI Vagueness Detector to identify and analyze vague phrases in academic texts.']
            },
            gagneEvents: ['Present Content', 'Elicit Performance', 'Provide Feedback'],
            arcsElements: ['Attention (intriguing concept)', 'Confidence (tool for critical analysis)'],
            isDownloadable: true,
            order: 3
          }
        ]
      },
      {
        id: 'T1.4',
        moduleId: 'M1',
        title: 'Structuring Your Literature Review',
        description: 'Guide students in organizing their literature review effectively, distinguishing between summarization and synthesis.',
        objective: 'To guide students in organizing their literature review effectively, distinguishing between summarization and synthesis.',
        order: 4,
        estimatedDuration: 6,
        learningBites: [
          {
            id: 'LB1.4.1',
            topicId: 'T1.4',
            title: 'Thematic vs. Chronological: Choosing Your Flow',
            content: `Literature reviews are typically structured either thematically or chronologically.

**Thematic:** Grouping research by recurring themes, concepts, or sub-topics relevant to your argument. This is often preferred for showing connections and distinctions across studies, and building a persuasive case for your own research gap.

**Chronological:** Presenting research in the order it was published. Useful for tracing the historical development of an idea, but can sometimes lead to a mere summary without critical synthesis.

Choose the structure that best supports your thesis's argument and rationale.`,
            duration: 1.5,
            type: 'text',
            keywords: ['literature structure', 'thematic organization', 'chronological review'],
            aiIntegration: {
              prompts: ['DrPhDAI, when is a chronological literature review structure more appropriate than a thematic one?'],
              tools: ['Literature Review Outline Builder'],
              activities: ['Create a thematic outline structure for your literature review using AI suggestions.']
            },
            gagneEvents: ['Present Content', 'Provide Guidance', 'Elicit Performance'],
            arcsElements: ['Relevance (practical application)', 'Confidence (tool for organization)'],
            isDownloadable: true,
            order: 1
          },
          {
            id: 'LB1.4.2',
            topicId: 'T1.4',
            title: 'Crafting Effective Paragraphs: Cohesion & Flow',
            content: `Each paragraph in your literature review should contribute to your overall argument and seamlessly transition from the previous one. Ensure 'cohesion' or 'flow' by:

• Using clear topic sentences
• Connecting ideas within and between sentences using transition words (e.g., 'however,' 'furthermore,' 'in contrast')
• Linking back to your main argument or the identified research gap

Avoid presenting studies as isolated summaries; instead, synthesize them to build a coherent narrative.`,
            duration: 2,
            type: 'text',
            keywords: ['paragraph structure', 'cohesion', 'academic flow'],
            aiIntegration: {
              prompts: [],
              tools: ['Cohesion & Flow Checker'],
              activities: ['Submit a paragraph for AI analysis of transitions and flow, with suggestions for improvement.']
            },
            gagneEvents: ['Present Content', 'Elicit Performance', 'Provide Feedback'],
            arcsElements: ['Confidence (immediate feedback on writing)'],
            isDownloadable: true,
            order: 2
          },
          {
            id: 'LB1.4.3',
            topicId: 'T1.4',
            title: 'Integrating Evidence: Citing & Synthesizing',
            content: `Your literature review isn't just a list of citations; it's a synthesis of ideas. Integrate sources smoothly into your prose rather than just dropping quotes. Paraphrase and summarize effectively, always crediting the original authors. Explain how different studies relate to each other, identify points of agreement or disagreement, and show how they collectively inform your research question. This demonstrates your critical thinking and analytical skills.`,
            duration: 2.5,
            type: 'text',
            keywords: ['citation integration', 'synthesis', 'academic writing'],
            aiIntegration: {
              prompts: [],
              tools: ['Citation Integrator', 'Synthesis Assistant'],
              activities: ['Practice integrating citations smoothly and synthesizing multiple sources with AI guidance.']
            },
            gagneEvents: ['Provide Guidance', 'Elicit Performance', 'Provide Feedback'],
            arcsElements: ['Confidence (practical support for complex task)'],
            isDownloadable: true,
            order: 3
          }
        ]
      },
      {
        id: 'T1.5',
        moduleId: 'M1',
        title: 'Language of Persuasion in Literature Review',
        description: 'Make students aware of the subtle persuasive elements in academic writing and how to use them ethically in their literature review.',
        objective: 'To make students aware of the subtle persuasive elements in academic writing and how to use them ethically in their literature review.',
        order: 5,
        estimatedDuration: 6,
        learningBites: [
          {
            id: 'LB1.5.1',
            topicId: 'T1.5',
            title: 'Degrees of Certainty: Hedges & Boosters',
            content: `Academic writing, despite its objective facade, employs persuasive language. 'Hedges' (e.g., 'may,' 'might,' 'suggests,' 'appears to') express caution or probability, indicating a degree of uncertainty. 'Boosters' (e.g., 'clearly,' 'demonstrates,' 'proves,' 'undeniably') express certainty or strong conviction. Learn to use both appropriately to accurately represent the strength of your claims and the evidence you cite. Overuse of either can weaken your argument.`,
            duration: 1.5,
            type: 'text',
            keywords: ['hedges', 'boosters', 'academic language'],
            aiIntegration: {
              prompts: [],
              tools: ['Hedge/Booster Analyzer'],
              activities: ['Analyze your writing for appropriate use of hedges and boosters with AI feedback.']
            },
            gagneEvents: ['Present Content', 'Provide Guidance'],
            arcsElements: ['Attention (revealing hidden aspects of academic writing)', 'Confidence (tool for self-correction)'],
            isDownloadable: true,
            order: 1
          },
          {
            id: 'LB1.5.2',
            topicId: 'T1.5',
            title: 'Implicit Persuasion: Beyond Explicit Claims',
            content: `Persuasion isn't always explicit. It can be 'covert' or 'implicit' through how you frame information, choose vocabulary, or structure your arguments. For example, contrasting studies in a way that subtly elevates one over another, or using emotionally charged (yet still academic) language. Being aware of these subtle influences in the literature you read, and consciously employing them in your own writing (ethically!), can strengthen your persuasive power.`,
            duration: 2,
            type: 'text',
            keywords: ['implicit persuasion', 'framing', 'academic rhetoric'],
            aiIntegration: {
              prompts: [],
              tools: ['Implicit Framing Detector'],
              activities: ['Identify implicit framing techniques in academic texts and understand their persuasive impact.']
            },
            gagneEvents: ['Present Content', 'Elicit Performance'],
            arcsElements: ['Attention (uncovering hidden dynamics)', 'Self-Regulated (metacognition about writing)'],
            isDownloadable: true,
            order: 2
          },
          {
            id: 'LB1.5.3',
            topicId: 'T1.5',
            title: 'Establishing Your Voice: Academic Authority',
            content: `As a PhD student, your literature review is where you begin to establish your own academic voice and authority. While building on others' work, you must also demonstrate independent critical thought. This means moving beyond just reporting what others said to actively synthesizing, critiquing, and arguing for your unique position within the academic conversation. Your analysis, not just the information, builds your authority.`,
            duration: 2.5,
            type: 'text',
            keywords: ['academic voice', 'authority', 'critical thinking'],
            aiIntegration: {
              prompts: [],
              tools: ['Voice & Authority Builder'],
              activities: ['Develop your analytical voice with AI feedback on strengthening critical paragraphs.']
            },
            gagneEvents: ['Elicit Performance', 'Provide Feedback', 'Assess Performance'],
            arcsElements: ['Empowerment (developing personal voice)', 'Satisfaction (visible improvement)'],
            isDownloadable: true,
            order: 3
          }
        ]
      }
    ]
  },
  {
    id: 'M2',
    title: 'Crafting Your Thesis Introduction (Chapter 1)',
    description: 'Guide postgraduate students in constructing a robust and persuasive thesis introduction (Chapter 1) that clearly establishes the research field, justifies the study, and outlines the thesis structure.',
    objective: 'Master the art of writing compelling thesis introductions that establish research context and justify your study',
    order: 2,
    totalDuration: 40,
    completionBadge: '📝',
    topics: [
      {
        id: 'T2.1',
        moduleId: 'M2',
        title: 'The Multifaceted Role of Chapter 1',
        description: 'Understand the essential functions of a thesis introduction and its typical "moves."',
        objective: 'To understand the essential functions of a thesis introduction and its typical "moves."',
        order: 1,
        estimatedDuration: 6,
        learningBites: [
          {
            id: 'LB2.1.1',
            topicId: 'T2.1',
            title: 'Your Thesis Story: Introducing the Whole Journey',
            content: `Your thesis introduction (Chapter 1) is not just an opening; it's a comprehensive overview of your entire research journey. It introduces your topic, provides essential background, justifies your study's significance, and guides the reader through your thesis structure. Think of it as the 'hook' that draws your reader in and provides the roadmap for what's to come.

Example: "Depending on the scope of your proposal, the introduction will contain a number of sub-sections... background to the study, the significance of the study/ aims and significance of the study, the statement of the problem, research questions and hypotheses, definitions."`,
            duration: 1.5,
            type: 'text',
            keywords: ['thesis introduction', 'chapter 1', 'research overview'],
            aiIntegration: {
              prompts: ['DrPhDAI, if Chapter 1 is the \'roadmap\', what\'s the most common reason students get lost in writing it?'],
              tools: [],
              activities: ['List 3 key pieces of information an examiner expects to find in your Chapter 1.']
            },
            gagneEvents: ['Gain Attention', 'Inform Objectives'],
            arcsElements: ['Relevance (direct link to thesis)', 'Attention (using metaphor)'],
            isDownloadable: true,
            order: 1
          },
          {
            id: 'LB2.1.2',
            topicId: 'T2.1',
            title: 'Hooking Your Reader: The Art of the Opening',
            content: `The first paragraph of your introduction is crucial. It needs to capture your reader's attention and broadly introduce your field of study. Start with a general statement that sets the context, then gradually narrow down to your specific area. Avoid jargon initially, and aim for clarity and engagement. This is your chance to make a strong first impression.`,
            duration: 1.5,
            type: 'text',
            keywords: ['opening paragraph', 'reader engagement', 'thesis hook'],
            aiIntegration: {
              prompts: [],
              tools: ['Opening Hook Generator'],
              activities: ['Generate and refine different types of opening statements for your thesis introduction.']
            },
            gagneEvents: ['Present Content', 'Elicit Performance'],
            arcsElements: ['Attention (practical skill)', 'Confidence (tool to assist)'],
            isDownloadable: true,
            order: 2
          },
          {
            id: 'LB2.1.3',
            topicId: 'T2.1',
            title: 'The "Moves" of an Introduction: From General to Specific',
            content: `Academic introductions often follow a pattern, moving from general to specific to establish the research 'space'. This typically involves:

• **Establishing the field:** Broad background, current knowledge
• **Summarising previous research:** Briefly highlighting key studies leading to the gap
• **Preparing for present research:** Stating your problem, gap, and research questions

Mastering these 'moves' helps structure a compelling and logical introduction.`,
            duration: 2,
            type: 'interactive',
            keywords: ['introduction structure', 'research moves', 'academic writing'],
            aiIntegration: {
              prompts: ['DrPhDAI, explain the concept of \'establishing a research space\' in Chapter 1.'],
              tools: ['Introduction Flowchart Builder'],
              activities: ['Build an interactive flowchart of your introduction structure with AI guidance.']
            },
            gagneEvents: ['Present Content', 'Provide Guidance'],
            arcsElements: ['Confidence (clear structure)', 'Relevance (direct application)'],
            isDownloadable: true,
            order: 3
          }
        ]
      },
      {
        id: 'T2.2',
        moduleId: 'M2',
        title: 'Establishing the Research Field',
        description: 'Teach students how to effectively contextualize their research within the broader academic landscape.',
        objective: 'To teach students how to effectively contextualize their research within the broader academic landscape.',
        order: 2,
        estimatedDuration: 5,
        learningBites: [
          {
            id: 'LB2.2.1',
            topicId: 'T2.2',
            title: 'Broad Strokes: Defining Your Academic Landscape',
            content: `Before diving into your specific topic, you need to define the broader academic field your research belongs to. What are the major debates, theories, or foundational works that underpin your area? This section demonstrates to your reader that you understand the larger context and can situate your work within it. It's about providing the necessary background for your specific research problem to make sense.`,
            duration: 1.5,
            type: 'text',
            keywords: ['academic field', 'research context', 'theoretical background'],
            aiIntegration: {
              prompts: [],
              tools: ['Field Contextualizer'],
              activities: ['Map your research topic to broader academic disciplines and identify key foundational concepts.']
            },
            gagneEvents: ['Present Content', 'Provide Guidance'],
            arcsElements: ['Relevance (setting stage for research)'],
            isDownloadable: true,
            order: 1
          },
          {
            id: 'LB2.2.2',
            topicId: 'T2.2',
            title: 'Key Concepts: Defining Terms for Clarity',
            content: `In your introduction, it's often crucial to define key terms, concepts, or theoretical frameworks that are central to your research. This ensures clarity and avoids ambiguity, especially for readers who might not be specialists in your exact niche. Define terms concisely and, if necessary, explain their relevance to your study. This shows precision and intellectual rigor.`,
            duration: 1.5,
            type: 'text',
            keywords: ['concept definition', 'terminology', 'academic precision'],
            aiIntegration: {
              prompts: [],
              tools: ['Concept Definition Assistant'],
              activities: ['Create clear, concise definitions for key terms in your research with AI assistance.']
            },
            gagneEvents: ['Provide Guidance', 'Elicit Performance'],
            arcsElements: ['Confidence (assistance with precision)'],
            isDownloadable: true,
            order: 2
          },
          {
            id: 'LB2.2.3',
            topicId: 'T2.2',
            title: 'Positioning Your Work: Where Do You Fit In?',
            content: `Once you've established the broader field, you need to position your specific work within it. This involves briefly indicating how your research relates to the existing body of knowledge. Are you building on a particular theory? Challenging a prevailing assumption? Applying a known method to a new context? This early positioning helps to articulate your contribution from the outset.`,
            duration: 2,
            type: 'text',
            keywords: ['research positioning', 'academic contribution', 'knowledge building'],
            aiIntegration: {
              prompts: ['DrPhDAI, based on your current understanding of your field, how would you describe your research\'s relationship to existing knowledge in one sentence?'],
              tools: [],
              activities: ['Craft a positioning statement that clearly articulates how your research relates to existing knowledge.']
            },
            gagneEvents: ['Elicit Performance', 'Stimulate Recall'],
            arcsElements: ['Self-Directed (encourages reflective positioning)'],
            isDownloadable: true,
            order: 3
          }
        ]
      }
    ]
  }
];