import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import {
  Shield,
  Users2,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  Activity,
  Check,
  X,
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
      <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-3xl p-6 sm:p-7 shadow-glow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#2DD4BF] font-semibold">
              Internal Community Operations
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF] mt-1">
            Nightclub Admin & Moderation
          </h1>
          <p className="text-xs text-[#A99CCB] mt-0.5">
            Oversee cohort health, role ratios, mentor utilization, and member safety.
          </p>
        </div>

        {/* Global Metric Cards */}
        <div className="flex items-center gap-3 text-xs">
          <div className="p-3 bg-[#22183B] border border-[#3A2E5C] rounded-xl text-center min-w-[100px]">
            <span className="text-[#A99CCB] text-[10px] uppercase font-bold">Match Balance</span>
            <p className="text-lg font-bold text-[#FFB547]">94.2%</p>
          </div>
          <div className="p-3 bg-[#22183B] border border-[#3A2E5C] rounded-xl text-center min-w-[100px]">
            <span className="text-[#A99CCB] text-[10px] uppercase font-bold">Reports Queue</span>
            <p className="text-lg font-bold text-rose-400">{reports.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#3A2E5C] pb-2 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('cohort')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'cohort'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Cohort Health & Role Mix</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'reports'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Reports Queue ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'members'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Member Directory Lookup</span>
        </button>

        <button
          onClick={() => setActiveTab('mentors')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'mentors'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
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
            <div className="nc-card p-4 space-y-2 border-[#38BDF8]/40">
              <span className="text-[10px] font-bold text-[#38BDF8] uppercase">
                Build (Developers)
              </span>
              <p className="text-2xl font-bold text-[#F3EEFF]">42%</p>
              <div className="w-full h-1.5 bg-[#17102A] rounded-full overflow-hidden">
                <div className="w-[42%] h-full bg-[#38BDF8]" />
              </div>
              <span className="text-[10px] text-[#A99CCB]">Healthy supply for teams</span>
            </div>

            <div className="nc-card p-4 space-y-2 border-[#F472B6]/40">
              <span className="text-[10px] font-bold text-[#F472B6] uppercase">
                Design (UI/UX)
              </span>
              <p className="text-2xl font-bold text-[#F3EEFF]">21%</p>
              <div className="w-full h-1.5 bg-[#17102A] rounded-full overflow-hidden">
                <div className="w-[21%] h-full bg-[#F472B6]" />
              </div>
              <span className="text-[10px] text-[#2DD4BF]">High demand in cohort</span>
            </div>

            <div className="nc-card p-4 space-y-2 border-[#FBBF24]/40">
              <span className="text-[10px] font-bold text-[#FBBF24] uppercase">
                Business (GTM/Sales)
              </span>
              <p className="text-2xl font-bold text-[#F3EEFF]">23%</p>
              <div className="w-full h-1.5 bg-[#17102A] rounded-full overflow-hidden">
                <div className="w-[23%] h-full bg-[#FBBF24]" />
              </div>
              <span className="text-[10px] text-[#A99CCB]">Balanced distribution</span>
            </div>

            <div className="nc-card p-4 space-y-2 border-[#2DD4BF]/40">
              <span className="text-[10px] font-bold text-[#2DD4BF] uppercase">
                Research (Indic NLP)
              </span>
              <p className="text-2xl font-bold text-[#F3EEFF]">14%</p>
              <div className="w-full h-1.5 bg-[#17102A] rounded-full overflow-hidden">
                <div className="w-[14%] h-full bg-[#2DD4BF]" />
              </div>
              <span className="text-[10px] text-[#FFB547]">Specialized domain talent</span>
            </div>
          </div>

          {/* Regional Distribution */}
          <div className="nc-card p-6 space-y-4">
            <h3 className="font-heading font-bold text-sm text-[#F3EEFF]">
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
                    <span className="text-[#F3EEFF] font-medium">{loc.city}</span>
                    <span className="text-[#FFB547] font-semibold">{loc.builders} builders ({loc.percent})</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#17102A] rounded-full overflow-hidden">
                    <div style={{ width: loc.percent }} className="h-full bg-[#FFB547]" />
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
            <div className="p-12 text-center bg-[#22183B] border border-[#3A2E5C] rounded-2xl text-[#A99CCB]">
              All reports cleared. Network is operating safely.
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="nc-card p-5 border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-rose-400">{rep.reportedName}</span>
                      <span className="text-[10px] text-[#7C6F9B]">reported by {rep.reporterName}</span>
                      <span className="text-[10px] text-[#7C6F9B]">• {rep.timestamp}</span>
                    </div>
                    <p className="text-[#F3EEFF] bg-[#17102A] p-2.5 rounded-xl border border-[#3A2E5C]">
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
                      className="py-1.5 px-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 text-xs"
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
            <Search className="w-4 h-4 text-[#A99CCB] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              placeholder="Search member by username or email..."
              className="w-full nc-input pl-9 text-xs"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#3A2E5C] text-[#A99CCB]">
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Building Status</th>
                  <th className="py-3 px-4">Match Fit</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3A2E5C]/60 text-[#A99CCB]">
                {membersList.map((m) => (
                  <tr key={m.id} className="hover:bg-[#22183B]/50">
                    <td className="py-3 px-4 font-semibold text-[#F3EEFF] flex items-center gap-2">
                      <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                      <span>{m.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <RoleBadge role={m.role} size="sm" />
                    </td>
                    <td className="py-3 px-4">{m.location}</td>
                    <td className="py-3 px-4 text-[#2DD4BF] font-medium">{m.buildingStatus}</td>
                    <td className="py-3 px-4 font-bold text-[#FFB547]">{m.matchScore}%</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => showToast(`Audit log opened for ${m.name}.`, 'info')}
                        className="text-[#FFB547] hover:underline"
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
            <div key={m.id} className="nc-card p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-[#F3EEFF]">{m.name}</h4>
                  <span className="text-[10px] text-[#A99CCB]">{m.company}</span>
                </div>
              </div>

              <div className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] flex justify-between">
                <span>Available Open Slots:</span>
                <span className="font-bold text-[#2DD4BF]">
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
