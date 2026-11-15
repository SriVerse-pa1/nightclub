import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Member, FourTeam } from '../../../types';
import { RoleBadge } from '../../common/RoleBadge';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CelebrationModalProps {
  fourTeam: FourTeam;
  currentUser: Member;
  onEnterBuildRoom: () => void;
  onClose: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  fourTeam,
  currentUser,
  onEnterBuildRoom,
  onClose,
}) => {
  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB547', '#38BDF8', '#F472B6', '#FBBF24', '#2DD4BF'],
      });
    } catch (e) {
      // Fallback gracefully
    }
  }, []);

  const allFive = [currentUser, ...fourTeam.members];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#1E1537] border border-[#FFB547]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center space-y-6 shadow-glow-card animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFB547]/20 border border-[#FFB547]/40 flex items-center justify-center text-[#FFB547]">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#FFB547] font-semibold">
            Complementary Alignment Complete
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF] mt-1">
            Your Five is officially ready!
          </h2>
          <p className="text-xs sm:text-sm text-[#A99CCB] mt-2 max-w-sm mx-auto">
            You, Ananya, Karthik, Deepika, and Prashanth are now linked into a private collaborative Build Room.
          </p>
        </div>

        {/* 5 Avatar Row */}
        <div className="flex items-center justify-center -space-x-3 py-2">
          {allFive.map((m, idx) => (
            <div key={m.id} className="relative group">
              <img
                src={m.avatar}
                alt={m.name}
                className={`w-12 h-12 rounded-full object-cover border-2 ${
                  idx === 0 ? 'border-[#FFB547] ring-2 ring-[#FFB547]/40' : 'border-[#1E1537]'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Balance Metric */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#17102A] border border-[#3A2E5C] text-left text-xs">
          <div>
            <span className="text-[#A99CCB]">Team balance score</span>
            <p className="text-lg font-bold text-[#FFB547]">{fourTeam.teamBalance} / 1.0</p>
          </div>
          <div>
            <span className="text-[#A99CCB]">Complementary roles</span>
            <p className="text-xs font-semibold text-[#2DD4BF] mt-1">
              Build • Design • Business • Research
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onEnterBuildRoom}
            className="w-full nc-button-primary text-sm py-3.5"
          >
            <span>Enter Your Team Build Room</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="text-xs text-[#A99CCB] hover:text-[#F3EEFF] py-1"
          >
            Review team constellation
          </button>
        </div>
      </div>
    </div>
  );
};
