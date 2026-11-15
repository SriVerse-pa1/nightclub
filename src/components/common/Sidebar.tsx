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
  } = useApp();

  const unreadMessagesCount = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  const navItems: Array<{
    name: string;
    route: RoutePath;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
    isFeatured?: boolean;
  }> = [
    { name: 'Home', route: '/dashboard', icon: Home },
    {
      name: 'Find Your Four',
      route: '/find-your-four',
      icon: Users2,
      isFeatured: true,
      badge: '0.92',
    },
    { name: 'Discover', route: '/discover', icon: Compass },
    { name: 'Build', route: '/build', icon: Hammer },
    {
      name: 'Mentorship',
      route: '/mentorship',
      icon: GraduationCap,
      badge: `${mentorCredits.remaining} left`,
    },
    {
      name: 'Messages',
      route: '/messages',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    { name: 'Careers', route: '/careers', icon: Briefcase },
    { name: 'Circles', route: '/circles', icon: Layers },
    { name: 'Profile', route: '/profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-[#17102A] border-r border-[#3A2E5C] select-none z-30">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#3A2E5C]">
        <div
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#22183B] border border-[#FFB547]/50 flex items-center justify-center text-[#FFB547] shadow-glow-accent group-hover:scale-105 transition-transform">
            <span className="font-heading font-black text-lg">N</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-base tracking-wider text-[#F3EEFF]">
                NIGHTCLUB
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB547]" />
            </div>
            <span className="text-[10px] text-[#A99CCB] block -mt-1">Founding Cohort</span>
          </div>
        </div>

        {/* Notifications Icon Button */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-lg text-[#A99CCB] hover:text-[#F3EEFF] hover:bg-[#22183B] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FFB547]" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7C6F9B] px-3 pb-1">
          Menu
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
                  ? 'bg-[#22183B] text-[#F3EEFF] border border-[#3A2E5C] shadow-sm'
                  : 'text-[#A99CCB] hover:text-[#F3EEFF] hover:bg-[#22183B]/50'
              } ${item.isFeatured && !isActive ? 'hover:border-[#FFB547]/30' : ''}`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? 'text-[#FFB547]'
                      : item.isFeatured
                      ? 'text-[#FFB547]/80 group-hover:text-[#FFB547]'
                      : 'text-[#A99CCB] group-hover:text-[#F3EEFF]'
                  }`}
                />
                <span className={isActive ? 'font-semibold' : ''}>{item.name}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                    item.isFeatured
                      ? 'bg-[#FFB547]/15 text-[#FFB547] border border-[#FFB547]/30'
                      : typeof item.badge === 'number'
                      ? 'bg-[#FFB547] text-[#17102A] font-bold'
                      : 'bg-[#2B1E4A] text-[#A99CCB] border border-[#3A2E5C]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Secondary utilities */}
        <div className="pt-4 mt-4 border-t border-[#3A2E5C]/60">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7C6F9B] px-3 pb-1">
            System & Tools
          </div>
          <button
            onClick={() => navigate('/connections')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              currentRoute === '/connections'
                ? 'bg-[#22183B] text-[#F3EEFF]'
                : 'text-[#A99CCB] hover:text-[#F3EEFF]'
            }`}
          >
            <Users2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Connections</span>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              currentRoute === '/settings'
                ? 'bg-[#22183B] text-[#F3EEFF]'
                : 'text-[#A99CCB] hover:text-[#F3EEFF]'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-[#A99CCB]" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => navigate('/admin')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              currentRoute === '/admin'
                ? 'bg-[#22183B] text-[#F3EEFF]'
                : 'text-[#A99CCB] hover:text-[#F3EEFF]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#2DD4BF]" />
            <span>Admin Console</span>
          </button>
        </div>
      </div>

      {/* Mentor Credits Mini Banner */}
      <div className="p-3 border-t border-[#3A2E5C]">
        <div
          onClick={() => navigate('/mentorship')}
          className="bg-[#22183B] hover:border-[#FFB547]/40 border border-[#3A2E5C] rounded-xl p-3 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#A99CCB] group-hover:text-[#F3EEFF] flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB547]" />
              Mentor Sessions
            </span>
            <span className="text-[#FFB547] font-semibold">
              {mentorCredits.remaining} / {mentorCredits.total}
            </span>
          </div>

          {/* 8 credit visual dots */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: mentorCredits.total }).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 flex-1 rounded-full ${
                  idx < mentorCredits.remaining ? 'bg-[#FFB547]' : 'bg-[#3A2E5C]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#7C6F9B]">
            <span>Resets 1st of next month</span>
            <ChevronRight className="w-3 h-3 text-[#A99CCB] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* User Compact Card */}
        <div
          onClick={() => navigate('/profile')}
          className="mt-2 flex items-center justify-between p-2 rounded-xl hover:bg-[#22183B] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#FFB547]/50"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[#F3EEFF] truncate leading-tight">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-[#A99CCB] truncate capitalize">
                {currentUser.role} • Hyderabad
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
