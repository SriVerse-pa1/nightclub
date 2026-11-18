import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import { RoleType } from '../../types';
import {
  Search,
  LayoutGrid,
  List,
  Users2,
  FolderGit2,
  Layers,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD1C0]">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
            Discover Network
          </h1>
          <p className="text-xs text-[#665E54] mt-0.5">
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

          <div className="bg-[#E7DCCB] border border-[#DCD1C0] rounded-xl p-1 flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#FFFFFF] text-[#805536] shadow-sm' : 'text-[#665E54] hover:text-[#29251F]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#FFFFFF] text-[#805536] shadow-sm' : 'text-[#665E54] hover:text-[#29251F]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DCD1C0] pb-2 text-xs">
        <button
          onClick={() => setActiveTab('people')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'people'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Builders ({filteredMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('circles')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'circles'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Community Circles ({circles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'projects'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
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
          <div className="hidden md:block md:col-span-3 bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-5 space-y-5 text-xs shadow-card">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
              <span className="font-bold text-[#29251F] uppercase tracking-wider text-[11px]">
                Filter Builders
              </span>
              {(selectedRoleFilter !== 'all' || selectedLocation !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedRoleFilter('all');
                    setSelectedLocation('all');
                    setSearchQuery('');
                  }}
                  className="text-[10px] text-[#805536] hover:underline font-medium"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Role Filter */}
            <div className="space-y-2">
              <span className="text-[#665E54] font-medium">Role Category</span>
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
                        ? 'bg-[#805536] text-white font-bold shadow-sm'
                        : 'text-[#665E54] hover:bg-[#F3EDE3] hover:text-[#29251F]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <span className="text-[#665E54] font-medium">Region / Hub</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full nc-input"
              >
                <option value="all" className="bg-white text-[#29251F]">All Regions</option>
                <option value="Hyderabad" className="bg-white text-[#29251F]">Hyderabad, Telangana</option>
                <option value="Bengaluru" className="bg-white text-[#29251F]">Bengaluru, Karnataka</option>
                <option value="Visakhapatnam" className="bg-white text-[#29251F]">Visakhapatnam, AP</option>
                <option value="Vijayawada" className="bg-white text-[#29251F]">Vijayawada, AP</option>
                <option value="Warangal" className="bg-white text-[#29251F]">Warangal, Telangana</option>
              </select>
            </div>
          </div>

          {/* Results Area (9 cols) */}
          <div className="md:col-span-9 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8173] absolute left-3.5 top-1/2 -translate-y-1/2" />
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
              <div className="p-12 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl space-y-3 shadow-card">
                <Compass className="w-8 h-8 text-[#805536] mx-auto" />
                <h3 className="font-heading font-bold text-base text-[#29251F]">
                  No builders found matching criteria
                </h3>
                <p className="text-xs text-[#665E54] max-w-sm mx-auto">
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
                    className="nc-card p-5 space-y-4 bg-[#FFFFFF] border border-[#DCD1C0] hover:border-[#805536] flex flex-col justify-between shadow-card"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover border border-[#DCD1C0]"
                          />
                          <div>
                            <h3
                              onClick={() => {
                                setViewingMember(member);
                                navigate('/member-profile');
                              }}
                              className="font-heading font-bold text-sm text-[#29251F] hover:text-[#805536] cursor-pointer"
                            >
                              {member.name}
                            </h3>
                            <p className="text-[11px] text-[#665E54]">{member.roleTitle}</p>
                            <span className="text-[10px] text-[#8C8173]">{member.location}</span>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-[#805536] bg-[#805536]/10 px-2 py-0.5 rounded-lg border border-[#805536]/25 shrink-0">
                          {member.matchScore}%
                        </span>
                      </div>

                      {/* Role & Reason */}
                      <div className="mt-3 flex items-center gap-2">
                        <RoleBadge role={member.role} size="sm" />
                        <span className="text-[11px] text-[#29251F] font-medium">
                          {member.buildingStatus}
                        </span>
                      </div>

                      <p className="text-xs text-[#665E54] mt-2 leading-relaxed line-clamp-2">
                        "{member.whyMatched}"
                      </p>

                      {/* Skills Chips */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {member.skills.slice(0, 3).map((s) => (
                          <span
                            key={s.name}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F]"
                          >
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-[#DCD1C0] flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setViewingMember(member);
                          navigate('/member-profile');
                        }}
                        className="text-[#805536] hover:underline font-medium"
                      >
                        View Profile →
                      </button>

                      {member.connectionStatus === 'connected' ? (
                        <span className="text-[#805536] font-semibold text-[11px]">Connected</span>
                      ) : member.connectionStatus === 'pending_sent' ? (
                        <span className="text-[#8C8173] text-[11px]">Request Sent</span>
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
              className="nc-card p-6 space-y-4 bg-[#FFFFFF] border border-[#DCD1C0] hover:border-[#805536] cursor-pointer shadow-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] text-[#805536] font-bold">{circle.tag}</span>
                  <h3 className="font-heading font-bold text-base text-[#29251F] mt-0.5">
                    {circle.name}
                  </h3>
                  <p className="text-xs text-[#665E54] mt-1">{circle.description}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F] font-semibold shrink-0">
                  {circle.memberCount} builders
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#DCD1C0] text-[#8C8173]">
                <span>{circle.activeNow} builders active right now</span>
                <span className="text-[#805536] font-medium">Open Circle →</span>
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
              className="nc-card p-6 space-y-4 bg-[#FFFFFF] border border-[#DCD1C0] hover:border-[#805536] cursor-pointer shadow-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#29251F]">{proj.title}</h3>
                  <p className="text-xs text-[#665E54] mt-1">{proj.description}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#805536]/10 text-[#805536] border border-[#805536]/25 font-bold shrink-0">
                  {proj.teamBalance} Balance
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#DCD1C0]">
                <div className="flex items-center -space-x-2">
                  {proj.members.map((m) => (
                    <img
                      key={m.id}
                      src={m.avatar}
                      alt={m.name}
                      className="w-7 h-7 rounded-full object-cover border-2 border-[#FFFFFF]"
                    />
                  ))}
                </div>
                <span className="text-[#805536] font-medium">Enter Build Room →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Filter Sheet */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-[#29251F]/40 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-[#FFFFFF] border-t border-[#DCD1C0] rounded-t-3xl p-6 space-y-4 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
              <h3 className="font-heading font-bold text-base text-[#29251F]">Filter Builders</h3>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="text-[#665E54] hover:text-[#29251F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[#665E54] font-medium">Role</span>
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
                        ? 'bg-[#805536] text-white font-bold border-[#805536]'
                        : 'bg-[#F3EDE3] text-[#665E54] border-[#DCD1C0]'
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
