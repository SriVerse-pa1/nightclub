import React from 'react';
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
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigate,
  } = useApp();

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

      {/* Notifications grouped */}
      <div className="space-y-8">
        {groups.map((group) => {
          const groupNotifications = notifications.filter((n) => n.group === group.id);
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
                    className={`nc-card p-4 flex items-start justify-between gap-4 cursor-pointer hover:border-[#805536] transition-all text-xs bg-[#FFFFFF] border shadow-sm ${
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
                        </div>
                        <p className="text-[#665E54] text-[11px] leading-relaxed">
                          {notif.description}
                        </p>
                        <span className="text-[10px] text-[#8C8173] block pt-1">{notif.time}</span>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#8C8173] shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <div className="p-12 text-center bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl text-xs text-[#665E54] space-y-2 shadow-sm">
            <Bell className="w-8 h-8 text-[#805536] mx-auto" />
            <p className="font-semibold text-[#29251F]">You're all caught up</p>
            <p>New team match introductions and session alerts will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
