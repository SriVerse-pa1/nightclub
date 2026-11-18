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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD1C0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#805536] font-semibold">
              Signature Feature
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#805536] animate-pulse" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
            Find Your Four
          </h1>
          <p className="text-xs text-[#665E54] mt-0.5">
            Four complementary builders assembled into a balanced five-person team with you.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowHowItWorks(true)}
            className="nc-button-secondary text-xs py-2 px-3"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#665E54]" />
            <span>How this works</span>
          </button>

          <button
            onClick={() => setShowRematchConfirm(true)}
            disabled={isComputingTeam}
            className="nc-button-secondary text-xs py-2 px-3 hover:border-[#805536]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isComputingTeam ? 'animate-spin text-[#805536]' : ''}`} />
            <span>Rematch Team</span>
          </button>

          <button
            onClick={handleAcceptTeam}
            disabled={fourTeam.members.length === 0}
            className="nc-button-primary text-xs py-2 px-4 disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Accept Team</span>
          </button>
        </div>
      </div>

      {/* COMPUTING STATE */}
      {isComputingTeam && (
        <div className="p-12 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl space-y-4 shadow-card">
          <RefreshCw className="w-10 h-10 text-[#805536] animate-spin mx-auto" />
          <h3 className="font-heading font-bold text-xl text-[#29251F]">
            Computing New Complementary Constellation...
          </h3>
          <p className="text-xs text-[#665E54] max-w-sm mx-auto">
            Matching skill profiles, timezone overlaps, and 30-day goals across Telugu community members.
          </p>
        </div>
      )}

      {/* ALL DECLINED STATE */}
      {!isComputingTeam && fourTeam.status === 'declined_all' && (
        <div className="p-12 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl space-y-4 shadow-card">
          <UserX className="w-10 h-10 text-[#8C8173] mx-auto" />
          <h3 className="font-heading font-bold text-xl text-[#29251F]">
            All Candidates Declined
          </h3>
          <p className="text-xs text-[#665E54] max-w-sm mx-auto">
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
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center min-h-[520px] shadow-card relative">
            <RingView
              fourTeam={fourTeam}
              currentUser={currentUser}
              selectedMember={selectedMember}
              onSelectMember={(m) => setSelectedMember(m)}
            />

            {/* Bottom Balance Guarantee */}
            <div className="mt-6 pt-4 border-t border-[#DCD1C0] w-full flex items-center justify-between text-xs text-[#8C8173]">
              <span className="flex items-center gap-1.5 text-[#29251F] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#805536]" />
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
              <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-8 text-center text-xs text-[#665E54] space-y-2 shadow-card">
                <Info className="w-6 h-6 text-[#805536] mx-auto" />
                <p className="font-semibold text-[#29251F]">No Member Selected</p>
                <p>Click on any teammate in the ring to view their score breakdown.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* How This Works Explainer Modal */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29251F]/40 backdrop-blur-md">
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 text-xs shadow-card-hover">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCD1C0]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#805536]" />
                <h3 className="font-heading font-bold text-base text-[#29251F]">
                  How "Find Your Four" Works
                </h3>
              </div>
              <button
                onClick={() => setShowHowItWorks(false)}
                className="text-[#665E54] hover:text-[#29251F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-[#665E54] leading-relaxed">
              <p>
                Instead of searching through lists of people with identical skills, Nightclub's
                matching engine introduces you to a <strong className="text-[#29251F]">complementary Five-person mesh</strong>.
              </p>
              <div className="p-3.5 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] space-y-2 text-[#29251F]">
                <p className="font-semibold text-[#29251F]">The 4 Complementary Roles:</p>
                <p>• <span className="text-[#805536] font-bold">Build:</span> Developers and systems architects.</p>
                <p>• <span className="text-[#96603B] font-bold">Design:</span> Product designers & design system builders.</p>
                <p>• <span className="text-[#6E4D36] font-bold">Business:</span> GTM strategists, marketers, and sales leaders.</p>
                <p>• <span className="text-[#5C4533] font-bold">Research:</span> Indic NLP scientists and data researchers.</p>
              </div>
              <p>
                When you click <strong className="text-[#29251F]">Accept Team</strong>, your five members are transitioned into
                a private <strong className="text-[#29251F]">Build Room</strong> with shared Kanban sprints and mentor advisory slots.
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29251F]/40 backdrop-blur-md">
          <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl max-w-sm w-full p-6 space-y-4 text-xs text-center shadow-card-hover">
            <h3 className="font-heading font-bold text-base text-[#29251F]">Rematch Teammates?</h3>
            <p className="text-[#665E54]">
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
