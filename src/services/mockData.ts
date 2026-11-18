import {
  Member,
  FourTeam,
  Project,
  BuildChallenge,
  Mentor,
  BookedSession,
  Circle,
  CareerOpportunity,
  AppNotification,
  ChatThread,
  UserSettings,
} from '../types';

export const CURRENT_USER: Member = {
  id: 'user-self',
  name: 'Venkata Sai Kumar',
  username: 'venkatasai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  role: 'build',
  roleTitle: 'Full-Stack & Systems Engineer',
  location: 'Hyderabad, Telangana',
  matchScore: 98,
  whyMatched: 'Your current persona profile',
  bio: 'Building distributed AI microservices & high-concurrency web systems. Passionate about bringing Telugu NLP models to production.',
  ambition: 'Start a startup',
  buildingStatus: 'Building',
  languages: ['Telugu', 'English', 'Hindi'],
  yearsExperience: 3,
  skills: [
    { name: 'TypeScript & React', category: 'Technical', level: 'Expert', evidence: 'Project' },
    { name: 'Python & FastAPI', category: 'Technical', level: 'Advanced', evidence: 'Portfolio' },
    { name: 'PostgreSQL & Redis', category: 'Technical', level: 'Advanced', evidence: 'Endorsed' },
    { name: 'System Design', category: 'Technical', level: 'Intermediate', evidence: 'Project' },
    { name: 'Product Scoping', category: 'Business', level: 'Intermediate', evidence: 'Self-reported' },
    { name: 'Team Leadership', category: 'People', level: 'Intermediate', evidence: 'Endorsed' }
  ],
  offer: [
    'Scalable backend architecture & API design',
    'Real-time WebSockets & state synchronization',
    'Fast prototyping to working MVP'
  ],
  need: [
    'Senior UI/UX designer for product polish & design system',
    'Go-to-market strategist for B2B founder outreach',
    'Data researcher experienced in fine-tuning Indic LLMs'
  ],
  goals: {
    thirtyDay: 'Assemble a complementary five-person team and ship an MVP',
    ninetyDay: 'Deploy pilot with 100 paid beta users in Andhra/Telangana',
    longTerm: 'Build a sustainable deep-tech venture based out of Hyderabad'
  },
  workingStyle: {
    soloVsTeam: 70, // prefers team
    leaderVsExecutor: 60,
    hoursPerWeek: 25,
    timeZone: 'IST (UTC+5:30)',
    remoteHybrid: 'Hybrid'
  },
  portfolio: {
    github: 'https://github.com/venkatasai',
    liveProject: 'https://telugu-indic-tools.dev'
  },
  builderJourney: [
    { id: 'bj-1', year: '2026', type: 'built', title: 'Shipped Telugu Speech-to-Text Microservice', description: 'Benchmarked 94% WER on native slang datasets from Rayalaseema & Telangana.', badge: 'Production' },
    { id: 'bj-2', year: '2025', type: 'contributed', title: 'Core Contributor to Telugu-LLaMA Benchmark', description: 'Helped clean and annotate 40,000 instruction-following pairs.', badge: 'Open Source' },
    { id: 'bj-3', year: '2024', type: 'learned', title: 'Distributed Systems Certification', description: 'Deep dive into Raft consensus and streaming pipelines.', badge: 'Education' }
  ],
  mutualConnections: 0,
  connectionStatus: 'connected'
};

export const MOCK_MEMBERS: Member[] = [
  {
    id: 'mem-ananya',
    name: 'Ananya Reddy',
    username: 'ananya_reddy',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    role: 'design',
    roleTitle: 'Product & Design Systems Architect',
    location: 'Bengaluru / Hyderabad',
    matchScore: 94,
    whyMatched: 'Covers your design blindspot with 4 years of proven design systems mastery and Figma-to-code workflows.',
    bio: 'Ex-design lead at fintech unicorn. Obsessed with high-density information architecture, accessibility, and micro-interactions.',
    ambition: 'Start a startup',
    buildingStatus: 'Building',
    languages: ['Telugu', 'English'],
    yearsExperience: 4,
    skills: [
      { name: 'UI/UX Design Systems', category: 'Creative', level: 'Expert', evidence: 'Portfolio' },
      { name: 'Figma to Token Pipelines', category: 'Creative', level: 'Expert', evidence: 'Project' },
      { name: 'Interaction Motion', category: 'Creative', level: 'Advanced', evidence: 'Portfolio' },
      { name: 'User Research Testing', category: 'People', level: 'Advanced', evidence: 'Endorsed' }
    ],
    offer: [
      'Design systems from scratch that developers love',
      'High-fidelity interactive Figma prototypes',
      'User journey mapping & usability auditing'
    ],
    need: [
      'Backend builder who can ship fast APIs',
      'Growth marketer who understands Indian SaaS'
    ],
    goals: {
      thirtyDay: 'Design end-to-end product flow for an AI builder tool',
      ninetyDay: 'Publish a world-class case study and acquire first 1k users',
      longTerm: 'Found a boutique product design & venture lab in South India'
    },
    workingStyle: {
      soloVsTeam: 80,
      leaderVsExecutor: 65,
      hoursPerWeek: 20,
      timeZone: 'IST (UTC+5:30)',
      remoteHybrid: 'Remote'
    },
    portfolio: {
      dribbble: 'https://dribbble.com/ananyareddy',
      behance: 'https://behance.net/ananyareddy'
    },
    builderJourney: [
      { id: 'bj-a1', year: '2026', type: 'built', title: 'Redesigned NeoBank Checkout Flow', description: 'Improved drop-off conversion by 34% across 2M monthly transactions.', badge: 'Fintech' },
      { id: 'bj-a2', year: '2025', type: 'mentored', title: 'Mentored 20+ Junior Telugu Designers', description: 'Hosted weekly portfolio review circles in Hyderabad.', badge: 'Community' }
    ],
    mutualConnections: 6,
    connectionStatus: 'connected'
  },
  {
    id: 'mem-karthik',
    name: 'Karthik Varma',
    username: 'karthik_varma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'business',
    roleTitle: 'Growth & GTM Strategist',
    location: 'Visakhapatnam, AP',
    matchScore: 92,
    whyMatched: 'Complements your engineering focus with outbound sales, founder storytelling, and monetization pipelines.',
    bio: 'Built organic growth engines for 3 Indian developer tool startups. Deep network among angel investors and early tech adopters in Tier 1 & 2 cities.',
    ambition: 'Start a startup',
    buildingStatus: 'Ideating',
    languages: ['Telugu', 'English', 'Hindi'],
    yearsExperience: 5,
    skills: [
      { name: 'B2B Sales & Outreach', category: 'Business', level: 'Expert', evidence: 'Endorsed' },
      { name: 'Content & Viral Loops', category: 'Business', level: 'Advanced', evidence: 'Project' },
      { name: 'Pitching & Deck Strategy', category: 'Business', level: 'Expert', evidence: 'Portfolio' },
      { name: 'Community Management', category: 'People', level: 'Advanced', evidence: 'Endorsed' }
    ],
    offer: [
      'GTM playbook: zero to 50 paid B2B customers',
      'Investor pitch decks & financial unit economics',
      'Distribution across Telugu tech networks & LinkedIn'
    ],
    need: [
      'Tech co-founder to turn roadmap into live software',
      'Product designer who can craft clean landing pages'
    ],
    goals: {
      thirtyDay: 'Validate 3 problem statements with 30 target business founders',
      ninetyDay: 'Secure pre-seed angel commitment of ₹25L',
      longTerm: 'Scale a global SaaS company out of Andhra Pradesh'
    },
    workingStyle: {
      soloVsTeam: 85,
      leaderVsExecutor: 80,
      hoursPerWeek: 30,
      timeZone: 'IST (UTC+5:30)',
      remoteHybrid: 'Hybrid'
    },
    portfolio: {
      liveProject: 'https://gtmwithkarthik.substack.com'
    },
    builderJourney: [
      { id: 'bj-k1', year: '2025', type: 'built', title: 'Scaled DevRel Newsletter to 18,000 Readers', description: 'Zero paid ads, purely organic technical teardowns.', badge: 'Growth' },
      { id: 'bj-k2', year: '2024', type: 'built', title: 'Closed ₹1.2 Cr in Enterprise Pilots', description: 'Led sales for AI document summarizer to logistics companies in Hyderabad.', badge: 'Sales' }
    ],
    mutualConnections: 8,
    connectionStatus: 'connected'
  },
  {
    id: 'mem-deepika',
    name: 'Deepika Sripada',
    username: 'deepika_ai',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    role: 'research',
    roleTitle: 'Indic NLP & ML Scientist',
    location: 'Hyderabad, Telangana',
    matchScore: 95,
    whyMatched: 'Supplies state-of-the-art NLP models, synthetic dataset generation, and evaluation pipelines.',
    bio: 'Masters from IIIT-Hyderabad in Speech & Language Processing. Published papers on multilingual tokenization and low-resource Indic language reasoning.',
    ambition: 'Research',
    buildingStatus: 'Building',
    languages: ['Telugu', 'English', 'Sanskrit', 'Hindi'],
    yearsExperience: 3,
    skills: [
      { name: 'PyTorch & HuggingFace', category: 'Technical', level: 'Expert', evidence: 'Project' },
      { name: 'LLM Fine-Tuning (LoRA/QLoRA)', category: 'Technical', level: 'Expert', evidence: 'Portfolio' },
      { name: 'Telugu Tokenization & Eval', category: 'Technical', level: 'Expert', evidence: 'Endorsed' },
      { name: 'Technical Paper Writing', category: 'Creative', level: 'Advanced', evidence: 'Portfolio' }
    ],
    offer: [
      'Custom fine-tuned Telugu LLM weights & adapters',
      'Dataset curation, cleaning, and synthetic augmentation',
      'Model quantization (vLLM / Ollama) for cheap cloud hosting'
    ],
    need: [
      'Full-stack engineer to build web UI & API server around models',
      'UI designer for intuitive multimodal prompt interfaces'
    ],
    goals: {
      thirtyDay: 'Deploy low-latency Telugu acoustic model endpoint',
      ninetyDay: 'Publish benchmark paper on Indic conversational reasoning',
      longTerm: 'Bridge the compute and language gap for rural Indian internet users'
    },
    workingStyle: {
      soloVsTeam: 60,
      leaderVsExecutor: 45,
      hoursPerWeek: 25,
      timeZone: 'IST (UTC+5:30)',
      remoteHybrid: 'Remote'
    },
    portfolio: {
      github: 'https://github.com/deepika-nlp',
      liveProject: 'https://huggingface.co/deepika-sripada'
    },
    builderJourney: [
      { id: 'bj-d1', year: '2026', type: 'built', title: 'Released Telugu-Instruction-7B Dataset', description: 'Over 25,000 verified regional QA pairs with zero translated artifacts.', badge: 'HuggingFace' },
      { id: 'bj-d2', year: '2025', type: 'learned', title: 'IIIT Hyderabad Research Fellowship', description: 'Specialized in Indian regional acoustic phonetics.', badge: 'Academic' }
    ],
    mutualConnections: 4,
    connectionStatus: 'pending_sent'
  },
  {
    id: 'mem-prashanth',
    name: 'Prashanth Naidu',
    username: 'prashanth_build',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    role: 'build',
    roleTitle: 'Mobile & Hardware Systems Dev',
    location: 'Vijayawada, AP',
    matchScore: 89,
    whyMatched: 'Complements your web backend with Flutter/React Native mobile clients and offline-first edge deployment.',
    bio: 'Mobile dev who loves offline-first sync protocols and WhatsApp bots. Built community tools used by 40k engineering students in AP.',
    ambition: 'Get a job',
    buildingStatus: 'Building',
    languages: ['Telugu', 'English'],
    yearsExperience: 2,
    skills: [
      { name: 'React Native & Flutter', category: 'Technical', level: 'Advanced', evidence: 'Project' },
      { name: 'Offline Sync & SQLite', category: 'Technical', level: 'Advanced', evidence: 'Portfolio' },
      { name: 'WhatsApp Business API', category: 'Technical', level: 'Intermediate', evidence: 'Self-reported' },
      { name: 'Collaboration & Git', category: 'People', level: 'Advanced', evidence: 'Endorsed' }
    ],
    offer: [
      'Rapid Android and iOS app builds from Figma designs',
      'Smooth animations on budget Indian Android devices (Redmi/Realme)',
      'WhatsApp integration & OTP verification flows'
    ],
    need: [
      'Senior engineer for code reviews and backend scaling advice',
      'Guidance on cracking international remote developer roles'
    ],
    goals: {
      thirtyDay: 'Ship a companion mobile app for our team project',
      ninetyDay: 'Reach 5,000 installs with 4.5+ Play Store rating',
      longTerm: 'Join a high-growth tier-1 product startup as Mobile Engineer'
    },
    workingStyle: {
      soloVsTeam: 75,
      leaderVsExecutor: 50,
      hoursPerWeek: 20,
      timeZone: 'IST (UTC+5:30)',
      remoteHybrid: 'Remote'
    },
    portfolio: {
      github: 'https://github.com/prashanth-dev'
    },
    builderJourney: [
      { id: 'bj-p1', year: '2025', type: 'built', title: 'AP Colleges Bus Tracking App', description: 'Built in Flutter with GPS polling, scaled to 12,000 daily active users.', badge: 'Android' }
    ],
    mutualConnections: 2,
    connectionStatus: 'pending_received',
    note: 'Hey Venkata! Saw your Telugu NLP project. Would love to build the Android frontend for it.'
  },
  {
    id: 'mem-meghana',
    name: 'Meghana Chowdary',
    username: 'meghana_growth',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    role: 'business',
    roleTitle: 'Product Operations & Marketer',
    location: 'Hyderabad, Telangana',
    matchScore: 91,
    whyMatched: 'Excels at customer discovery interviews, pricing experimentation, and social community growth.',
    bio: 'Product manager at edtech startup. Loves conducting 1-on-1 discovery calls and translating messy user feedback into prioritized sprint backlogs.',
    ambition: 'Start a startup',
    buildingStatus: 'Exploring',
    languages: ['Telugu', 'English', 'Hindi'],
    yearsExperience: 3,
    skills: [
      { name: 'Customer Discovery Interviews', category: 'Business', level: 'Expert', evidence: 'Project' },
      { name: 'Sprint Prioritization', category: 'Business', level: 'Advanced', evidence: 'Endorsed' },
      { name: 'Copywriting & Onboarding UX', category: 'Creative', level: 'Advanced', evidence: 'Portfolio' }
    ],
    offer: [
      'Structured user discovery interview transcripts & summaries',
      'Clear PRD (Product Requirements Document) writing',
      'Funnel analytics tracking setup (PostHog / Mixpanel)'
    ],
    need: ['Technical team to build prototype', 'Mentor on enterprise sales'],
    goals: {
      thirtyDay: 'Interview 25 target users for Telugu AI writing companion',
      ninetyDay: 'Launch private beta with 300 active users',
      longTerm: 'Found an edtech AI venture'
    },
    workingStyle: {
      soloVsTeam: 90,
      leaderVsExecutor: 70,
      hoursPerWeek: 15,
      timeZone: 'IST (UTC+5:30)',
      remoteHybrid: 'Hybrid'
    },
    portfolio: {},
    builderJourney: [
      { id: 'bj-m1', year: '2025', type: 'built', title: 'Led 100k Student Onboarding Overhaul', description: 'Increased day-7 retention from 14% to 28% through contextual tutorials.', badge: 'Edtech' }
    ],
    mutualConnections: 5,
    connectionStatus: 'none'
  },
  {
    id: 'mem-raghav',
    name: 'Raghavendra Joshi',
    username: 'raghav_research',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    role: 'research',
    roleTitle: 'Computer Vision & Multimodal AI',
    location: 'Warangal, Telangana',
    matchScore: 88,
    whyMatched: 'Strong in image segmentation and OCR for Telugu document digitizing.',
    bio: 'AI graduate from NIT Warangal. Focused on document AI, Telugu script OCR, and low-latency ONNX runtime deployments on edge devices.',
    ambition: 'Research',
    buildingStatus: 'Building',
    languages: ['Telugu', 'English'],
    yearsExperience: 2,
    skills: [
      { name: 'OpenCV & YOLO', category: 'Technical', level: 'Advanced', evidence: 'Project' },
      { name: 'Telugu OCR & Document AI', category: 'Technical', level: 'Expert', evidence: 'Portfolio' },
      { name: 'TensorRT & ONNX', category: 'Technical', level: 'Intermediate', evidence: 'Self-reported' }
    ],
    offer: [
      'Accurate Telugu ancient/modern script text extraction',
      'Edge-optimized vision models under 15MB',
      'Custom dataset annotation pipelines'
    ],
    need: ['Fullstack web developer', 'Graphic designer for branded reports'],
    goals: {
      thirtyDay: 'Complete OCR pipeline benchmark for Telugu land records',
      ninetyDay: 'Deploy public API for developers',
      longTerm: 'Preserve regional historical literature through AI'
    },
    workingStyle: {
      soloVsTeam: 50,
      leaderVsExecutor: 40,
      hoursPerWeek: 18,
      timeZone: 'IST (UTC+5:30)',
      remoteHybrid: 'Remote'
    },
    portfolio: {
      github: 'https://github.com/raghav-vision'
    },
    builderJourney: [
      { id: 'bj-r1', year: '2025', type: 'built', title: 'OpenTeluguOCR Benchmark', description: 'Trained on 50,000 scanned newspaper articles with 96.8% character accuracy.', badge: 'OCR' }
    ],
    mutualConnections: 3,
    connectionStatus: 'none'
  }
];

export const INITIAL_FOUR_TEAM: FourTeam = {
  id: 'team-five-alpha',
  teamBalance: 0.92,
  status: 'ready',
  members: [
    MOCK_MEMBERS[0], // Ananya (Design)
    MOCK_MEMBERS[1], // Karthik (Business)
    MOCK_MEMBERS[2], // Deepika (Research)
    MOCK_MEMBERS[3], // Prashanth (Build)
  ],
  fitDetails: {
    'mem-ananya': {
      skillFit: 96,
      sharedGoals: 92,
      workingStyle: 90,
      availabilityOverlap: 94,
      whyPicked: 'You need world-class product UI/UX and design system polish. Ananya has 4 years of proven design systems mastery and brings high-density Figma craftsmanship that complements your backend systems.',
      sharedInterests: ['Indic language tools', 'Design systems', 'High-performance web apps'],
      availabilityDetails: 'Evenings 7:00 PM – 10:30 PM IST (Mon–Fri) + Saturday morning sprints'
    },
    'mem-karthik': {
      skillFit: 93,
      sharedGoals: 95,
      workingStyle: 88,
      availabilityOverlap: 91,
      whyPicked: 'Engineers often struggle with customer validation and go-to-market distribution. Karthik has closed B2B software pilots across South India and knows how to pitch to founders and angel networks.',
      sharedInterests: ['Founder bootstrapping', 'B2B SaaS', 'Telugu tech ecosystem'],
      availabilityDetails: 'Flexible hours, active daily 10:00 AM – 2:00 PM and 8:00 PM – 11:00 PM IST'
    },
    'mem-deepika': {
      skillFit: 98,
      sharedGoals: 94,
      workingStyle: 91,
      availabilityOverlap: 95,
      whyPicked: 'Deepika provides domain expertise in multilingual tokenization, fine-tuning LLaMA models for Telugu dialects, and evaluation datasets, allowing your team to build real proprietary AI rather than superficial wrappers.',
      sharedInterests: ['Indic NLP', 'HuggingFace open source', 'Deep Learning'],
      availabilityDetails: 'Weeknights 8:00 PM – midnight IST + Sunday research sessions'
    },
    'mem-prashanth': {
      skillFit: 89,
      sharedGoals: 87,
      workingStyle: 89,
      availabilityOverlap: 92,
      whyPicked: 'While you focus on core cloud infrastructure and APIs, Prashanth handles cross-platform React Native and Android edge apps with offline persistence, giving your project instant mobile reach.',
      sharedInterests: ['Mobile architecture', 'Low latency APIs', 'Telugu student tech'],
      availabilityDetails: 'Weekdays after 6:00 PM IST + full weekends'
    }
  }
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-kisanai',
    title: 'KisanAI — Indic Voice Crop Diagnostic System',
    description: 'An AI-powered voice assistant that lets smallholder farmers across Andhra and Telangana speak in natural Telugu dialect to identify crop diseases and receive fertilizer guidance.',
    status: 'active',
    teamBalance: 0.94,
    members: [
      CURRENT_USER,
      MOCK_MEMBERS[0], // Ananya (Design)
      MOCK_MEMBERS[1], // Karthik (Business)
      MOCK_MEMBERS[2], // Deepika (Research)
      MOCK_MEMBERS[3], // Prashanth (Build)
    ],
    tasks: [
      {
        id: 'task-1',
        title: 'Train Telugu acoustic phoneme adapter for Rayalaseema dialect',
        description: 'Fine-tune Whisper-small using Deepika\'s 10-hour voice dataset.',
        status: 'in_progress',
        assignee: MOCK_MEMBERS[2],
        priority: 'High',
        dueDate: 'Nov 20'
      },
      {
        id: 'task-2',
        title: 'Design high-contrast mobile voice-input screen in Figma',
        description: 'Large waveform animations, single tap to speak, readable in direct sunlight.',
        status: 'done',
        assignee: MOCK_MEMBERS[0],
        priority: 'High',
        dueDate: 'Nov 14'
      },
      {
        id: 'task-3',
        title: 'Setup WebSocket audio streaming endpoint in FastAPI',
        description: 'Chunked audio processing with low-latency interim text responses.',
        status: 'in_progress',
        assignee: CURRENT_USER,
        priority: 'High',
        dueDate: 'Nov 18'
      },
      {
        id: 'task-4',
        title: 'Conduct pilot interview with 10 farmer cooperatives in Guntur',
        description: 'Validate willingness to use voice vs WhatsApp text messages.',
        status: 'todo',
        assignee: MOCK_MEMBERS[1],
        priority: 'Medium',
        dueDate: 'Nov 24'
      },
      {
        id: 'task-5',
        title: 'Implement offline audio cache in React Native client',
        description: 'Queue recordings if 4G network drops in rural fields.',
        status: 'todo',
        assignee: MOCK_MEMBERS[3],
        priority: 'Medium',
        dueDate: 'Nov 26'
      }
    ],
    milestones: [
      { id: 'm-1', title: 'Architecture & UX Wireframes', dueDate: 'Nov 10, 2026', completed: true, description: 'Design specs and API contracts signed off by all 5 members.' },
      { id: 'm-2', title: 'End-to-End Voice Latency Benchmark (<800ms)', dueDate: 'Nov 22, 2026', completed: false, description: 'Verify real-time streaming audio pipeline on low-bandwidth 3G/4G.' },
      { id: 'm-3', title: 'Field Pilot in Guntur & Warangal', dueDate: 'Dec 05, 2026', completed: false, description: '50 real test queries collected with verified farmer satisfaction.' },
      { id: 'm-4', title: 'Founding Demo Day Showcase', dueDate: 'Dec 15, 2026', completed: false, description: 'Live pitch to angel builders and community mentors.' }
    ],
    files: [
      { id: 'f-1', name: 'KisanAI-PRD-v1.4.pdf', size: '2.4 MB', uploadedBy: 'Karthik Varma', date: 'Nov 12', type: 'PDF' },
      { id: 'f-2', name: 'DesignSystem-Mobile-Figma.tokens.json', size: '480 KB', uploadedBy: 'Ananya Reddy', date: 'Nov 14', type: 'JSON' },
      { id: 'f-3', name: 'telugu_slang_eval_set.csv', size: '8.1 MB', uploadedBy: 'Deepika Sripada', date: 'Nov 15', type: 'CSV' },
      { id: 'f-4', name: 'FastAPI_AudioStreaming_Spec.md', size: '45 KB', uploadedBy: 'Venkata Sai Kumar', date: 'Nov 15', type: 'Markdown' }
    ],
    activity: [
      { id: 'act-1', userName: 'Ananya Reddy', userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80', action: 'moved "Design high-contrast mobile screen" to Done', time: '2 hours ago' },
      { id: 'act-2', userName: 'Deepika Sripada', userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80', action: 'uploaded telugu_slang_eval_set.csv', time: '5 hours ago' },
      { id: 'act-3', userName: 'Karthik Varma', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', action: 'scheduled Guntur farmer pilot interview for Nov 24', time: 'Yesterday' }
    ]
  },
  {
    id: 'proj-telugullm',
    title: 'TeluguLLaMA — 7B Instruction Chat Web Platform',
    description: 'High-throughput browser interface with citations, code generation, and historical Telugu literature context retrieval.',
    status: 'completed',
    teamBalance: 0.96,
    members: [CURRENT_USER, MOCK_MEMBERS[2], MOCK_MEMBERS[0]],
    tasks: [],
    milestones: [],
    files: [],
    activity: []
  }
];

export const MOCK_CHALLENGES: BuildChallenge[] = [
  {
    id: 'chal-indic-hack',
    title: 'Indic Voice AI 72-Hour Sprint',
    category: 'AI / Voice & Speech',
    status: 'live',
    countdown: '18h 42m remaining',
    teamSize: 5,
    skillsNeeded: ['FastAPI', 'PyTorch / Whisper', 'Figma UI', 'GTM Strategy', 'React Native'],
    brief: 'Build an intuitive, conversational voice application serving non-English speakers in Tier 2/3 Indian cities. Must incorporate streaming responses, low latency under 1 second, and resilient offline fallbacks.',
    rules: [
      'Teams must consist of 3 to 5 builders covering at least 3 complementary roles.',
      'All source code must be pushed to a public GitHub repository during the 72-hour window.',
      'Must include a 2-minute live Loom or YouTube product demo with real user testing.'
    ],
    timeline: 'Sprint began Friday 6:00 PM IST — Closes Sunday 6:00 PM IST with live pitches at 8:00 PM.',
    prizes: '₹1,50,000 cash pool + Fast-track interview with top Hyderabad venture studios + ₹25,000 cloud credits.',
    submissionsCount: 14,
    isJoined: true,
    hasSubmitted: false
  },
  {
    id: 'chal-fintech-micro',
    title: 'Local Commerce UPI & WhatsApp Checkout Bot',
    category: 'Fintech & WhatsApp Commerce',
    status: 'upcoming',
    countdown: 'Starts in 4 days',
    teamSize: 4,
    skillsNeeded: ['WhatsApp Cloud API', 'Next.js', 'PostgreSQL', 'Product Marketing'],
    brief: 'Empower neighborhood grocery and dairy shops in Hyderabad and Vijayawada to take automated orders via WhatsApp with dynamic UPI QR generation and instant receipt dispatch.',
    rules: [
      'Focus on extreme simplicity: zero app installation required for the end buyer.',
      'Include merchant dashboard for inventory tracking and daily cash settlement.'
    ],
    timeline: 'Nov 20 – Nov 23, 2026',
    prizes: '₹1,00,000 grant + Merchant deployment partnership across 500 stores in Jubilee Hills & Gachibowli.',
    submissionsCount: 28,
    isJoined: false
  },
  {
    id: 'chal-rag-doc',
    title: 'Legal & Land Records Indic RAG Challenge',
    category: 'Enterprise AI & Search',
    status: 'past',
    countdown: 'Completed',
    teamSize: 4,
    skillsNeeded: ['Vector DB', 'Telugu OCR', 'FastAPI', 'UX Design'],
    brief: 'Build an automated document question-answering tool that translates complex bilingual (Telugu-English) municipal zoning and patta land records into simple bullet points.',
    rules: ['Must cite exact section and coordinate bounding boxes for every answer.'],
    timeline: 'Oct 15 – Oct 18, 2026',
    prizes: 'Winner: KisanAI Team (Hyderabad) — ₹75,000 + Venture incubation.',
    submissionsCount: 32,
    isJoined: true,
    hasSubmitted: true,
    demoUrl: 'https://land-records-ai.telugu.dev',
    repoUrl: 'https://github.com/telugu-ai-builders/land-rag'
  }
];

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'men-sridhar',
    name: 'Dr. Sridhar Chunduri',
    title: 'Principal Research Scientist',
    company: 'Google DeepMind / Ex-Microsoft Research',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    expertise: ['Large Language Models', 'Multilingual Evaluation', 'Research to Production', 'Research Careers'],
    rating: 4.95,
    reviewsCount: 38,
    languages: ['Telugu', 'English'],
    nextSlot: 'Tomorrow at 7:00 PM IST',
    bio: '15+ years in NLP, conversational systems, and low-resource language modeling. Guided 40+ Indian graduate students into top AI research labs and global ventures.',
    areas: [
      'Model architecture choices & LoRA fine-tuning tradeoffs',
      'Publishing papers at ACL, EMNLP, and NeurIPS',
      'Structuring your deep-tech startup technical moat'
    ],
    slots: [
      { id: 's-1', day: 'Tomorrow', date: 'Nov 16', time: '7:00 PM - 7:30 PM', isAvailable: true },
      { id: 's-2', day: 'Tomorrow', date: 'Nov 16', time: '8:00 PM - 8:30 PM', isAvailable: true },
      { id: 's-3', day: 'Wednesday', date: 'Nov 18', time: '6:30 PM - 7:00 PM', isAvailable: false },
      { id: 's-4', day: 'Thursday', date: 'Nov 19', time: '7:30 PM - 8:00 PM', isAvailable: true },
      { id: 's-5', day: 'Saturday', date: 'Nov 21', time: '11:00 AM - 11:30 AM', isAvailable: true }
    ]
  },
  {
    id: 'men-swapna',
    name: 'Swapna Garlapati',
    title: 'VP of Product',
    company: 'Swiggy / Ex-Flipkart',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80',
    expertise: ['0 to 1 Product Strategy', 'Pricing & Monetization', 'User Onboarding', 'Hiring Builders'],
    rating: 4.92,
    reviewsCount: 45,
    languages: ['Telugu', 'English', 'Hindi'],
    nextSlot: 'Tuesday at 6:30 PM IST',
    bio: 'Product executive who has scaled consumer apps from 10k to 25M daily orders. Loves helping early-stage technical founders design high-conversion growth flywheels.',
    areas: [
      'How to conduct 30-minute discovery interviews that reveal real intent',
      'Formulating first pricing plans and paywalls',
      'Roadmap prioritization without engineering burnout'
    ],
    slots: [
      { id: 's-11', day: 'Tuesday', date: 'Nov 17', time: '6:30 PM - 7:00 PM', isAvailable: true },
      { id: 's-12', day: 'Tuesday', date: 'Nov 17', time: '7:15 PM - 7:45 PM', isAvailable: true },
      { id: 's-13', day: 'Thursday', date: 'Nov 19', time: '8:00 PM - 8:30 PM', isAvailable: true }
    ]
  },
  {
    id: 'men-ramesh',
    name: 'Ramesh Kancherla',
    title: 'Founder & Angel Investor',
    company: 'Hyd Angels / Serial SaaS Founder',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    expertise: ['Pre-seed Fundraising', 'B2B Sales Cycles', 'Term Sheets', 'Founder Mental Toughness'],
    rating: 4.88,
    reviewsCount: 29,
    languages: ['Telugu', 'English'],
    nextSlot: 'Friday at 5:00 PM IST',
    bio: 'Founded and exited 2 B2B tech companies out of Hyderabad. Active angel in 18 Indian deep-tech and developer-first startups.',
    areas: [
      'Pitch deck critiques & valuation realism',
      'Finding and closing your first 3 enterprise anchor clients',
      'Co-founder equity split and vesting agreements'
    ],
    slots: [
      { id: 's-21', day: 'Friday', date: 'Nov 20', time: '5:00 PM - 5:30 PM', isAvailable: true },
      { id: 's-22', day: 'Friday', date: 'Nov 20', time: '6:00 PM - 6:30 PM', isAvailable: true }
    ]
  }
];

export const MOCK_SESSIONS: BookedSession[] = [
  {
    id: 'sess-1',
    mentorId: 'men-sridhar',
    mentorName: 'Dr. Sridhar Chunduri',
    mentorTitle: 'Principal Research Scientist at Google DeepMind',
    mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    slotDay: 'Thursday, Nov 19, 2026',
    slotTime: '7:30 PM - 8:00 PM IST',
    goal: 'Review our Telugu acoustic model quantization strategy and discuss latency optimizations under low cloud RAM.',
    status: 'upcoming',
    joinUrl: 'https://meet.nightclub.network/session-sridhar-venkata'
  },
  {
    id: 'sess-past-1',
    mentorId: 'men-swapna',
    mentorName: 'Swapna Garlapati',
    mentorTitle: 'VP of Product at Swiggy',
    mentorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80',
    slotDay: 'Nov 02, 2026',
    slotTime: '6:30 PM - 7:00 PM IST',
    goal: 'Discussed pricing tiers for Nightclub builder network and how to structure member credits.',
    status: 'past',
    joinUrl: '',
    rating: 5,
    feedbackHelp: 'Actionable breakdown of SaaS credit models vs flat subscriptions. Pointed us directly to the 8-credit monthly reset mechanism.'
  }
];

export const MOCK_CIRCLES: Circle[] = [
  {
    id: 'cir-ai',
    name: 'Telugu AI & LLM Builders',
    tag: '#indic-ai',
    iconName: 'Cpu',
    memberCount: 1420,
    activeNow: 86,
    description: 'The central gathering ground for researchers, fine-tuners, and ML practitioners building Indic AI models, tokenizers, and datasets.',
    isJoined: true,
    posts: [
      {
        id: 'cp-1',
        author: MOCK_MEMBERS[2],
        content: 'Just uploaded our new Telugu dialect benchmark dataset! Noticeable differences in formal vs Rayalaseema colloquial phrasing. Who wants to run a fine-tuning pass on Llama-3-8B?',
        likes: 34,
        isLiked: true,
        replies: 12,
        timestamp: '3 hours ago'
      },
      {
        id: 'cp-2',
        author: CURRENT_USER,
        content: 'Streaming Telugu audio over WebSockets with Whisper-tiny: seeing sub-400ms end-of-sentence latency in Hyderabad test environment. Code sample in the comments.',
        likes: 48,
        isLiked: false,
        replies: 19,
        timestamp: 'Yesterday'
      }
    ],
    events: [
      { id: 'ce-1', title: 'Live Benchmarking: vLLM vs Ollama for Indic Models', date: 'Nov 18, 8:00 PM IST', attendees: 142, isAttending: true },
      { id: 'ce-2', title: 'IIIT-H Campus Meetup & Showcase', date: 'Nov 29, 2:00 PM IST', attendees: 85, isAttending: false }
    ]
  },
  {
    id: 'cir-startups',
    name: 'Hyderabad Founders & 0-to-1',
    tag: '#startups-hyd',
    iconName: 'Rocket',
    memberCount: 980,
    activeNow: 54,
    description: 'From idea validation and customer interviews to legal incorporation, angel funding, and hiring your first complementary team in Telangana.',
    isJoined: true,
    posts: [
      {
        id: 'cp-3',
        author: MOCK_MEMBERS[1],
        content: 'Tip for engineers pitching B2B software in India: Do not start with your architecture diagram. Start with the monthly ₹ amount of operational headache you eliminate.',
        likes: 72,
        isLiked: true,
        replies: 23,
        timestamp: '2 days ago'
      }
    ],
    events: [
      { id: 'ce-3', title: 'Pre-Seed Pitch Clinic with Hyd Angels', date: 'Nov 22, 6:00 PM IST', attendees: 110, isAttending: false }
    ]
  },
  {
    id: 'cir-design',
    name: 'Design Systems & Craft',
    tag: '#ui-ux-craft',
    iconName: 'Palette',
    memberCount: 640,
    activeNow: 31,
    description: 'Figma tokens, high-density layouts, micro-animations, and bridging the gap between designers and frontend developers.',
    isJoined: false,
    posts: [],
    events: []
  },
  {
    id: 'cir-careers',
    name: 'Careers, Remote & Placements',
    tag: '#careers-prep',
    iconName: 'Briefcase',
    memberCount: 1850,
    activeNow: 112,
    description: 'Curated remote openings, resume teardowns, mock system design rounds, and peer referrals for Telugu engineers and product folks.',
    isJoined: false,
    posts: [],
    events: []
  }
];

export const MOCK_CAREERS: CareerOpportunity[] = [
  {
    id: 'job-1',
    title: 'Lead Full-Stack AI Engineer',
    company: 'Sarvam AI / IndicVoice Lab',
    location: 'Bengaluru / Hyderabad (Hybrid)',
    type: 'Job',
    remote: false,
    matchScore: 96,
    skills: ['TypeScript & React', 'Python & FastAPI', 'System Design', 'PostgreSQL & Redis'],
    compensation: '₹28L - ₹42L + Equity',
    description: 'Lead the frontend and streaming middleware for our conversational Indian voice platforms serving millions of citizen queries.',
    responsibilities: [
      'Architect real-time streaming audio interfaces with low latency.',
      'Coordinate with speech researchers on latency and audio compression.',
      'Mentor 4 junior full-stack engineers.'
    ],
    requirements: [
      '3+ years building high-concurrency web services.',
      'Deep knowledge of WebSockets and modern browser audio APIs.',
      'Demonstrated love for Indic language computing.'
    ],
    isSaved: true,
    hasApplied: false
  },
  {
    id: 'job-2',
    title: 'Product Design Systems Specialist',
    company: 'Postman India',
    location: 'Remote (India)',
    type: 'Job',
    remote: true,
    matchScore: 84,
    skills: ['UI/UX Design Systems', 'Figma to Token Pipelines', 'Interaction Motion'],
    compensation: '₹22L - ₹32L',
    description: 'Shape the next generation of developer experience tools by maintaining and expanding our global design system.',
    responsibilities: [
      'Define component tokens across web and desktop apps.',
      'Collaborate with frontend engineers on accessibility and contrast.'
    ],
    requirements: [
      'Strong portfolio with deep dive case studies on systems thinking.'
    ],
    isSaved: false,
    hasApplied: false
  },
  {
    id: 'job-3',
    title: 'Indic NLP & Tokenization Research Intern',
    company: 'AI4Bharat / IIT Madras',
    location: 'Remote',
    type: 'Internship',
    remote: true,
    matchScore: 92,
    skills: ['PyTorch & HuggingFace', 'Telugu Tokenization & Eval', 'Python & FastAPI'],
    compensation: '₹45,000 / month stipend',
    description: '6-month paid research fellowship focusing on Telugu, Kannada, and Tamil instruction datasets and synthetic reasoning pipelines.',
    responsibilities: [
      'Run eval suites across open Indic LLM checkpoints.',
      'Help build open benchmarks for Telugu semantic accuracy.'
    ],
    requirements: [
      'Comfortable with PyTorch, HuggingFace Transformers, and Git.',
      'Native or professional Telugu reading/writing proficiency.'
    ],
    isSaved: true,
    hasApplied: true
  },
  {
    id: 'job-4',
    title: 'Founding Engineer — AgriTech Voice (Project Invite)',
    company: 'KisanAI Initiative',
    location: 'Hyderabad, Telangana',
    type: 'Project invite',
    remote: true,
    matchScore: 98,
    skills: ['TypeScript & React', 'System Design', 'Python & FastAPI'],
    compensation: '₹1.5L Milestone Grant + Co-founder Equity',
    description: 'Join the Nightclub flagship project to ship the diagnostic voice system directly to 10 farmer cooperatives.',
    responsibilities: [
      'Build the core dashboard for agronomists.',
      'Connect telemetry and offline SQLite sync.'
    ],
    requirements: [
      'Active Nightclub verified builder with positive peer endorsements.'
    ],
    isSaved: true,
    hasApplied: false
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'team_ready',
    title: 'Your Find Your Four team is matched!',
    description: 'Ananya (Design), Karthik (Business), Deepika (Research), and Prashanth (Build) are ready with a 0.92 team balance.',
    time: '15 mins ago',
    group: 'today',
    read: false,
    linkRoute: '/find-your-four'
  },
  {
    id: 'notif-2',
    type: 'session_reminder',
    title: 'Upcoming mentor session reminder',
    description: 'Session with Dr. Sridhar Chunduri (Google DeepMind) is scheduled for Thursday at 7:30 PM IST.',
    time: '2 hours ago',
    group: 'today',
    read: false,
    linkRoute: '/mentorship'
  },
  {
    id: 'notif-3',
    type: 'message',
    title: 'New message from Ananya Reddy',
    description: '"Uploaded the Figma tokens file for KisanAI. Let me know what you think of the button states!"',
    time: '3 hours ago',
    group: 'today',
    read: false,
    linkRoute: '/messages'
  },
  {
    id: 'notif-4',
    type: 'connection_accepted',
    title: 'Karthik Varma accepted your connection',
    description: 'You can now collaborate and message Karthik directly in private chat.',
    time: 'Yesterday',
    group: 'this_week',
    read: true,
    linkRoute: '/connections'
  },
  {
    id: 'notif-5',
    type: 'challenge',
    title: 'Indic Voice AI Sprint is now live!',
    description: '18 hours remaining to push your repository and submit your 2-minute demo.',
    time: '2 days ago',
    group: 'this_week',
    read: true,
    linkRoute: '/challenges'
  },
  {
    id: 'notif-6',
    type: 'milestone',
    title: 'Milestone reached in KisanAI',
    description: 'Milestone 1 (Architecture & UX Wireframes) signed off by all 5 members.',
    time: '4 days ago',
    group: 'earlier',
    read: true,
    linkRoute: '/build-room'
  }
];

export const MOCK_THREADS: ChatThread[] = [
  {
    id: 'thread-ananya',
    participant: MOCK_MEMBERS[0],
    lastMessage: 'Uploaded the Figma tokens file for KisanAI. Let me know what you think!',
    lastMessageTime: '3:15 PM',
    unreadCount: 1,
    messages: [
      { id: 'm-1', senderId: 'user-self', text: 'Hey Ananya! Glad we matched in Find Your Four. Excited to collaborate on KisanAI.', timestamp: '1:30 PM', status: 'read' },
      { id: 'm-2', senderId: 'mem-ananya', text: 'Hey Venkata! Same here. I saw your Telugu NLP backend repo — the latency numbers are super impressive.', timestamp: '1:42 PM', status: 'read' },
      { id: 'm-3', senderId: 'mem-ananya', text: 'I just finished the high-contrast mobile screen wireframes. Optimized the tap target to 64px for outdoor field usage.', timestamp: '2:10 PM', status: 'read' },
      { id: 'm-4', senderId: 'mem-ananya', text: 'Uploaded the Figma tokens file for KisanAI. Let me know what you think!', timestamp: '3:15 PM', status: 'delivered' }
    ]
  },
  {
    id: 'thread-karthik',
    participant: MOCK_MEMBERS[1],
    lastMessage: 'Spoke to two farmer FPO directors in Guntur today. They loved the voice idea.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: 'm-11', senderId: 'mem-karthik', text: 'Venkata, let\'s sync on the pilot numbers before our weekly team check-in.', timestamp: 'Yesterday 10:00 AM', status: 'read' },
      { id: 'm-12', senderId: 'user-self', text: 'Sounds good Karthik. What was the reaction on the ground?', timestamp: 'Yesterday 10:45 AM', status: 'read' },
      { id: 'm-13', senderId: 'mem-karthik', text: 'Spoke to two farmer FPO directors in Guntur today. They loved the voice idea.', timestamp: 'Yesterday 11:30 AM', status: 'read' }
    ]
  },
  {
    id: 'thread-deepika',
    participant: MOCK_MEMBERS[2],
    lastMessage: 'The new LoRA adapter reduces Rayalaseema dialect word error rate by 4.2%.',
    lastMessageTime: '2 days ago',
    unreadCount: 0,
    messages: [
      { id: 'm-21', senderId: 'mem-deepika', text: 'The new LoRA adapter reduces Rayalaseema dialect word error rate by 4.2%.', timestamp: 'Thursday', status: 'read' }
    ]
  }
];

export const INITIAL_SETTINGS: UserSettings = {
  language: 'en',
  theme: 'light',
  notifications: {
    messages: true,
    teamMatches: true,
    mentorshipReminders: true,
    challenges: true,
    circleActivity: false,
    quietHoursEnabled: true,
    quietHoursStart: '23:00',
    quietHoursEnd: '08:00',
    dailyLimit: '25 notifications/day'
  },
  privacy: {
    showAvailability: true,
    appearInDiscover: true,
    allowDirectInvites: true
  },
  subscription: {
    status: 'active',
    plan: 'Founding Builder Membership',
    price: '₹1,499 / month',
    nextRenewal: 'Dec 01, 2026',
    mentorCreditsRemaining: 5,
    mentorCreditsTotal: 8
  }
};
