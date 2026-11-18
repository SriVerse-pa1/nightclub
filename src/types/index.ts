export type RoleType = 'build' | 'design' | 'business' | 'research';

export type SkillCategory = 'Technical' | 'Creative' | 'Business' | 'People';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type EvidenceType = 'Self-reported' | 'Portfolio' | 'Project' | 'Endorsed';

export interface UserSkill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  evidence: EvidenceType;
}

export interface BuilderJourneyItem {
  id: string;
  year: string;
  type: 'built' | 'learned' | 'contributed' | 'mentored';
  title: string;
  description: string;
  badge?: string;
}

export interface Member {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: RoleType;
  roleTitle: string;
  location: string;
  matchScore: number;
  whyMatched: string;
  bio: string;
  ambition: string;
  buildingStatus: 'Exploring' | 'Ideating' | 'Building' | 'Launched';
  languages: string[];
  yearsExperience: number;
  skills: UserSkill[];
  offer: string[];
  need: string[];
  goals: {
    thirtyDay: string;
    ninetyDay: string;
    longTerm: string;
  };
  workingStyle: {
    soloVsTeam: number; // 0 to 100
    leaderVsExecutor: number; // 0 to 100
    hoursPerWeek: number;
    timeZone: string;
    remoteHybrid: 'Remote' | 'Hybrid' | 'In-person';
  };
  portfolio: {
    github?: string;
    dribbble?: string;
    behance?: string;
    liveProject?: string;
  };
  builderJourney: BuilderJourneyItem[];
  mutualConnections: number;
  connectionStatus: 'none' | 'pending_sent' | 'pending_received' | 'connected';
  note?: string;
}

export interface FitBreakdown {
  skillFit: number;
  sharedGoals: number;
  workingStyle: number;
  availabilityOverlap: number;
  whyPicked: string;
  sharedInterests: string[];
  availabilityDetails: string;
}

export interface FourTeam {
  id: string;
  teamBalance: number;
  status: 'ready' | 'computing' | 'accepted' | 'declined_all';
  members: Member[];
  fitDetails: Record<string, FitBreakdown>;
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  assignee: Member;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  description: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  date: string;
  type: string;
}

export interface ProjectActivity {
  id: string;
  userName: string;
  userAvatar: string;
  action: string;
  time: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold';
  teamBalance: number;
  members: Member[];
  tasks: KanbanTask[];
  milestones: Milestone[];
  files: ProjectFile[];
  activity: ProjectActivity[];
}

export interface BuildChallenge {
  id: string;
  title: string;
  category: string;
  status: 'upcoming' | 'live' | 'past';
  countdown: string;
  teamSize: number;
  skillsNeeded: string[];
  brief: string;
  rules: string[];
  timeline: string;
  prizes: string;
  submissionsCount: number;
  isJoined?: boolean;
  hasSubmitted?: boolean;
  demoUrl?: string;
  repoUrl?: string;
}

export interface MentorSlot {
  id: string;
  day: string;
  date: string;
  time: string;
  isAvailable: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  expertise: string[];
  rating: number;
  reviewsCount: number;
  languages: string[];
  nextSlot: string;
  bio: string;
  areas: string[];
  slots: MentorSlot[];
}

export interface BookedSession {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorTitle: string;
  mentorAvatar: string;
  slotDay: string;
  slotTime: string;
  goal: string;
  status: 'upcoming' | 'past' | 'cancelled';
  joinUrl: string;
  rating?: number;
  feedbackHelp?: string;
}

export interface CirclePost {
  id: string;
  author: Member;
  content: string;
  likes: number;
  isLiked?: boolean;
  replies: number;
  timestamp: string;
}

export interface CircleEvent {
  id: string;
  title: string;
  date: string;
  attendees: number;
  isAttending?: boolean;
}

export interface Circle {
  id: string;
  name: string;
  tag: string;
  iconName: string;
  memberCount: number;
  activeNow: number;
  description: string;
  isJoined: boolean;
  posts: CirclePost[];
  events: CircleEvent[];
}

export interface CareerOpportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Job' | 'Internship' | 'Project invite';
  remote: boolean;
  matchScore: number;
  skills: string[];
  compensation: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  isSaved: boolean;
  hasApplied: boolean;
}

export type NotificationType =
  | 'message'
  | 'connection_accepted'
  | 'team_ready'
  | 'session_reminder'
  | 'milestone'
  | 'new_intro'
  | 'challenge';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  group: 'today' | 'this_week' | 'earlier';
  read: boolean;
  linkRoute: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
}

export interface ChatThread {
  id: string;
  participant: Member;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  isMuted?: boolean;
  isBlocked?: boolean;
}

export type SupportedLanguage = 'en' | 'te' | 'ta';
export type FontSizePreference = 'normal' | 'large' | 'extra-large';

export interface UserSettings {
  language: SupportedLanguage;
  theme: 'light' | 'dark' | 'nightclub' | 'monochrome';
  fontSize: FontSizePreference;
  reducedMotion: boolean;
  notifications: {
    messages: boolean;
    teamMatches: boolean;
    mentorshipReminders: boolean;
    challenges: boolean;
    circleActivity: boolean;
    quietHoursEnabled: boolean;
    quietHoursStart: string;
    quietHoursEnd: string;
    dailyLimit: string;
  };
  privacy: {
    showAvailability: boolean;
    appearInDiscover: boolean;
    allowDirectInvites: boolean;
  };
  subscription: {
    status: 'active' | 'paused' | 'canceled' | 'lapsed';
    plan: string;
    price: string;
    nextRenewal: string;
    mentorCreditsRemaining: number;
    mentorCreditsTotal: number;
    pausedUntil?: string;
  };
}

export type RoutePath =
  | '/'
  | '/pricing'
  | '/login'
  | '/signup'
  | '/forgot-password'
  | '/verify-email'
  | '/checkout'
  | '/payment-result'
  | '/onboarding'
  | '/dashboard'
  | '/find-your-four'
  | '/discover'
  | '/connections'
  | '/messages'
  | '/build'
  | '/build-room'
  | '/challenges'
  | '/mentorship'
  | '/careers'
  | '/circles'
  | '/profile'
  | '/member-profile'
  | '/notifications'
  | '/settings'
  | '/subscription-flow'
  | '/admin'
  | '/system-pages';
