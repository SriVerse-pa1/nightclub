import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Member,
  FourTeam,
  Project,
  BuildChallenge,
  Mentor,
  BookedSession,
  Circle,
  CareerOpportunity,
  AppNotification,
  ChatThread,
  UserSettings,
  RoutePath,
  KanbanTask,
  SupportedLanguage,
} from '../types';
import { TranslationDictionary, getTranslation } from '../i18n/translations';
import {
  CURRENT_USER,
  MOCK_MEMBERS,
  INITIAL_FOUR_TEAM,
  MOCK_PROJECTS,
  MOCK_CHALLENGES,
  MOCK_MENTORS,
  MOCK_SESSIONS,
  MOCK_CIRCLES,
  MOCK_CAREERS,
  MOCK_NOTIFICATIONS,
  MOCK_THREADS,
  INITIAL_SETTINGS,
} from '../services/mockData';

export interface ToastItem {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation
  currentRoute: RoutePath;
  navigate: (route: RoutePath, params?: Record<string, any>) => void;
  routeParams: Record<string, any>;

  // Auth & Profile
  isAuthenticated: boolean;
  currentUser: Member;
  viewingMember: Member | null;
  setViewingMember: (member: Member | null) => void;
  login: (email: string) => void;
  signup: (userData: Partial<Member>) => void;
  logout: () => void;
  updateCurrentUser: (updates: Partial<Member>) => void;

  // Find Your Four
  fourTeam: FourTeam;
  isComputingTeam: boolean;
  acceptFourTeam: () => void;
  declineTeamMember: (memberId: string) => void;
  rematchFourTeam: () => void;

  // Connections
  membersList: Member[];
  sendConnectionRequest: (memberId: string, note?: string) => void;
  acceptConnectionRequest: (memberId: string) => void;
  declineConnectionRequest: (memberId: string) => void;

  // Chat
  threads: ChatThread[];
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  sendMessage: (threadId: string, text: string) => void;
  startChatWithMember: (member: Member) => void;

  // Projects & Build Room
  projects: Project[];
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  moveKanbanTask: (projectId: string, taskId: string, newStatus: 'todo' | 'in_progress' | 'done') => void;
  addKanbanTask: (projectId: string, task: Omit<KanbanTask, 'id'>) => void;

  // Challenges
  challenges: BuildChallenge[];
  joinChallenge: (challengeId: string) => void;
  submitChallenge: (challengeId: string, demoUrl: string, repoUrl: string) => void;

  // Mentorship
  mentors: Mentor[];
  bookedSessions: BookedSession[];
  mentorCredits: { remaining: number; total: number };
  bookMentorSession: (mentorId: string, slotId: string, goal: string) => boolean;
  cancelMentorSession: (sessionId: string) => void;
  submitSessionFeedback: (sessionId: string, rating: number, feedback: string) => void;

  // Circles
  circles: Circle[];
  toggleJoinCircle: (circleId: string) => void;
  addCirclePost: (circleId: string, content: string) => void;

  // Careers
  careers: CareerOpportunity[];
  toggleSaveCareer: (careerId: string) => void;
  applyToCareer: (careerId: string) => void;

  // Notifications
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Settings & Theme
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setLanguage: (lang: SupportedLanguage) => void;
  currentLanguage: SupportedLanguage;
  t: (key: keyof TranslationDictionary, fallback?: string) => string;
  pauseSubscription: () => void;
  cancelSubscription: () => void;
  reactivateSubscription: () => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state - sync with hash for direct URL access & back button
  const getInitialRoute = (): RoutePath => {
    const hash = window.location.hash.replace('#', '') as RoutePath;
    const validRoutes: RoutePath[] = [
      '/', '/pricing', '/login', '/signup', '/forgot-password', '/verify-email',
      '/checkout', '/payment-result', '/onboarding', '/dashboard', '/find-your-four',
      '/discover', '/connections', '/messages', '/build', '/build-room', '/challenges',
      '/mentorship', '/careers', '/circles', '/profile', '/member-profile',
      '/notifications', '/settings', '/subscription-flow', '/admin', '/system-pages'
    ];
    return validRoutes.includes(hash) ? hash : '/';
  };

  const [currentRoute, setCurrentRoute] = useState<RoutePath>(getInitialRoute);
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<Member>(CURRENT_USER);
  const [viewingMember, setViewingMember] = useState<Member | null>(MOCK_MEMBERS[0]);

  // Find Your Four
  const [fourTeam, setFourTeam] = useState<FourTeam>(INITIAL_FOUR_TEAM);
  const [isComputingTeam, setIsComputingTeam] = useState<boolean>(false);

  // Lists
  const [membersList, setMembersList] = useState<Member[]>(MOCK_MEMBERS);
  const [threads, setThreads] = useState<ChatThread[]>(MOCK_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string | null>('thread-ananya');

  // Build & Projects
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState<string>('proj-kisanai');
  const [challenges, setChallenges] = useState<BuildChallenge[]>(MOCK_CHALLENGES);

  // Mentorship
  const [mentors] = useState<Mentor[]>(MOCK_MENTORS);
  const [bookedSessions, setBookedSessions] = useState<BookedSession[]>(MOCK_SESSIONS);
  const [mentorCredits, setMentorCredits] = useState({ remaining: 5, total: 8 });

  // Circles & Careers
  const [circles, setCircles] = useState<Circle[]>(MOCK_CIRCLES);
  const [careers, setCareers] = useState<CareerOpportunity[]>(MOCK_CAREERS);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

  // Settings & Theme
  const getInitialTheme = (): 'light' | 'dark' => {
    try {
      const saved = localStorage.getItem('nightclub_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {
      // Ignore localStorage errors
    }
    return 'light';
  };

  const getInitialLanguage = (): SupportedLanguage => {
    try {
      const saved = localStorage.getItem('nightclub_language');
      if (saved === 'en' || saved === 'te' || saved === 'ta') return saved;
    } catch (e) {
      // Ignore localStorage errors
    }
    return 'en';
  };

  const getInitialFontSize = (): 'normal' | 'large' | 'extra-large' => {
    try {
      const saved = localStorage.getItem('nightclub_fontsize');
      if (saved === 'normal' || saved === 'large' || saved === 'extra-large') return saved;
    } catch (e) {}
    return 'normal';
  };

  const getInitialReducedMotion = (): boolean => {
    try {
      const saved = localStorage.getItem('nightclub_reduced_motion');
      if (saved === 'true') return true;
      if (saved === 'false') return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}
    return false;
  };

  const [settings, setSettings] = useState<UserSettings>(() => ({
    ...INITIAL_SETTINGS,
    theme: getInitialTheme(),
    language: getInitialLanguage(),
    fontSize: getInitialFontSize(),
    reducedMotion: getInitialReducedMotion(),
  }));

  // Sync theme with document & localStorage
  useEffect(() => {
    const isDark = settings.theme === 'dark';
    try {
      localStorage.setItem('nightclub_theme', settings.theme);
    } catch (e) {
      // Ignore localStorage errors
    }
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [settings.theme]);

  // Sync language with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nightclub_language', settings.language);
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [settings.language]);

  // Sync font size scaling & reduced motion with document & localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nightclub_fontsize', settings.fontSize);
      localStorage.setItem('nightclub_reduced_motion', String(settings.reducedMotion));
    } catch (e) {}
    const root = document.documentElement;
    root.classList.remove('font-size-large', 'font-size-xlarge');
    if (settings.fontSize === 'large') {
      root.classList.add('font-size-large');
    } else if (settings.fontSize === 'extra-large') {
      root.classList.add('font-size-xlarge');
    }

    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [settings.fontSize, settings.reducedMotion]);

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Hash listener for browser forward/back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as RoutePath;
      if (hash && hash !== currentRoute) {
        setCurrentRoute(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  const showToast = (message: string, type: ToastItem['type'] = 'info') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const navigate = (route: RoutePath, params: Record<string, any> = {}) => {
    setRouteParams(params);
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth actions
  const login = (email: string) => {
    setIsAuthenticated(true);
    showToast(`Welcome back, ${currentUser.name.split(' ')[0]}!`, 'success');
    navigate('/dashboard');
  };

  const signup = (userData: Partial<Member>) => {
    setIsAuthenticated(true);
    setCurrentUser((prev) => ({ ...prev, ...userData }));
    showToast('Account created. Completing onboarding wizard...', 'success');
    navigate('/onboarding');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('You have been logged out safely.', 'info');
    navigate('/');
  };

  const updateCurrentUser = (updates: Partial<Member>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated successfully', 'success');
  };

  // Find Your Four
  const acceptFourTeam = () => {
    setFourTeam((prev) => ({ ...prev, status: 'accepted' }));
    showToast('Congratulations! Your Five-person team is formed.', 'success');
  };

  const declineTeamMember = (memberId: string) => {
    setFourTeam((prev) => {
      const remaining = prev.members.filter((m) => m.id !== memberId);
      const newStatus = remaining.length === 0 ? 'declined_all' : 'ready';
      return {
        ...prev,
        members: remaining,
        status: newStatus,
        teamBalance: Number(Math.max(0.65, prev.teamBalance - 0.08).toFixed(2)),
      };
    });
    showToast('Member removed from current pool. Rematch anytime.', 'info');
  };

  const rematchFourTeam = () => {
    setIsComputingTeam(true);
    showToast('Analyzing Telugu AI graph for complementary builders...', 'info');
    setTimeout(() => {
      setFourTeam({
        id: 'team-' + Date.now(),
        teamBalance: 0.94,
        status: 'ready',
        members: [MOCK_MEMBERS[0], MOCK_MEMBERS[1], MOCK_MEMBERS[2], MOCK_MEMBERS[4]],
        fitDetails: INITIAL_FOUR_TEAM.fitDetails,
      });
      setIsComputingTeam(false);
      showToast('New complementary team computed! 0.94 balance score.', 'success');
    }, 1200);
  };

  // Connections
  const sendConnectionRequest = (memberId: string, note?: string) => {
    setMembersList((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, connectionStatus: 'pending_sent', note } : m))
    );
    showToast('Connection invitation sent. Privacy protected.', 'success');
  };

  const acceptConnectionRequest = (memberId: string) => {
    setMembersList((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, connectionStatus: 'connected' } : m))
    );
    showToast('Connection accepted! Private messaging is now unlocked.', 'success');
  };

  const declineConnectionRequest = (memberId: string) => {
    setMembersList((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, connectionStatus: 'none' } : m))
    );
    showToast('Invitation declined quietly.', 'info');
  };

  // Messaging
  const sendMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: 'm-' + Date.now(),
      senderId: 'user-self',
      text: text.trim(),
      timestamp: 'Just now',
      status: 'sent' as const,
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: text.trim(),
            lastMessageTime: 'Just now',
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );

    // Simulate realistic typing response from teammate after 2 seconds
    setTimeout(() => {
      const activeThread = threads.find((t) => t.id === threadId);
      if (activeThread) {
        const replyMsg = {
          id: 'rep-' + Date.now(),
          senderId: activeThread.participant.id,
          text: `Got it, Venkata! Looking into this now. Let's sync during tonight's sprint.`,
          timestamp: 'Just now',
          status: 'delivered' as const,
        };
        setThreads((curr) =>
          curr.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  lastMessage: replyMsg.text,
                  lastMessageTime: 'Just now',
                  messages: [...t.messages, replyMsg],
                }
              : t
          )
        );
      }
    }, 2000);
  };

  const startChatWithMember = (member: Member) => {
    const existing = threads.find((t) => t.participant.id === member.id);
    if (existing) {
      setActiveThreadId(existing.id);
      navigate('/messages');
    } else {
      const newThread: ChatThread = {
        id: 'thread-' + member.id,
        participant: member,
        lastMessage: 'Conversation opened',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        messages: [
          {
            id: 'init-' + Date.now(),
            senderId: 'system',
            text: `You connected with ${member.name}. Say hello and coordinate your complementary skills!`,
            timestamp: 'Just now',
            status: 'read',
          },
        ],
      };
      setThreads((prev) => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
      navigate('/messages');
    }
  };

  // Projects & Kanban
  const moveKanbanTask = (
    projectId: string,
    taskId: string,
    newStatus: 'todo' | 'in_progress' | 'done'
  ) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          return {
            ...proj,
            tasks: proj.tasks.map((task) =>
              task.id === taskId ? { ...task, status: newStatus } : task
            ),
          };
        }
        return proj;
      })
    );
    showToast(`Task moved to ${newStatus.replace('_', ' ')}`, 'info');
  };

  const addKanbanTask = (projectId: string, task: Omit<KanbanTask, 'id'>) => {
    const newTask: KanbanTask = {
      ...task,
      id: 'task-' + Date.now(),
    };
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === projectId ? { ...proj, tasks: [...proj.tasks, newTask] } : proj
      )
    );
    showToast('New task added to project backlog', 'success');
  };

  // Challenges
  const joinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, isJoined: true } : c))
    );
    showToast('You joined the challenge! Your team workspace is ready.', 'success');
  };

  const submitChallenge = (challengeId: string, demoUrl: string, repoUrl: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              hasSubmitted: true,
              demoUrl,
              repoUrl,
              submissionsCount: c.submissionsCount + 1,
            }
          : c
      )
    );
    showToast('Challenge submission uploaded for mentor evaluation!', 'success');
  };

  // Mentorship
  const bookMentorSession = (mentorId: string, slotId: string, goal: string): boolean => {
    if (mentorCredits.remaining <= 0) {
      showToast('You have used all 8 monthly mentor credits. Resets on the 1st.', 'warning');
      return false;
    }
    const mentor = mentors.find((m) => m.id === mentorId);
    if (!mentor) return false;
    const slot = mentor.slots.find((s) => s.id === slotId) || mentor.slots[0];

    const newSession: BookedSession = {
      id: 'sess-' + Date.now(),
      mentorId,
      mentorName: mentor.name,
      mentorTitle: `${mentor.title} at ${mentor.company}`,
      mentorAvatar: mentor.avatar,
      slotDay: `${slot.day}, ${slot.date}, 2026`,
      slotTime: `${slot.time} IST`,
      goal,
      status: 'upcoming',
      joinUrl: `https://meet.nightclub.network/session-${mentor.id}-${Date.now().toString(36)}`,
    };

    setBookedSessions((prev) => [newSession, ...prev]);
    setMentorCredits((prev) => ({ ...prev, remaining: prev.remaining - 1 }));
    showToast(`1 credit used. Session booked with ${mentor.name}!`, 'success');
    return true;
  };

  const cancelMentorSession = (sessionId: string) => {
    setBookedSessions((prev) => prev.filter((s) => s.id !== sessionId));
    setMentorCredits((prev) => ({ ...prev, remaining: Math.min(prev.total, prev.remaining + 1) }));
    showToast('Session cancelled. 1 mentor credit restored.', 'info');
  };

  const submitSessionFeedback = (sessionId: string, rating: number, feedback: string) => {
    setBookedSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, rating, feedbackHelp: feedback } : s))
    );
    showToast('Feedback submitted. Thank you for supporting the community!', 'success');
  };

  // Circles
  const toggleJoinCircle = (circleId: string) => {
    setCircles((prev) =>
      prev.map((c) => {
        if (c.id === circleId) {
          const newState = !c.isJoined;
          showToast(newState ? `Joined ${c.name}` : `Left ${c.name}`, 'info');
          return {
            ...c,
            isJoined: newState,
            memberCount: newState ? c.memberCount + 1 : c.memberCount - 1,
          };
        }
        return c;
      })
    );
  };

  const addCirclePost = (circleId: string, content: string) => {
    if (!content.trim()) return;
    setCircles((prev) =>
      prev.map((c) => {
        if (c.id === circleId) {
          return {
            ...c,
            posts: [
              {
                id: 'cp-' + Date.now(),
                author: currentUser,
                content: content.trim(),
                likes: 1,
                isLiked: true,
                replies: 0,
                timestamp: 'Just now',
              },
              ...c.posts,
            ],
          };
        }
        return c;
      })
    );
    showToast('Post shared with circle builders', 'success');
  };

  // Careers
  const toggleSaveCareer = (careerId: string) => {
    setCareers((prev) =>
      prev.map((car) => {
        if (car.id === careerId) {
          const next = !car.isSaved;
          showToast(next ? 'Saved to your career bookmarks' : 'Removed from saved', 'info');
          return { ...car, isSaved: next };
        }
        return car;
      })
    );
  };

  const applyToCareer = (careerId: string) => {
    setCareers((prev) =>
      prev.map((car) => (car.id === careerId ? { ...car, hasApplied: true } : car))
    );
    showToast('Application submitted with your verified Nightclub builder profile!', 'success');
  };

  // Notifications
  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Settings
  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    showToast('Settings saved', 'success');
  };

  const toggleTheme = () => {
    setSettings((prev) => {
      const nextTheme = prev.theme === 'dark' ? 'light' : 'dark';
      showToast(
        nextTheme === 'dark'
          ? 'Switched to Premium Midnight theme'
          : 'Switched to Warm Luxury theme',
        'info'
      );
      return { ...prev, theme: nextTheme };
    });
  };

  const toggleLanguage = () => {
    setSettings((prev) => {
      const order: SupportedLanguage[] = ['en', 'te', 'ta'];
      const currentIndex = order.indexOf(prev.language);
      const nextLang = order[(currentIndex + 1) % order.length];
      const labels: Record<SupportedLanguage, string> = {
        en: 'Language: English',
        te: 'భాష: తెలుగు (Telugu)',
        ta: 'மொழி: தமிழ் (Tamil)',
      };
      showToast(labels[nextLang], 'info');
      return { ...prev, language: nextLang };
    });
  };

  const setLanguage = (lang: SupportedLanguage) => {
    setSettings((prev) => ({ ...prev, language: lang }));
    const labels: Record<SupportedLanguage, string> = {
      en: 'Language: English',
      te: 'భాష: తెలుగు (Telugu)',
      ta: 'மொழி: தமிழ் (Tamil)',
    };
    showToast(labels[lang], 'info');
  };

  const t = (key: keyof TranslationDictionary, fallback?: string): string => {
    return getTranslation(settings.language, key, fallback);
  };

  const pauseSubscription = () => {
    setSettings((prev) => ({
      ...prev,
      subscription: { ...prev.subscription, status: 'paused', pausedUntil: '30 days from now' },
    }));
    showToast('Membership paused for 1 month. You will not be billed.', 'info');
    navigate('/subscription-flow');
  };

  const cancelSubscription = () => {
    setSettings((prev) => ({
      ...prev,
      subscription: { ...prev.subscription, status: 'canceled' },
    }));
    showToast('Subscription cancelled. Benefits continue until end of billing cycle.', 'warning');
    navigate('/subscription-flow');
  };

  const reactivateSubscription = () => {
    setSettings((prev) => ({
      ...prev,
      subscription: { ...prev.subscription, status: 'active', mentorCreditsRemaining: 8 },
    }));
    showToast('Welcome back! Full membership benefits and 8 mentor credits restored.', 'success');
    navigate('/dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigate,
        routeParams,
        isAuthenticated,
        currentUser,
        viewingMember,
        setViewingMember,
        login,
        signup,
        logout,
        updateCurrentUser,
        fourTeam,
        isComputingTeam,
        acceptFourTeam,
        declineTeamMember,
        rematchFourTeam,
        membersList,
        sendConnectionRequest,
        acceptConnectionRequest,
        declineConnectionRequest,
        threads,
        activeThreadId,
        setActiveThreadId,
        sendMessage,
        startChatWithMember,
        projects,
        activeProjectId,
        setActiveProjectId,
        moveKanbanTask,
        addKanbanTask,
        challenges,
        joinChallenge,
        submitChallenge,
        mentors,
        bookedSessions,
        mentorCredits,
        bookMentorSession,
        cancelMentorSession,
        submitSessionFeedback,
        circles,
        toggleJoinCircle,
        addCirclePost,
        careers,
        toggleSaveCareer,
        applyToCareer,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        settings,
        updateSettings,
        toggleTheme,
        toggleLanguage,
        setLanguage,
        currentLanguage: settings.language,
        t,
        pauseSubscription,
        cancelSubscription,
        reactivateSubscription,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
