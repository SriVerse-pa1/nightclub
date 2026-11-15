import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SkillCategory, SkillLevel, UserSkill } from '../../types';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Shield,
  HelpCircle,
  Clock,
  Compass,
  Code2,
  Palette,
  Briefcase,
  Users,
} from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { navigate, currentUser, updateCurrentUser } = useApp();

  const [step, setStep] = useState(1);
  const [isBuildingPersona, setIsBuildingPersona] = useState(false);
  const [personaProgress, setPersonaProgress] = useState(15);

  // Step 1: About You
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [city, setCity] = useState(currentUser.location.split(',')[0]);
  const [languages, setLanguages] = useState<string[]>(['Telugu', 'English']);
  const [occupation, setOccupation] = useState(currentUser.roleTitle);
  const [yearsExperience, setYearsExperience] = useState(currentUser.yearsExperience);

  // Step 2: Skills
  const availableSkills: Array<{ name: string; category: SkillCategory }> = [
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
    { name: 'Sprint Prioritization', category: 'People' },
    { name: 'Team Leadership', category: 'People' },
    { name: 'Community Management', category: 'People' },
  ];

  const [selectedSkills, setSelectedSkills] = useState<UserSkill[]>(currentUser.skills);

  // Step 3: Goals
  const [ambition, setAmbition] = useState(currentUser.ambition);
  const [buildingStatus, setBuildingStatus] = useState(currentUser.buildingStatus);
  const [goal30, setGoal30] = useState(currentUser.goals.thirtyDay);
  const [goal90, setGoal90] = useState(currentUser.goals.ninetyDay);
  const [goalLong, setGoalLong] = useState(currentUser.goals.longTerm);

  // Step 4: Offer and Need
  const [offerList, setOfferList] = useState<string[]>(currentUser.offer);
  const [needList, setNeedList] = useState<string[]>(currentUser.need);

  // Step 5: Working Style
  const [soloVsTeam, setSoloVsTeam] = useState(currentUser.workingStyle.soloVsTeam);
  const [leaderVsExecutor, setLeaderVsExecutor] = useState(currentUser.workingStyle.leaderVsExecutor);
  const [hoursPerWeek, setHoursPerWeek] = useState(currentUser.workingStyle.hoursPerWeek);
  const [remoteHybrid, setRemoteHybrid] = useState(currentUser.workingStyle.remoteHybrid);

  // Step 6: Portfolio
  const [github, setGithub] = useState(currentUser.portfolio.github || '');
  const [dribbble, setDribbble] = useState(currentUser.portfolio.dribbble || '');
  const [liveProject, setLiveProject] = useState(currentUser.portfolio.liveProject || '');

  // Step Meta
  const stepTitles = [
    { title: 'About You', reason: 'Allows the system to introduce you by name and location to local Telugu cohorts.' },
    { title: 'Your Skills & Craft', reason: 'Maps your strengths so our algorithm finds people who cover what you do not.' },
    { title: 'Ambition & Goals', reason: 'Ensures your four teammates share your speed, ambition, and 30-day timeline.' },
    { title: 'Offer & Need Matrix', reason: 'Pairs what you can give with what another builder specifically requests.' },
    { title: 'Working Style & Time', reason: 'Prevents burnout by matching people with overlapping weekly hours.' },
    { title: 'Portfolio & Proof', reason: 'Optional proof of work to boost your profile match weight in the network.' },
  ];

  const handleSkillToggle = (skillName: string, category: SkillCategory) => {
    const exists = selectedSkills.find((s) => s.name === skillName);
    if (exists) {
      setSelectedSkills(selectedSkills.filter((s) => s.name !== skillName));
    } else {
      setSelectedSkills([
        ...selectedSkills,
        { name: skillName, category, level: 'Intermediate', evidence: 'Self-reported' },
      ]);
    }
  };

  const handleLevelChange = (skillName: string, level: SkillLevel) => {
    setSelectedSkills(
      selectedSkills.map((s) => (s.name === skillName ? { ...s, level } : s))
    );
  };

  const handleFinalSubmit = () => {
    setIsBuildingPersona(true);

    const interval = setInterval(() => {
      setPersonaProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            updateCurrentUser({
              name,
              username,
              location: `${city}, South India`,
              roleTitle: occupation,
              yearsExperience: Number(yearsExperience),
              skills: selectedSkills,
              ambition,
              buildingStatus,
              goals: { thirtyDay: goal30, ninetyDay: goal90, longTerm: goalLong },
              offer: offerList,
              need: needList,
              workingStyle: {
                soloVsTeam,
                leaderVsExecutor,
                hoursPerWeek: Number(hoursPerWeek),
                timeZone: 'IST (UTC+5:30)',
                remoteHybrid,
              },
              portfolio: { github, dribbble, liveProject },
            });
            navigate('/dashboard');
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  if (isBuildingPersona) {
    return (
      <div className="min-h-screen bg-[#17102A] text-[#F3EEFF] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-[#1E1537] border border-[#FFB547]/40 rounded-3xl p-8 space-y-6 shadow-glow-card animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-[#FFB547]/20 border border-[#FFB547]/40 flex items-center justify-center text-[#FFB547] mx-auto animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#FFB547] font-semibold">
              Complementary Graph Engine
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-[#F3EEFF]">
              Building your matching persona...
            </h2>
            <p className="text-xs text-[#A99CCB] leading-relaxed">
              Evaluating skill complementarity with 1,400+ Telugu AI builders across Hyderabad,
              Bengaluru, and Andhra Pradesh.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-full h-2 bg-[#17102A] rounded-full overflow-hidden border border-[#3A2E5C]">
              <div
                style={{ width: `${personaProgress}%` }}
                className="h-full bg-gradient-to-r from-[#FFB547]/80 to-[#FFB547] transition-all duration-300"
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#A99CCB]">
              <span>Assembling Five-person ring</span>
              <span className="font-bold text-[#FFB547]">{personaProgress}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#17102A] text-[#F3EEFF] flex flex-col justify-between">
      {/* Top Header & Progress */}
      <header className="border-b border-[#3A2E5C] bg-[#17102A]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#22183B] border border-[#FFB547]/50 flex items-center justify-center text-[#FFB547] font-bold text-xs">
              N
            </div>
            <span className="font-heading font-bold text-sm tracking-wide text-[#F3EEFF]">
              NIGHTCLUB ONBOARDING
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#A99CCB]">
            <span>Autosaved</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* 6-step progress bar */}
        <div className="w-full bg-[#1F1735] h-1 flex">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-all duration-300 ${
                i + 1 <= step ? 'bg-[#FFB547]' : 'bg-[#3A2E5C]'
              }`}
            />
          ))}
        </div>
      </header>

      {/* Main Form Frame */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Step Header */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#FFB547] uppercase tracking-wider">
              Step {step} of 6
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
              {stepTitles[step - 1].title}
            </h1>
            <p className="text-xs text-[#A99CCB] flex items-center gap-1.5">
              <span className="text-[#2DD4BF] font-semibold">Why we ask:</span>
              <span>{stepTitles[step - 1].reason}</span>
            </p>
          </div>

          {/* STEP 1: About You */}
          {step === 1 && (
            <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A99CCB] font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full nc-input"
                  />
                </div>
                <div>
                  <label className="block text-[#A99CCB] font-medium mb-1">Username / Handle</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full nc-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#A99CCB] font-medium mb-1">City of Residence</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Hyderabad, Bengaluru, Vizag"
                    className="w-full nc-input"
                  />
                </div>
                <div>
                  <label className="block text-[#A99CCB] font-medium mb-1">Years of Experience</label>
                  <select
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(Number(e.target.value))}
                    className="w-full nc-input"
                  >
                    <option value={0} className="bg-[#17102A]">0 years (Beginner / Student)</option>
                    <option value={1} className="bg-[#17102A]">1 year</option>
                    <option value={2} className="bg-[#17102A]">2-3 years</option>
                    <option value={5} className="bg-[#17102A]">4-6 years</option>
                    <option value={8} className="bg-[#17102A]">7+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A99CCB] font-medium mb-1">Current Role / Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="e.g. Full-Stack Engineer, Student, UI Designer, Founder"
                  className="w-full nc-input"
                />
              </div>

              <div>
                <label className="block text-[#A99CCB] font-medium mb-1">Spoken Languages</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Telugu', 'English', 'Hindi', 'Tamil', 'Kannada'].map((lang) => {
                    const isSelected = languages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() =>
                          setLanguages(
                            isSelected
                              ? languages.filter((l) => l !== lang)
                              : [...languages, lang]
                          )
                        }
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#FFB547] text-[#17102A] border-[#FFB547]'
                            : 'bg-[#17102A] text-[#A99CCB] border-[#3A2E5C]'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Skills */}
          {step === 2 && (
            <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-6 space-y-6 text-xs">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#FFB547] text-xs">
                💡 <strong>Beginners are warmly welcomed:</strong> Be honest about your level. Teams
                need enthusiastic executors as much as senior architects!
              </div>

              {/* Skills Chips by Category */}
              {(['Technical', 'Creative', 'Business', 'People'] as SkillCategory[]).map((cat) => (
                <div key={cat} className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C6F9B]">
                    {cat} Skills
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {availableSkills
                      .filter((s) => s.category === cat)
                      .map((skill) => {
                        const isSelected = selectedSkills.some((s) => s.name === skill.name);
                        return (
                          <button
                            key={skill.name}
                            type="button"
                            onClick={() => handleSkillToggle(skill.name, skill.category)}
                            className={`px-3 py-1.5 rounded-xl border text-xs transition-all ${
                              isSelected
                                ? 'bg-[#FFB547]/20 border-[#FFB547] text-[#F3EEFF] font-semibold'
                                : 'bg-[#17102A] border-[#3A2E5C] text-[#A99CCB] hover:border-[#A99CCB]'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {skill.name}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}

              {/* Level Sliders for Selected Skills */}
              {selectedSkills.length > 0 && (
                <div className="pt-4 border-t border-[#3A2E5C] space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFB547]">
                    Set Skill Proficiency
                  </span>
                  <div className="space-y-3">
                    {selectedSkills.map((s) => (
                      <div
                        key={s.name}
                        className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <span className="font-semibold text-xs text-[#F3EEFF]">{s.name}</span>
                        <div className="flex items-center gap-1">
                          {(['Beginner', 'Intermediate', 'Advanced', 'Expert'] as SkillLevel[]).map(
                            (lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => handleLevelChange(s.name, lvl)}
                                className={`px-2 py-1 rounded text-[10px] font-medium border transition-colors ${
                                  s.level === lvl
                                    ? 'bg-[#FFB547] text-[#17102A] border-[#FFB547]'
                                    : 'bg-[#22183B] text-[#A99CCB] border-[#3A2E5C]'
                                }`}
                              >
                                {lvl}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Goals */}
          {step === 3 && (
            <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-6 space-y-5 text-xs">
              <div>
                <label className="block text-[#A99CCB] font-medium mb-2">Primary Ambition</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Start a startup', 'Get a job', 'Freelance', 'Research', 'Learn'].map((amb) => (
                    <button
                      key={amb}
                      type="button"
                      onClick={() => setAmbition(amb)}
                      className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                        ambition === amb
                          ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#F3EEFF]'
                          : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB] hover:border-[#A99CCB]'
                      }`}
                    >
                      {amb}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#A99CCB] font-medium mb-2">Building Status</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Exploring', 'Ideating', 'Building', 'Launched'].map((stat) => (
                    <button
                      key={stat}
                      type="button"
                      onClick={() => setBuildingStatus(stat as any)}
                      className={`p-2.5 rounded-xl border text-center font-semibold transition-all ${
                        buildingStatus === stat
                          ? 'border-[#2DD4BF] bg-[#2DD4BF]/10 text-[#2DD4BF]'
                          : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB]'
                      }`}
                    >
                      {stat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-[#3A2E5C]">
                <div>
                  <label className="block text-[#A99CCB] font-medium mb-1">
                    What is your 30-Day Goal?
                  </label>
                  <input
                    type="text"
                    value={goal30}
                    onChange={(e) => setGoal30(e.target.value)}
                    placeholder="e.g. Assemble a team and ship MVP"
                    className="w-full nc-input"
                  />
                </div>

                <div>
                  <label className="block text-[#A99CCB] font-medium mb-1">
                    What is your 90-Day Goal?
                  </label>
                  <input
                    type="text"
                    value={goal90}
                    onChange={(e) => setGoal90(e.target.value)}
                    placeholder="e.g. Reach 500 active beta users"
                    className="w-full nc-input"
                  />
                </div>

                <div>
                  <label className="block text-[#A99CCB] font-medium mb-1">Long-term Vision</label>
                  <input
                    type="text"
                    value={goalLong}
                    onChange={(e) => setGoalLong(e.target.value)}
                    placeholder="e.g. Build a venture in Hyderabad"
                    className="w-full nc-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Offer and Need */}
          {step === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* What can you give? */}
              <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-[#FFB547] uppercase tracking-wider">
                  What can you give?
                </span>
                <p className="text-[#A99CCB] text-[11px]">
                  Skills or superpowers you bring to your teammates:
                </p>
                <div className="space-y-2">
                  {offerList.map((off, idx) => (
                    <div key={idx} className="p-2.5 bg-[#17102A] rounded-xl border border-[#3A2E5C] text-[#F3EEFF]">
                      • {off}
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="+ Add another skill you offer..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setOfferList([...offerList, e.currentTarget.value.trim()]);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full nc-input text-[11px]"
                  />
                </div>
              </div>

              {/* What do you need? */}
              <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-[#2DD4BF] uppercase tracking-wider">
                  What do you need?
                </span>
                <p className="text-[#A99CCB] text-[11px]">
                  Roles or complementary skills you want others to cover:
                </p>
                <div className="space-y-2">
                  {needList.map((need, idx) => (
                    <div key={idx} className="p-2.5 bg-[#17102A] rounded-xl border border-[#3A2E5C] text-[#F3EEFF]">
                      • {need}
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="+ Add a skill you need covered..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setNeedList([...needList, e.currentTarget.value.trim()]);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full nc-input text-[11px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Working Style & Time */}
          {step === 5 && (
            <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-6 space-y-6 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#A99CCB] font-medium">Solo vs Team Preference</span>
                  <span className="text-[#FFB547] font-bold">
                    {soloVsTeam > 50 ? 'Strong Team Collaborator' : 'Independent Builder'}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={soloVsTeam}
                  onChange={(e) => setSoloVsTeam(Number(e.target.value))}
                  className="w-full accent-[#FFB547]"
                />
                <div className="flex justify-between text-[10px] text-[#7C6F9B]">
                  <span>Prefers Solo</span>
                  <span>Balanced</span>
                  <span>Prefers Constant Sync</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#A99CCB] font-medium">Leader vs Executor Stance</span>
                  <span className="text-[#FFB547] font-bold">
                    {leaderVsExecutor > 50 ? 'Vision & Strategy Lead' : 'Focused Executor'}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={leaderVsExecutor}
                  onChange={(e) => setLeaderVsExecutor(Number(e.target.value))}
                  className="w-full accent-[#FFB547]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#3A2E5C]">
                <div>
                  <label className="block text-[#A99CCB] font-medium mb-1">
                    Available Hours Per Week: <strong>{hoursPerWeek} hrs</strong>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full accent-[#FFB547]"
                  />
                </div>

                <div>
                  <label className="block text-[#A99CCB] font-medium mb-1">Preferred Model</label>
                  <select
                    value={remoteHybrid}
                    onChange={(e) => setRemoteHybrid(e.target.value as any)}
                    className="w-full nc-input"
                  >
                    <option value="Hybrid" className="bg-[#17102A]">Hybrid (Remote + City Meetups)</option>
                    <option value="Remote" className="bg-[#17102A]">100% Remote</option>
                    <option value="In-person" className="bg-[#17102A]">In-person (Hyderabad / Bengaluru)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Portfolio (Optional) */}
          {step === 6 && (
            <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-6 space-y-4 text-xs">
              <div className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] flex items-center justify-between">
                <span className="text-xs text-[#A99CCB]">Profile Strength</span>
                <span className="text-xs font-bold text-[#2DD4BF]">85% (Strong)</span>
              </div>

              <div>
                <label className="block text-[#A99CCB] font-medium mb-1">GitHub Profile URL</label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full nc-input"
                />
              </div>

              <div>
                <label className="block text-[#A99CCB] font-medium mb-1">Dribbble / Behance URL</label>
                <input
                  type="url"
                  value={dribbble}
                  onChange={(e) => setDribbble(e.target.value)}
                  placeholder="https://dribbble.com/..."
                  className="w-full nc-input"
                />
              </div>

              <div>
                <label className="block text-[#A99CCB] font-medium mb-1">Live Shipped Project URL</label>
                <input
                  type="url"
                  value={liveProject}
                  onChange={(e) => setLiveProject(e.target.value)}
                  placeholder="https://myproject.app"
                  className="w-full nc-input"
                />
              </div>
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#3A2E5C]">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="nc-button-secondary py-2.5 px-4 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              {step === 6 && (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="text-xs text-[#A99CCB] hover:text-[#F3EEFF] px-3 py-2"
                >
                  Skip for now
                </button>
              )}

              {step < 6 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="nc-button-primary py-2.5 px-5 text-xs font-semibold"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="nc-button-primary py-2.5 px-6 text-xs font-bold shadow-glow-accent"
                >
                  <span>Build My Persona</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="h-12 border-t border-[#3A2E5C] px-6 flex items-center justify-center text-xs text-[#7C6F9B]">
        <span>Nightclub Matching Graph • Confidential & Privacy-First</span>
      </footer>
    </div>
  );
};
