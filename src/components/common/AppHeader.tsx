import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Search,
  Sparkles,
  Languages,
  Moon,
  Sun,
} from 'lucide-react';

export const AppHeader: React.FC = () => {
  const {
    currentUser,
    mentorCredits,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
    navigate,
    settings,
    toggleLanguage,
    toggleTheme,
  } = useApp();

  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/discover', { query: searchQuery.trim() });
    }
  };

  return (
    <header className="h-16 px-4 lg:px-8 border-b border-[#DCD1C0] bg-[#F3EDE3]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md hidden sm:block">
        <Search className="w-4 h-4 text-[#8C8173] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Telugu builders, skills, circles, projects..."
          className="w-full bg-[#FFFFFF] border border-[#DCD1C0] rounded-xl pl-9 pr-4 py-2 text-xs text-[#29251F] placeholder-[#8C8173] focus:border-[#805536] focus:outline-none transition-colors shadow-sm"
        />
      </form>

      {/* Brand logo for mobile only */}
      <div
        onClick={() => navigate('/dashboard')}
        className="sm:hidden flex items-center gap-2 cursor-pointer"
      >
        <div className="w-7 h-7 rounded-lg bg-[#805536] border border-[#805536] flex items-center justify-center text-white font-bold text-xs shadow-sm">
          N
        </div>
        <span className="font-heading font-bold text-sm tracking-wide text-[#29251F]">
          NIGHTCLUB
        </span>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Language switch */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#DCD1C0] text-xs text-[#29251F] hover:border-[#805536] transition-colors shadow-sm"
          title="Toggle Language"
        >
          <Languages className="w-3.5 h-3.5 text-[#665E54]" />
          <span className="font-medium">{settings.language === 'en' ? 'EN' : 'తెలుగు'}</span>
        </button>

        {/* Theme mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-[#FFFFFF] border border-[#DCD1C0] text-[#665E54] hover:text-[#29251F] hover:border-[#805536] transition-colors shadow-sm"
          title={`Theme: ${settings.theme}`}
        >
          <Moon className="w-3.5 h-3.5 text-[#805536]" />
        </button>

        {/* Mentor Credits badge */}
        <button
          onClick={() => navigate('/mentorship')}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#DCD1C0] hover:border-[#805536] transition-colors shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#805536]" />
          <span className="text-xs text-[#665E54]">
            Credits:{' '}
            <strong className="text-[#29251F] font-semibold">
              {mentorCredits.remaining}/{mentorCredits.total}
            </strong>
          </span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
            className="relative p-2 rounded-lg bg-[#FFFFFF] border border-[#DCD1C0] text-[#665E54] hover:text-[#29251F] hover:border-[#805536] transition-colors shadow-sm"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#805536] text-white text-[10px] font-bold flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {showNotificationsDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl shadow-card-hover overflow-hidden z-50">
              <div className="p-3 border-b border-[#DCD1C0] flex items-center justify-between bg-[#F3EDE3]">
                <span className="text-xs font-semibold text-[#29251F]">Notifications</span>
                {unreadNotificationCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-[#805536] font-medium hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#DCD1C0]">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationRead(notif.id);
                      setShowNotificationsDropdown(false);
                      navigate(notif.linkRoute as any);
                    }}
                    className={`p-3 text-xs cursor-pointer hover:bg-[#F3EDE3] transition-colors ${
                      !notif.read ? 'bg-[#E7DCCB]/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-[#29251F] leading-snug">{notif.title}</p>
                      {!notif.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#805536] shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#665E54] mt-1 line-clamp-2">
                      {notif.description}
                    </p>
                    <span className="text-[10px] text-[#8C8173] mt-1.5 block">{notif.time}</span>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-[#DCD1C0] bg-[#F3EDE3] text-center">
                <button
                  onClick={() => {
                    setShowNotificationsDropdown(false);
                    navigate('/notifications');
                  }}
                  className="text-xs text-[#805536] hover:underline font-semibold"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Pill */}
        <div
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 cursor-pointer p-0.5 rounded-full border border-[#DCD1C0] hover:border-[#805536] transition-colors"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-7 h-7 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
