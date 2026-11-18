import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Bell,
  Shield,
  Ban,
  Languages,
  CreditCard,
  Trash2,
  Download,
  Sun,
  Moon,
  Check,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    currentUser,
    navigate,
    showToast,
    setLanguage,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'account' | 'notifications' | 'privacy' | 'blocked' | 'language' | 'billing' | 'data'
  >('account');

  const [notifState, setNotifState] = useState(settings.notifications);
  const [privacyState, setPrivacyState] = useState(settings.privacy);

  const handleSaveNotifs = () => {
    updateSettings({ notifications: notifState });
    showToast('Notification preferences saved.', 'success');
  };

  const handleSavePrivacy = () => {
    updateSettings({ privacy: privacyState });
    showToast('Privacy preferences saved.', 'success');
  };

  const handleExportData = () => {
    showToast('Your Nightclub builder JSON archive is prepared and downloading.', 'success');
  };

  const handleDeleteAccount = () => {
    showToast('Account scheduled for de-identification in accordance with DPDP regulations.', 'warning');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-[#DCD1C0]">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#29251F]">
          Account & App Settings
        </h1>
        <p className="text-xs text-[#665E54] mt-0.5">
          Configure notification alerts, language, membership billing, and privacy controls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Settings Sidebar (4 cols) */}
        <div className="md:col-span-4 bg-[#FFFFFF] border border-[#DCD1C0] rounded-2xl p-2.5 space-y-1 text-xs shadow-card">
          {[
            { id: 'account', label: t('settings_tabAccount'), icon: User },
            { id: 'notifications', label: t('settings_tabNotifications'), icon: Bell },
            { id: 'privacy', label: t('settings_tabPrivacy'), icon: Shield },
            { id: 'blocked', label: t('settings_tabBlocked'), icon: Ban },
            { id: 'language', label: t('settings_tabLanguage'), icon: Languages },
            { id: 'billing', label: t('settings_tabBilling'), icon: CreditCard },
            { id: 'data', label: t('settings_tabData'), icon: Trash2 },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                  isSelected
                    ? 'bg-[#805536] text-white font-bold shadow-sm'
                    : 'text-[#665E54] hover:text-[#29251F] hover:bg-[#F3EDE3]/70'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Body (8 cols) */}
        <div className="md:col-span-8 bg-[#FFFFFF] border border-[#DCD1C0] rounded-3xl p-6 sm:p-8 space-y-6 text-xs shadow-card">
          {/* TAB: ACCOUNT */}
          {activeTab === 'account' && (
            <div className="space-y-5">
              <h3 className="font-heading font-bold text-base text-[#29251F]">Account Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#665E54] mb-1 font-medium">Display Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full nc-input"
                  />
                </div>
                <div>
                  <label className="block text-[#665E54] mb-1 font-medium">Registered Email</label>
                  <input
                    type="email"
                    disabled
                    defaultValue="sai.venkata@example.com"
                    className="w-full nc-input opacity-60 cursor-not-allowed bg-[#F3EDE3]"
                  />
                  <span className="text-[10px] text-[#8C8173] mt-1 block">
                    Contact our support team to transfer primary billing email.
                  </span>
                </div>
                <div>
                  <label className="block text-[#665E54] mb-1 font-medium">Time Zone</label>
                  <input
                    type="text"
                    defaultValue="Asia/Kolkata (IST UTC+5:30)"
                    className="w-full nc-input"
                  />
                </div>
                <button
                  onClick={() => showToast('Account details saved.', 'success')}
                  className="nc-button-primary text-xs py-2 px-5"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-base text-[#29251F]">
                Notifications & Quiet Hours
              </h3>

              <div className="space-y-3 divide-y divide-[#DCD1C0]">
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="font-semibold text-[#29251F]">Direct Chat Messages</p>
                    <span className="text-[11px] text-[#665E54]">
                      Alerts when teammates message you
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifState.messages}
                    onChange={(e) =>
                      setNotifState({ ...notifState, messages: e.target.checked })
                    }
                    className="accent-[#805536] w-4 h-4 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div>
                    <p className="font-semibold text-[#29251F]">Find Your Four Introductions</p>
                    <span className="text-[11px] text-[#665E54]">
                      Notify me immediately when a new team constellation is formed
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifState.teamMatches}
                    onChange={(e) =>
                      setNotifState({ ...notifState, teamMatches: e.target.checked })
                    }
                    className="accent-[#805536] w-4 h-4 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div>
                    <p className="font-semibold text-[#29251F]">Mentor Session Reminders</p>
                    <span className="text-[11px] text-[#665E54]">
                      Alerts 1 hour and 15 minutes before 1-on-1 strategy calls
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifState.mentorshipReminders}
                    onChange={(e) =>
                      setNotifState({ ...notifState, mentorshipReminders: e.target.checked })
                    }
                    className="accent-[#805536] w-4 h-4 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Quiet Hours */}
              <div className="pt-4 border-t border-[#DCD1C0] space-y-3">
                <span className="font-bold text-[#29251F] uppercase text-[11px] tracking-wider">
                  Quiet Hours (Do Not Disturb)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#665E54] mb-1">Start Time</label>
                    <input
                      type="time"
                      value={notifState.quietHoursStart}
                      onChange={(e) =>
                        setNotifState({ ...notifState, quietHoursStart: e.target.value })
                      }
                      className="w-full nc-input"
                    />
                  </div>
                  <div>
                    <label className="block text-[#665E54] mb-1">End Time</label>
                    <input
                      type="time"
                      value={notifState.quietHoursEnd}
                      onChange={(e) =>
                        setNotifState({ ...notifState, quietHoursEnd: e.target.value })
                      }
                      className="w-full nc-input"
                    />
                  </div>
                </div>
              </div>

              <button onClick={handleSaveNotifs} className="nc-button-primary text-xs py-2 px-5">
                Save Preferences
              </button>
            </div>
          )}

          {/* TAB: PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <h3 className="font-heading font-bold text-base text-[#29251F]">
                Privacy & Visibility
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0]">
                  <div>
                    <p className="font-semibold text-[#29251F]">Appear in Member Discover</p>
                    <span className="text-[11px] text-[#665E54]">
                      Allow peers in Telugu AI community to discover your profile
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacyState.appearInDiscover}
                    onChange={(e) =>
                      setPrivacyState({ ...privacyState, appearInDiscover: e.target.checked })
                    }
                    className="accent-[#805536] w-4 h-4 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#F3EDE3] rounded-xl border border-[#DCD1C0]">
                  <div>
                    <p className="font-semibold text-[#29251F]">Show Available Weekly Hours</p>
                    <span className="text-[11px] text-[#665E54]">
                      Displays your 25 hrs/week building availability
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacyState.showAvailability}
                    onChange={(e) =>
                      setPrivacyState({ ...privacyState, showAvailability: e.target.checked })
                    }
                    className="accent-[#805536] w-4 h-4 rounded cursor-pointer"
                  />
                </div>

                <button onClick={handleSavePrivacy} className="nc-button-primary text-xs py-2 px-5">
                  Save Privacy Controls
                </button>
              </div>
            </div>
          )}

          {/* TAB: BLOCKED */}
          {activeTab === 'blocked' && (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-base text-[#29251F]">Blocked People</h3>
              <p className="text-[#665E54]">
                Blocked individuals cannot see your profile, send connection requests, or appear in
                your Find Your Four constellations.
              </p>
              <div className="p-8 text-center bg-[#F3EDE3] rounded-xl border border-[#DCD1C0] text-[#8C8173]">
                Your blocked list is currently empty.
              </div>
            </div>
          )}

          {/* TAB: LANGUAGE & THEME */}
          {activeTab === 'language' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-base text-[#29251F]">
                {t('settings_tabLanguage')}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#665E54] font-medium mb-1">{t('lang_title')}</label>
                  <p className="text-xs text-[#8C8173] mb-3">{t('lang_subtitle')}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setLanguage('en')}
                      className={`p-3.5 rounded-xl border text-center font-bold transition-all ${
                        settings.language === 'en'
                          ? 'border-[#805536] bg-[#805536] text-white shadow-sm ring-2 ring-[#805536]/20'
                          : 'border-[#DCD1C0] bg-[#FFFFFF] text-[#665E54] hover:text-[#29251F] hover:border-[#805536]'
                      }`}
                    >
                      <span className="block text-sm">English</span>
                      <span className="block text-[10px] opacity-80 font-normal mt-0.5">Global Builder Standard</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('te')}
                      className={`p-3.5 rounded-xl border text-center font-bold transition-all ${
                        settings.language === 'te'
                          ? 'border-[#805536] bg-[#805536] text-white shadow-sm ring-2 ring-[#805536]/20'
                          : 'border-[#DCD1C0] bg-[#FFFFFF] text-[#665E54] hover:text-[#29251F] hover:border-[#805536]'
                      }`}
                    >
                      <span className="block text-sm">తెలుగు</span>
                      <span className="block text-[10px] opacity-80 font-normal mt-0.5">Telugu AI Cohort</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLanguage('ta')}
                      className={`p-3.5 rounded-xl border text-center font-bold transition-all ${
                        settings.language === 'ta'
                          ? 'border-[#805536] bg-[#805536] text-white shadow-sm ring-2 ring-[#805536]/20'
                          : 'border-[#DCD1C0] bg-[#FFFFFF] text-[#665E54] hover:text-[#29251F] hover:border-[#805536]'
                      }`}
                    >
                      <span className="block text-sm">தமிழ்</span>
                      <span className="block text-[10px] opacity-80 font-normal mt-0.5">Tamil Builder Network</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCD1C0]">
                  <label className="block text-[#665E54] font-medium mb-1">{t('theme_title')}</label>
                  <p className="text-xs text-[#8C8173] mb-3">
                    {t('theme_subtitle')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Warm Luxury Light Card */}
                    <button
                      type="button"
                      onClick={() => updateSettings({ theme: 'light' })}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        settings.theme !== 'dark'
                          ? 'border-[#805536] bg-[#FFFFFF] shadow-md ring-2 ring-[#805536]/20'
                          : 'border-[#DCD1C0] bg-[#FFFFFF] hover:border-[#805536]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#F3EDE3] border border-[#DCD1C0] flex items-center justify-center text-[#805536]">
                            <Sun className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-sm text-[#29251F]">{t('theme_warmLuxury')}</span>
                        </div>
                        {settings.theme !== 'dark' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#805536] font-semibold bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25">
                            <Check className="w-3 h-3" /> {t('theme_active')}
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#8C8173]">{t('theme_default')}</span>
                        )}
                      </div>
                      <p className="text-[#665E54] text-xs leading-relaxed mb-3">
                        {t('theme_warmLuxuryDesc')}
                      </p>
                      {/* Color Swatch Preview */}
                      <div className="flex items-center gap-1.5 pt-2 border-t border-[#DCD1C0]">
                        <div className="w-4 h-4 rounded-full bg-[#F3EDE3] border border-[#DCD1C0]" title="#F3EDE3 Canvas" />
                        <div className="w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#DCD1C0]" title="#FFFFFF Surface" />
                        <div className="w-4 h-4 rounded-full bg-[#805536]" title="#805536 Terracotta" />
                        <div className="w-4 h-4 rounded-full bg-[#29251F]" title="#29251F Text" />
                        <span className="text-[10px] text-[#8C8173] ml-auto">Ivory & Linen</span>
                      </div>
                    </button>

                    {/* Premium Midnight Dark Card */}
                    <button
                      type="button"
                      onClick={() => updateSettings({ theme: 'dark' })}
                      className={`text-left p-4 rounded-2xl border transition-all ${
                        settings.theme === 'dark'
                          ? 'border-[#805536] bg-[#1E1A17] shadow-md ring-2 ring-[#805536]/20'
                          : 'border-[#DCD1C0] bg-[#1E1A17] hover:border-[#805536]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#161311] border border-[#362F29] flex items-center justify-center text-[#805536]">
                            <Moon className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-bold text-sm text-[#F7F2EE]">{t('theme_premiumMidnight')}</span>
                        </div>
                        {settings.theme === 'dark' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-[#805536] font-semibold bg-[#805536]/20 px-2 py-0.5 rounded border border-[#805536]/40">
                            <Check className="w-3 h-3" /> {t('theme_active')}
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#8A7E73]">{t('theme_companion')}</span>
                        )}
                      </div>
                      <p className="text-[#BDB1A6] text-xs leading-relaxed mb-3">
                        {t('theme_premiumMidnightDesc')}
                      </p>
                      {/* Color Swatch Preview */}
                      <div className="flex items-center gap-1.5 pt-2 border-t border-[#362F29]">
                        <div className="w-4 h-4 rounded-full bg-[#161311] border border-[#362F29]" title="#161311 Canvas" />
                        <div className="w-4 h-4 rounded-full bg-[#1E1A17] border border-[#362F29]" title="#1E1A17 Surface" />
                        <div className="w-4 h-4 rounded-full bg-[#805536]" title="#805536 Terracotta" />
                        <div className="w-4 h-4 rounded-full bg-[#F7F2EE]" title="#F7F2EE Text" />
                        <span className="text-[10px] text-[#8A7E73] ml-auto">Warm Obsidian</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-base text-[#29251F]">
                Subscription & Invoices
              </h3>

              <div className="p-4 rounded-2xl bg-[#F3EDE3] border border-[#DCD1C0] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#29251F]">Founding Builder Membership</span>
                  <span className="text-[#805536] font-semibold bg-[#805536]/10 px-2 py-0.5 rounded border border-[#805536]/25 text-[10px]">Active</span>
                </div>
                <p className="text-[#665E54]">₹1,499 per month • Renews on 1st of next month</p>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => navigate('/subscription-flow')}
                    className="text-xs text-[#805536] hover:underline font-semibold"
                  >
                    Pause or Cancel Membership →
                  </button>
                </div>
              </div>

              {/* Invoices */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-[#29251F] text-xs uppercase">Billing History</span>
                <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#DCD1C0] flex items-center justify-between text-xs shadow-sm">
                  <div>
                    <span className="font-semibold text-[#29251F]">Current Month Intake</span>
                    <p className="text-[10px] text-[#8C8173]">Invoice #NC-8921 • UPI Paid</p>
                  </div>
                  <button
                    onClick={() => showToast('Invoice PDF downloaded.', 'info')}
                    className="text-[#805536] hover:underline font-semibold"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DATA & DANGER ZONE */}
          {activeTab === 'data' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-base text-[#29251F]">
                Data Privacy & Account Removal
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-[#F3EDE3] border border-[#DCD1C0] rounded-2xl space-y-2">
                  <h4 className="font-bold text-[#29251F]">Export Your Builder Data</h4>
                  <p className="text-[#665E54]">
                    Download a copy of your matching profile, chat history, and Builder Journey
                    timeline in JSON format.
                  </p>
                  <button
                    onClick={handleExportData}
                    className="nc-button-secondary text-xs py-2 px-4"
                  >
                    <Download className="w-3.5 h-3.5 text-[#805536]" />
                    <span>Export JSON Archive</span>
                  </button>
                </div>

                <div className="p-4 bg-[#F3EDE3] border border-[#DCD1C0] rounded-2xl space-y-2">
                  <h4 className="font-bold text-[#29251F]">Delete Account & Leave Cohort</h4>
                  <p className="text-xs text-[#665E54]">
                    This action permanently deletes your persona from the matching graph. You will
                    lose all remaining mentor credits and access to active Build Rooms.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    className="nc-button-secondary py-2 px-4 text-xs flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:border-red-300 border-[#DCD1C0]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Account Permanently</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
