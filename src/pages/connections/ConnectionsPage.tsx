import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
import { Member } from '../../types';
import {
  Users2,
  UserCheck,
  Send,
  MessageSquare,
  Search,
  MoreVertical,
  Check,
  X,
  Flag,
  Ban,
  ExternalLink,
} from 'lucide-react';

export const ConnectionsPage: React.FC = () => {
  const {
    membersList,
    acceptConnectionRequest,
    declineConnectionRequest,
    startChatWithMember,
    setViewingMember,
    navigate,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'requests' | 'sent' | 'connected'>('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOverflowId, setActiveOverflowId] = useState<string | null>(null);

  // Group members by connection status
  const requests = membersList.filter((m) => m.connectionStatus === 'pending_received');
  const sent = membersList.filter((m) => m.connectionStatus === 'pending_sent');
  const connected = membersList.filter((m) => m.connectionStatus === 'connected');

  const filteredConnected = connected.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.roleTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBlock = (name: string) => {
    setActiveOverflowId(null);
    showToast(`${name} has been blocked from your network.`, 'info');
  };

  const handleReport = (name: string) => {
    setActiveOverflowId(null);
    showToast(`Report filed for ${name}. Our moderators will review.`, 'info');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-[#3A2E5C]">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
          Connections & Network
        </h1>
        <p className="text-xs text-[#A99CCB] mt-0.5">
          Manage your accepted teammates, pending invites, and private direct contact channels.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#3A2E5C] pb-2 text-xs">
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'requests'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Requests ({requests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'sent'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Sent ({sent.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('connected')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'connected'
              ? 'bg-[#22183B] text-[#FFB547] border border-[#3A2E5C]'
              : 'text-[#A99CCB] hover:text-[#F3EEFF]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Connected ({connected.length})</span>
        </button>
      </div>

      {/* REQUESTS TAB */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="p-12 text-center bg-[#22183B] border border-[#3A2E5C] rounded-2xl text-xs text-[#A99CCB] space-y-2">
              <Users2 className="w-8 h-8 text-[#FFB547] mx-auto" />
              <p className="font-semibold text-[#F3EEFF]">No pending connection requests</p>
              <p>Discover complementary builders in the directory to grow your circle.</p>
              <button
                onClick={() => navigate('/discover')}
                className="nc-button-primary text-xs py-2 px-4 mt-2"
              >
                Browse Builders
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((member) => (
                <div
                  key={member.id}
                  className="nc-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#3A2E5C]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-sm text-[#F3EEFF]">
                          {member.name}
                        </h3>
                        <RoleBadge role={member.role} size="sm" />
                        <span className="text-[10px] text-[#FFB547] font-semibold bg-[#FFB547]/10 px-2 py-0.5 rounded border border-[#FFB547]/30">
                          {member.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-[#A99CCB]">{member.roleTitle} • {member.location}</p>
                      {member.note && (
                        <p className="text-[#F3EEFF]/90 italic bg-[#17102A] p-2.5 rounded-lg border border-[#3A2E5C] mt-2">
                          "{member.note}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => declineConnectionRequest(member.id)}
                      className="nc-button-secondary py-2 px-3 text-xs text-rose-300 hover:text-rose-200"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                    <button
                      onClick={() => acceptConnectionRequest(member.id)}
                      className="nc-button-primary py-2 px-4 text-xs font-semibold"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SENT TAB */}
      {activeTab === 'sent' && (
        <div className="space-y-4">
          {sent.length === 0 ? (
            <div className="p-12 text-center bg-[#22183B] border border-[#3A2E5C] rounded-2xl text-xs text-[#A99CCB] space-y-2">
              <Send className="w-8 h-8 text-[#FFB547] mx-auto" />
              <p className="font-semibold text-[#F3EEFF]">No outgoing connection requests</p>
              <p>Explore Discover or Find Your Four to connect with complementary teammates.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sent.map((member) => (
                <div
                  key={member.id}
                  className="nc-card p-5 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#3A2E5C]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-sm text-[#F3EEFF]">
                          {member.name}
                        </h3>
                        <RoleBadge role={member.role} size="sm" />
                      </div>
                      <p className="text-[#A99CCB] text-[11px]">{member.roleTitle}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#FFB547] bg-[#FFB547]/10 px-3 py-1 rounded-xl border border-[#FFB547]/30 font-medium">
                    Invitation Pending
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CONNECTED TAB */}
      {activeTab === 'connected' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#A99CCB] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter your connected builders..."
              className="w-full nc-input pl-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredConnected.map((member) => (
              <div
                key={member.id}
                className="nc-card p-5 space-y-4 relative flex flex-col justify-between"
              >
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
                      <RoleBadge role={member.role} size="sm" />
                    </div>
                  </div>

                  {/* Overflow Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setActiveOverflowId(
                          activeOverflowId === member.id ? null : member.id
                        )
                      }
                      className="p-1 rounded-lg text-[#A99CCB] hover:text-[#F3EEFF]"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeOverflowId === member.id && (
                      <div className="absolute right-0 mt-1 w-36 bg-[#17102A] border border-[#3A2E5C] rounded-xl shadow-glow-card py-1 z-20 text-xs">
                        <button
                          onClick={() => {
                            setActiveOverflowId(null);
                            setViewingMember(member);
                            navigate('/member-profile');
                          }}
                          className="w-full text-left px-3 py-1.5 text-[#F3EEFF] hover:bg-[#22183B] flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() => handleReport(member.name)}
                          className="w-full text-left px-3 py-1.5 text-[#A99CCB] hover:bg-[#22183B] flex items-center gap-1.5"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>Report</span>
                        </button>
                        <button
                          onClick={() => handleBlock(member.name)}
                          className="w-full text-left px-3 py-1.5 text-rose-400 hover:bg-[#22183B] flex items-center gap-1.5"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Block</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3A2E5C] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#2DD4BF] font-medium flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Direct chat active</span>
                  </span>

                  <button
                    onClick={() => startChatWithMember(member)}
                    className="nc-button-primary text-xs py-1.5 px-3"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
