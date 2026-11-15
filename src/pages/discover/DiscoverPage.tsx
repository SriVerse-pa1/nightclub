import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import { Member, RoleType } from '../../types';
import {
  Search,
  Filter,
  LayoutGrid,
  List,
  Sparkles,
  Users2,
  FolderGit2,
  Layers,
  ArrowRight,
  UserPlus,
  SlidersHorizontal,
  X,
  Compass,
} from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const {
    membersList,
    circles,
    projects,
    setViewingMember,
    navigate,
    sendConnectionRequest,
    routeParams,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'people' | 'circles' | 'projects'>('people');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState(routeParams.query || '');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<RoleType | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Filter people
  const filteredMembers = membersList.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = selectedRoleFilter === 'all' || m.role === selectedRoleFilter;
    const matchesLocation =
      selectedLocation === 'all' || m.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesRole && matchesLocation;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A2E5C]">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
            Discover Network
          </h1>
          <p className="text-xs text-[#A99CCB] mt-0.5">
            Explore vetted Telugu AI builders, community circles, and collaborative projects.
          </p>
        </div>

        {/* View Mode & Filter Toggles */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Sheet Trigger */}
          <button
            onClick={() => setShowMobileFilter(true)}
            className="md:hidden nc-button-secondary text-xs py-2 px-3"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="bg-[#22183B] border border-[#3A2E5C] rounded-xl p-1 flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'grid' ? 'bg-[#FFB547] text-[#17102A]' : 'text-[#A99CCB]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${
                viewMode === 'list' ? 'bg-[#FFB547] text-[#17102A]' : 'text-[#A99CCB]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#3A2E5C] pb-2 text-xs">
        <button
          onClick={() => setActiveTab('people')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'people'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Builders ({filteredMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('circles')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'circles'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Community Circles ({circles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'projects'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Active Projects ({projects.length})</span>
        </button>
      </div>

      {/* PEOPLE TAB */}
      {activeTab === 'people' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Desktop Filter Side Panel (3 cols) */}
          <div className="hidden md:block md:col-span-3 bg-[#1C1431] border border-[#3A2E5C] rounded-2xl p-5 space-y-5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
              <span className="font-bold text-[#F3EEFF] uppercase tracking-wider text-[11px]">
                Filter Builders
              </span>
              {(selectedRoleFilter !== 'all' || selectedLocation !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedRoleFilter('all');
                    setSelectedLocation('all');
                    setSearchQuery('');
                  }}
                  className="text-[10px] text-[#FFB547] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Role Filter */}
            <div className="space-y-2">
              <span className="text-[#A99CCB] font-medium">Role Category</span>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Roles' },
                  { id: 'build', label: 'Build (Engineers)' },
                  { id: 'design', label: 'Design (UI/UX)' },
                  { id: 'business', label: 'Business (GTM/Growth)' },
                  { id: 'research', label: 'Research (AI/NLP)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedRoleFilter(item.id as any)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                      selectedRoleFilter === item.id
                        ? 'bg-[#FFB547] text-[#17102A] font-bold'
                        : 'text-[#A99CCB] hover:bg-[#22183B]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <span className="text-[#A99CCB] font-medium">Region / Hub</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full nc-input"
              >
                <option value="all" className="bg-[#17102A]">All Regions</option>
                <option value="Hyderabad" className="bg-[#17102A]">Hyderabad, Telangana</option>
                <option value="Bengaluru" className="bg-[#17102A]">Bengaluru, Karnataka</option>
                <option value="Visakhapatnam" className="bg-[#17102A]">Visakhapatnam, AP</option>
                <option value="Vijayawada" className="bg-[#17102A]">Vijayawada, AP</option>
                <option value="Warangal" className="bg-[#17102A]">Warangal, Telangana</option>
              </select>
            </div>
          </div>

          {/* Results Area (9 cols) */}
          <div className="md:col-span-9 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#A99CCB] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by builder name, skill (e.g. FastAPI, Figma), or keyword..."
                className="w-full nc-input pl-9"
              />
            </div>

            {/* Empty State */}
            {filteredMembers.length === 0 ? (
              <div className="p-12 text-center bg-[#22183B] border border-[#3A2E5C] rounded-2xl space-y-3">
                <Compass className="w-8 h-8 text-[#FFB547] mx-auto" />
                <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
                  No builders found matching criteria
                </h3>
                <p className="text-xs text-[#A99CCB] max-w-sm mx-auto">
                  Try clearing your search query or selecting "All Roles" to expand the search
                  across the Telugu AI network.
                </p>
                <button
                  onClick={() => {
                    setSelectedRoleFilter('all');
                    setSelectedLocation('all');
                    setSearchQuery('');
                  }}
                  className="nc-button-primary text-xs py-2 px-4"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                    : 'space-y-3'
                }
              >
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="nc-card p-5 space-y-4 hover:border-[#FFB547]/50 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover border border-[#3A2E5C]"
                          />
                          <div>
                            <h3
                              onClick={() => {
                                setViewingMember(member);
                                navigate('/member-profile');
                              }}
                              className="font-heading font-bold text-sm text-[#F3EEFF] hover:text-[#FFB547] cursor-pointer"
                            >
                              {member.name}
                            </h3>
                            <p className="text-[11px] text-[#A99CCB]">{member.roleTitle}</p>
                            <span className="text-[10px] text-[#7C6F9B]">{member.location}</span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-[#FFB547] bg-[#FFB547]/10 px-2 py-0.5 rounded-lg border border-[#FFB547]/30 shrink-0">
                          {member.matchScore}%
                        </span>
                      </div>

                      {/* Role & Reason */}
                      <div className="mt-3 flex items-center gap-2">
                        <RoleBadge role={member.role} size="sm" />
                        <span className="text-[11px] text-[#2DD4BF] font-medium">
                          {member.buildingStatus}
                        </span>
                      </div>

                      <p className="text-xs text-[#A99CCB] mt-2 leading-relaxed line-clamp-2">
                        "{member.whyMatched}"
                      </p>

                      {/* Skills Chips */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {member.skills.slice(0, 3).map((s) => (
                          <span
                            key={s.name}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#17102A] border border-[#3A2E5C] text-[#A99CCB]"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-[#3A2E5C] flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setViewingMember(member);
                          navigate('/member-profile');
                        }}
                        className="text-[#FFB547] hover:underline font-medium"
                      >
                        View Profile →
                      </button>

                      {member.connectionStatus === 'connected' ? (
                        <span className="text-[#2DD4BF] font-semibold text-[11px]">Connected</span>
                      ) : member.connectionStatus === 'pending_sent' ? (
                        <span className="text-[#A99CCB] text-[11px]">Request Sent</span>
                      ) : (
                        <button
                          onClick={() => sendConnectionRequest(member.id)}
                          className="nc-button-secondary text-xs py-1.5 px-3"
                        >
                          <UserPlus className="w-3 h-3" />
                          <span>Connect</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CIRCLES TAB */}
      {activeTab === 'circles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {circles.map((circle) => (
            <div
              key={circle.id}
              onClick={() => navigate('/circles')}
              className="nc-card p-6 space-y-4 hover:border-[#FFB547]/50 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] text-[#FFB547] font-bold">{circle.tag}</span>
                  <h3 className="font-heading font-bold text-base text-[#F3EEFF] mt-0.5">
                    {circle.name}
                  </h3>
                  <p className="text-xs text-[#A99CCB] mt-1">{circle.description}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#17102A] border border-[#3A2E5C] text-[#2DD4BF] font-semibold shrink-0">
                  {circle.memberCount} builders
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#3A2E5C] text-[#7C6F9B]">
                <span>{circle.activeNow} builders active right now</span>
                <span className="text-[#FFB547] font-medium">Open Circle →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS TAB */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => navigate('/build-room')}
              className="nc-card p-6 space-y-4 hover:border-[#FFB547]/50 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#F3EEFF]">{proj.title}</h3>
                  <p className="text-xs text-[#A99CCB] mt-1">{proj.description}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#FFB547]/10 text-[#FFB547] border border-[#FFB547]/30 font-bold shrink-0">
                  {proj.teamBalance} Balance
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#3A2E5C]">
                <div className="flex items-center -space-x-2">
                  {proj.members.map((m) => (
                    <img
                      key={m.id}
                      src={m.avatar}
                      alt={m.name}
                      className="w-7 h-7 rounded-full object-cover border-2 border-[#1E1537]"
                    />
                  ))}
                </div>
                <span className="text-[#FFB547] font-medium">Enter Build Room →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Filter Sheet */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-[#1E1537] border-t border-[#3A2E5C] rounded-t-3xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
              <h3 className="font-heading font-bold text-base text-[#F3EEFF]">Filter Builders</h3>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="text-[#A99CCB] hover:text-[#F3EEFF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[#A99CCB] font-medium">Role</span>
              <div className="grid grid-cols-2 gap-2">
                {['all', 'build', 'design', 'business', 'research'].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedRoleFilter(r as any);
                      setShowMobileFilter(false);
                    }}
                    className={`p-2 rounded-xl border text-center capitalize ${
                      selectedRoleFilter === r
                        ? 'bg-[#FFB547] text-[#17102A] font-bold border-[#FFB547]'
                        : 'bg-[#22183B] text-[#A99CCB] border-[#3A2E5C]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
