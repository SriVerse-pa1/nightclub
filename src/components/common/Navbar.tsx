import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, ArrowRight } from 'lucide-react';

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
            How it works
          </button>
          <button
            onClick={() => scrollToSection('complementary')}
            className="hover:text-[#29251F] transition-colors"
          >
            Why complementary
          </button>
          <button
            onClick={() => scrollToSection('mentorship-preview')}
            className="hover:text-[#29251F] transition-colors"
          >
            Mentorship
          </button>
          <button
            onClick={() => navigate('/pricing')}
            className={`hover:text-[#29251F] transition-colors ${
              currentRoute === '/pricing' ? 'text-[#805536] font-semibold' : ''
            }`}
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-[#29251F] transition-colors"
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
                className="text-xs text-[#665E54] hover:text-[#29251F] px-2 py-1 transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-[#665E54] hover:text-[#29251F] px-3 py-2 transition-colors"
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
            How it works
          </button>
          <button
            onClick={() => scrollToSection('complementary')}
            className="block w-full text-left py-2 text-sm text-[#665E54] hover:text-[#29251F]"
          >
            Why complementary
          </button>
          <button
            onClick={() => scrollToSection('mentorship-preview')}
            className="block w-full text-left py-2 text-sm text-[#665E54] hover:text-[#29251F]"
          >
            Mentorship
          </button>
          <button
            onClick={() => {
              navigate('/pricing');
              setMobileOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-[#665E54] hover:text-[#29251F]"
          >
            Pricing & Membership
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left py-2 text-sm text-[#665E54] hover:text-[#29251F]"
          >
            FAQ
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
                  Enter App Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-xs text-[#665E54] py-2 text-center"
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
