import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BuildChallenge } from '../../types';
import {
  Trophy,
  Clock,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';

export const ChallengesPage: React.FC = () => {
  const { challenges, joinChallenge, submitChallenge } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'upcoming' | 'past'>('all');
  const [selectedChallenge, setSelectedChallenge] = useState<BuildChallenge | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  const filteredChallenges = challenges.filter(
    (c) => activeFilter === 'all' || c.status === activeFilter
  );

  const handleSubmitChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge) return;
    submitChallenge(selectedChallenge.id, demoUrl, repoUrl);
    setShowSubmitModal(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD1C0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#805536] font-semibold">
              Ecosystem Sprints
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#805536] animate-pulse" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
            Build Challenges & Hackathons
          </h1>
          <p className="text-xs text-[#665E54] mt-0.5">
            48-hour to 7-day sprints with complementary teams, venture grants, and mentor reviews.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 text-xs">
          {(['all', 'live', 'upcoming', 'past'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-xl capitalize font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-[#805536] text-white font-bold shadow-sm'
                  : 'bg-[#FFFFFF] text-[#665E54] border border-[#DCD1C0] hover:text-[#29251F]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="nc-card p-6 space-y-4 bg-[#FFFFFF] border border-[#DCD1C0] hover:border-[#805536] flex flex-col justify-between shadow-card"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    challenge.status === 'live'
                      ? 'bg-[#805536]/10 text-[#805536] border-[#805536]/30'
                      : challenge.status === 'upcoming'
                      ? 'bg-[#E7DCCB] text-[#29251F] border-[#DCD1C0]'
                      : 'bg-[#F3EDE3] text-[#8C8173] border-[#DCD1C0]'
                  }`}
                >
                  {challenge.status}
                </span>

                <span className="text-[11px] font-semibold text-[#665E54] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#805536]" />
                  {challenge.countdown}
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-[#29251F] leading-snug">
                {challenge.title}
              </h3>

              <p className="text-xs text-[#665E54] line-clamp-2 leading-relaxed">
                {challenge.brief}
              </p>

              {/* Skills required */}
              <div className="flex flex-wrap gap-1 pt-1">
                {challenge.skillsNeeded.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Prize Pool */}
              <div className="p-3 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] text-xs">
                <span className="text-[#665E54]">Prize Pool:</span>
                <p className="font-bold text-[#805536] mt-0.5">{challenge.prizes}</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#DCD1C0] flex items-center justify-between">
              <span className="text-xs text-[#8C8173]">{challenge.submissionsCount} submissions</span>

              <button
                onClick={() => setSelectedChallenge(challenge)}
                className="nc-button-primary text-xs py-1.5 px-3"
              >
                <span>View Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CHALLENGE DETAIL MODAL */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29251F]/40 backdrop-blur-md">
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-xs shadow-card-hover">
            <div className="flex items-start justify-between pb-3 border-b border-[#DCD1C0]">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#805536]">
                  {selectedChallenge.category}
                </span>
                <h2 className="font-heading font-bold text-xl text-[#29251F] mt-0.5">
                  {selectedChallenge.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="text-[#665E54] hover:text-[#29251F] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-[#29251F] leading-relaxed">
              <div>
                <h4 className="font-bold text-[#29251F] mb-1">Sprint Brief</h4>
                <p className="text-[#665E54]">{selectedChallenge.brief}</p>
              </div>

              <div>
                <h4 className="font-bold text-[#29251F] mb-1">Rules & Guidelines</h4>
                <ul className="list-disc list-inside space-y-1 text-[#665E54]">
                  {selectedChallenge.rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#F3EDE3] rounded-2xl border border-[#DCD1C0] space-y-1">
                <h4 className="font-bold text-[#29251F]">How Complementary Teams are Formed</h4>
                <p className="text-[#665E54]">
                  Clicking "Join Challenge" automatically pools you with 4 peers covering
                  engineering, design, and growth so you don't enter solo.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#29251F] mb-1">Recognition & Prizes</h4>
                <p className="text-[#805536] font-semibold">{selectedChallenge.prizes}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#DCD1C0] flex items-center justify-between">
              <span className="text-[#8C8173]">{selectedChallenge.timeline}</span>

              <div className="flex items-center gap-2">
                {selectedChallenge.isJoined ? (
                  <>
                    <span className="text-xs text-[#805536] font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#805536]" />
                      Team Workspace Active
                    </span>
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="nc-button-primary text-xs py-2 px-4"
                    >
                      Submit Project
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      joinChallenge(selectedChallenge.id);
                      setSelectedChallenge({ ...selectedChallenge, isJoined: true });
                    }}
                    className="nc-button-primary text-xs py-2 px-5"
                  >
                    Join Challenge with Team
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION MODAL */}
      {showSubmitModal && selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29251F]/40 backdrop-blur-md">
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl max-w-md w-full p-6 space-y-4 text-xs shadow-card-hover">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
              <h3 className="font-heading font-bold text-base text-[#29251F]">
                Submit: {selectedChallenge.title}
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-[#665E54] hover:text-[#29251F] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitChallenge} className="space-y-4">
              <div>
                <label className="block text-[#665E54] font-medium mb-1">
                  Public GitHub Repo URL
                </label>
                <input
                  type="url"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full nc-input"
                />
              </div>

              <div>
                <label className="block text-[#665E54] font-medium mb-1">
                  Live Demo / Loom Video URL
                </label>
                <input
                  type="url"
                  required
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full nc-input"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="nc-button-secondary py-2 px-4"
                >
                  Cancel
                </button>
                <button type="submit" className="nc-button-primary py-2 px-5">
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
