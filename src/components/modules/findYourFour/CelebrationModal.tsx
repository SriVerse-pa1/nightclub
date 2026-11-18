import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Member, FourTeam } from '../../../types';
import { Sparkles, ArrowRight } from 'lucide-react';

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
    // Warm luxury celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#805536', '#A06E47', '#E7DCCB', '#F3EDE3', '#29251F'],
      });
    } catch (e) {
      // Fallback
    }
  }, []);

  const allFive = [currentUser, ...fourTeam.members];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29251F]/40 backdrop-blur-md">
      <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center space-y-6 shadow-card-hover animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-center text-[#805536]">
          <Sparkles className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#805536] font-bold">
            Complementary Alignment Complete
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F] mt-1">
            Your Five is officially ready!
          </h2>
          <p className="text-xs sm:text-sm text-[#665E54] mt-2 max-w-sm mx-auto">
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
                className={`w-12 h-12 rounded-full object-cover border-2 shadow-sm ${
                  idx === 0 ? 'border-[#805536] ring-2 ring-[#805536]/25' : 'border-[#FFFFFF]'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Balance Metric */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#F3EDE3] border border-[#DCD1C0] text-left text-xs">
          <div>
            <span className="text-[#665E54]">Team balance score</span>
            <p className="text-lg font-bold text-[#805536]">{fourTeam.teamBalance} / 1.0</p>
          </div>
          <div>
            <span className="text-[#665E54]">Complementary roles</span>
            <p className="text-xs font-semibold text-[#29251F] mt-1">
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
            className="text-xs text-[#665E54] hover:text-[#29251F] py-1 transition-colors"
          >
            Review team constellation
          </button>
        </div>
      </div>
    </div>
  );
};
