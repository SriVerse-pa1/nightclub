import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  // Navigation
  nav_home: string;
  nav_findYourFour: string;
  nav_discover: string;
  nav_build: string;
  nav_mentorship: string;
  nav_messages: string;
  nav_careers: string;
  nav_circles: string;
  nav_profile: string;
  nav_settings: string;
  nav_notifications: string;
  nav_admin: string;
  nav_pricing: string;
  nav_howItWorks: string;
  nav_whyComplementary: string;
  nav_faq: string;
  nav_login: string;
  nav_logout: string;
  nav_joinNightclub: string;
  nav_dashboard: string;
  nav_menu: string;
  nav_foundingCohort: string;

  // Header & Tools
  header_searchPlaceholder: string;
  header_credits: string;
  header_creditsLeft: string;
  header_toggleLanguage: string;
  header_switchLight: string;
  header_switchDark: string;
  header_markAllRead: string;
  header_viewAllNotifications: string;
  header_noUnreadNotifications: string;

  // Visual Themes
  theme_title: string;
  theme_subtitle: string;
  theme_warmLuxury: string;
  theme_warmLuxuryDesc: string;
  theme_premiumMidnight: string;
  theme_premiumMidnightDesc: string;
  theme_active: string;
  theme_default: string;
  theme_companion: string;

  // Languages
  lang_title: string;
  lang_subtitle: string;
  lang_english: string;
  lang_telugu: string;
  lang_tamil: string;
  lang_switched: string;

  // Common Actions & Badges
  common_save: string;
  common_saved: string;
  common_cancel: string;
  common_close: string;
  common_edit: string;
  common_apply: string;
  common_applied: string;
  common_join: string;
  common_joined: string;
  common_connect: string;
  common_connected: string;
  common_book: string;
  common_viewProfile: string;
  common_send: string;
  common_all: string;
  common_back: string;
  common_next: string;
  common_status: string;
  common_active: string;
  common_completed: string;
  common_upcoming: string;
  common_online: string;
  common_offline: string;

  // Roles
  role_build: string;
  role_buildTitle: string;
  role_design: string;
  role_designTitle: string;
  role_business: string;
  role_businessTitle: string;
  role_research: string;
  role_researchTitle: string;

  // Dashboard
  dashboard_greeting: string;
  dashboard_subtitle: string;
  dashboard_teamCardTitle: string;
  dashboard_teamBalance: string;
  dashboard_quickActions: string;
  dashboard_upcomingMentorship: string;
  dashboard_activeSprint: string;
  dashboard_recentActivity: string;
  dashboard_viewFour: string;
  dashboard_bookMentor: string;
  dashboard_browseCircles: string;
  dashboard_openBuildRoom: string;

  // Find Your Four
  four_title: string;
  four_subtitle: string;
  four_teamCoverage: string;
  four_acceptTeam: string;
  four_rematch: string;
  four_whyMatched: string;
  four_skillsCovered: string;
  four_chatTeam: string;
  four_openWorkspace: string;

  // Mentorship
  mentor_title: string;
  mentor_subtitle: string;
  mentor_bookButton: string;
  mentor_remainingCredits: string;
  mentor_availableSlots: string;
  mentor_feedbackTitle: string;
  mentor_scheduleSession: string;

  // Build Room & Challenges
  build_title: string;
  build_subtitle: string;
  build_activeProjects: string;
  build_kanbanTodo: string;
  build_kanbanInProgress: string;
  build_kanbanDone: string;
  build_addTask: string;
  build_liveChallenges: string;
  build_joinChallenge: string;

  // Settings Tabs & Sections
  settings_title: string;
  settings_subtitle: string;
  settings_tabAccount: string;
  settings_tabNotifications: string;
  settings_tabPrivacy: string;
  settings_tabBlocked: string;
  settings_tabLanguage: string;
  settings_tabBilling: string;
  settings_tabData: string;
  settings_saveSuccess: string;
  settings_dangerZone: string;
  settings_pauseMembership: string;
  settings_cancelMembership: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_findYourFour: 'Find Your Four',
    nav_discover: 'Discover',
    nav_build: 'Build',
    nav_mentorship: 'Mentorship',
    nav_messages: 'Messages',
    nav_careers: 'Careers',
    nav_circles: 'Circles',
    nav_profile: 'Profile',
    nav_settings: 'Settings',
    nav_notifications: 'Notifications',
    nav_admin: 'Admin Console',
    nav_pricing: 'Pricing',
    nav_howItWorks: 'How it works',
    nav_whyComplementary: 'Why complementary',
    nav_faq: 'FAQ',
    nav_login: 'Log in',
    nav_logout: 'Log out',
    nav_joinNightclub: 'Join Nightclub',
    nav_dashboard: 'Dashboard',
    nav_menu: 'Menu',
    nav_foundingCohort: 'Founding Cohort',

    // Header & Tools
    header_searchPlaceholder: 'Search Telugu & Indic builders, skills, circles...',
    header_credits: 'Credits',
    header_creditsLeft: 'left',
    header_toggleLanguage: 'Toggle Language',
    header_switchLight: 'Switch to Warm Luxury (Light)',
    header_switchDark: 'Switch to Premium Midnight (Dark)',
    header_markAllRead: 'Mark all as read',
    header_viewAllNotifications: 'View all notifications',
    header_noUnreadNotifications: 'No unread notifications',

    // Visual Themes
    theme_title: 'Visual Theme',
    theme_subtitle: 'Choose your preferred environment. Both modes share the same visual identity, typography, and terracotta accents.',
    theme_warmLuxury: 'Warm Luxury',
    theme_warmLuxuryDesc: 'Warm editorial palette inspired by high-end paper, ivory linen, and purposeful terracotta accents.',
    theme_premiumMidnight: 'Premium Midnight',
    theme_premiumMidnightDesc: 'Deep warm obsidian charcoal backgrounds with elevated dark surfaces and signature terracotta warmth.',
    theme_active: 'Active',
    theme_default: 'Default',
    theme_companion: 'Companion',

    // Languages
    lang_title: 'Display Language',
    lang_subtitle: 'Select the primary language for your Nightclub interface and interactions.',
    lang_english: 'English',
    lang_telugu: 'తెలుగు (Telugu)',
    lang_tamil: 'தமிழ் (Tamil)',
    lang_switched: 'Language switched to',

    // Common Actions & Badges
    common_save: 'Save Changes',
    common_saved: 'Saved successfully',
    common_cancel: 'Cancel',
    common_close: 'Close',
    common_edit: 'Edit',
    common_apply: 'Apply Now',
    common_applied: 'Applied',
    common_join: 'Join',
    common_joined: 'Joined',
    common_connect: 'Connect',
    common_connected: 'Connected',
    common_book: 'Book Session',
    common_viewProfile: 'View Profile',
    common_send: 'Send',
    common_all: 'All',
    common_back: 'Back',
    common_next: 'Next',
    common_status: 'Status',
    common_active: 'Active',
    common_completed: 'Completed',
    common_upcoming: 'Upcoming',
    common_online: 'Active Now',
    common_offline: 'Away',

    // Roles
    role_build: 'Build',
    role_buildTitle: 'Engineering & Full-Stack',
    role_design: 'Design',
    role_designTitle: 'UI/UX & Product Design',
    role_business: 'Business',
    role_businessTitle: 'GTM, Sales & Growth',
    role_research: 'Research',
    role_researchTitle: 'AI Models & Indic NLP',

    // Dashboard
    dashboard_greeting: 'Welcome back',
    dashboard_subtitle: 'Your complementary team is active. Track progress, book mentorship, and ship.',
    dashboard_teamCardTitle: 'Your Complementary Four',
    dashboard_teamBalance: 'Team Balance',
    dashboard_quickActions: 'Quick Builder Actions',
    dashboard_upcomingMentorship: 'Next Mentorship Session',
    dashboard_activeSprint: 'Active Sprint Tasks',
    dashboard_recentActivity: 'Cohort Activity',
    dashboard_viewFour: 'Manage Team',
    dashboard_bookMentor: 'Book 1-on-1',
    dashboard_browseCircles: 'Join Circles',
    dashboard_openBuildRoom: 'Open Build Room',

    // Find Your Four
    four_title: 'Find Your Four',
    four_subtitle: 'We match 4 complementary minds: Build, Design, Business, and Research. One cohesive squad to build real products.',
    four_teamCoverage: 'Full complementary coverage',
    four_acceptTeam: 'Accept Team & Enter Build Room',
    four_rematch: 'Find Another Match',
    four_whyMatched: 'Why this squad works',
    four_skillsCovered: 'Complementary Skills Matrix',
    four_chatTeam: 'Team Group Chat',
    four_openWorkspace: 'Open Project Workspace',

    // Mentorship
    mentor_title: '1-on-1 Mentorship',
    mentor_subtitle: 'Direct, focused 30-minute guidance from seasoned operators and AI founders.',
    mentor_bookButton: 'Book 30-Min Session',
    mentor_remainingCredits: 'Available Mentor Credits',
    mentor_availableSlots: 'Available Slots',
    mentor_feedbackTitle: 'Session Feedback & Takeaways',
    mentor_scheduleSession: 'Schedule a Session',

    // Build Room & Challenges
    build_title: 'Build Room & Sprints',
    build_subtitle: 'Coordinate tasks, review milestones, and ship code together with your squad.',
    build_activeProjects: 'Active Projects',
    build_kanbanTodo: 'To Do',
    build_kanbanInProgress: 'In Progress',
    build_kanbanDone: 'Shipped',
    build_addTask: 'Add Sprint Task',
    build_liveChallenges: 'Live 48-Hour Challenges',
    build_joinChallenge: 'Join Challenge',

    // Settings Tabs & Sections
    settings_title: 'Settings & Preferences',
    settings_subtitle: 'Configure visual appearance, display language, notifications, and subscription.',
    settings_tabAccount: 'Account & Profile',
    settings_tabNotifications: 'Notifications & Quiet Hours',
    settings_tabPrivacy: 'Privacy & Visibility',
    settings_tabBlocked: 'Blocked People',
    settings_tabLanguage: 'Language & Theme',
    settings_tabBilling: 'Subscription & Invoices',
    settings_tabData: 'Data & Deletion',
    settings_saveSuccess: 'Preferences saved',
    settings_dangerZone: 'Account Danger Zone',
    settings_pauseMembership: 'Pause Membership',
    settings_cancelMembership: 'Cancel Membership',
  },

  te: {
    // Navigation
    nav_home: 'హోమ్',
    nav_findYourFour: 'మీ నలుగురిని కనుగొనండి',
    nav_discover: 'అన్వేషించండి',
    nav_build: 'బిల్డ్',
    nav_mentorship: 'మెంటార్‌షిప్',
    nav_messages: 'సందేశాలు',
    nav_careers: 'కెరీర్స్',
    nav_circles: 'సర్కిల్స్',
    nav_profile: 'ప్రొఫైల్',
    nav_settings: 'సెట్టింగులు',
    nav_notifications: 'నోటిఫికేషన్లు',
    nav_admin: 'అడ్మిన్ కన్సోల్',
    nav_pricing: 'ధరలు',
    nav_howItWorks: 'ఇది ఎలా పనిచేస్తుంది',
    nav_whyComplementary: 'పరిపూరక ఎందుకు',
    nav_faq: 'తరచూ అడిగే ప్రశ్నలు',
    nav_login: 'లాగిన్',
    nav_logout: 'లాగ్ అవుట్',
    nav_joinNightclub: 'నైట్‌క్లబ్‌లో చేరండి',
    nav_dashboard: 'డాష్‌బోర్డ్',
    nav_menu: 'మెనూ',
    nav_foundingCohort: 'ఫౌండింగ్ కోహోర్ట్',

    // Header & Tools
    header_searchPlaceholder: 'తెలుగు & భారతీయ నిర్మాతలు, నైపుణ్యాలు, సర్కిల్స్ శోధించండి...',
    header_credits: 'క్రెడిట్స్',
    header_creditsLeft: 'మిగిలి ఉన్నాయి',
    header_toggleLanguage: 'భాష మార్చండి',
    header_switchLight: 'వార్మ్ లగ్జరీకి మారండి (లైట్)',
    header_switchDark: 'ప్రీమియం మిడ్‌నైట్‌కి మారండి (డార్క్)',
    header_markAllRead: 'అన్నీ చదివినట్లుగా గుర్తించండి',
    header_viewAllNotifications: 'అన్ని నోటిఫికేషన్లు చూడండి',
    header_noUnreadNotifications: 'చదవని నోటిఫికేషన్లు లేవు',

    // Visual Themes
    theme_title: 'విజువల్ థీమ్',
    theme_subtitle: 'మీకు నచ్చిన వాతావరణాన్ని ఎంచుకోండి. రెండు మోడ్‌లు ఒకే గుర్తింపు, టైపోగ్రఫీ మరియు టెర్రకోట రంగును పంచుకుంటాయి.',
    theme_warmLuxury: 'వార్మ్ లగ్జరీ',
    theme_warmLuxuryDesc: 'హై-ఎండ్ పేపర్, ఐవరీ లినెన్ మరియు టెర్రకోట రంగుతో కూడిన వార్మ్ ఎడిటోరియల్ ప్యాలెట్.',
    theme_premiumMidnight: 'ప్రీమియం మిడ్‌నైట్',
    theme_premiumMidnightDesc: 'గాఢమైన వార్మ్ బొగ్గు నేపథ్యాలు, డార్క్ సర్ఫేస్‌లు మరియు సంతకం టెర్రకోట వెచ్చదనం.',
    theme_active: 'యాక్టివ్',
    theme_default: 'డిఫాల్ట్',
    theme_companion: 'సహచర థీమ్',

    // Languages
    lang_title: 'డిస్ప్లే భాష',
    lang_subtitle: 'నైట్‌క్లబ్ ఇంటర్‌ఫేస్ మరియు పరస్పర చర్యల కోసం మీ ప్రాధాన్యత భాషను ఎంచుకోండి.',
    lang_english: 'English',
    lang_telugu: 'తెలుగు (Telugu)',
    lang_tamil: 'தமிழ் (Tamil)',
    lang_switched: 'భాష మార్చబడింది:',

    // Common Actions & Badges
    common_save: 'మార్పులను సేవ్ చేయండి',
    common_saved: 'విజయవంతంగా సేవ్ చేయబడింది',
    common_cancel: 'రద్దు చేయండి',
    common_close: 'మూసివేయండి',
    common_edit: 'సవరించండి',
    common_apply: 'దరఖాస్తు చేసుకోండి',
    common_applied: 'దరఖాస్తు చేయబడింది',
    common_join: 'చేరండి',
    common_joined: 'చేరారు',
    common_connect: 'కనెక్ట్ అవ్వండి',
    common_connected: 'కనెక్ట్ అయ్యారు',
    common_book: 'సెషన్‌ను బుక్ చేయండి',
    common_viewProfile: 'ప్రొఫైల్ చూడండి',
    common_send: 'పంపండి',
    common_all: 'అన్నీ',
    common_back: 'వెనుకకు',
    common_next: 'తరువాత',
    common_status: 'స్థితి',
    common_active: 'యాక్టివ్',
    common_completed: 'పూర్తయింది',
    common_upcoming: 'రాబోయేవి',
    common_online: 'ఇప్పుడు యాక్టివ్',
    common_offline: 'దూరంగా ఉన్నారు',

    // Roles
    role_build: 'బిల్డ్',
    role_buildTitle: 'ఇంజనీరింగ్ & ఫుల్-స్టాక్ డెవలప్‌మెంట్',
    role_design: 'డిజైన్',
    role_designTitle: 'UI/UX & ప్రొడక్ట్ డిజైన్',
    role_business: 'బిజినెస్',
    role_businessTitle: 'GTM, సేల్స్ & గ్రోత్',
    role_research: 'రీసెర్చ్',
    role_researchTitle: 'AI మోడల్స్ & ఇండిక్ NLP',

    // Dashboard
    dashboard_greeting: 'తిరిగి స్వాగతం',
    dashboard_subtitle: 'మీ పరిపూరక బృందం సిద్ధంగా ఉంది. పురోగతిని ట్రాక్ చేయండి, మెంటార్‌లను కలవండి మరియు ప్రాజెక్ట్‌లను విడుదల చేయండి.',
    dashboard_teamCardTitle: 'మీ పరిపూరక నలుగురు సభ్యులు',
    dashboard_teamBalance: 'టీమ్ బ్యాలెన్స్',
    dashboard_quickActions: 'త్వరిత బిల్డర్ చర్యలు',
    dashboard_upcomingMentorship: 'తదుపరి మెంటార్‌షిప్ సెషన్',
    dashboard_activeSprint: 'యాక్టివ్ స్ప్రింట్ పనులు',
    dashboard_recentActivity: 'కోహోర్ట్ తాజా కార్యకలాపాలు',
    dashboard_viewFour: 'జట్టును నిర్వహించండి',
    dashboard_bookMentor: '1-ఆన్-1 సెషన్ బుక్ చేయండి',
    dashboard_browseCircles: 'సర్కిల్స్‌లో చేరండి',
    dashboard_openBuildRoom: 'బిల్డ్ రూమ్ తెరవండి',

    // Find Your Four
    four_title: 'మీ నలుగురిని కనుగొనండి',
    four_subtitle: 'మేము 4 పరిపూరక ఆలోచనలను కలుపుతాము: బిల్డ్, డిజైన్, బిజినెస్ మరియు రీసెర్చ్. నిజమైన ఉత్పత్తులను నిర్మించడానికి ఒక జట్టు.',
    four_teamCoverage: 'పూర్తి పరిపూరక కవరేజ్',
    four_acceptTeam: 'జట్టును అంగీకరించి బిల్డ్ రూమ్‌లోకి ప్రవేశించండి',
    four_rematch: 'మరొక సరిపోలికను కనుగొనండి',
    four_whyMatched: 'ఈ బృందం ఎందుకు ఉత్తమంగా పనిచేస్తుంది',
    four_skillsCovered: 'పరిపూరక నైపుణ్యాల మాత్రిక',
    four_chatTeam: 'టీమ్ గ్రూప్ చాట్',
    four_openWorkspace: 'ప్రాజెక్ట్ వర్క్‌స్పేస్ తెరవండి',

    // Mentorship
    mentor_title: '1-ఆన్-1 మెంటార్‌షిప్',
    mentor_subtitle: 'అనుభవజ్ఞులైన నిర్వాహకులు మరియు AI వ్యవస్థాపకుల నుండి ప్రత్యక్ష 30-నిమిషాల మార్గదర్శకత్వం.',
    mentor_bookButton: '30-నిమిషాల సెషన్‌ను బుక్ చేయండి',
    mentor_remainingCredits: 'అందుబాటులో ఉన్న మెంటార్ క్రెడిట్స్',
    mentor_availableSlots: 'అందుబాటులో ఉన్న స్లాట్‌లు',
    mentor_feedbackTitle: 'సెషన్ అభిప్రాయం & ముఖ్యమైన విషయాలు',
    mentor_scheduleSession: 'సెషన్‌ను షెడ్యూల్ చేయండి',

    // Build Room & Challenges
    build_title: 'బిల్డ్ రూమ్ & స్ప్రింట్లు',
    build_subtitle: 'మీ బృందంతో కలిసి పనులను సమన్వయం చేసుకోండి, మైలురాళ్లను సమీక్షించండి మరియు కోడ్‌ను విడుదల చేయండి.',
    build_activeProjects: 'యాక్టివ్ ప్రాజెక్ట్‌లు',
    build_kanbanTodo: 'చేయవలసినవి',
    build_kanbanInProgress: 'పురోగతిలో ఉన్నాయి',
    build_kanbanDone: 'పూర్తయ్యాయి',
    build_addTask: 'స్ప్రింట్ పనిని జోడించండి',
    build_liveChallenges: 'ప్రత్యక్ష 48-గంటల ఛాలెంజ్‌లు',
    build_joinChallenge: 'ఛాలెంజ్‌లో చేరండి',

    // Settings Tabs & Sections
    settings_title: 'సెట్టింగులు & ప్రాధాన్యతలు',
    settings_subtitle: 'విజువల్ రూపం, భాష, నోటిఫికేషన్లు మరియు చందాను కాన్ఫిగర్ చేయండి.',
    settings_tabAccount: 'ఖాతా & ప్రొఫైల్',
    settings_tabNotifications: 'నోటిఫికేషన్లు & నిశ్శబ్ద వేళలు',
    settings_tabPrivacy: 'గోప్యత & దృశ్యమానత',
    settings_tabBlocked: 'బ్లాక్ చేయబడిన వ్యక్తులు',
    settings_tabLanguage: 'భాష & థీమ్',
    settings_tabBilling: 'సభ్యత్వం & ఇన్వాయిస్‌లు',
    settings_tabData: 'డేటా & తొలగింపు',
    settings_saveSuccess: 'ప్రాధాన్యతలు సేవ్ చేయబడ్డాయి',
    settings_dangerZone: 'ఖాతా డేంజర్ జోన్',
    settings_pauseMembership: 'సభ్యత్వాన్ని తాత్కాలికంగా ఆపండి',
    settings_cancelMembership: 'సభ్యత్వాన్ని రద్దు చేయండి',
  },

  ta: {
    // Navigation
    nav_home: 'முகப்பு',
    nav_findYourFour: 'உங்கள் நால்வரை கண்டறியுங்கள்',
    nav_discover: 'கண்டுபிடியுங்கள்',
    nav_build: 'பில்ட்',
    nav_mentorship: 'வழிகாட்டல்',
    nav_messages: 'செய்திகள்',
    nav_careers: 'வேலைவாய்ப்புகள்',
    nav_circles: 'குழுக்கள்',
    nav_profile: 'சுயவிவரம்',
    nav_settings: 'அமைப்புகள்',
    nav_notifications: 'அறிவிப்புகள்',
    nav_admin: 'நிர்வாக கன்சோல்',
    nav_pricing: 'விலை விவரம்',
    nav_howItWorks: 'எவ்வாறு செயல்படுகிறது',
    nav_whyComplementary: 'முழுமைத்துவம் ஏன்',
    nav_faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    nav_login: 'உள்நுழைக',
    nav_logout: 'வெளியேறுக',
    nav_joinNightclub: 'நைட் கிளப்பில் இணையுங்கள்',
    nav_dashboard: 'டாஷ்போர்டு',
    nav_menu: 'மெனு',
    nav_foundingCohort: 'தொடக்கக் குழு',

    // Header & Tools
    header_searchPlaceholder: 'இந்திய உருவாக்குநர்கள், திறன்கள், குழுக்களை தேடுங்கள்...',
    header_credits: 'கிரெடிட்ஸ்',
    header_creditsLeft: 'மீதமுள்ளது',
    header_toggleLanguage: 'மொழியை மாற்றவும்',
    header_switchLight: 'வார்ம் லக்சரிக்கு மாறவும் (லைட்)',
    header_switchDark: 'பிரீமியம் மிட்நைட்டுக்கு மாறவும் (டார்க்)',
    header_markAllRead: 'அனைத்தையும் படித்ததாகக் குறிக்கவும்',
    header_viewAllNotifications: 'அனைத்து அறிவிப்புகளையும் பார்க்கவும்',
    header_noUnreadNotifications: 'படிக்காத அறிவிப்புகள் இல்லை',

    // Visual Themes
    theme_title: 'காட்சி தீம்',
    theme_subtitle: 'உங்கள் விருப்பமான சூழலைத் தேர்வுசெய்க. இரு முறைகளும் ஒரே அடையாளம், எழுத்துரு மற்றும் டெரகோட்டா வண்ணத்தை பகிர்கின்றன.',
    theme_warmLuxury: 'வார்ம் லக்சரி',
    theme_warmLuxuryDesc: 'உயர்நிலை காகிதம், ஐவரி லினன் மற்றும் டெரகோட்டா சாயலுடன் கூடிய இதமான எடிட்டோரியல் வண்ணத் தட்டு.',
    theme_premiumMidnight: 'பிரீமியம் மிட்நைட்',
    theme_premiumMidnightDesc: 'ஆழ்ந்த வெதுவெதுப்பான கரி பின்னணிகள், உயர்தர டார்க் தளம் மற்றும் டெரகோட்டா வெப்பம்.',
    theme_active: 'செயலில்',
    theme_default: 'இயல்புநிலை',
    theme_companion: 'துணை தீம்',

    // Languages
    lang_title: 'காட்சி மொழி',
    lang_subtitle: 'நைட் கிளப் இடைமுகம் மற்றும் செயல்பாடுகளுக்கான முதன்மை மொழியைத் தேர்ந்தெடுக்கவும்.',
    lang_english: 'English',
    lang_telugu: 'తెలుగు (Telugu)',
    lang_tamil: 'தமிழ் (Tamil)',
    lang_switched: 'மொழி மாற்றப்பட்டது:',

    // Common Actions & Badges
    common_save: 'மாற்றங்களைச் சேமிக்கவும்',
    common_saved: 'வெற்றிகரமாக சேமிக்கப்பட்டது',
    common_cancel: 'ரத்து செய்',
    common_close: 'மூடுக',
    common_edit: 'திருத்துக',
    common_apply: 'விண்ணப்பிக்கவும்',
    common_applied: 'விண்ணப்பிக்கப்பட்டது',
    common_join: 'இணையுங்கள்',
    common_joined: 'இணைந்தது',
    common_connect: 'இணைக்கவும்',
    common_connected: 'இணைக்கப்பட்டது',
    common_book: 'அமர்வை முன்பதிவு செய்',
    common_viewProfile: 'சுயவிவரம் பார்க்க',
    common_send: 'அனுப்புக',
    common_all: 'அனைத்தும்',
    common_back: 'பின்செல்க',
    common_next: 'அடுத்து',
    common_status: 'நிலை',
    common_active: 'செயலில்',
    common_completed: 'முடிந்தது',
    common_upcoming: 'வரவிருப்பது',
    common_online: 'தற்போது செயலில்',
    common_offline: 'இணைப்பில் இல்லை',

    // Roles
    role_build: 'பில்ட்',
    role_buildTitle: 'மென்பொருள் பொறியியல் & முழு அடுக்கு',
    role_design: 'டிசைன்',
    role_designTitle: 'UI/UX & தயாரிப்பு வடிவமைப்பு',
    role_business: 'பிசினஸ்',
    role_businessTitle: 'GTM, விற்பனை & வளர்ச்சி',
    role_research: 'ஆராய்ச்சி',
    role_researchTitle: 'AI மாதிரிகள் & இந்திய மொழி NLP',

    // Dashboard
    dashboard_greeting: 'மீண்டும் நல்வரவு',
    dashboard_subtitle: 'உங்கள் நால்வர் குழு செயலில் உள்ளது. முன்னேற்றத்தை கண்காணிக்கவும், வழிகாட்டலை பெறவும், வெளியிடவும்.',
    dashboard_teamCardTitle: 'உங்கள் ஒருங்கிணைந்த நால்வர் குழு',
    dashboard_teamBalance: 'குழு சமநிலை',
    dashboard_quickActions: 'விரைவான நடவடிக்கைகள்',
    dashboard_upcomingMentorship: 'அடுத்த வழிகாட்டல் அமர்வு',
    dashboard_activeSprint: 'செயலில் உள்ள ஸ்பிரிண்ட் பணிகள்',
    dashboard_recentActivity: 'குழுவின் சமீபத்திய செயல்பாடுகள்',
    dashboard_viewFour: 'குழுவை நிர்வகிக்க',
    dashboard_bookMentor: '1-ஆன்-1 அமர்வு முன்பதிவு',
    dashboard_browseCircles: 'குழுக்களை ஆராய்க',
    dashboard_openBuildRoom: 'பில்ட் ரூம் திறக்க',

    // Find Your Four
    four_title: 'உங்கள் நால்வரை கண்டறியுங்கள்',
    four_subtitle: '4 ஒருங்கிணைந்த சிந்தனைகளை இணைக்கிறோம்: பில்ட், டிசைன், பிசினஸ் மற்றும் ஆராய்ச்சி. உண்மையான தயாரிப்புகளை உருவாக்க ஒரு குழு.',
    four_teamCoverage: 'முழுமையான ஒருங்கிணைந்த திறன் பாதுகாப்பு',
    four_acceptTeam: 'குழுவை ஏற்று பில்ட் ரூமில் நுழைக',
    four_rematch: 'வேறு பொருத்தத்தை தேடுங்கள்',
    four_whyMatched: 'இந்த குழு ஏன் சிறப்பாக செயல்படுகிறது',
    four_skillsCovered: 'திறன்கள் கட்டமைப்பு',
    four_chatTeam: 'குழு உரையாடல்',
    four_openWorkspace: 'திட்டப் பணியிடம் திறக்க',

    // Mentorship
    mentor_title: '1-ஆன்-1 வழிகாட்டல்',
    mentor_subtitle: 'அனுபவம் வாய்ந்த தலைவர்கள் மற்றும் AI நிறுவனர்களிடமிருந்து நேரடி 30 நிமிட வழிகாட்டல்.',
    mentor_bookButton: '30-நிமிட அமர்வை முன்பதிவு செய்',
    mentor_remainingCredits: 'கிடைக்கும் வழிகாட்டல் கிரெடிட்கள்',
    mentor_availableSlots: 'கிடைக்கும் நேரங்கள்',
    mentor_feedbackTitle: 'அமர்வு பின்னூட்டம் & குறிப்புகள்',
    mentor_scheduleSession: 'அமர்வை திட்டமிடுங்கள்',

    // Build Room & Challenges
    build_title: 'பில்ட் ரூம் & ஸ்பிரிண்ட்கள்',
    build_subtitle: 'உங்கள் குழுவுடன் இணைந்து பணிகளை ஒருங்கிணைக்கவும், மைல்கற்களை சரிபார்க்கவும், குறியீட்டை வெளியிடவும்.',
    build_activeProjects: 'செயலில் உள்ள திட்டங்கள்',
    build_kanbanTodo: 'செய்ய வேண்டியவை',
    build_kanbanInProgress: 'செயலில் உள்ளவை',
    build_kanbanDone: 'முடிந்தவை',
    build_addTask: 'ஸ்பிரிண்ட் பணியை சேர்க்க',
    build_liveChallenges: 'நேரலை 48-மணிநேர சவால்கள்',
    build_joinChallenge: 'சவாலில் இணையுங்கள்',

    // Settings Tabs & Sections
    settings_title: 'அமைப்புகள் & விருப்பங்கள்',
    settings_subtitle: 'தோற்றம், மொழி, அறிவிப்புகள் மற்றும் சந்தாவை நிர்வகிக்கவும்.',
    settings_tabAccount: 'கணக்கு & சுயவிவரம்',
    settings_tabNotifications: 'அறிவிப்புகள் & அமைதி நேரம்',
    settings_tabPrivacy: 'தனியுரிமை & தெரிவுநிலை',
    settings_tabBlocked: 'தடுக்கப்பட்ட நபர்கள்',
    settings_tabLanguage: 'மொழி & தீம்',
    settings_tabBilling: 'சந்தா & விலைப்பட்டியல்',
    settings_tabData: 'தரவு & நீக்குதல்',
    settings_saveSuccess: 'விருப்பங்கள் சேமிக்கப்பட்டன',
    settings_dangerZone: 'கணக்கு ஆபத்து பகுதி',
    settings_pauseMembership: 'உறுப்பினர் சந்தாவை இடைநிறுத்து',
    settings_cancelMembership: 'உறுப்பினர் சந்தாவை ரத்து செய்',
  },
};

export const getTranslation = (
  lang: SupportedLanguage,
  key: keyof TranslationDictionary,
  fallback?: string
): string => {
  const dict = translations[lang] || translations.en;
  return dict[key] || fallback || translations.en[key] || (key as string);
};
