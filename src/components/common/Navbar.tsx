import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, ArrowRight, Sun, Moon, Languages } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { navigate, currentRoute, isAuthenticated, logout, settings, toggleTheme, toggleLanguage, t } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getLanguageLabel = () => {
    switch (settings.language) {
      case 'te':
        return 'తెలుగు';
      case 'ta':
        return 'தமிழ்';
      default:
        return 'EN';
    }
  };

  const scrollToSection = (id: string) => {
    if (currentRoute !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#F3EDE3]/90 border-b border-[#DCD1C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#805536] border border-[#805536] flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-sm">
            <span className="font-heading font-black text-lg tracking-tighter">N</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg tracking-wider text-[#29251F]">
                NIGHTCLUB
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#805536] animate-pulse" />
            </div>
            <span className="text-[10px] text-[#665E54] -mt-1 tracking-tight font-medium">Telugu AI Network</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#665E54]">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-[#29251F] transition-colors"
          >
            {t('nav_howItWorks')}
          </button>
          <button
            onClick={() => scrollToSection('complementary')}
            className="hover:text-[#29251F] transition-colors"
          >
            {t('nav_whyComplementary')}
          </button>
          <button
            onClick={() => scrollToSection('mentorship-preview')}
            className="hover:text-[#29251F] transition-colors"
          >
            {t('nav_mentorship')}
          </button>
          <button
            onClick={() => navigate('/pricing')}
            className={`hover:text-[#29251F] transition-colors ${
              currentRoute === '/pricing' ? 'text-[#805536] font-semibold' : ''
            }`}
          >
            {t('nav_pricing')}
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-[#29251F] transition-colors"
          >
            {t('nav_faq')}
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Public Language Switch */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#DCD1C0] text-xs font-semibold text-[#29251F] hover:border-[#805536] transition-colors shadow-sm"
            title={t('header_toggleLanguage')}
            aria-label={t('header_toggleLanguage')}
          >
            <Languages className="w-3.5 h-3.5 text-[#665E54]" />
            <span>{getLanguageLabel()}</span>
          </button>

          {/* Public Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#FFFFFF] border border-[#DCD1C0] text-[#665E54] hover:text-[#29251F] hover:border-[#805536] transition-colors shadow-sm"
            title={
              settings.theme === 'dark'
                ? t('header_switchLight')
                : t('header_switchDark')
            }
            aria-label="Toggle visual theme"
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#805536]" />
            ) : (
              <Moon className="w-4 h-4 text-[#805536]" />
            )}
          </button>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className="nc-button-secondary text-sm py-2 px-4"
              >
                {t('nav_dashboard')}
              </button>
              <button
                onClick={logout}
                className="text-xs text-[#665E54] hover:text-[#29251F] px-2 py-1 transition-colors"
              >
                {t('nav_logout')}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-[#665E54] hover:text-[#29251F] px-3 py-2 transition-colors"
              >
                {t('nav_login')}
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="nc-button-primary text-sm py-2 px-4"
              >
                <span>{t('nav_joinNightclub')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Switch */}
          <button
            onClick={toggleLanguage}
            className="px-2 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#DCD1C0] text-[11px] font-bold text-[#29251F]"
            title={t('header_toggleLanguage')}
          >
            {getLanguageLabel()}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#DCD1C0] text-[#665E54] hover:text-[#29251F]"
            title={
              settings.theme === 'dark'
                ? t('header_switchLight')
                : t('header_switchDark')
            }
            aria-label="Toggle visual theme"
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#805536]" />
            ) : (
              <Moon className="w-4 h-4 text-[#805536]" />
            )}
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs font-semibold bg-[#805536] text-white px-2.5 py-1.5 rounded-lg shadow-sm"
            >
              App
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#665E54] hover:text-[#29251F]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[#DCD1C0] bg-[#FFFFFF] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm text-[#665E54] hover:text-[#29251F]"
          >
            {t('nav_howItWorks')}
          </button>
          <button
            onClick={() => scrollToSection('complementary')}
            className="block w-full text-left py-2 text-sm text-[#665E54] hover:text-[#29251F]"
          >
            {t('nav_whyComplementary')}
          </button>
          <button
            onClick={() => scrollToSection('mentorship-preview')}
            className="block w-full text-left py-2 text-sm text-[#665E54] hover:text-[#29251F]"
          >
            {t('nav_mentorship')}
          </button>
          <button
            onClick={() => {
              navigate('/pricing');
              setMobileOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-[#665E54] hover:text-[#29251F]"
          >
            {t('nav_pricing')}
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm text-[#665E54] hover:text-[#29251F]"
          >
            {t('nav_faq')}
          </button>

          <div className="pt-3 border-t border-[#DCD1C0] flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileOpen(false);
                  }}
                  className="w-full nc-button-primary text-sm py-2.5"
                >
                  {t('nav_dashboard')}
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-xs text-[#665E54] py-2 text-center"
                >
                  {t('nav_logout')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setMobileOpen(false);
                  }}
                  className="w-full nc-button-secondary text-sm py-2.5"
                >
                  {t('nav_login')}
                </button>
                <button
                  onClick={() => {
                    navigate('/pricing');
                    setMobileOpen(false);
                  }}
                  className="w-full nc-button-primary text-sm py-2.5"
                >
                  <span>{t('nav_joinNightclub')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
