import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { navigate, currentRoute, isAuthenticated, logout } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#17102A]/85 border-b border-[#3A2E5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#22183B] border border-[#FFB547]/40 flex items-center justify-center text-[#FFB547] group-hover:scale-105 transition-transform shadow-glow-accent">
            <span className="font-heading font-black text-lg tracking-tighter">N</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg tracking-wider text-[#F3EEFF]">
                NIGHTCLUB
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB547] animate-pulse" />
            </div>
            <span className="text-[10px] text-[#A99CCB] -mt-1 tracking-tight">Telugu AI Network</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A99CCB]">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-[#F3EEFF] transition-colors"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection('complementary')}
            className="hover:text-[#F3EEFF] transition-colors"
          >
            Why complementary
          </button>
          <button
            onClick={() => scrollToSection('mentorship-preview')}
            className="hover:text-[#F3EEFF] transition-colors"
          >
            Mentorship
          </button>
          <button
            onClick={() => navigate('/pricing')}
            className={`hover:text-[#F3EEFF] transition-colors ${
              currentRoute === '/pricing' ? 'text-[#FFB547]' : ''
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-[#F3EEFF] transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className="nc-button-secondary text-sm py-2 px-4"
              >
                Go to Dashboard
              </button>
              <button
                onClick={logout}
                className="text-xs text-[#A99CCB] hover:text-[#F3EEFF] px-2 py-1"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-[#F3EEFF] hover:text-[#FFB547] px-3 py-2 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="nc-button-primary text-sm py-2 px-4"
              >
                <span>Join Nightclub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && (
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs font-semibold bg-[#FFB547] text-[#17102A] px-2.5 py-1.5 rounded-lg"
            >
              App
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#A99CCB] hover:text-[#F3EEFF]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[#3A2E5C] bg-[#17102A] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 text-sm text-[#A99CCB] hover:text-[#F3EEFF]"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection('complementary')}
            className="block w-full text-left py-2 text-sm text-[#A99CCB] hover:text-[#F3EEFF]"
          >
            Why complementary
          </button>
          <button
            onClick={() => scrollToSection('mentorship-preview')}
            className="block w-full text-left py-2 text-sm text-[#A99CCB] hover:text-[#F3EEFF]"
          >
            Mentorship
          </button>
          <button
            onClick={() => {
              navigate('/pricing');
              setMobileOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-[#A99CCB] hover:text-[#F3EEFF]"
          >
            Pricing & Membership
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm text-[#A99CCB] hover:text-[#F3EEFF]"
          >
            FAQ
          </button>

          <div className="pt-3 border-t border-[#3A2E5C] flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setMobileOpen(false);
                  }}
                  className="w-full nc-button-primary text-sm py-2.5"
                >
                  Enter App Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-xs text-[#A99CCB] py-2 text-center"
                >
                  Log out
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
                  Log in
                </button>
                <button
                  onClick={() => {
                    navigate('/pricing');
                    setMobileOpen(false);
                  }}
                  className="w-full nc-button-primary text-sm py-2.5"
                >
                  Join Nightclub
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
