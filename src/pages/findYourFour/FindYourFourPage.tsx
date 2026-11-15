import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RingView } from '../../components/modules/findYourFour/RingView';
import { MemberDetailDrawer } from '../../components/modules/findYourFour/MemberDetailDrawer';
import { CelebrationModal } from '../../components/modules/findYourFour/CelebrationModal';
import { Member } from '../../types';
import {
  Sparkles,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  UserX,
  ArrowRight,
  Info,
  X,
} from 'lucide-react';

export const FindYourFourPage: React.FC = () => {
  const {
    fourTeam,
    currentUser,
    isComputingTeam,
    acceptFourTeam,
    declineTeamMember,
    rematchFourTeam,
    setViewingMember,
    navigate,
    startChatWithMember,
  } = useApp();

  const [selectedMember, setSelectedMember] = useState<Member | null>(fourTeam.members[0] || null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showRematchConfirm, setShowRematchConfirm] = useState(false);

  const handleAcceptTeam = () => {
    acceptFourTeam();
    setShowCelebration(true);
  };

  const handleConfirmRematch = () => {
    setShowRematchConfirm(false);
    rematchFourTeam();
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col justify-between space-y-6 pb-12">
      {/* Top Banner & Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A2E5C]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#FFB547] font-semibold">
              Signature Feature
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB547] animate-pulse" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
            Find Your Four
          </h1>
          <p className="text-xs text-[#A99CCB] mt-0.5">
            Four complementary builders assembled into a balanced five-person team with you.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowHowItWorks(true)}
            className="nc-button-secondary text-xs py-2 px-3"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>How this works</span>
          </button>

          <button
            onClick={() => setShowRematchConfirm(true)}
            disabled={isComputingTeam}
            className="nc-button-secondary text-xs py-2 px-3 hover:border-[#FFB547]/50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isComputingTeam ? 'animate-spin text-[#FFB547]' : ''}`} />
            <span>Rematch Team</span>
          </button>

          <button
            onClick={handleAcceptTeam}
            disabled={fourTeam.members.length === 0}
            className="nc-button-primary text-xs py-2 px-4 shadow-glow-accent disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Accept Team</span>
          </button>
        </div>
      </div>

      {/* COMPUTING STATE */}
      {isComputingTeam && (
        <div className="p-12 text-center bg-[#1E1537] border border-[#FFB547]/40 rounded-3xl space-y-4 shadow-glow-card">
          <RefreshCw className="w-10 h-10 text-[#FFB547] animate-spin mx-auto" />
          <h3 className="font-heading font-bold text-xl text-[#F3EEFF]">
            Computing New Complementary Constellation...
          </h3>
          <p className="text-xs text-[#A99CCB] max-w-sm mx-auto">
            Matching skill profiles, timezone overlaps, and 30-day goals across Telugu community members.
          </p>
        </div>
      )}

      {/* ALL DECLINED STATE */}
      {!isComputingTeam && fourTeam.status === 'declined_all' && (
        <div className="p-12 text-center bg-[#1E1537] border border-[#3A2E5C] rounded-3xl space-y-4">
          <UserX className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="font-heading font-bold text-xl text-[#F3EEFF]">
            All Candidates Declined
          </h3>
          <p className="text-xs text-[#A99CCB] max-w-sm mx-auto">
            You declined the current candidate pool. Don't worry — declined members won't appear
            again. Run a rematch to compute a fresh complementary constellation.
          </p>
          <button
            onClick={handleConfirmRematch}
            className="nc-button-primary text-xs py-2.5 px-6 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Generate New Matches</span>
          </button>
        </div>
      )}

      {/* ACTIVE CONSTELLATION DISPLAY */}
      {!isComputingTeam && fourTeam.status !== 'declined_all' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
          {/* Constellation Orbit Ring (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#1C1333] border border-[#3A2E5C] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[520px] shadow-glow-card relative">
            <RingView
              fourTeam={fourTeam}
              currentUser={currentUser}
              selectedMember={selectedMember}
              onSelectMember={(m) => setSelectedMember(m)}
            />

            {/* Bottom Balance Guarantee */}
            <div className="mt-6 pt-4 border-t border-[#3A2E5C]/60 w-full flex items-center justify-between text-xs text-[#7C6F9B]">
              <span className="flex items-center gap-1.5 text-[#2DD4BF]">
                <ShieldCheck className="w-4 h-4" />
                <span>Balanced: 1 Build • 1 Design • 1 Business • 1 Research</span>
              </span>
              <span>Hyderabad Cohort</span>
            </div>
          </div>

          {/* Member Detail Panel (Right 5 Cols) */}
          <div className="lg:col-span-5 h-full">
            {selectedMember ? (
              <MemberDetailDrawer
                member={selectedMember}
                fit={fourTeam.fitDetails[selectedMember.id]}
                onClose={() => setSelectedMember(null)}
                onDecline={(id) => declineTeamMember(id)}
                onAcceptTeam={handleAcceptTeam}
                onViewProfile={(m) => {
                  setViewingMember(m);
                  navigate('/member-profile');
                }}
                onStartChat={(m) => startChatWithMember(m)}
              />
            ) : (
              <div className="bg-[#22183B] border border-[#3A2E5C] rounded-2xl p-8 text-center text-xs text-[#A99CCB] space-y-2">
                <Info className="w-6 h-6 text-[#FFB547] mx-auto" />
                <p className="font-semibold text-[#F3EEFF]">No Member Selected</p>
                <p>Click on any teammate in the ring to view their score breakdown.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* How This Works Explainer Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#1F1735] border border-[#3A2E5C] rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#3A2E5C]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFB547]" />
                <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
                  How "Find Your Four" Works
                </h3>
              </div>
              <button
                onClick={() => setShowHowItWorks(false)}
                className="text-[#A99CCB] hover:text-[#F3EEFF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-[#A99CCB] leading-relaxed">
              <p>
                Instead of searching through lists of people with identical skills, Nightclub's
                matching engine introduces you to a <strong>complementary Five-person mesh</strong>.
              </p>
              <div className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] space-y-2">
                <p className="font-semibold text-[#F3EEFF]">The 4 Complementary Roles:</p>
                <p>• <span className="text-[#38BDF8] font-bold">Build:</span> Developers and systems architects.</p>
                <p>• <span className="text-[#F472B6] font-bold">Design:</span> Product designers & design system builders.</p>
                <p>• <span className="text-[#FBBF24] font-bold">Business:</span> GTM strategists, marketers, and sales leaders.</p>
                <p>• <span className="text-[#2DD4BF] font-bold">Research:</span> Indic NLP scientists and data researchers.</p>
              </div>
              <p>
                When you click <strong>Accept Team</strong>, your five members are transitioned into
                a private <strong>Build Room</strong> with shared Kanban sprints and mentor advisory slots.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowHowItWorks(false)}
                className="nc-button-primary py-2 px-5 text-xs font-semibold"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rematch Confirmation Modal */}
      {showRematchConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#1F1735] border border-amber-500/40 rounded-2xl max-w-sm w-full p-6 space-y-4 text-xs text-center">
            <h3 className="font-heading font-bold text-base text-[#F3EEFF]">Rematch Teammates?</h3>
            <p className="text-[#A99CCB]">
              This will recompute your graph to suggest alternative builders. Currently accepted
              teammates will be reshuffled.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowRematchConfirm(false)}
                className="nc-button-secondary py-2 px-4"
              >
                Keep Current Team
              </button>
              <button
                onClick={handleConfirmRematch}
                className="nc-button-primary py-2 px-4"
              >
                Confirm Rematch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Modal (When Accepted) */}
      {showCelebration && (
        <CelebrationModal
          fourTeam={fourTeam}
          currentUser={currentUser}
          onEnterBuildRoom={() => {
            setShowCelebration(false);
            navigate('/build-room');
          }}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
};
