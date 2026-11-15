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
  Moon,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    currentUser,
    toggleTheme,
    toggleLanguage,
    navigate,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'account' | 'notifications' | 'privacy' | 'blocked' | 'language' | 'billing' | 'data'
  >('account');

  const [notifState, setNotifState] = useState(settings.notifications);
  const [privacyState, setPrivacyState] = useState(settings.privacy);

  const handleSaveNotifs = () => {
    updateSettings({ notifications: notifState });
  };

  const handleSavePrivacy = () => {
    updateSettings({ privacy: privacyState });
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
      <div className="pb-4 border-b border-[#3A2E5C]">
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F3EEFF]">
          Account & App Settings
        </h1>
        <p className="text-xs text-[#A99CCB] mt-0.5">
          Configure notification alerts, language, membership billing, and privacy controls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Settings Sidebar (4 cols) */}
        <div className="md:col-span-4 bg-[#1C1431] border border-[#3A2E5C] rounded-2xl p-2.5 space-y-1 text-xs">
          {[
            { id: 'account', label: 'Account Profile', icon: User },
            { id: 'notifications', label: 'Notifications & Quiet Hours', icon: Bell },
            { id: 'privacy', label: 'Privacy & Visibility', icon: Shield },
            { id: 'blocked', label: 'Blocked People', icon: Ban },
            { id: 'language', label: 'Language & Theme', icon: Languages },
            { id: 'billing', label: 'Subscription & Billing', icon: CreditCard },
            { id: 'data', label: 'Data & Deletion', icon: Trash2 },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                  isSelected
                    ? 'bg-[#FFB547] text-[#17102A] font-bold shadow-sm'
                    : 'text-[#A99CCB] hover:text-[#F3EEFF] hover:bg-[#22183B]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Body (8 cols) */}
        <div className="md:col-span-8 bg-[#22183B] border border-[#3A2E5C] rounded-3xl p-6 sm:p-8 space-y-6 text-xs">
          {/* TAB: ACCOUNT */}
          {activeTab === 'account' && (
            <div className="space-y-5">
              <h3 className="font-heading font-bold text-base text-[#F3EEFF]">Account Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#A99CCB] mb-1 font-medium">Display Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full nc-input"
                  />
                </div>
                <div>
                  <label className="block text-[#A99CCB] mb-1 font-medium">Registered Email</label>
                  <input
                    type="email"
                    disabled
                    defaultValue="sai.venkata@example.com"
                    className="w-full nc-input opacity-60 cursor-not-allowed"
                  />
                  <span className="text-[10px] text-[#7C6F9B] mt-1 block">
                    Contact our support team to transfer primary billing email.
                  </span>
                </div>
                <div>
                  <label className="block text-[#A99CCB] mb-1 font-medium">Time Zone</label>
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
              <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
                Notifications & Quiet Hours
              </h3>

              <div className="space-y-3 divide-y divide-[#3A2E5C]/60">
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="font-semibold text-[#F3EEFF]">Direct Chat Messages</p>
                    <span className="text-[11px] text-[#A99CCB]">
                      Alerts when teammates message you
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifState.messages}
                    onChange={(e) =>
                      setNotifState({ ...notifState, messages: e.target.checked })
                    }
                    className="accent-[#FFB547] w-4 h-4 rounded"
                  />
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div>
                    <p className="font-semibold text-[#F3EEFF]">Find Your Four Introductions</p>
                    <span className="text-[11px] text-[#A99CCB]">
                      Notify me immediately when a new team constellation is formed
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifState.teamMatches}
                    onChange={(e) =>
                      setNotifState({ ...notifState, teamMatches: e.target.checked })
                    }
                    className="accent-[#FFB547] w-4 h-4 rounded"
                  />
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div>
                    <p className="font-semibold text-[#F3EEFF]">Mentor Session Reminders</p>
                    <span className="text-[11px] text-[#A99CCB]">
                      Alerts 1 hour and 15 minutes before 1-on-1 strategy calls
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifState.mentorshipReminders}
                    onChange={(e) =>
                      setNotifState({ ...notifState, mentorshipReminders: e.target.checked })
                    }
                    className="accent-[#FFB547] w-4 h-4 rounded"
                  />
                </div>
              </div>

              {/* Quiet Hours */}
              <div className="pt-4 border-t border-[#3A2E5C] space-y-3">
                <span className="font-bold text-[#FFB547] uppercase text-[11px]">
                  Quiet Hours (Do Not Disturb)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#A99CCB] mb-1">Start Time</label>
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
                    <label className="block text-[#A99CCB] mb-1">End Time</label>
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
              <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
                Privacy & Visibility
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-[#17102A] rounded-xl border border-[#3A2E5C]">
                  <div>
                    <p className="font-semibold text-[#F3EEFF]">Appear in Member Discover</p>
                    <span className="text-[11px] text-[#A99CCB]">
                      Allow peers in Telugu AI community to discover your profile
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacyState.appearInDiscover}
                    onChange={(e) =>
                      setPrivacyState({ ...privacyState, appearInDiscover: e.target.checked })
                    }
                    className="accent-[#FFB547] w-4 h-4 rounded"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#17102A] rounded-xl border border-[#3A2E5C]">
                  <div>
                    <p className="font-semibold text-[#F3EEFF]">Show Available Weekly Hours</p>
                    <span className="text-[11px] text-[#A99CCB]">
                      Displays your 25 hrs/week building availability
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacyState.showAvailability}
                    onChange={(e) =>
                      setPrivacyState({ ...privacyState, showAvailability: e.target.checked })
                    }
                    className="accent-[#FFB547] w-4 h-4 rounded"
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
              <h3 className="font-heading font-bold text-base text-[#F3EEFF]">Blocked People</h3>
              <p className="text-[#A99CCB]">
                Blocked individuals cannot see your profile, send connection requests, or appear in
                your Find Your Four constellations.
              </p>
              <div className="p-8 text-center bg-[#17102A] rounded-xl border border-[#3A2E5C] text-[#7C6F9B]">
                Your blocked list is currently empty.
              </div>
            </div>
          )}

          {/* TAB: LANGUAGE & THEME */}
          {activeTab === 'language' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
                Language & Appearance
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#A99CCB] font-medium mb-2">Display Language</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => updateSettings({ language: 'en' })}
                      className={`p-3 rounded-xl border text-center font-bold ${
                        settings.language === 'en'
                          ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#FFB547]'
                          : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB]'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSettings({ language: 'te' })}
                      className={`p-3 rounded-xl border text-center font-bold ${
                        settings.language === 'te'
                          ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#FFB547]'
                          : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB]'
                      }`}
                    >
                      తెలుగు (Telugu)
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3A2E5C]">
                  <label className="block text-[#A99CCB] font-medium mb-2">Visual Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => updateSettings({ theme: 'nightclub' })}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold ${
                        settings.theme === 'nightclub'
                          ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#FFB547]'
                          : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB]'
                      }`}
                    >
                      Nightclub Aubergine
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSettings({ theme: 'monochrome' })}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold ${
                        settings.theme === 'monochrome'
                          ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#FFB547]'
                          : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB]'
                      }`}
                    >
                      Strict Monochrome
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSettings({ theme: 'light' })}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold ${
                        settings.theme === 'light'
                          ? 'border-[#FFB547] bg-[#FFB547]/10 text-[#FFB547]'
                          : 'border-[#3A2E5C] bg-[#17102A] text-[#A99CCB]'
                      }`}
                    >
                      Light Mode
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BILLING */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
                Subscription & Invoices
              </h3>

              <div className="p-4 rounded-2xl bg-[#17102A] border border-[#3A2E5C] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#FFB547]">Founding Builder Membership</span>
                  <span className="text-emerald-400 font-semibold">Active</span>
                </div>
                <p className="text-[#A99CCB]">₹1,499 per month • Renews on Dec 01, 2026</p>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => navigate('/subscription-flow')}
                    className="text-xs text-[#FFB547] hover:underline"
                  >
                    Pause or Cancel Membership →
                  </button>
                </div>
              </div>

              {/* Invoices */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-[#F3EEFF] text-xs uppercase">Billing History</span>
                <div className="p-3 bg-[#17102A] rounded-xl border border-[#3A2E5C] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#F3EEFF]">Nov 01, 2026</span>
                    <p className="text-[10px] text-[#7C6F9B]">Invoice #NC-8921 • UPI Paid</p>
                  </div>
                  <button
                    onClick={() => showToast('Invoice PDF downloaded.', 'info')}
                    className="text-[#FFB547] hover:underline"
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
              <h3 className="font-heading font-bold text-base text-[#F3EEFF]">
                Data Privacy & Account Removal
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-[#17102A] border border-[#3A2E5C] rounded-2xl space-y-2">
                  <h4 className="font-bold text-[#F3EEFF]">Export Your Builder Data</h4>
                  <p className="text-[#A99CCB]">
                    Download a copy of your matching profile, chat history, and Builder Journey
                    timeline in JSON format.
                  </p>
                  <button
                    onClick={handleExportData}
                    className="nc-button-secondary text-xs py-2 px-4"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON Archive</span>
                  </button>
                </div>

                <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-2xl space-y-2 text-rose-300">
                  <h4 className="font-bold text-rose-400">Delete Account & Leave Cohort</h4>
                  <p className="text-xs text-rose-300/80">
                    This action permanently deletes your persona from the matching graph. You will
                    lose all remaining mentor credits and access to active Build Rooms.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    className="py-2 px-4 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 text-xs flex items-center gap-1.5"
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
