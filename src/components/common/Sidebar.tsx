import React from 'react';
import { useApp } from '../../context/AppContext';
import { RoutePath } from '../../types';
import {
  Home,
  Users2,
  Compass,
  Hammer,
  GraduationCap,
  MessageSquare,
  Briefcase,
  User,
  Bell,
  Settings,
  Sparkles,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    currentRoute,
    navigate,
    threads,
    unreadNotificationCount,
    mentorCredits,
    currentUser,
    t,
  } = useApp();

  const unreadMessagesCount = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  const navItems: Array<{
    name: string;
    route: RoutePath;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    isFeatured?: boolean;
  }> = [
    { name: t('nav_home'), route: '/dashboard', icon: Home },
    {
      name: t('nav_findYourFour'),
      route: '/find-your-four',
      icon: Users2,
      isFeatured: true,
      badge: '0.92',
    },
    { name: t('nav_discover'), route: '/discover', icon: Compass },
    { name: t('nav_build'), route: '/build', icon: Hammer },
    {
      name: t('nav_mentorship'),
      route: '/mentorship',
      icon: GraduationCap,
      badge: `${mentorCredits.remaining} ${t('header_creditsLeft')}`,
    },
    {
      name: t('nav_messages'),
      route: '/messages',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    { name: t('nav_careers'), route: '/careers', icon: Briefcase },
    { name: t('nav_circles'), route: '/circles', icon: Layers },
    { name: t('nav_profile'), route: '/profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[#F3EDE3] border-r border-[#DCD1C0] select-none z-30">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#DCD1C0]">
        <div
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#805536] border border-[#805536] flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-sm">
            <span className="font-heading font-black text-lg">N</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base tracking-wider text-[#29251F]">
                NIGHTCLUB
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#805536] animate-pulse" />
            </div>
            <span className="text-[10px] text-[#665E54] block -mt-1 font-medium">{t('nav_foundingCohort')}</span>
          </div>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-lg text-[#665E54] hover:text-[#29251F] hover:bg-[#E7DCCB] transition-colors"
          title={t('nav_notifications')}
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#805536]" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C8173] px-3 pb-1">
          {t('nav_menu')}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentRoute === item.route ||
            (item.route === '/build' && (currentRoute === '/build-room' || currentRoute === '/challenges'));

          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[#FFFFFF] text-[#805536] border border-[#805536]/30 shadow-sm font-semibold'
                  : 'text-[#665E54] hover:text-[#29251F] hover:bg-[#E7DCCB]/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#805536]' : 'text-[#665E54] group-hover:text-[#29251F]'
                  }`}
                />
                <span className={isActive ? 'font-semibold text-[#805536]' : ''}>{item.name}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    item.isFeatured
                      ? 'bg-[#E7DCCB] text-[#805536] border border-[#DCD1C0]'
                      : typeof item.badge === 'number'
                      ? 'bg-[#805536] text-white font-bold'
                      : 'bg-[#E7DCCB] text-[#29251F] border border-[#DCD1C0]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Secondary utilities */}
        <div className="pt-4 mt-4 border-t border-[#DCD1C0]">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8C8173] px-3 pb-1">
            System & Tools
          </div>
          <button
            onClick={() => navigate('/connections')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              currentRoute === '/connections'
                ? 'bg-[#FFFFFF] text-[#805536] shadow-sm font-semibold'
                : 'text-[#665E54] hover:text-[#29251F] hover:bg-[#E7DCCB]/60'
            }`}
          >
            <Users2 className="w-3.5 h-3.5 text-[#665E54]" />
            <span>Connections</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              currentRoute === '/settings'
                ? 'bg-[#FFFFFF] text-[#805536] shadow-sm font-semibold'
                : 'text-[#665E54] hover:text-[#29251F] hover:bg-[#E7DCCB]/60'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-[#665E54]" />
            <span>{t('nav_settings')}</span>
          </button>
          <button
            onClick={() => navigate('/admin')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              currentRoute === '/admin'
                ? 'bg-[#FFFFFF] text-[#805536] shadow-sm font-semibold'
                : 'text-[#665E54] hover:text-[#29251F] hover:bg-[#E7DCCB]/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#665E54]" />
            <span>{t('nav_admin')}</span>
          </button>
        </div>
      </div>

      {/* Mentor Credits Mini Banner */}
      <div className="p-3 border-t border-[#DCD1C0]">
        <div
          onClick={() => navigate('/mentorship')}
          className="bg-[#FFFFFF] hover:border-[#805536] border border-[#DCD1C0] rounded-xl p-3 cursor-pointer transition-all shadow-sm group"
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#665E54] group-hover:text-[#29251F] flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#805536]" />
              Mentor Sessions
            </span>
            <span className="text-[#29251F] font-semibold">
              {mentorCredits.remaining} / {mentorCredits.total}
            </span>
          </div>

          {/* 8 credit visual dots */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: mentorCredits.total }).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 flex-1 rounded-full ${
                  idx < mentorCredits.remaining ? 'bg-[#805536]' : 'bg-[#E7DCCB]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#8C8173]">
            <span>Resets 1st of next month</span>
            <ChevronRight className="w-3 h-3 text-[#665E54] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* User Compact Card */}
        <div
          onClick={() => navigate('/profile')}
          className="mt-2 flex items-center justify-between p-2 rounded-xl hover:bg-[#E7DCCB]/60 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#DCD1C0]"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#29251F] truncate leading-tight">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-[#665E54] truncate capitalize">
                {currentUser.role} • Hyderabad
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
