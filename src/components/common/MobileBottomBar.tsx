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
  const { currentRoute, navigate, threads, logout, t } = useApp();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const unreadMessagesCount = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  const primaryTabs = [
    { name: t('nav_home'), route: '/dashboard' as const, icon: Home },
    { name: t('nav_findYourFour'), route: '/find-your-four' as const, icon: Users2, isSpecial: true },
    { name: t('nav_build'), route: '/build' as const, icon: Hammer },
    { name: t('nav_mentorship'), route: '/mentorship' as const, icon: GraduationCap },
    {
      name: t('nav_messages'),
      route: '/messages' as const,
      icon: MessageSquare,
      badge: unreadMessagesCount,
    },
  ];

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-lg border-t border-[#DCD1C0] px-2 py-1 safe-area-inset-bottom shadow-lg">
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
                  isActive ? 'text-[#805536]' : 'text-[#665E54] hover:text-[#29251F]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${tab.isSpecial && isActive ? 'scale-110' : ''}`} />
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[#805536] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold text-[#805536]' : 'font-medium'}`}>
                  {tab.name}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#805536] mt-0.5" />
                )}
              </button>
            );
          })}

          {/* More trigger */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors ${
              showMoreMenu ? 'text-[#805536]' : 'text-[#665E54] hover:text-[#29251F]'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* More Drawer Sheet */}
      {showMoreMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#29251F]/40 backdrop-blur-sm flex flex-col justify-end">
          <div
            className="absolute inset-0"
            onClick={() => setShowMoreMenu(false)}
          />
          <div className="relative bg-[#FFFFFF] border-t border-[#DCD1C0] rounded-t-2xl p-4 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#DCD1C0]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#29251F]">
                More Navigation
              </span>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1 rounded-lg text-[#665E54] hover:text-[#29251F]"
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
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F] hover:border-[#805536] transition-colors font-medium text-xs"
              >
                <Compass className="w-4 h-4 text-[#805536]" />
                <span>{t('nav_discover')}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/connections');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F] hover:border-[#805536] transition-colors font-medium text-xs"
              >
                <Users2 className="w-4 h-4 text-[#805536]" />
                <span>Connections</span>
              </button>

              <button
                onClick={() => {
                  navigate('/careers');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F] hover:border-[#805536] transition-colors font-medium text-xs"
              >
                <Briefcase className="w-4 h-4 text-[#805536]" />
                <span>{t('nav_careers')}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/circles');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F] hover:border-[#805536] transition-colors font-medium text-xs"
              >
                <Layers className="w-4 h-4 text-[#805536]" />
                <span>{t('nav_circles')}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/profile');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F] hover:border-[#805536] transition-colors font-medium text-xs"
              >
                <User className="w-4 h-4 text-[#805536]" />
                <span>{t('nav_profile')}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/settings');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F] hover:border-[#805536] transition-colors font-medium text-xs"
              >
                <Settings className="w-4 h-4 text-[#805536]" />
                <span>{t('nav_settings')}</span>
              </button>

              <button
                onClick={() => {
                  navigate('/admin');
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F3EDE3] border border-[#DCD1C0] text-[#29251F] hover:border-[#805536] transition-colors font-medium text-xs"
              >
                <Shield className="w-4 h-4 text-[#805536]" />
                <span>{t('nav_admin')}</span>
              </button>

              <button
                onClick={() => {
                  logout();
                  setShowMoreMenu(false);
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FFFFFF] border border-[#DCD1C0] text-[#665E54] hover:text-[#805536] hover:border-[#805536] transition-colors font-medium text-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>{t('nav_logout')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
