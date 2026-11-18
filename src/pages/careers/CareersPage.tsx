import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CareerOpportunity } from '../../types';
import {
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Search,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const {
    careers,
    toggleSaveCareer,
    applyToCareer,
    currentUser,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'Job' | 'Internship' | 'Project invite' | 'saved'>('all');
  const [selectedCareer, setSelectedCareer] = useState<CareerOpportunity | null>(careers[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCareers = careers.filter((c) => {
    if (activeTab === 'saved') return c.isSaved;
    if (activeTab !== 'all' && c.type !== activeTab) return false;
    if (searchQuery) {
      return (
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD1C0]">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
            Careers & Opportunities
          </h1>
          <p className="text-xs text-[#665E54] mt-0.5">
            Curated roles, research fellowships, and project invites for verified builders.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-[#8C8173] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company, skill..."
            className="w-full nc-input pl-9 text-xs"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DCD1C0] pb-2 text-xs overflow-x-auto">
        {(['all', 'Job', 'Internship', 'Project invite', 'saved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-xl capitalize font-semibold whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-[#805536] text-white font-bold shadow-sm'
                : 'bg-[#FFFFFF] text-[#665E54] border border-[#DCD1C0] hover:text-[#29251F]'
            }`}
          >
            {tab === 'all' ? 'All Roles' : tab === 'saved' ? 'Saved Bookmarks' : `${tab}s`}
          </button>
        ))}
      </div>

      {/* Two Column Layout: List Left (5 cols), Detail View Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Listings (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredCareers.length === 0 ? (
            <div className="p-8 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl text-xs text-[#665E54] shadow-card">
              No opportunities matching criteria.
            </div>
          ) : (
            filteredCareers.map((item) => {
              const isSelected = selectedCareer?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCareer(item)}
                  className={`nc-card p-4 space-y-3 cursor-pointer transition-all bg-[#FFFFFF] border ${
                    isSelected ? 'border-[#805536] ring-2 ring-[#805536]/20 shadow-md' : 'border-[#DCD1C0] hover:border-[#805536]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#805536] uppercase tracking-wider">
                        {item.type}
                      </span>
                      <h3 className="font-heading font-bold text-sm text-[#29251F] mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#665E54]">{item.company}</p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveCareer(item.id);
                      }}
                      className="p-1 text-[#665E54] hover:text-[#29251F] transition-colors"
                      title="Save"
                    >
                      {item.isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-[#805536]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#665E54]">
                    <span className="flex items-center gap-1 text-[#29251F] font-medium">
                      <Sparkles className="w-3 h-3 text-[#805536]" />
                      {item.matchScore}% skill match
                    </span>
                    <span className="text-[#805536] font-semibold">{item.compensation}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Opportunity Detail View (7 cols) */}
        <div className="lg:col-span-7">
          {selectedCareer ? (
            <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-8 space-y-6 shadow-card text-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#DCD1C0]">
                <div>
                  <span className="text-xs font-bold text-[#805536] uppercase tracking-wider">
                    {selectedCareer.type}
                  </span>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#29251F] mt-1">
                    {selectedCareer.title}
                  </h2>
                  <p className="text-xs text-[#665E54] mt-0.5">
                    {selectedCareer.company} • {selectedCareer.location}
                  </p>
                  <span className="text-xs font-bold text-[#805536] mt-1 inline-block">
                    {selectedCareer.compensation}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveCareer(selectedCareer.id)}
                    className="nc-button-secondary text-xs py-2 px-3"
                  >
                    {selectedCareer.isSaved ? 'Saved' : 'Save'}
                  </button>

                  <button
                    onClick={() => applyToCareer(selectedCareer.id)}
                    disabled={selectedCareer.hasApplied}
                    className="nc-button-primary text-xs py-2 px-4 shadow-glow-accent disabled:opacity-50"
                  >
                    {selectedCareer.hasApplied ? 'Applied ✓' : 'Apply with Nightclub Profile'}
                  </button>
                </div>
              </div>

              {/* Skills Match vs Demonstrated Skills */}
              <div className="p-4 bg-[#F3EDE3] rounded-2xl border border-[#DCD1C0] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#29251F] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#805536]" />
                    Skill Match Analysis ({selectedCareer.matchScore}%)
                  </span>
                  <span className="text-[10px] text-[#8C8173]">Compared against your persona</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {selectedCareer.skills.map((skill) => {
                    const userHasSkill = currentUser.skills.some((s) => s.name === skill);
                    return (
                      <div
                        key={skill}
                        className={`p-2 rounded-xl border flex items-center justify-between text-xs ${
                          userHasSkill
                            ? 'bg-[#805536]/10 border-[#805536]/30 text-[#805536]'
                            : 'bg-[#FFFFFF] border-[#DCD1C0] text-[#665E54]'
                        }`}
                      >
                        <span className="font-medium truncate">{skill}</span>
                        <span className="text-[10px] font-bold">
                          {userHasSkill ? 'Verified ✓' : 'Missing'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 text-[#29251F] leading-relaxed">
                <h4 className="font-bold text-[#29251F]">Role Overview</h4>
                <p className="text-[#665E54]">{selectedCareer.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2 text-[#665E54]">
                <h4 className="font-bold text-[#29251F]">Key Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedCareer.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="space-y-2 text-[#665E54]">
                <h4 className="font-bold text-[#29251F]">Requirements & Culture</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedCareer.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl text-xs text-[#665E54] shadow-card">
              Select an opportunity to read requirements and submit your application.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
