import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkillCategory, UserSkill } from '../../types';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Search,
  Check,
  Plus,
  MapPin,
  ChevronDown,
  GripVertical,
  Rocket,
  Briefcase,
  Laptop,
  FlaskConical,
  BookOpen,
  Share2,
  Compass,
  CheckCircle2,
  Users,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

interface AvailableSkillItem {
  name: string;
  category: SkillCategory;
}

export const OnboardingWizard: React.FC = () => {
  const { navigate, currentUser, updateCurrentUser } = useApp();

  const [step, setStep] = useState(1);
  const [isBuildingPersona, setIsBuildingPersona] = useState(false);
  const [personaProgress, setPersonaProgress] = useState(15);

  // Step 1: About You
  const [name, setName] = useState(currentUser.name || 'Venkata Sai Kumar');
  const [username, setUsername] = useState(currentUser.username || 'venkatasai');
  const [city, setCity] = useState(currentUser.location ? currentUser.location.split(',')[0].trim() : 'Hyderabad');
  const [yearsExperience, setYearsExperience] = useState('0–2 years (Early Builder / Graduate)');
  const [occupation, setOccupation] = useState(currentUser.roleTitle || 'Full-Stack & Systems Engineer');
  const [languages, setLanguages] = useState<string[]>(['Telugu', 'English']);

  const allLanguages = ['Telugu', 'English', 'Hindi', 'Tamil', 'Kannada', 'Marathi'];

  // Step 2: Skills
  const [searchQuery, setSearchQuery] = useState('');
  const availableSkills: AvailableSkillItem[] = [
    // Technical
    { name: 'TypeScript & React', category: 'Technical' },
    { name: 'Python & FastAPI', category: 'Technical' },
    { name: 'PyTorch & HuggingFace', category: 'Technical' },
    { name: 'PostgreSQL & Redis', category: 'Technical' },
    { name: 'System Design', category: 'Technical' },
    { name: 'React Native & Flutter', category: 'Technical' },
    { name: 'Telugu NLP & Tokenization', category: 'Technical' },
    // Creative
    { name: 'UI/UX Design Systems', category: 'Creative' },
    { name: 'Figma to Tokens', category: 'Creative' },
    { name: 'Design Prototyping', category: 'Creative' },
    { name: 'Interaction Motion', category: 'Creative' },
    // Business
    { name: 'B2B Sales Outreach', category: 'Business' },
    { name: 'Growth Loops', category: 'Business' },
    { name: 'Pitching & Decks', category: 'Business' },
    { name: 'Customer Discovery', category: 'Business' },
    // People
    { name: 'Team Leadership', category: 'People' },
    { name: 'Cross-functional Collaboration', category: 'People' },
    { name: 'Sprint Planning & Agile', category: 'People' },
  ];

  const [selectedSkillNames, setSelectedSkillNames] = useState<string[]>([
    'TypeScript & React',
    'Python & FastAPI',
    'PostgreSQL & Redis',
    'System Design',
    'Team Leadership',
  ]);

  const handleToggleSkill = (skillName: string) => {
    if (selectedSkillNames.includes(skillName)) {
      setSelectedSkillNames(selectedSkillNames.filter((s) => s !== skillName));
    } else {
      setSelectedSkillNames([...selectedSkillNames, skillName]);
    }
  };

  // Step 3: Ambition & Goals
  const [ambition, setAmbition] = useState('Start a startup');
  const [buildingStatus, setBuildingStatus] = useState<'Exploring' | 'Ideating' | 'Building' | 'Launched'>('Building');
  const [goal30, setGoal30] = useState('Assemble a complementary five-person team and ship an MVP');
  const [goal90, setGoal90] = useState('Deploy pilot with 100 paid beta users in Andhra/Telangana');
  const [goalLong, setGoalLong] = useState('Build a sustainable deep-tech venture based out of Hyderabad');

  const ambitionOptions = [
    { id: 'Start a startup', title: 'Start a startup', desc: 'Full-time venture', icon: Rocket },
    { id: 'Get a job', title: 'Get a job', desc: 'High-growth team', icon: Briefcase },
    { id: 'Freelance', title: 'Freelance', desc: 'Independent client work', icon: Laptop },
    { id: 'Research', title: 'Research', desc: 'Lab & academic thesis', icon: FlaskConical },
    { id: 'Learn', title: 'Learn', desc: 'Upskilling, deep craft & architecture', icon: BookOpen },
  ];

  const buildingStatusOptions: Array<'Exploring' | 'Ideating' | 'Building' | 'Launched'> = [
    'Exploring',
    'Ideating',
    'Building',
    'Launched',
  ];

  // Step 4: Offer & Need Matrix
  const [offerList, setOfferList] = useState<string[]>([
    'Scalable backend architecture & API design',
    'Real-time WebSockets & state synchronization',
    'Fast prototyping to working MVP',
  ]);
  const [needList, setNeedList] = useState<string[]>([
    'Senior UI/UX designer for product polish & designs...',
    'Go-to-market strategist for B2B founder outreach',
    'Data researcher experienced in fine-tuning Indic LL...',
  ]);
  const [newOfferInput, setNewOfferInput] = useState('');
  const [newNeedInput, setNewNeedInput] = useState('');

  const handleAddOffer = () => {
    if (newOfferInput.trim()) {
      setOfferList([...offerList, newOfferInput.trim()]);
      setNewOfferInput('');
    }
  };

  const handleAddNeed = () => {
    if (newNeedInput.trim()) {
      setNeedList([...needList, newNeedInput.trim()]);
      setNewNeedInput('');
    }
  };

  // Step 5: Working Style & Time
  const [soloVsTeam, setSoloVsTeam] = useState(72);
  const [leaderVsExecutor, setLeaderVsExecutor] = useState(48);
  const [hoursPerWeek, setHoursPerWeek] = useState(25);
  const [preferredModel, setPreferredModel] = useState<'Hybrid' | 'Remote' | 'In-person'>('Hybrid');

  // Step 6: Portfolio & Final Confirmation
  const [githubUrl, setGithubUrl] = useState(currentUser.portfolio?.github || 'https://github.com/venkatasai');
  const [liveProjectUrl, setLiveProjectUrl] = useState(currentUser.portfolio?.liveProject || 'https://kisanai.dev');

  // Step Metadata
  const stepMeta = [
    {
      breadcrumb: 'FOUNDER & PEER ARCHETYPE',
      title: 'About You',
      reason: 'Allows the matching engine to calibrate peer cohorts and local syndicate networks.',
      navText: 'Step 1 of 6: Core Profile',
      nextButton: 'Continue to Skills & Craft →',
    },
    {
      breadcrumb: 'TAXONOMY & CAPABILITY VECTOR',
      title: 'Your Skills & Craft',
      reason: 'Maps your strengths so our algorithm finds people who cover what you do not.',
      navText: 'Step 1 saved',
      nextButton: `Continue with ${selectedSkillNames.length} Skills →`,
    },
    {
      breadcrumb: 'TRAJECTORY & INTENT',
      title: 'Ambition & Goals',
      reason: 'Ensures your four teammates share your speed, ambition, and 30-day timeline.',
      navText: 'Step 3 of 6: Milestone Alignment',
      nextButton: 'Continue to Offer & Need →',
    },
    {
      breadcrumb: 'SYNDICATE COMPLEMENTARITY',
      title: 'Offer & Need Matrix',
      reason: 'Pairs what you can give with what another builder specifically requests.',
      navText: 'Step 4 of 6: Complementary Architecture',
      nextButton: 'Continue to Working Style →',
    },
    {
      breadcrumb: 'TEMPORAL & WORKING CADENCE',
      title: 'Working Style & Time',
      reason: 'Prevents burnout by matching people with overlapping weekly hours and complementary leadership stances.',
      navText: 'Step 5 of 6: Cadence Sync',
      nextButton: 'Proceed to Squad Match Reveal (Step 6) →',
    },
    {
      breadcrumb: 'SYNDICATE MATCH REVEAL',
      title: 'Squad Match Reveal',
      reason: 'Synthesizes your vector across 1,400+ builders to generate your complementary four-person squad.',
      navText: 'Step 6 of 6: Syndicate Calibration',
      nextButton: 'Enter Syndicate Workspace & Dashboard →',
    },
  ];

  const currentStepInfo = stepMeta[step - 1];

  const handleFinalSubmit = () => {
    setIsBuildingPersona(true);

    const formattedSkills: UserSkill[] = selectedSkillNames.map((skillName) => {
      const match = availableSkills.find((s) => s.name === skillName);
      return {
        name: skillName,
        category: match ? match.category : 'Technical',
        level: 'Advanced',
        evidence: 'Project',
      };
    });

    const interval = setInterval(() => {
      setPersonaProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            updateCurrentUser({
              name,
              username: username.replace(/^@/, ''),
              location: `${city}, South India`,
              roleTitle: occupation,
              yearsExperience: 2,
              skills: formattedSkills,
              ambition,
              buildingStatus,
              goals: { thirtyDay: goal30, ninetyDay: goal90, longTerm: goalLong },
              offer: offerList,
              need: needList,
              workingStyle: {
                soloVsTeam,
                leaderVsExecutor,
                hoursPerWeek,
                timeZone: 'IST (UTC+5:30)',
                remoteHybrid: preferredModel,
              },
              portfolio: {
                github: githubUrl,
                liveProject: liveProjectUrl,
              },
            });
            navigate('/dashboard');
          }, 450);
          return 100;
        }
        return prev + 25;
      });
    }, 450);
  };

  // Helper calculation for word & char counter
  const getCounts = (str: string) => {
    const chars = str.length;
    const words = str.trim() ? str.trim().split(/\s+/).filter(Boolean).length : 0;
    return `${chars} chars • ${words} words`;
  };

  if (isBuildingPersona) {
    return (
      <div className="min-h-screen bg-[#F3EDE3] dark:bg-[#161311] text-[#29251F] dark:text-[#F7F2EE] flex flex-col items-center justify-center p-6 text-center font-body selection:bg-[#805536]/15 selection:text-[#29251F]">
        <div className="max-w-md w-full bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#DCD1C0] dark:border-[#362F29] rounded-3xl p-8 space-y-6 shadow-card animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-[#E7DCCB] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] flex items-center justify-center text-[#805536] mx-auto animate-pulse">
            <Sparkles className="w-8 h-8 text-[#805536]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#805536] font-mono font-bold">
              COMPLEMENTARY GRAPH ENGINE
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-[#29251F] dark:text-[#F7F2EE]">
              Building your matching persona...
            </h2>
            <p className="text-xs text-[#665E54] dark:text-[#BDB1A6] leading-relaxed">
              Evaluating skill complementarity with 1,400+ Telugu AI builders across Hyderabad,
              Bengaluru, and Andhra Pradesh.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-full h-2 bg-[#E7DCCB] dark:bg-[#25201C] rounded-full overflow-hidden border border-[#DCD1C0] dark:border-[#362F29]">
              <div
                style={{ width: `${personaProgress}%` }}
                className="h-full bg-[#29251F] dark:bg-[#805536] transition-all duration-300"
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#665E54] dark:text-[#BDB1A6] font-mono">
              <span>Assembling Five-person ring</span>
              <span className="font-bold text-[#805536]">{personaProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const completionPercentages = [16, 33, 50, 66, 83, 100];

  return (
    <div className="min-h-screen bg-[#F3EDE3] dark:bg-[#161311] text-[#29251F] dark:text-[#F7F2EE] flex flex-col justify-between font-body selection:bg-[#805536]/15 selection:text-[#29251F]">
      {/* Top Header & Progress */}
      <header className="border-b border-[#DCD1C0] dark:border-[#362F29] bg-[#F3EDE3]/90 dark:bg-[#161311]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Left: Brand Badge */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#29251F] dark:bg-[#E7DCCB] text-[#F3EDE3] dark:text-[#161311] flex items-center justify-center font-bold text-xs shadow-sm font-heading">
              N
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xs tracking-[0.2em] text-[#29251F] dark:text-[#F7F2EE] leading-tight">
                NIGHTCLUB
              </span>
              <span className="text-[8px] tracking-[0.25em] text-[#8C8173] dark:text-[#8A7E73] uppercase leading-tight font-heading mt-0.5">
                ONBOARDING
              </span>
            </div>
          </div>

          {/* Center: Step Progress Track */}
          <div className="hidden sm:flex flex-col items-center gap-1.5">
            <div className="flex items-center justify-between w-56 text-[10px] font-mono font-bold tracking-wider uppercase text-[#665E54] dark:text-[#BDB1A6]">
              <span>STEP {step} OF 6</span>
              <span>{completionPercentages[step - 1]}% Completed</span>
            </div>
            <div className="relative w-56 h-1.5 bg-[#E7DCCB] dark:bg-[#25201C] rounded-full overflow-visible flex items-center">
              <div
                className="h-full bg-[#29251F] dark:bg-[#805536] rounded-full transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
              <div className="absolute inset-0 flex justify-between items-center pointer-events-none px-0.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i <= step ? 'bg-[#29251F] dark:bg-[#805536]' : 'bg-[#DCD1C0] dark:bg-[#362F29]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Autosaved Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF]/60 dark:bg-[#1E1A17]/60 text-[10px] text-[#665E54] dark:text-[#BDB1A6] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Autosaved • 100% cloudsync</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10">
        <div className="space-y-6">
          {/* Step Category Breadcrumb, Title & Why We Ask */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-[#DCD1C0] dark:border-[#362F29] bg-[#E7DCCB]/60 dark:bg-[#25201C] text-[10px] font-mono tracking-widest text-[#665E54] dark:text-[#BDB1A6] uppercase font-semibold">
              <span>STEP 0{step} OF 06</span>
              <span>•</span>
              <span>{currentStepInfo.breadcrumb}</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#29251F] dark:text-[#F7F2EE] tracking-tight">
              {currentStepInfo.title}
            </h1>

            <p className="text-xs text-[#665E54] dark:text-[#BDB1A6] flex items-center gap-1.5 flex-wrap">
              <strong className="text-[#29251F] dark:text-[#F7F2EE] font-semibold">Why we ask:</strong>
              <span>{currentStepInfo.reason}</span>
              <span
                className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-[#8C8173] text-[9px] text-[#8C8173] font-serif cursor-help ml-0.5"
                title="Calibrated automatically by the complementary graph engine"
              >
                i
              </span>
            </p>
          </div>

          {/* ============================================================== */}
          {/* STEP 1: ABOUT YOU (Founder & Peer Archetype)                   */}
          {/* ============================================================== */}
          {step === 1 && (
            <div className="bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#DCD1C0] dark:border-[#362F29] rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
              {/* Row 1: Full Name & Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                      FULL NAME
                    </label>
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" />
                      Verified
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full nc-input pr-9 text-xs font-medium"
                      placeholder="e.g. Venkata Sai Kumar"
                    />
                    <div className="absolute right-3 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      ✓
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                      USERNAME / HANDLE
                    </label>
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Available in Cohort #14
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={username.startsWith('@') ? username : `@${username}`}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full nc-input pr-9 text-xs font-mono font-medium"
                      placeholder="@username"
                    />
                    <div className="absolute right-3 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      ✓
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: City & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                      CITY OF RESIDENCE
                    </label>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8173] dark:text-[#8A7E73]">
                      LOCAL HUB MATCH
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-[#8C8173] absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full nc-input pl-9 pr-9 text-xs font-medium"
                      placeholder="e.g. Hyderabad"
                    />
                    <div className="absolute right-3 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      ✓
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                      YEARS OF EXPERIENCE
                    </label>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8173] dark:text-[#8A7E73]">
                      LEVEL INDEX
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <select
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                      className="w-full nc-input pr-9 text-xs appearance-none cursor-pointer font-medium"
                    >
                      <option value="0–2 years (Early Builder / Graduate)">
                        0–2 years (Early Builder / Graduate)
                      </option>
                      <option value="3–5 years (Mid-level Builder)">
                        3–5 years (Mid-level Builder)
                      </option>
                      <option value="6–8 years (Senior Specialist / Lead)">
                        6–8 years (Senior Specialist / Lead)
                      </option>
                      <option value="9+ years (Staff Architect / Founder)">
                        9+ years (Staff Architect / Founder)
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8C8173] absolute right-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: Current Role / Occupation */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                    CURRENT ROLE / OCCUPATION
                  </label>
                  <span className="text-[10px] text-[#8C8173] dark:text-[#8A7E73]">
                    Role craft & specialty
                  </span>
                </div>
                <div className="relative flex items-center">
                  <span className="text-sm absolute left-3 pointer-events-none">🪪</span>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full nc-input pl-9 pr-9 text-xs font-medium"
                    placeholder="e.g. Full-Stack & Systems Engineer"
                  />
                  <div className="absolute right-3 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                    ✓
                  </div>
                </div>
              </div>

              {/* Row 4: Spoken Languages */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                    SPOKEN LANGUAGES
                  </label>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#DCD1C0] dark:border-[#362F29] text-[#665E54] dark:text-[#BDB1A6]">
                    {languages.length} selected
                  </span>
                </div>
                <p className="text-[11px] text-[#8C8173] dark:text-[#8A7E73] mb-3">
                  Select the languages you converse comfortably in.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {allLanguages.map((lang) => {
                    const isSelected = languages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() =>
                          setLanguages(
                            isSelected ? languages.filter((l) => l !== lang) : [...languages, lang]
                          )
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#29251F] text-white dark:bg-[#E7DCCB] dark:text-[#161311] shadow-sm'
                            : 'bg-[#FFFFFF] dark:bg-[#25201C] text-[#29251F] dark:text-[#F7F2EE] border border-[#DCD1C0] dark:border-[#362F29] hover:border-[#805536]'
                        }`}
                      >
                        <span>{lang}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 2: YOUR SKILLS & CRAFT (Taxonomy & Capability Vector)     */}
          {/* ============================================================== */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Beginner Welcome Banner */}
              <div className="bg-[#EFE6D8] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] rounded-2xl p-4 flex items-start sm:items-center gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#29251F] dark:bg-[#805536] text-white flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#29251F] dark:text-[#F7F2EE] leading-relaxed">
                  <strong>Beginners are warmly welcomed:</strong> Be honest about your level. Teams need
                  enthusiastic executors as much as senior architects!
                </p>
              </div>

              {/* Main Skills Card */}
              <div className="bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#DCD1C0] dark:border-[#362F29] rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
                {/* Search Bar */}
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-[#8C8173] absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 120+ skills... (Press / to search)"
                    className="w-full nc-input pl-10 pr-10 text-xs"
                  />
                  <span className="absolute right-3.5 px-1.5 py-0.5 rounded border border-[#DCD1C0] dark:border-[#362F29] text-[10px] font-mono text-[#8C8173]">
                    /
                  </span>
                </div>

                {/* 4 Skill Categories */}
                {(['Technical', 'Creative', 'Business', 'People'] as SkillCategory[]).map((cat) => {
                  const skillsInCat = availableSkills.filter((s) => s.category === cat);
                  const filtered = searchQuery.trim()
                    ? skillsInCat.filter((s) =>
                        s.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                    : skillsInCat;

                  if (filtered.length === 0 && searchQuery.trim()) return null;

                  const selectedCountInCat = selectedSkillNames.filter((name) =>
                    skillsInCat.some((s) => s.name === name)
                  ).length;

                  return (
                    <div key={cat} className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6]">
                          {cat.toUpperCase()} SKILLS
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            selectedCountInCat > 0
                              ? 'bg-[#29251F] dark:bg-[#E7DCCB] text-[#FFFFFF] dark:text-[#161311] font-bold'
                              : 'border border-[#DCD1C0] dark:border-[#362F29] text-[#8C8173] dark:text-[#8A7E73]'
                          }`}
                        >
                          {selectedCountInCat} selected
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {filtered.map((skill) => {
                          const isSelected = selectedSkillNames.includes(skill.name);
                          return (
                            <button
                              key={skill.name}
                              type="button"
                              onClick={() => handleToggleSkill(skill.name)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-[#29251F] dark:bg-[#E7DCCB] text-[#FFFFFF] dark:text-[#161311] font-semibold border border-[#29251F] dark:border-[#E7DCCB] shadow-sm'
                                  : 'bg-[#FFFFFF] dark:bg-[#25201C] text-[#29251F] dark:text-[#F7F2EE] border border-[#DCD1C0] dark:border-[#362F29] hover:border-[#805536]'
                              }`}
                            >
                              <span>{isSelected ? '✓' : '+'}</span>
                              <span>{skill.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 3: AMBITION & GOALS (Trajectory & Intent)                 */}
          {/* ============================================================== */}
          {step === 3 && (
            <div className="bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#DCD1C0] dark:border-[#362F29] rounded-3xl p-6 sm:p-8 shadow-card space-y-7">
              {/* Primary Ambition */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                    PRIMARY AMBITION
                  </label>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#29251F] dark:bg-[#E7DCCB] text-white dark:text-[#161311] font-bold">
                    1 selected
                  </span>
                </div>
                <p className="text-[11px] text-[#8C8173] dark:text-[#8A7E73] mb-3">Select one focus</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ambitionOptions.slice(0, 3).map((opt) => {
                    const isSelected = ambition === opt.id;
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAmbition(opt.id)}
                        className={`p-4 rounded-2xl text-left transition-all relative flex items-center gap-3.5 ${
                          isSelected
                            ? 'border-2 border-[#29251F] dark:border-[#805536] bg-[#FBF8F3] dark:bg-[#25201C] shadow-sm'
                            : 'border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#1E1A17] hover:border-[#805536]'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#29251F] dark:bg-[#805536] text-white'
                              : 'bg-[#F3EDE3] dark:bg-[#25201C] text-[#805536]'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-xs text-[#29251F] dark:text-[#F7F2EE] truncate">
                            {opt.title}
                          </h4>
                          <p className="text-[10px] text-[#8C8173] dark:text-[#8A7E73] truncate">
                            {opt.desc}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#29251F] dark:bg-[#805536] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  {ambitionOptions.slice(3, 5).map((opt) => {
                    const isSelected = ambition === opt.id;
                    const IconComponent = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAmbition(opt.id)}
                        className={`p-4 rounded-2xl text-left transition-all relative flex items-center gap-3.5 ${
                          isSelected
                            ? 'border-2 border-[#29251F] dark:border-[#805536] bg-[#FBF8F3] dark:bg-[#25201C] shadow-sm'
                            : 'border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#1E1A17] hover:border-[#805536]'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#29251F] dark:bg-[#805536] text-white'
                              : 'bg-[#F3EDE3] dark:bg-[#25201C] text-[#805536]'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-xs text-[#29251F] dark:text-[#F7F2EE] truncate">
                            {opt.title}
                          </h4>
                          <p className="text-[10px] text-[#8C8173] dark:text-[#8A7E73] truncate">
                            {opt.desc}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-[#29251F] dark:bg-[#805536] text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Building Status */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                    BUILDING STATUS
                  </label>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active Phase
                  </span>
                </div>
                <p className="text-[11px] text-[#8C8173] dark:text-[#8A7E73] mb-3">
                  Current operational velocity
                </p>

                <div className="p-1 rounded-2xl border border-[#DCD1C0] dark:border-[#362F29] bg-[#FBF8F3] dark:bg-[#25201C] grid grid-cols-2 sm:grid-cols-4 gap-1">
                  {buildingStatusOptions.map((stat, idx) => {
                    const isSelected = buildingStatus === stat;
                    return (
                      <button
                        key={stat}
                        type="button"
                        onClick={() => setBuildingStatus(stat)}
                        className={`py-2 px-3 rounded-xl text-xs transition-all font-mono ${
                          isSelected
                            ? 'bg-[#29251F] dark:bg-[#805536] text-white font-bold shadow-sm'
                            : 'text-[#665E54] dark:text-[#BDB1A6] hover:text-[#29251F] dark:hover:text-white font-medium'
                        }`}
                      >
                        0{idx + 1} {stat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Milestones & Vision */}
              <div className="space-y-4 pt-2 border-t border-[#DCD1C0] dark:border-[#362F29]">
                <div>
                  <h3 className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-bold">
                    MILESTONES & VISION
                  </h3>
                  <p className="text-[11px] text-[#8C8173] dark:text-[#8A7E73]">
                    Concrete commitments for syndicate alignment
                  </p>
                </div>

                {/* 30-Day Goal */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                      WHAT IS YOUR 30-DAY GOAL?
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        Crisp
                      </span>
                      <span className="text-[10px] font-mono text-[#8C8173] dark:text-[#8A7E73]">
                        {getCounts(goal30)}
                      </span>
                    </div>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={goal30}
                      onChange={(e) => setGoal30(e.target.value)}
                      className="w-full nc-input pr-9 text-xs font-medium"
                    />
                    <div className="absolute right-3 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      ✓
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#8C8173] dark:text-[#8A7E73] flex-wrap">
                    <span>Suggestions:</span>
                    <button
                      type="button"
                      onClick={() => setGoal30('Ship v1 on Product Hunt')}
                      className="px-2 py-0.5 rounded-md border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#25201C] hover:border-[#805536] transition-colors"
                    >
                      + Ship v1 on Product Hunt
                    </button>
                    <button
                      type="button"
                      onClick={() => setGoal30('Close first 10 design partners')}
                      className="px-2 py-0.5 rounded-md border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#25201C] hover:border-[#805536] transition-colors"
                    >
                      + Close first 10 design partners
                    </button>
                  </div>
                </div>

                {/* 90-Day Goal */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                      WHAT IS YOUR 90-DAY GOAL?
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        Measurable
                      </span>
                      <span className="text-[10px] font-mono text-[#8C8173] dark:text-[#8A7E73]">
                        {getCounts(goal90)}
                      </span>
                    </div>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={goal90}
                      onChange={(e) => setGoal90(e.target.value)}
                      className="w-full nc-input pr-9 text-xs font-medium"
                    />
                    <div className="absolute right-3 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      ✓
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#8C8173] dark:text-[#8A7E73] flex-wrap">
                    <span>Suggestions:</span>
                    <button
                      type="button"
                      onClick={() => setGoal90('Reach $5k MRR with paid tier')}
                      className="px-2 py-0.5 rounded-md border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#25201C] hover:border-[#805536] transition-colors"
                    >
                      + Reach $5k MRR with paid tier
                    </button>
                    <button
                      type="button"
                      onClick={() => setGoal90('Secure pre-seed angel commitment')}
                      className="px-2 py-0.5 rounded-md border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#25201C] hover:border-[#805536] transition-colors"
                    >
                      + Secure pre-seed angel commitment
                    </button>
                  </div>
                </div>

                {/* Long-Term Vision */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                      LONG-TERM VISION
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        North Star
                      </span>
                      <span className="text-[10px] font-mono text-[#8C8173] dark:text-[#8A7E73]">
                        {getCounts(goalLong)}
                      </span>
                    </div>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={goalLong}
                      onChange={(e) => setGoalLong(e.target.value)}
                      className="w-full nc-input pr-9 text-xs font-medium"
                    />
                    <div className="absolute right-3 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      ✓
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#8C8173] dark:text-[#8A7E73] flex-wrap">
                    <span>Suggestions:</span>
                    <button
                      type="button"
                      onClick={() => setGoalLong('Category-leading AI devtools venture')}
                      className="px-2 py-0.5 rounded-md border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#25201C] hover:border-[#805536] transition-colors"
                    >
                      + Category-leading AI devtools venture
                    </button>
                    <button
                      type="button"
                      onClick={() => setGoalLong('Scale open source infra to 50k engineers')}
                      className="px-2 py-0.5 rounded-md border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#25201C] hover:border-[#805536] transition-colors"
                    >
                      + Scale open source infra to 50k engineers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 4: OFFER & NEED MATRIX (Syndicate Complementarity)        */}
          {/* ============================================================== */}
          {step === 4 && (
            <div className="bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#DCD1C0] dark:border-[#362F29] rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Column 1: What can you give? */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🪪</span>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-bold">
                        WHAT CAN YOU GIVE?
                      </label>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#29251F] dark:bg-[#E7DCCB] text-white dark:text-[#161311] font-bold">
                      {offerList.length} offers
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C8173] dark:text-[#8A7E73]">
                    Skills or superpowers you bring to your teammates:
                  </p>

                  <div className="space-y-2">
                    {offerList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] text-xs text-[#29251F] dark:text-[#F7F2EE]"
                      >
                        <GripVertical className="w-3.5 h-3.5 text-[#8C8173] shrink-0" />
                        <span className="text-[#8C8173]">•</span>
                        <span className="font-medium flex-1">{item}</span>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 p-1 rounded-xl border border-dashed border-[#DCD1C0] dark:border-[#362F29] bg-transparent">
                      <input
                        type="text"
                        value={newOfferInput}
                        onChange={(e) => setNewOfferInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddOffer()}
                        placeholder="+ Add another skill you offer..."
                        className="w-full bg-transparent px-3 py-2 text-xs outline-none text-[#29251F] dark:text-[#F7F2EE] placeholder:text-[#8C8173]"
                      />
                      {newOfferInput && (
                        <button
                          type="button"
                          onClick={handleAddOffer}
                          className="px-2.5 py-1 text-[10px] bg-[#805536] text-white rounded-lg font-semibold mr-1"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 2: What do you need? */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">💎</span>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-bold">
                        WHAT DO YOU NEED?
                      </label>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#DCD1C0] dark:border-[#362F29] text-[#665E54] dark:text-[#BDB1A6] font-bold">
                      {needList.length} needs
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C8173] dark:text-[#8A7E73]">
                    Roles or complementary skills you want others to cover:
                  </p>

                  <div className="space-y-2">
                    {needList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] text-xs text-[#29251F] dark:text-[#F7F2EE]"
                      >
                        <GripVertical className="w-3.5 h-3.5 text-[#8C8173] shrink-0" />
                        <span className="text-[#8C8173]">•</span>
                        <span className="font-medium flex-1 truncate">{item}</span>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 p-1 rounded-xl border border-dashed border-[#DCD1C0] dark:border-[#362F29] bg-transparent">
                      <input
                        type="text"
                        value={newNeedInput}
                        onChange={(e) => setNewNeedInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddNeed()}
                        placeholder="+ Add a skill you need covered..."
                        className="w-full bg-transparent px-3 py-2 text-xs outline-none text-[#29251F] dark:text-[#F7F2EE] placeholder:text-[#8C8173]"
                      />
                      {newNeedInput && (
                        <button
                          type="button"
                          onClick={handleAddNeed}
                          className="px-2.5 py-1 text-[10px] bg-[#805536] text-white rounded-lg font-semibold mr-1"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Live Synergy Engine Box */}
              <div className="bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#29251F] dark:bg-[#805536] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-[#8C8173] dark:text-[#8A7E73] font-bold">
                        LIVE SYNERGY ENGINE
                      </span>
                      <span className="text-[9px] font-mono uppercase bg-[#E7DCCB] dark:bg-[#362F29] text-[#665E54] dark:text-[#BDB1A6] px-2 py-0.5 rounded font-bold">
                        OPTIMAL PAIRINGS
                      </span>
                    </div>
                    <h4 className="font-heading font-extrabold text-base text-[#29251F] dark:text-[#F7F2EE]">
                      94% Team Synergy Potential
                    </h4>
                    <p className="text-[11px] text-[#8C8173] dark:text-[#8A7E73]">
                      Optimal pairing ready: 1x Senior UI/UX Designer + 1x GTM Strategist
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end justify-center gap-1 border-t sm:border-t-0 border-[#DCD1C0] dark:border-[#362F29] pt-3 sm:pt-0">
                  <div className="flex items-center gap-3">
                    <div className="text-left sm:text-right">
                      <div className="text-[9px] font-mono uppercase text-[#8C8173] dark:text-[#8A7E73] font-semibold">
                        SYNERGY INDEX
                      </div>
                      <div className="text-xs font-bold text-[#29251F] dark:text-[#F7F2EE]">
                        High Complementarity
                      </div>
                    </div>
                    <div className="w-28 sm:w-36 h-2 bg-[#E7DCCB] dark:bg-[#362F29] rounded-full overflow-hidden">
                      <div className="h-full bg-[#29251F] dark:bg-[#805536] rounded-full w-[94%]" />
                    </div>
                    <span className="font-mono font-bold text-xs text-[#29251F] dark:text-[#F7F2EE]">
                      94%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 5: WORKING STYLE & TIME (Temporal & Working Cadence)      */}
          {/* ============================================================== */}
          {step === 5 && (
            <div className="bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#DCD1C0] dark:border-[#362F29] rounded-3xl p-6 sm:p-8 shadow-card space-y-7">
              {/* Solo vs Team Preference */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                    SOLO VS TEAM PREFERENCE
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#DCD1C0] dark:border-[#362F29] text-[#665E54] dark:text-[#BDB1A6]">
                      {soloVsTeam}%
                    </span>
                    <span className="font-heading font-bold text-xs text-[#29251F] dark:text-[#F7F2EE]">
                      {soloVsTeam > 60
                        ? 'Strong Team Collaborator'
                        : soloVsTeam > 40
                        ? 'Balanced Collaborator'
                        : 'Independent Solo Builder'}
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={soloVsTeam}
                  onChange={(e) => setSoloVsTeam(Number(e.target.value))}
                  className="nc-slider"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#8C8173] dark:text-[#8A7E73]">
                  <span>Prefers Solo</span>
                  <span>Balanced</span>
                  <span>Prefers Constant Sync</span>
                </div>
              </div>

              {/* Leader vs Executor Stance */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                    LEADER VS EXECUTOR STANCE
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#DCD1C0] dark:border-[#362F29] text-[#665E54] dark:text-[#BDB1A6]">
                      {leaderVsExecutor}%
                    </span>
                    <span className="font-heading font-bold text-xs text-[#29251F] dark:text-[#F7F2EE]">
                      {leaderVsExecutor > 60
                        ? 'Strategic Director'
                        : leaderVsExecutor > 35
                        ? 'Balanced Builder'
                        : 'Hands-on Executor'}
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={leaderVsExecutor}
                  onChange={(e) => setLeaderVsExecutor(Number(e.target.value))}
                  className="nc-slider"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#8C8173] dark:text-[#8A7E73]">
                  <span>Hands-on Executor</span>
                  <span>Balanced Builder</span>
                  <span>Strategic Director</span>
                </div>
              </div>

              {/* Hours per Week & Preferred Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#DCD1C0] dark:border-[#362F29]">
                <div className="space-y-2.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold">
                      AVAILABLE HOURS PER WEEK: {hoursPerWeek} HRS
                    </label>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#DCD1C0] dark:border-[#362F29] bg-[#FBF8F3] dark:bg-[#25201C] text-[#665E54] dark:text-[#BDB1A6] inline-block w-fit">
                      {hoursPerWeek <= 10
                        ? 'Part-time (Side quest speed)'
                        : hoursPerWeek <= 35
                        ? 'Part-time Nights & Weekends (Co-founder speed)'
                        : 'Full-time (All-in sprint speed)'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={60}
                    step={5}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="nc-slider"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#8C8173] dark:text-[#8A7E73]">
                    <span>5h (Side quest)</span>
                    <span>25h (Co-founder speed)</span>
                    <span>60h (All-in sprint)</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold block">
                    PREFERRED MODEL
                  </label>
                  <div className="relative flex items-center">
                    <select
                      value={preferredModel}
                      onChange={(e) => setPreferredModel(e.target.value as any)}
                      className="w-full nc-input pr-9 text-xs appearance-none cursor-pointer font-medium"
                    >
                      <option value="Hybrid">● Hybrid (Remote + City Meetups)</option>
                      <option value="Remote">● 100% Remote (Global Sync)</option>
                      <option value="In-person">● In-person (Hyderabad / Bengaluru Hubs)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#8C8173] absolute right-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Archetype Calibration Card */}
              <div className="bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase text-[#8C8173] dark:text-[#8A7E73] font-bold">
                    <Share2 className="w-3.5 h-3.5 text-[#805536]" />
                    <span>ARCHETYPE CALIBRATION</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <h4 className="font-heading font-extrabold text-sm text-[#29251F] dark:text-[#F7F2EE]">
                    Archetype Calibrated: Pragmatic Technical Catalyst
                  </h4>
                  <p className="text-[11px] text-[#8C8173] dark:text-[#8A7E73] max-w-md">
                    Pairs optimally with a <strong>Staff Product Designer (Maya Lin)</strong> &{' '}
                    <strong>GTM Strategist (Elena Rostova)</strong> for a 4-person venture squad.
                  </p>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#1E1A17] shrink-0">
                  <div>
                    <div className="text-[9px] font-mono uppercase text-[#8C8173] dark:text-[#8A7E73]">
                      MATCH RESONANCE
                    </div>
                    <div className="text-[10px] font-bold text-[#29251F] dark:text-[#F7F2EE]">
                      98% Syndicate Resonance
                    </div>
                  </div>
                  <div className="font-mono font-black text-sm px-2 py-0.5 rounded border border-[#DCD1C0] dark:border-[#362F29] text-[#29251F] dark:text-[#F7F2EE]">
                    98%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* STEP 6: SQUAD MATCH REVEAL (Syndicate Calibration & Climax)   */}
          {/* ============================================================== */}
          {step === 6 && (
            <div className="bg-[#FFFFFF] dark:bg-[#1E1A17] border border-[#DCD1C0] dark:border-[#362F29] rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
              {/* Match Header Announcement */}
              <div className="p-4 rounded-2xl bg-[#EFE6D8] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#29251F] dark:bg-[#805536] text-white flex items-center justify-center font-bold">
                    🎯
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-sm text-[#29251F] dark:text-[#F7F2EE]">
                      98% Syndicate Complementarity Match Found!
                    </h3>
                    <p className="text-xs text-[#665E54] dark:text-[#BDB1A6]">
                      We calibrated your vector with 1,400+ Telugu AI builders. Here is your suggested
                      4-person build squad:
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-mono uppercase text-[#8C8173] block">
                    COHORT SQUAD #14
                  </span>
                  <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                    High Affinity
                  </span>
                </div>
              </div>

              {/* 4 Squad Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Member 1: You */}
                <div className="p-4 rounded-2xl border-2 border-[#29251F] dark:border-[#805536] bg-[#FBF8F3] dark:bg-[#25201C] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#805536]">
                      YOU • SQUAD ANCHOR
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#29251F] text-white dark:bg-[#E7DCCB] dark:text-[#161311] font-bold">
                      100% Match
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#29251F] dark:text-[#F7F2EE]">
                    {name}
                  </h4>
                  <p className="text-xs text-[#8C8173] font-medium">Pragmatic Technical Catalyst</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] bg-white dark:bg-[#1E1A17] border border-[#DCD1C0] dark:border-[#362F29] px-2 py-0.5 rounded-md">
                      Backend Systems
                    </span>
                    <span className="text-[10px] bg-white dark:bg-[#1E1A17] border border-[#DCD1C0] dark:border-[#362F29] px-2 py-0.5 rounded-md">
                      {city} • {hoursPerWeek}h/wk
                    </span>
                  </div>
                </div>

                {/* Member 2: Maya Lin */}
                <div className="p-4 rounded-2xl border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#1E1A17] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C8173]">
                      STAFF DESIGNER
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800/40">
                      98% Synergy
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#29251F] dark:text-[#F7F2EE]">
                    Maya Lin
                  </h4>
                  <p className="text-xs text-[#8C8173] font-medium">Staff Product & Tokens Lead</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] px-2 py-0.5 rounded-md">
                      Design Systems & Figma
                    </span>
                    <span className="text-[10px] bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] px-2 py-0.5 rounded-md">
                      Bengaluru • 25h/wk
                    </span>
                  </div>
                </div>

                {/* Member 3: Elena Rostova */}
                <div className="p-4 rounded-2xl border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#1E1A17] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C8173]">
                      GTM STRATEGIST
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800/40">
                      96% Synergy
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#29251F] dark:text-[#F7F2EE]">
                    Elena Rostova
                  </h4>
                  <p className="text-xs text-[#8C8173] font-medium">B2B Founder Outreach & Decks</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] px-2 py-0.5 rounded-md">
                      Sales & Growth Loops
                    </span>
                    <span className="text-[10px] bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] px-2 py-0.5 rounded-md">
                      Hyderabad • 25h/wk
                    </span>
                  </div>
                </div>

                {/* Member 4: Arjun Reddy */}
                <div className="p-4 rounded-2xl border border-[#DCD1C0] dark:border-[#362F29] bg-[#FFFFFF] dark:bg-[#1E1A17] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C8173]">
                      SYSTEMS ARCHITECT
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800/40">
                      95% Synergy
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#29251F] dark:text-[#F7F2EE]">
                    Arjun Reddy
                  </h4>
                  <p className="text-xs text-[#8C8173] font-medium">PostgreSQL, Redis & Cloud Scale</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] px-2 py-0.5 rounded-md">
                      Distributed Clusters
                    </span>
                    <span className="text-[10px] bg-[#FBF8F3] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] px-2 py-0.5 rounded-md">
                      Amaravati • 30h/wk
                    </span>
                  </div>
                </div>
              </div>

              {/* Optional Portfolio Links */}
              <div className="pt-2 border-t border-[#DCD1C0] dark:border-[#362F29] space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#665E54] dark:text-[#BDB1A6] font-semibold block">
                  OPTIONAL PORTFOLIO LINKS (CAN BE ADDED LATER)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-[#8C8173] block mb-1">GitHub Profile</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full nc-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C8173] block mb-1">Live Shipped Project</label>
                    <input
                      type="url"
                      value={liveProjectUrl}
                      onChange={(e) => setLiveProjectUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full nc-input text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* BOTTOM NAVIGATION CONTROLS                                    */}
          {/* ============================================================== */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#DCD1C0] dark:border-[#362F29]">
            {/* Left Back Button */}
            <div>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="bg-[#FFFFFF] dark:bg-[#25201C] border border-[#DCD1C0] dark:border-[#362F29] text-[#29251F] dark:text-[#F7F2EE] hover:border-[#805536] font-medium py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}
            </div>

            {/* Middle Step Indicator / Context Note */}
            <div className="text-[11px] font-mono text-[#665E54] dark:text-[#BDB1A6] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#805536]" />
              <span>{currentStepInfo.navText}</span>
              {step === 2 && (
                <span className="hidden sm:inline text-[#8C8173] dark:text-[#8A7E73]">
                  • You can update skills anytime in your profile
                </span>
              )}
            </div>

            {/* Right Next / Finish Button */}
            <div>
              {step < 6 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-[#29251F] hover:bg-[#805536] text-white dark:bg-[#805536] dark:hover:bg-[#6C462B] font-semibold py-3 px-6 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <span>{currentStepInfo.nextButton}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="bg-[#29251F] hover:bg-[#805536] text-white dark:bg-[#805536] dark:hover:bg-[#6C462B] font-bold py-3 px-7 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <span>Enter Syndicate Workspace & Dashboard →</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-14 border-t border-[#DCD1C0] dark:border-[#362F29] px-6 sm:px-12 flex items-center justify-between text-[11px] font-mono text-[#8C8173] dark:text-[#8A7E73] bg-[#F3EDE3] dark:bg-[#161311]">
        <span>© Nightclub Network Inc.</span>
        <span>Encrypted Client Handshake</span>
      </footer>
    </div>
  );
};
