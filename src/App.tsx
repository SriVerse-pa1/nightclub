import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { AppHeader } from './components/common/AppHeader';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { LandingPage } from './pages/landing/LandingPage';
import { PricingPage } from './pages/pricing/PricingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { PaymentResultPage } from './pages/checkout/PaymentResultPage';
import { OnboardingWizard } from './pages/onboarding/OnboardingWizard';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { FindYourFourPage } from './pages/findYourFour/FindYourFourPage';
import { DiscoverPage } from './pages/discover/DiscoverPage';
import { ConnectionsPage } from './pages/connections/ConnectionsPage';
import { MessagesPage } from './pages/messages/MessagesPage';
import { BuildOverviewPage } from './pages/build/BuildOverviewPage';
import { BuildRoomPage } from './pages/build/BuildRoomPage';
import { ChallengesPage } from './pages/build/ChallengesPage';
import { MentorshipPage } from './pages/mentorship/MentorshipPage';
import { CareersPage } from './pages/careers/CareersPage';
import { CirclesPage } from './pages/circles/CirclesPage';
import { MemberProfilePage } from './pages/profile/MemberProfilePage';
import { OwnProfilePage } from './pages/profile/OwnProfilePage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { SubscriptionStatePage } from './pages/subscription/SubscriptionStatePage';
import { AdminConsolePage } from './pages/admin/AdminConsolePage';
import { SystemPages } from './pages/system/SystemPages';

export const AppContent: React.FC = () => {
  const { currentRoute, settings } = useApp();

  // Public / Standalone Pages that render full screen without app sidebar
  const isStandalonePage = [
    '/',
    '/pricing',
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-email',
    '/checkout',
    '/payment-result',
    '/onboarding',
  ].includes(currentRoute);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
        return <LandingPage />;
      case '/pricing':
        return <PricingPage />;
      case '/login':
        return <LoginPage />;
      case '/signup':
        return <SignUpPage />;
      case '/forgot-password':
        return <ForgotPasswordPage />;
      case '/verify-email':
        return <VerifyEmailPage />;
      case '/checkout':
        return <CheckoutPage />;
      case '/payment-result':
        return <PaymentResultPage />;
      case '/onboarding':
        return <OnboardingWizard />;
      case '/dashboard':
        return <DashboardPage />;
      case '/find-your-four':
        return <FindYourFourPage />;
      case '/discover':
        return <DiscoverPage />;
      case '/connections':
        return <ConnectionsPage />;
      case '/messages':
        return <MessagesPage />;
      case '/build':
        return <BuildOverviewPage />;
      case '/build-room':
        return <BuildRoomPage />;
      case '/challenges':
        return <ChallengesPage />;
      case '/mentorship':
        return <MentorshipPage />;
      case '/careers':
        return <CareersPage />;
      case '/circles':
        return <CirclesPage />;
      case '/profile':
        return <OwnProfilePage />;
      case '/member-profile':
        return <MemberProfilePage />;
      case '/notifications':
        return <NotificationsPage />;
      case '/settings':
        return <SettingsPage />;
      case '/subscription-flow':
        return <SubscriptionStatePage />;
      case '/admin':
        return <AdminConsolePage />;
      case '/system-pages':
        return <SystemPages />;
      default:
        return <LandingPage />;
    }
  };

  // Premium warm luxury theme
  const themeClass = 'bg-[#F3EDE3] text-[#29251F] font-body selection:bg-[#805536]/15 selection:text-[#29251F]';

  if (isStandalonePage) {
    return (
      <div className={`min-h-screen ${themeClass}`}>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <main id="main-content" role="main" tabIndex={-1} className="outline-none">
          {renderCurrentPage()}
        </main>
        <ToastContainer />
      </div>
    );
  }

  // Core App Layout (Desktop: Sidebar left + Header top + Content; Mobile: Header top + Content + Bottom bar)
  return (
    <div className={`min-h-screen flex ${themeClass}`}>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Web Left Sidebar */}
      <Sidebar />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />

        <main id="main-content" role="main" tabIndex={-1} className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-8 outline-none">
          {renderCurrentPage()}
        </main>

        {/* Mobile Thumb Navigation Bar */}
        <MobileBottomBar />
      </div>

      <ToastContainer />
    </div>
  );
};
