import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Search,
  Sparkles,
  Languages,
  Moon,
  Sun,
  Shield,
  CheckCircle,
  ExternalLink,
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
    <header className="h-16 px-4 lg:px-8 border-b border-[#3A2E5C] bg-[#17102A]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md hidden sm:block">
        <Search className="w-4 h-4 text-[#A99CCB] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Telugu builders, skills, circles, projects..."
          className="w-full bg-[#22183B] border border-[#3A2E5C] rounded-xl pl-9 pr-4 py-2 text-xs text-[#F3EEFF] placeholder-[#A99CCB] focus:border-[#FFB547] focus:outline-none transition-colors"
        />
      </form>

      {/* Brand logo for mobile only */}
      <div
        onClick={() => navigate('/dashboard')}
        className="sm:hidden flex items-center gap-2 cursor-pointer"
      >
        <div className="w-7 h-7 rounded-lg bg-[#22183B] border border-[#FFB547]/50 flex items-center justify-center text-[#FFB547] font-bold text-xs">
          N
        </div>
        <span className="font-heading font-bold text-sm tracking-wide text-[#F3EEFF]">
          NIGHTCLUB
        </span>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Language switch */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#22183B] border border-[#3A2E5C] text-xs text-[#A99CCB] hover:text-[#F3EEFF] transition-colors"
          title="Toggle Language"
        >
          <Languages className="w-3.5 h-3.5 text-[#FFB547]" />
          <span className="font-medium">{settings.language === 'en' ? 'EN' : 'తెలుగు'}</span>
        </button>

        {/* Theme mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-[#22183B] border border-[#3A2E5C] text-[#A99CCB] hover:text-[#F3EEFF] transition-colors"
          title={`Theme: ${settings.theme}`}
        >
          {settings.theme === 'light' ? (
            <Sun className="w-3.5 h-3.5 text-[#FFB547]" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-[#FFB547]" />
          )}
        </button>

        {/* Mentor Credits badge */}
        <button
          onClick={() => navigate('/mentorship')}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#22183B] border border-[#3A2E5C] hover:border-[#FFB547]/40 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFB547]" />
          <span className="text-xs text-[#A99CCB]">
            Credits:{' '}
            <strong className="text-[#FFB547] font-semibold">
              {mentorCredits.remaining}/{mentorCredits.total}
            </strong>
          </span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
            className="relative p-2 rounded-lg bg-[#22183B] border border-[#3A2E5C] text-[#A99CCB] hover:text-[#F3EEFF] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFB547] text-[#17102A] text-[10px] font-bold flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {showNotificationsDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#1F1735] border border-[#3A2E5C] rounded-2xl shadow-glow-card overflow-hidden z-50">
              <div className="p-3 border-b border-[#3A2E5C] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F3EEFF]">Notifications</span>
                {unreadNotificationCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-[#FFB547] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#3A2E5C]/50">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      markNotificationRead(notif.id);
                      setShowNotificationsDropdown(false);
                      navigate(notif.linkRoute as any);
                    }}
                    className={`p-3 text-xs cursor-pointer hover:bg-[#2B1E4A] transition-colors ${
                      !notif.read ? 'bg-[#22183B]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-[#F3EEFF] leading-snug">{notif.title}</p>
                      {!notif.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB547] shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#A99CCB] mt-1 line-clamp-2">
                      {notif.description}
                    </p>
                    <span className="text-[10px] text-[#7C6F9B] mt-1.5 block">{notif.time}</span>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-[#3A2E5C] bg-[#17102A] text-center">
                <button
                  onClick={() => {
                    setShowNotificationsDropdown(false);
                    navigate('/notifications');
                  }}
                  className="text-xs text-[#FFB547] hover:underline font-medium"
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
          className="flex items-center gap-2 cursor-pointer p-1 rounded-full border border-[#3A2E5C] hover:border-[#FFB547]/50 transition-colors"
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
