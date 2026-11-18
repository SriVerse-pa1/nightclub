import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  Users2,
  AlertTriangle,
  Calendar,
  Search,
  Activity,
} from 'lucide-react';

export const AdminConsolePage: React.FC = () => {
  const { membersList, mentors, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'reports' | 'members' | 'cohort' | 'mentors'>('cohort');
  const [memberSearch, setMemberSearch] = useState('');

  // Sample Reports Queue
  const [reports, setReports] = useState([
    {
      id: 'rep-1',
      reportedName: 'Anonymous Candidate',
      reporterName: 'Ananya Reddy',
      reason: 'Provided invalid portfolio links that redirected to external ad landing page.',
      status: 'pending',
      timestamp: '2 hours ago',
    },
    {
      id: 'rep-2',
      reportedName: 'Dev Tool Bot User',
      reporterName: 'Karthik Varma',
      reason: 'Automated scraping messages sent across Telugu AI circle.',
      status: 'pending',
      timestamp: 'Yesterday',
    },
  ]);

  const handleResolveReport = (id: string, action: 'ban' | 'dismiss') => {
    setReports((prev) => prev.filter((r) => r.id !== id));
    showToast(action === 'ban' ? 'Member banned from network.' : 'Report dismissed.', 'info');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Admin Top Header */}
      <div className="bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-7 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#8C8173] font-semibold">
              Internal Community Operations
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#805536] animate-pulse" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F] mt-1">
            Nightclub Admin & Moderation
          </h1>
          <p className="text-xs text-[#665E54] mt-0.5">
            Oversee cohort health, role ratios, mentor utilization, and member safety.
          </p>
        </div>

        {/* Global Metric Cards */}
        <div className="flex items-center gap-3 text-xs">
          <div className="p-3 bg-[#F3EDE3] border border-[#DCD1C0] rounded-xl text-center min-w-[100px]">
            <span className="text-[#8C8173] text-[10px] uppercase font-bold">Match Balance</span>
            <p className="text-lg font-bold text-[#805536]">94.2%</p>
          </div>
          <div className="p-3 bg-[#F3EDE3] border border-[#DCD1C0] rounded-xl text-center min-w-[100px]">
            <span className="text-[#8C8173] text-[10px] uppercase font-bold">Reports Queue</span>
            <p className="text-lg font-bold text-[#29251F]">{reports.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DCD1C0] pb-2 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('cohort')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'cohort'
              ? 'bg-[#805536] text-white font-bold shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F] hover:bg-[#F3EDE3]/70'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Cohort Health & Role Mix</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'reports'
              ? 'bg-[#805536] text-white font-bold shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F] hover:bg-[#F3EDE3]/70'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Reports Queue ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'members'
              ? 'bg-[#805536] text-white font-bold shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F] hover:bg-[#F3EDE3]/70'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Member Directory Lookup</span>
        </button>

        <button
          onClick={() => setActiveTab('mentors')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'mentors'
              ? 'bg-[#805536] text-white font-bold shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F] hover:bg-[#F3EDE3]/70'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Mentor Capacity & Slots</span>
        </button>
      </div>

      {/* TAB 1: COHORT HEALTH */}
      {activeTab === 'cohort' && (
        <div className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="nc-card p-4 space-y-2 bg-[#FFFFFF] border border-[#DCD1C0] shadow-sm">
              <span className="text-[10px] font-bold text-[#8C8173] uppercase tracking-wider">
                Build (Developers)
              </span>
              <p className="text-2xl font-bold text-[#29251F]">42%</p>
              <div className="w-full h-1.5 bg-[#E7DCCB] rounded-full overflow-hidden">
                <div className="w-[42%] h-full bg-[#805536]" />
              </div>
              <span className="text-[10px] text-[#8C8173]">Healthy supply for teams</span>
            </div>

            <div className="nc-card p-4 space-y-2 bg-[#FFFFFF] border border-[#DCD1C0] shadow-sm">
              <span className="text-[10px] font-bold text-[#8C8173] uppercase tracking-wider">
                Design (UI/UX)
              </span>
              <p className="text-2xl font-bold text-[#29251F]">21%</p>
              <div className="w-full h-1.5 bg-[#E7DCCB] rounded-full overflow-hidden">
                <div className="w-[21%] h-full bg-[#805536]" />
              </div>
              <span className="text-[10px] text-[#665E54]">High demand in cohort</span>
            </div>

            <div className="nc-card p-4 space-y-2 bg-[#FFFFFF] border border-[#DCD1C0] shadow-sm">
              <span className="text-[10px] font-bold text-[#8C8173] uppercase tracking-wider">
                Business (GTM/Sales)
              </span>
              <p className="text-2xl font-bold text-[#29251F]">23%</p>
              <div className="w-full h-1.5 bg-[#E7DCCB] rounded-full overflow-hidden">
                <div className="w-[23%] h-full bg-[#805536]" />
              </div>
              <span className="text-[10px] text-[#8C8173]">Balanced distribution</span>
            </div>

            <div className="nc-card p-4 space-y-2 bg-[#FFFFFF] border border-[#DCD1C0] shadow-sm">
              <span className="text-[10px] font-bold text-[#8C8173] uppercase tracking-wider">
                Research (Indic NLP)
              </span>
              <p className="text-2xl font-bold text-[#29251F]">14%</p>
              <div className="w-full h-1.5 bg-[#E7DCCB] rounded-full overflow-hidden">
                <div className="w-[14%] h-full bg-[#805536]" />
              </div>
              <span className="text-[10px] text-[#665E54]">Specialized domain talent</span>
            </div>
          </div>

          {/* Regional Distribution */}
          <div className="nc-card p-6 space-y-4 bg-[#FFFFFF] border border-[#DCD1C0] shadow-sm">
            <h3 className="font-heading font-bold text-sm text-[#29251F]">
              Active Regional Hubs
            </h3>
            <div className="space-y-3">
              {[
                { city: 'Hyderabad, Telangana (Hitec City / Gachibowli)', builders: 620, percent: '44%' },
                { city: 'Bengaluru, Karnataka (ORR / Koramangala Hub)', builders: 380, percent: '27%' },
                { city: 'Visakhapatnam, Andhra Pradesh', builders: 240, percent: '17%' },
                { city: 'Vijayawada & Guntur, Andhra Pradesh', builders: 110, percent: '8%' },
                { city: 'Warangal & Tirupati', builders: 50, percent: '4%' },
              ].map((loc) => (
                <div key={loc.city} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#29251F] font-medium">{loc.city}</span>
                    <span className="text-[#665E54] font-semibold">{loc.builders} builders ({loc.percent})</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E7DCCB] rounded-full overflow-hidden">
                    <div style={{ width: loc.percent }} className="h-full bg-[#805536]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REPORTS QUEUE */}
      {activeTab === 'reports' && (
        <div className="space-y-4 text-xs">
          {reports.length === 0 ? (
            <div className="p-12 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl text-[#665E54] shadow-sm">
              All reports cleared. Network is operating safely.
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="nc-card p-5 border border-[#DCD1C0] bg-[#FFFFFF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#29251F]">{rep.reportedName}</span>
                      <span className="text-[10px] text-[#8C8173]">reported by {rep.reporterName}</span>
                      <span className="text-[10px] text-[#8C8173]">• {rep.timestamp}</span>
                    </div>
                    <p className="text-[#665E54] bg-[#F3EDE3] p-2.5 rounded-xl border border-[#DCD1C0]">
                      "{rep.reason}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleResolveReport(rep.id, 'dismiss')}
                      className="nc-button-secondary py-1.5 px-3 text-xs"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => handleResolveReport(rep.id, 'ban')}
                      className="nc-button-primary py-1.5 px-3 text-xs"
                    >
                      Ban User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MEMBER LOOKUP */}
      {activeTab === 'members' && (
        <div className="space-y-4 text-xs">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#8C8173] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              placeholder="Search member by username or email..."
              className="w-full nc-input pl-9 text-xs"
            />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#DCD1C0] bg-[#FFFFFF] shadow-sm">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DCD1C0] text-[#8C8173] bg-[#F3EDE3]/50">
                  <th className="py-3 px-4 font-semibold">Member</th>
                  <th className="py-3 px-4 font-semibold">Role</th>
                  <th className="py-3 px-4 font-semibold">Location</th>
                  <th className="py-3 px-4 font-semibold">Building Status</th>
                  <th className="py-3 px-4 font-semibold">Match Fit</th>
                  <th className="py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCD1C0] text-[#665E54]">
                {membersList.map((m) => (
                  <tr key={m.id} className="hover:bg-[#F3EDE3]/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#29251F] flex items-center gap-2">
                      <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover border border-[#DCD1C0]" />
                      <span>{m.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <RoleBadge role={m.role} size="sm" />
                    </td>
                    <td className="py-3 px-4">{m.location}</td>
                    <td className="py-3 px-4 text-[#29251F] font-medium">{m.buildingStatus}</td>
                    <td className="py-3 px-4 font-bold text-[#805536]">{m.matchScore}%</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => showToast(`Audit log opened for ${m.name}.`, 'info')}
                        className="text-[#805536] hover:underline font-semibold"
                      >
                        Audit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: MENTOR CAPACITY */}
      {activeTab === 'mentors' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {mentors.map((m) => (
            <div key={m.id} className="nc-card p-5 space-y-3 bg-[#FFFFFF] border border-[#DCD1C0] shadow-sm">
              <div className="flex items-center gap-3">
                <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-[#DCD1C0]" />
                <div>
                  <h4 className="font-bold text-[#29251F]">{m.name}</h4>
                  <span className="text-[10px] text-[#665E54]">{m.company}</span>
                </div>
              </div>

              <div className="p-3 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] flex justify-between">
                <span className="text-[#665E54]">Available Open Slots:</span>
                <span className="font-bold text-[#805536]">
                  {m.slots.filter((s) => s.isAvailable).length} slots
                </span>
              </div>

              <button
                onClick={() => showToast(`Calendar slots refreshed for ${m.name}.`, 'info')}
                className="w-full nc-button-secondary text-xs py-1.5"
              >
                Sync Google Calendar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
