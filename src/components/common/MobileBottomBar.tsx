import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Users2,
  Hammer,
  GraduationCap,
  MessageSquare,
  MoreHorizontal,
  Compass,
  Briefcase,
  Layers,
  User,
  Settings,
  Shield,
  X,
  LogOut,
} from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { currentRoute, navigate, threads, logout } = useApp();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const unreadMessagesCount = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  const primaryTabs = [
    { name: 'Home', route: '/dashboard' as const, icon: Home },
    { name: 'Four', route: '/find-your-four' as const, icon: Users2, isSpecial: true },
    { name: 'Build', route: '/build' as const, icon: Hammer },
    { name: 'Mentors', route: '/mentorship' as const, icon: GraduationCap },
    {
      name: 'Messages',
      route: '/messages' as const,
      icon: MessageSquare,
      badge: unreadMessagesCount,
    },
  ];

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#17102A]/95 backdrop-blur-lg border-t border-[#3A2E5C] px-2 py-1 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-14">
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              currentRoute === tab.route ||
              (tab.route === '/build' && (currentRoute === '/build-room' || currentRoute === '/challenges'));

            return (
              <button
                key={tab.name}
                onClick={() => {
                  setShowMoreMenu(false);
                  navigate(tab.route);
                }}
                className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors ${
                  isActive ? 'text-[#FFB547]' : 'text-[#A99CCB] hover:text-[#F3EEFF]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${tab.isSpecial && isActive ? 'scale-110' : ''}`} />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[#FFB547] text-[#17102A] text-[9px] font-bold rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-tight mt-0.5">{tab.name}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#FFB547] mt-0.5" />
                )}
              </button>
            );
          })}

          {/* More trigger */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors ${
              showMoreMenu ? 'text-[#FFB547]' : 'text-[#A99CCB] hover:text-[#F3EEFF]'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* More Drawer Sheet */}
      {showMoreMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end">
          <div
            className="absolute inset-0"
            onClick={() => setShowMoreMenu(false)}
          />
          <div className="relative bg-[#1E1537] border-t border-[#3A2E5C] rounded-t-2xl p-4 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#3A2E5C]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F3EEFF]">
                More Navigation
              </span>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1 rounded-lg text-[#A99CCB] hover:text-[#F3EEFF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => {
                  navigate('/discover');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22183B] border border-[#3A2E5C] text-[#F3EEFF]"
              >
                <Compass className="w-4 h-4 text-[#38BDF8]" />
                <span>Discover</span>
              </button>

              <button
                onClick={() => {
                  navigate('/connections');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22183B] border border-[#3A2E5C] text-[#F3EEFF]"
              >
                <Users2 className="w-4 h-4 text-[#2DD4BF]" />
                <span>Connections</span>
              </button>

              <button
                onClick={() => {
                  navigate('/careers');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22183B] border border-[#3A2E5C] text-[#F3EEFF]"
              >
                <Briefcase className="w-4 h-4 text-[#FBBF24]" />
                <span>Careers</span>
              </button>

              <button
                onClick={() => {
                  navigate('/circles');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22183B] border border-[#3A2E5C] text-[#F3EEFF]"
              >
                <Layers className="w-4 h-4 text-[#F472B6]" />
                <span>Circles</span>
              </button>

              <button
                onClick={() => {
                  navigate('/profile');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22183B] border border-[#3A2E5C] text-[#F3EEFF]"
              >
                <User className="w-4 h-4 text-[#A99CCB]" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  navigate('/settings');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22183B] border border-[#3A2E5C] text-[#F3EEFF]"
              >
                <Settings className="w-4 h-4 text-[#A99CCB]" />
                <span>Settings</span>
              </button>

              <button
                onClick={() => {
                  navigate('/admin');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22183B] border border-[#3A2E5C] text-[#F3EEFF]"
              >
                <Shield className="w-4 h-4 text-[#2DD4BF]" />
                <span>Admin</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22183B] border border-red-500/30 text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
