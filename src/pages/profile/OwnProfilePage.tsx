import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import { EvidenceBadge } from '../../components/modules/profile/EvidenceBadge';
import { BuilderJourneyTimeline } from '../../components/modules/profile/BuilderJourneyTimeline';
import { EditProfileDrawer } from '../../components/modules/profile/EditProfileDrawer';
import {
  Sparkles,
  Edit3,
  ShieldCheck,
  Eye,
  Plus,
} from 'lucide-react';

export const OwnProfilePage: React.FC = () => {
  const {
    currentUser,
    updateCurrentUser,
    setViewingMember,
    navigate,
    showToast,
  } = useApp();

  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [profileStrength] = useState(88);

  const handleAddEvidence = (skillName: string) => {
    showToast(`Upload repository or certificate link for ${skillName} to verify evidence badge.`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Profile Strength Meter */}
      <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-5 space-y-3 text-xs shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#805536]" />
            <span className="font-heading font-bold text-sm text-[#29251F]">
              Profile Strength Meter
            </span>
          </div>
          <span className="font-bold text-[#805536]">{profileStrength}% (Very High)</span>
        </div>

        <div className="w-full h-2 bg-[#E7DCCB] rounded-full overflow-hidden border border-[#DCD1C0]">
          <div
            style={{ width: `${profileStrength}%` }}
            className="h-full bg-[#805536] rounded-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#665E54]">
          <span className="font-semibold text-[#29251F]">Suggested Improvements:</span>
          <span>• Add evidence link to "System Design" (+6%)</span>
          <span>• Connect GitHub repository for KisanAI (+6%)</span>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[#DCD1C0]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#DCD1C0]"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-heading font-extrabold text-2xl text-[#29251F]">
                  {currentUser.name}
                </h1>
                <RoleBadge role={currentUser.role} size="md" />
              </div>
              <p className="text-xs text-[#29251F] font-medium">{currentUser.roleTitle}</p>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-[#665E54] pt-1">
                <span>{currentUser.location}</span>
                <span>•</span>
                <span>{currentUser.workingStyle.hoursPerWeek} hrs/week</span>
                <span>•</span>
                <span className="text-[#805536] font-semibold">{currentUser.ambition}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setViewingMember(currentUser);
                navigate('/member-profile');
              }}
              className="nc-button-secondary text-xs py-2 px-3"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Public Preview</span>
            </button>

            <button
              onClick={() => setShowEditDrawer(true)}
              className="nc-button-primary text-xs py-2 px-4 shadow-glow-accent"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-[#29251F] leading-relaxed">{currentUser.bio}</p>
      </div>

      {/* Skills & Evidence Section */}
      <div className="nc-card p-6 space-y-4 bg-[#FFFFFF] border border-[#DCD1C0] shadow-card">
        <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
          <h3 className="font-heading font-bold text-sm text-[#29251F]">
            Skills & Evidence Verification
          </h3>
          <span className="text-xs text-[#8C8173]">
            Evidence boosts matching accuracy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentUser.skills.map((skill) => (
            <div
              key={skill.name}
              className="p-3 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-semibold text-[#29251F]">{skill.name}</p>
                <span className="text-[10px] text-[#665E54] capitalize">{skill.level}</span>
              </div>

              <div className="flex items-center gap-2">
                <EvidenceBadge evidence={skill.evidence} />
                <button
                  onClick={() => handleAddEvidence(skill.name)}
                  className="p-1 rounded text-[#665E54] hover:text-[#29251F] transition-colors"
                  title="Add Evidence"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Builder Journey Timeline */}
      <div className="nc-card p-6 space-y-5 bg-[#FFFFFF] border border-[#DCD1C0] shadow-card">
        <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
          <h3 className="font-heading font-bold text-sm text-[#29251F]">
            Builder Journey Timeline
          </h3>
          <span className="text-xs text-[#805536] font-semibold">
            {currentUser.builderJourney.length} Milestones
          </span>
        </div>
        <BuilderJourneyTimeline items={currentUser.builderJourney} />
      </div>

      {/* Privacy Guarantee Section */}
      <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-6 space-y-3 text-xs shadow-card">
        <div className="flex items-center gap-2 text-[#29251F] font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#805536]" />
          <span>What Others Can and Cannot See</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] space-y-1">
            <span className="font-bold text-[#29251F]">✓ Visible to Members:</span>
            <p className="text-[11px] text-[#665E54]">
              Display name, role, city, skills, evidence badges, Builder Journey, and match score.
            </p>
          </div>
          <div className="p-3 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] space-y-1">
            <span className="font-bold text-[#665E54]">✗ Strictly Protected:</span>
            <p className="text-[11px] text-[#665E54]">
              Your email, phone number, and direct external social handles remain shielded until mutual connection.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Drawer */}
      {showEditDrawer && (
        <EditProfileDrawer
          currentUser={currentUser}
          onSave={(updates) => updateCurrentUser(updates)}
          onClose={() => setShowEditDrawer(false)}
        />
      )}
    </div>
  );
};
