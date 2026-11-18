import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RoleBadge } from '../../components/common/RoleBadge';
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
      <div className="pb-4 border-b border-[#DCD1C0]">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
          Connections & Network
        </h1>
        <p className="text-xs text-[#665E54] mt-0.5">
          Manage your accepted teammates, pending invites, and private direct contact channels.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#DCD1C0] pb-2 text-xs">
        <button
          onClick={() => setActiveTab('requests')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'requests'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Requests ({requests.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'sent'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Sent ({sent.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('connected')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            activeTab === 'connected'
              ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm'
              : 'text-[#665E54] hover:text-[#29251F]'
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
            <div className="p-12 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl text-xs text-[#665E54] space-y-2 shadow-card">
              <Users2 className="w-8 h-8 text-[#805536] mx-auto" />
              <p className="font-semibold text-[#29251F]">No pending connection requests</p>
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
                  className="nc-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs bg-[#FFFFFF] border border-[#DCD1C0] shadow-card"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#DCD1C0]"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-sm text-[#29251F]">
                          {member.name}
                        </h3>
                        <RoleBadge role={member.role} size="sm" />
                        <span className="text-[10px] text-[#805536] font-semibold bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25">
                          {member.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-[#665E54]">{member.roleTitle} • {member.location}</p>
                      {member.note && (
                        <p className="text-[#29251F] italic bg-[#F3EDE3] p-2.5 rounded-lg border border-[#DCD1C0] mt-2">
                          "{member.note}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => declineConnectionRequest(member.id)}
                      className="nc-button-secondary py-2 px-3 text-xs text-[#665E54] hover:text-[#29251F]"
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
            <div className="p-12 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl text-xs text-[#665E54] space-y-2 shadow-card">
              <Send className="w-8 h-8 text-[#805536] mx-auto" />
              <p className="font-semibold text-[#29251F]">No outgoing connection requests</p>
              <p>Explore Discover or Find Your Four to connect with complementary teammates.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sent.map((member) => (
                <div
                  key={member.id}
                  className="nc-card p-5 flex items-center justify-between gap-4 text-xs bg-[#FFFFFF] border border-[#DCD1C0] shadow-card"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-11 h-11 rounded-full object-cover border border-[#DCD1C0]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-sm text-[#29251F]">
                          {member.name}
                        </h3>
                        <RoleBadge role={member.role} size="sm" />
                      </div>
                      <p className="text-[#665E54] text-[11px]">{member.roleTitle}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#805536] bg-[#805536]/10 px-3 py-1 rounded-xl border border-[#805536]/25 font-medium">
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
            <Search className="w-4 h-4 text-[#8C8173] absolute left-3.5 top-1/2 -translate-y-1/2" />
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
                className="nc-card p-5 space-y-4 relative flex flex-col justify-between bg-[#FFFFFF] border border-[#DCD1C0] shadow-card"
              >
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
                      className="p-1 rounded-lg text-[#665E54] hover:text-[#29251F]"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeOverflowId === member.id && (
                      <div className="absolute right-0 mt-1 w-36 bg-[#FFFFFF] border border-[#DCD1C0] rounded-xl shadow-card-hover py-1 z-20 text-xs">
                        <button
                          onClick={() => {
                            setActiveOverflowId(null);
                            setViewingMember(member);
                            navigate('/member-profile');
                          }}
                          className="w-full text-left px-3 py-1.5 text-[#29251F] hover:bg-[#F3EDE3] flex items-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() => handleReport(member.name)}
                          className="w-full text-left px-3 py-1.5 text-[#665E54] hover:bg-[#F3EDE3] flex items-center gap-1.5"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          <span>Report</span>
                        </button>
                        <button
                          onClick={() => handleBlock(member.name)}
                          className="w-full text-left px-3 py-1.5 text-[#805536] hover:bg-[#F3EDE3] flex items-center gap-1.5"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Block</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCD1C0] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#29251F] font-medium flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#805536]" />
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
