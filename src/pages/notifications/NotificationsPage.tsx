import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NotificationType } from '../../types';
import {
  Bell,
  MessageSquare,
  UserCheck,
  Users2,
  Calendar,
  Flag,
  Trophy,
  CheckCheck,
  Settings,
  Sparkles,
  ArrowRight,
  Moon,
  Filter,
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigate,
    settings,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'team' | 'mentorship' | 'message' | 'challenge'>('all');

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'team') return notif.type === 'team_ready' || notif.type === 'new_intro' || notif.type === 'connection_accepted';
    if (activeFilter === 'mentorship') return notif.type === 'session_reminder';
    if (activeFilter === 'message') return notif.type === 'message';
    if (activeFilter === 'challenge') return notif.type === 'challenge' || notif.type === 'milestone';
    return true;
  });

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-4 h-4 text-[#805536]" />;
      case 'connection_accepted':
        return <UserCheck className="w-4 h-4 text-[#805536]" />;
      case 'team_ready':
        return <Users2 className="w-4 h-4 text-[#805536]" />;
      case 'session_reminder':
        return <Calendar className="w-4 h-4 text-[#805536]" />;
      case 'milestone':
        return <Flag className="w-4 h-4 text-[#805536]" />;
      case 'challenge':
        return <Trophy className="w-4 h-4 text-[#805536]" />;
      case 'new_intro':
      default:
        return <Sparkles className="w-4 h-4 text-[#805536]" />;
    }
  };

  const groups: Array<{ id: 'today' | 'this_week' | 'earlier'; title: string }> = [
    { id: 'today', title: 'Today' },
    { id: 'this_week', title: 'This Week' },
    { id: 'earlier', title: 'Earlier' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCD1C0]">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
            Notifications
          </h1>
          <p className="text-xs text-[#665E54] mt-0.5">
            Real-time updates regarding your five-person team, mentor sessions, and messages.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={markAllNotificationsRead}
            className="nc-button-secondary text-xs py-2 px-3"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#805536]" />
            <span>Mark all read</span>
          </button>

          <button
            onClick={() => navigate('/settings')}
            className="p-2 text-[#665E54] hover:text-[#29251F] transition-colors rounded-lg hover:bg-[#E7DCCB]/60"
            title="Notification Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quiet Hours Banner */}
      {settings.notifications.quietHoursEnabled && (
        <div className="p-3.5 rounded-2xl bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Moon className="w-4 h-4 text-[#805536] shrink-0" />
            <div>
              <span className="font-bold text-[#29251F]">Quiet Hours Active</span>
              <p className="text-[11px] text-[#665E54]">
                {settings.notifications.quietHoursStart} – {settings.notifications.quietHoursEnd} IST (UTC+5:30) • Non-urgent alerts muted.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="text-[11px] text-[#805536] hover:underline font-semibold shrink-0"
          >
            Configure
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all' as const, label: 'All Alerts' },
          { id: 'team' as const, label: 'Team Matches' },
          { id: 'mentorship' as const, label: 'Mentorship' },
          { id: 'message' as const, label: 'Messages' },
          { id: 'challenge' as const, label: 'Challenges' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all shrink-0 ${
              activeFilter === tab.id
                ? 'bg-[#805536] text-white font-bold shadow-sm'
                : 'bg-[#FFFFFF] border border-[#DCD1C0] text-[#665E54] hover:text-[#29251F]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications grouped */}
      <div className="space-y-8">
        {groups.map((group) => {
          const groupNotifications = filteredNotifications.filter((n) => n.group === group.id);
          if (groupNotifications.length === 0) return null;

          return (
            <div key={group.id} className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C8173] px-1">
                {group.title}
              </span>

              <div className="space-y-2.5">
                {groupNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationRead(notif.id);
                      navigate(notif.linkRoute as any);
                    }}
                    className={`nc-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:border-[#805536] transition-all text-xs bg-[#FFFFFF] border shadow-sm ${
                      !notif.read ? 'border-[#805536]/40 shadow-card-hover' : 'border-[#DCD1C0]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] shrink-0 mt-0.5">
                        {getNotificationIcon(notif.type)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-xs text-[#29251F]">{notif.title}</h4>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-[#805536]" />
                          )}
                          <span className="text-[10px] text-[#8C8173] px-1.5 py-0.2 rounded bg-[#E7DCCB]">
                            IST
                          </span>
                        </div>
                        <p className="text-[#665E54] text-[11px] leading-relaxed">
                          {notif.description}
                        </p>
                        <span className="text-[10px] text-[#8C8173] block pt-1">{notif.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="text-xs text-[#805536] font-semibold hover:underline flex items-center gap-1">
                        Open
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="p-12 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl text-xs text-[#665E54] space-y-2 shadow-sm">
            <Bell className="w-8 h-8 text-[#805536] mx-auto" />
            <p className="font-semibold text-[#29251F]">No notifications in this filter</p>
            <p>Select another category or view all alerts.</p>
          </div>
        )}
      </div>
    </div>
  );
};
