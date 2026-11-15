import React, { useState } from 'react';
import { Member } from '../../../types';
import { X, Check, Save } from 'lucide-react';

interface EditProfileDrawerProps {
  currentUser: Member;
  onSave: (updates: Partial<Member>) => void;
  onClose: () => void;
}

export const EditProfileDrawer: React.FC<EditProfileDrawerProps> = ({
  currentUser,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [roleTitle, setRoleTitle] = useState(currentUser.roleTitle);
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(currentUser.bio);
  const [hoursPerWeek, setHoursPerWeek] = useState(currentUser.workingStyle.hoursPerWeek);
  const [github, setGithub] = useState(currentUser.portfolio.github || '');
  const [liveProject, setLiveProject] = useState(currentUser.portfolio.liveProject || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      roleTitle,
      location,
      bio,
      workingStyle: {
        ...currentUser.workingStyle,
        hoursPerWeek: Number(hoursPerWeek),
      },
      portfolio: {
        ...currentUser.portfolio,
        github,
        liveProject,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#1E1537] border-l border-[#3A2E5C] h-full flex flex-col p-6 space-y-4 shadow-glow-card animate-in slide-in-from-right duration-200 overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#3A2E5C]">
          <h3 className="font-heading font-bold text-base text-[#F3EEFF]">Edit Your Profile</h3>
          <button onClick={onClose} className="text-[#A99CCB] hover:text-[#F3EEFF]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs flex-1">
          <div>
            <label className="block text-[#A99CCB] mb-1 font-medium">Display Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full nc-input"
            />
          </div>

          <div>
            <label className="block text-[#A99CCB] mb-1 font-medium">Headline / Role Title</label>
            <input
              type="text"
              required
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full nc-input"
            />
          </div>

          <div>
            <label className="block text-[#A99CCB] mb-1 font-medium">City / Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full nc-input"
            />
          </div>

          <div>
            <label className="block text-[#A99CCB] mb-1 font-medium">Bio & Focus</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full nc-input resize-none"
            />
          </div>

          <div>
            <label className="block text-[#A99CCB] mb-1 font-medium">
              Available Building Hours (per week): {hoursPerWeek} hrs
            </label>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full accent-[#FFB547]"
            />
          </div>

          <div className="pt-2 border-t border-[#3A2E5C] space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C6F9B]">
              Portfolio Links
            </span>
            <div>
              <label className="block text-[#A99CCB] mb-1">GitHub URL</label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full nc-input"
              />
            </div>
            <div>
              <label className="block text-[#A99CCB] mb-1">Live Project / Demo URL</label>
              <input
                type="url"
                value={liveProject}
                onChange={(e) => setLiveProject(e.target.value)}
                placeholder="https://..."
                className="w-full nc-input"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="nc-button-secondary py-2.5 px-4"
            >
              Cancel
            </button>
            <button type="submit" className="nc-button-primary py-2.5 px-5">
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
