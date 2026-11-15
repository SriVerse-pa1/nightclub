import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import { EvidenceBadge } from '../../components/modules/profile/EvidenceBadge';
import { BuilderJourneyTimeline } from '../../components/modules/profile/BuilderJourneyTimeline';
import { EditProfileDrawer } from '../../components/modules/profile/EditProfileDrawer';
import {
  User,
  Sparkles,
  Edit3,
  ShieldCheck,
  Eye,
  Plus,
  Lock,
  ExternalLink,
  Award,
  FolderGit2,
} from 'lucide-react';

export const OwnProfilePage: React.FC = () => {
  const {
    currentUser,
    updateCurrentUser,
    projects,
    setViewingMember,
    navigate,
    showToast,
  } = useApp();

  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [profileStrength, setProfileStrength] = useState(88);

  const handleAddEvidence = (skillName: string) => {
    showToast(`Upload repository or certificate link for ${skillName} to verify evidence badge.`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Profile Strength Meter */}
      <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-2xl p-5 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFB547]" />
            <span className="font-heading font-bold text-sm text-[#F3EEFF]">
              Profile Strength Meter
            </span>
          </div>
          <span className="font-bold text-[#FFB547]">{profileStrength}% (Very High)</span>
        </div>

        <div className="w-full h-2 bg-[#17102A] rounded-full overflow-hidden border border-[#3A2E5C]">
          <div
            style={{ width: `${profileStrength}%` }}
            className="h-full bg-gradient-to-r from-[#FFB547]/80 to-[#FFB547] rounded-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#A99CCB]">
          <span className="font-semibold text-[#2DD4BF]">Suggested Improvements:</span>
          <span>• Add evidence link to "System Design" (+6%)</span>
          <span>• Connect GitHub repository for KisanAI (+6%)</span>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-[#1E1537] border border-[#3A2E5C] rounded-3xl p-6 sm:p-8 space-y-6 shadow-glow-card">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[#3A2E5C]">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-[#FFB547]"
            />
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-heading font-extrabold text-2xl text-[#F3EEFF]">
                  {currentUser.name}
                </h1>
                <RoleBadge role={currentUser.role} size="md" />
              </div>
              <p className="text-xs text-[#A99CCB] font-medium">{currentUser.roleTitle}</p>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-[#7C6F9B] pt-1">
                <span>{currentUser.location}</span>
                <span>•</span>
                <span>{currentUser.workingStyle.hoursPerWeek} hrs/week</span>
                <span>•</span>
                <span className="text-[#2DD4BF] font-semibold">{currentUser.ambition}</span>
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
        <p className="text-xs text-[#F3EEFF] leading-relaxed">{currentUser.bio}</p>
      </div>

      {/* Skills & Evidence Section */}
      <div className="nc-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
          <h3 className="font-heading font-bold text-sm text-[#F3EEFF]">
            Skills & Evidence Verification
          </h3>
          <span className="text-xs text-[#7C6F9B]">
            Evidence boosts matching accuracy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentUser.skills.map((skill) => (
            <div
              key={skill.name}
              className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-semibold text-[#F3EEFF]">{skill.name}</p>
                <span className="text-[10px] text-[#7C6F9B] capitalize">{skill.level}</span>
              </div>

              <div className="flex items-center gap-2">
                <EvidenceBadge evidence={skill.evidence} />
                <button
                  onClick={() => handleAddEvidence(skill.name)}
                  className="p-1 rounded text-[#A99CCB] hover:text-[#FFB547]"
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
      <div className="nc-card p-6 space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
          <h3 className="font-heading font-bold text-sm text-[#F3EEFF]">
            Builder Journey Timeline
          </h3>
          <span className="text-xs text-[#FFB547] font-semibold">
            {currentUser.builderJourney.length} Milestones
          </span>
        </div>
        <BuilderJourneyTimeline items={currentUser.builderJourney} />
      </div>

      {/* Privacy Guarantee Section */}
      <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-2xl p-6 space-y-3 text-xs">
        <div className="flex items-center gap-2 text-[#2DD4BF] font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>What Others Can and Cannot See</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] space-y-1">
            <span className="font-bold text-emerald-400">✓ Visible to Members:</span>
            <p className="text-[11px] text-[#A99CCB]">
              Display name, role, city, skills, evidence badges, Builder Journey, and match score.
            </p>
          </div>
          <div className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] space-y-1">
            <span className="font-bold text-rose-400">✗ Strictly Hidden:</span>
            <p className="text-[11px] text-[#A99CCB]">
              Your email, phone number, and direct external social handles remain confidential.
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
