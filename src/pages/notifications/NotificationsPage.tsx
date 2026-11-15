import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppNotification, NotificationType } from '../../types';
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
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigate,
  } = useApp();

  const [activeGroupFilter, setActiveGroupFilter] = useState<'all' | 'today' | 'this_week' | 'earlier'>('all');

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-4 h-4 text-[#38BDF8]" />;
      case 'connection_accepted':
        return <UserCheck className="w-4 h-4 text-[#2DD4BF]" />;
      case 'team_ready':
        return <Users2 className="w-4 h-4 text-[#FFB547]" />;
      case 'session_reminder':
        return <Calendar className="w-4 h-4 text-[#F472B6]" />;
      case 'milestone':
        return <Flag className="w-4 h-4 text-emerald-400" />;
      case 'challenge':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'new_intro':
      default:
        return <Sparkles className="w-4 h-4 text-[#FFB547]" />;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A2E5C]">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
            Notifications
          </h1>
          <p className="text-xs text-[#A99CCB] mt-0.5">
            Real-time updates regarding your five-person team, mentor sessions, and messages.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={markAllNotificationsRead}
            className="nc-button-secondary text-xs py-2 px-3"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>

          <button
            onClick={() => navigate('/settings')}
            className="p-2 text-[#A99CCB] hover:text-[#F3EEFF]"
            title="Notification Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notifications grouped */}
      <div className="space-y-8">
        {groups.map((group) => {
          const groupNotifications = notifications.filter((n) => n.group === group.id);
          if (groupNotifications.length === 0) return null;

          return (
            <div key={group.id} className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7C6F9B] px-1">
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
                    className={`nc-card p-4 flex items-start justify-between gap-4 cursor-pointer hover:border-[#FFB547]/50 transition-all text-xs ${
                      !notif.read ? 'bg-[#2B1E4A]/70 border-[#FFB547]/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-[#17102A] border border-[#3A2E5C] shrink-0 mt-0.5">
                        {getNotificationIcon(notif.type)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-xs text-[#F3EEFF]">{notif.title}</h4>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-[#FFB547]" />
                          )}
                        </div>
                        <p className="text-[#A99CCB] text-[11px] leading-relaxed">
                          {notif.description}
                        </p>
                        <span className="text-[10px] text-[#7C6F9B] block pt-1">{notif.time}</span>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#A99CCB] shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <div className="p-12 text-center bg-[#22183B] border border-[#3A2E5C] rounded-2xl text-xs text-[#A99CCB] space-y-2">
            <Bell className="w-8 h-8 text-[#FFB547] mx-auto" />
            <p className="font-semibold text-[#F3EEFF]">You're all caught up</p>
            <p>New team match introductions and session alerts will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
