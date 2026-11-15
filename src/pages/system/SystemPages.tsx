import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  WifiOff,
  ServerCrash,
  Hammer,
  RefreshCw,
  Lock,
  ArrowRight,
  Home,
} from 'lucide-react';

export const SystemPages: React.FC = () => {
  const { navigate, showToast } = useApp();

  const [activeSystemView, setActiveSystemView] = useState<
    '404' | 'offline' | '500' | 'maintenance' | 'update' | 'permission'
  >('404');

  const configs = {
    '404': {
      code: '404',
      title: 'Page Not Found',
      icon: HelpCircle,
      iconColor: 'text-[#FFB547]',
      message: 'The page or team room you were trying to access does not exist or has been relocated.',
      actionText: 'Return to Dashboard',
      action: () => navigate('/dashboard'),
    },
    offline: {
      code: 'Offline',
      title: 'No Internet Connection',
      icon: WifiOff,
      iconColor: 'text-[#38BDF8]',
      message: 'Your device appears to have lost connection to the network. Build Room changes will sync automatically once you are back online.',
      actionText: 'Check Connection',
      action: () => showToast('Rechecking network socket...', 'info'),
    },
    '500': {
      code: '500',
      title: 'Server Error',
      icon: ServerCrash,
      iconColor: 'text-rose-400',
      message: 'Our matching cluster encountered an unexpected state. Our engineers have been alerted and are on it.',
      actionText: 'Retry Request',
      action: () => showToast('Retrying server connection...', 'info'),
    },
    maintenance: {
      code: 'Maintenance',
      title: 'Scheduled System Upgrade',
      icon: Hammer,
      iconColor: 'text-[#2DD4BF]',
      message: 'We are rolling out quarterly algorithm weights and low-resource Telugu vocabulary tokens. Normal operations resume at 04:00 AM IST.',
      actionText: 'Check Service Status',
      action: () => showToast('All systems scheduled to resume on time.', 'info'),
    },
    update: {
      code: 'App Update',
      title: 'New Version Available',
      icon: RefreshCw,
      iconColor: 'text-[#FFB547]',
      message: 'A newer, faster version of the Nightclub builder client is available with enhanced WebSockets.',
      actionText: 'Reload Nightclub',
      action: () => window.location.reload(),
    },
    permission: {
      code: 'Access Restricted',
      title: 'Permission Required',
      icon: Lock,
      iconColor: 'text-amber-400',
      message: 'This module is restricted to verified founding cohort members or project team owners.',
      actionText: 'Back to Safety',
      action: () => navigate('/dashboard'),
    },
  };

  const current = configs[activeSystemView];
  const Icon = current.icon;

  return (
    <div className="space-y-6 pb-16 max-w-2xl mx-auto">
      {/* State Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#3A2E5C] text-xs">
        {(['404', 'offline', '500', 'maintenance', 'update', 'permission'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setActiveSystemView(view)}
            className={`px-3 py-1.5 rounded-xl uppercase text-[11px] font-bold tracking-wider transition-all whitespace-nowrap ${
              activeSystemView === view
                ? 'bg-[#FFB547] text-[#17102A]'
                : 'bg-[#22183B] text-[#A99CCB] border border-[#3A2E5C]'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Screen Card */}
      <div className="bg-[#1C1431] border border-[#3A2E5C] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-glow-card">
        <div className={`w-16 h-16 rounded-2xl bg-[#17102A] border border-[#3A2E5C] flex items-center justify-center mx-auto ${current.iconColor}`}>
          <Icon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#7C6F9B]">
            Status: {current.code}
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
            {current.title}
          </h1>
          <p className="text-xs text-[#A99CCB] max-w-md mx-auto leading-relaxed">
            {current.message}
          </p>
        </div>

        <button
          onClick={current.action}
          className="nc-button-primary py-3 px-6 text-xs font-semibold shadow-glow-accent mx-auto"
        >
          <span>{current.actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
