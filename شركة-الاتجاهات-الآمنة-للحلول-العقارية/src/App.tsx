/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { AnimatedHeading } from './components/AnimatedHeading';
import { FadeIn } from './components/FadeIn';
import { 
  X, 
  Send, 
  MessageSquare, 
  Sparkles, 
  ArrowDown, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  Search, 
  Globe, 
  ChevronRight, 
  Workflow, 
  ShieldAlert,
  ArrowRight,
  Mail
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}

const translations = {
  en: {
    // Navbar
    vision: "Story & Vision",
    investment: "Invest Pathways",
    projects: "Construction Schemes",
    advisory: "Ownership Planner",
    info: "INFO",
    mail: "MAIL",
    contactAdvisor: "Consult Advisor",
    contactAdvisorShort: "Advisor",
    logoName: "Secure Trends",

    // Hero
    heroTitle: "Secure Trends\nElite Real Estate Icons",
    heroSubtitle: "We craft sustainable value through precision-guided property investment, luxury development, and trusted contracting. Delivering premium ownership and robust yields in Jeddah, Saudi Arabia.",
    ctaConsult: "Advisor Updates",
    ctaExplore: "Explore Vision",
    heroBottomTag: "Invest. Build. Advise.",

    // Story Section
    storyHeadingSmall: "01 / STRATEGIC VISION",
    storyTitle: "Elite developments engineered with absolute structural security.",
    storyP1: "Secure Trends was established in Jeddah on a solid paradigm: real estate development is an integrated partnership starting from smart site selection to sourcing supreme building materials, producing beautiful facades and luxury layouts for elite families.",
    storyP2: "By aligning deep engineering acumen with premium certified craftsmanship, we serve as a true firewall—delivering robust residential villas and commercial assets in full compliance with the Saudi Building Code (SBC) with enduring yields.",

    // Investing Section
    investHeadingSmall: "02 / JEDDAH REAL ESTATE CAPITAL",
    investTitle: "High-Conviction Investment Pathways",
    pathway1Label: "Pathway I",
    pathway1Title: "Elite Residential Villas",
    pathway1Desc: "Architecting and building bespoke modern and Najdi royal villas with premium finishes and structural guarantees across Jeddah's prime quarters.",
    pathway2Label: "Pathway II",
    pathway2Title: "Commercial Hubs & Buildings",
    pathway2Desc: "Structuring corporate office towers, premium strip malls, and mixed-use environments driving maximum occupancy rates and stable lease yields.",
    pathway3Label: "Pathway III",
    pathway3Title: "Wealth & Asset Portfolios",
    pathway3Desc: "Structuring private real estate funds and customized syndicates to robustly scale capital through high-yielding, low-risk brick-and-mortar assets.",

    activeAnalyses: "Jeddah Active Opportunity Analyses",
    
    deeptechDetailTitle: "Developing modern and royal heritage Najdi villas in Jeddah.",
    deeptechDetailDesc: "Serving clients who demand pristine, resilient private homes. Fully insulated layouts operating in total compliance with SBC, backed by 20-year concrete foundation warranties.",
    deeptechDetailButton: "Inquire About Villas",
    deeptechStat1Val: "20 Years",
    deeptechStat1Lbl: "Structural Warranty",
    deeptechStat2Val: "140+",
    deeptechStat2Lbl: "Clients Served",

    spatialDetailTitle: "Premium commercial properties yielding robust monthly cash flow.",
    spatialDetailDesc: "Structuring high-profile commercial blocks, plazas, and premium office showrooms equipped with smart automation and central HVAC in central Jeddah.",
    spatialDetailButton: "Discuss Commercial Route",
    spatialStat1Val: "SAR 24M",
    spatialStat1Lbl: "Developed Portfolio",
    spatialStat2Val: "9 Towers",
    spatialStat2Lbl: "Active Asset Hubs",

    web3DetailTitle: "Intelligent property diversification shielding you from market volatility.",
    web3DetailDesc: "Designing premium yield-earning real estate syndicates that generate up to 12% annual dividend yields, accompanied by thorough quarterly reports and strict compliance.",
    web3DetailButton: "Invest With Us Today",
    web3Stat1Val: "12%",
    web3Stat1Lbl: "Expected Annual Yield",
    web3Stat2Val: "100%",
    web3Stat2Lbl: "Legal Compliance",

    // Building Section
    buildHeadingSmall: "03 / EXCELLENT CRAFTSMANSHIP",
    buildTitle: "How We Engineer Your Vision",
    buildSubtitle: "We guide our clients through comprehensive, step-by-step drafting and engineering milestones to guarantee top structural stability, timely delivery, and certified ROI.",
    step1Title: "01 / Structural Planning & Design",
    step1Desc: "We run comprehensive soil analysis and audit architectural drafts against sustainable building laws to secure immediate regulatory approvals in Jeddah.",
    step1Metric: "100% Drafting Accuracy",
    step2Title: "02 / Premium Construction & Finishing",
    step2Desc: "Supervised by licensed engineering crews pouring concrete, embedding high grade insulation, and executing state-of-the-art cladding to deliver exceptional finishes.",
    step2Metric: "Certified Engineering Audit",
    step3Title: "03 / Handover & Property Management",
    step3Desc: "Handing over completed structures with official utility certificates, building deeds, and 20-year warranties. Offering optional management services to maximize occupancies.",
    step3Metric: "Enduring Asset Safety",
    buildRoadmapHeader: "CRAFTSMANSHIP ROADMAP",
    buildRoadmapBtn: "Request Phase Blueprint",

    // Advisory Section
    adviseHeadingSmall: "04 / IMMEDIATE INDUCTION ADVISORY",
    adviseTitle: "Ownership Alignment Planner",
    adviseSubtitle: "Tell us about your residential goals or investment ticket size to instantly generate a professional engineering-consulting route in Jeddah.",
    adviseServiceLabel: "1. Select Property Services Required",
    adviseScaleLabel: "2. Focus Area & Target Category",
    advisePathwayHeader: "PROPOSED ALIGNMENT PATHWAY",
    advisePlaceholder: "Select services and focus areas to activate the dynamic consulting pathway generator...",
    adviseActiveTitle: "Secure Trends Integration Blueprint",
    adviseBullet1: "Direct matchmaking with a certified building inspector and property advisor in Jeddah",
    adviseBullet2: "Engineering audit and absolute alignment with the Saudi Building Code (SBC)",
    adviseBullet3: "Direct developer access, high yield opportunities, and optional management solutions",
    adviseEstimate: "Estimated session scheduling: Within 24 hours",
    adviseCta: "Launch Consultation Hub",

    // Chat Drawer
    chatTitle: "Secure Trends Concierge",
    chatStatus: "Active 24/7 Online",
    chatInputPlaceholder: "Write your property or building query...",
    chatInputOverlay: "Connect",
    chatButtonHeader: "Inquire Now",
    chatChip1: "📊 Real Estate Investing",
    chatChip1Query: "I would like to explore luxury property investment projects and expected annual returns.",
    chatChip2: "🏗️ Construction Standards",
    chatChip2Query: "What structural warranties and finishing guarantees are provided for residential villas?",
    chatChip3: "🔍 Inspection & Audit",
    chatChip3Query: "I'm interested in booking a certified property and building safety audit in Jeddah.",
  },
  ar: {
    // Navbar
    vision: "رؤيتنا الاستراتيجية",
    investment: "مسارات الاستثمار",
    projects: "مشاريع التشييد",
    advisory: "مستشار التملك",
    info: "نشط",
    mail: "بريد",
    contactAdvisor: "محادثة المستشار",
    contactAdvisorShort: "محادثة",
    logoName: "الاتجاهات الآمنة",

    // Hero
    heroTitle: "الاتجاهات الآمنة\nريادة الحلول العقارية",
    heroSubtitle: "نصنع قيمة مستدامة بالاستثمار والتطوير والمقاولات الموجهة بدقة وأمان. نوفر تملكاً فاخراً وحلولاً تشغيلية واعدة بمدينة جدة، المملكة العربية السعودية.",
    ctaConsult: "تحديثات مستشارنا",
    ctaExplore: "استكشف رؤيتنا",
    heroBottomTag: "استثمار. تشييد. استشارات.",

    // Story Section
    storyHeadingSmall: "٠١ / رؤيتنا الاستراتيجية",
    storyTitle: "تطوير وتشييد نخبوّي موجه بدقة الأمان الإنشائي.",
    storyP1: "تأسست \"الاتجاهات الآمنة\" في مدينة جدة على مبدأ رصين يرى أن التطوير العقاري شراكة متكاملة تبدأ من دراسة المواقع واختيار أجود مواد البناء، لتقديم واجهات ممتازة ومساكن فاخرة للمستثمرين والأسر النخبوية بالمدينة.",
    storyP2: "عبر المواءمة بين الفهم الفني العميق وبين جودة التنفيذ للفرق المعتمدة؛ نعمل كجدار حماية حقيقي لتقديم فلل وأصول معمارية متينة ومطابقة تماماً لكود البناء السعودي مع ضمان استدامة العوائد التشغيلية.",

    // Investing Section
    investHeadingSmall: "٠٢ / الاستثمار والتطوير العقاري بجدة",
    investTitle: "مسارات وخيارات الاستثمار العقاري الآمن",
    pathway1Label: "المسار الأول",
    pathway1Title: "الفلل السكنية الفاخرة",
    pathway1Desc: "تصميم وبناء فلل سكنية بطرازات نجدية وحديثة راقية بمواصفات نخبوية وضمانات إنشائية ممتدة في أفضل أحياء مدينة جدة.",
    pathway2Label: "المسار الثاني",
    pathway2Title: "المرافق والعمائر التجارية",
    pathway2Desc: "تأسيس وهيكلة الأبراج المكتبية والمراكز التجارية والوحدات المتعددة الاستعمالات ذات عوائد التشغيل والربحية العالية بجدة.",
    pathway3Label: "المسار الثالث",
    pathway3Title: "ادخار واستثمار المحافظ",
    pathway3Desc: "هيكلة صناديق استثمارية ومحافظ مخصصة للأفراد والشركات لتنمية رأس المال من خلال الأصول العقارية الآمنة والمدرة للريع.",

    activeAnalyses: "تحليلات الفرص النشطة بجدة",
    
    deeptechDetailTitle: "تطوير طرازات معمارية نجدية وحديثة بجدة.",
    deeptechDetailDesc: "نخدم عموم الراغبين في بناء مساكن فاخرة وحصينة مع العزل المتكامل ومطابقة كود البناء السعودي بدقة تامة وضمانات تصل لعشرين عاماً على الهيكل والخرسانات.",
    deeptechDetailButton: "استفسر عن الوحدات السكنية",
    deeptechStat1Val: "٢٠ سنة",
    deeptechStat1Lbl: "الضمان الإنشائي",
    deeptechStat2Val: "١٤٠+",
    deeptechStat2Lbl: "عملاء تم خدمتهم",

    spatialDetailTitle: "أصول تجارية ومراكز حيوية تضمن التدفقات النقدية.",
    spatialDetailDesc: "نتبنى تطوير وهيكلة مبانٍ مكتبية ومعارض تجارية تسوق لعلاماتكم بقوة مع أنظمة مواقف ذكية وتكييف مركزي متناسق بوسط جدة التجاري.",
    spatialDetailButton: "ناقش المسار التجاري",
    spatialStat1Val: "٢٤ مليون",
    spatialStat1Lbl: "المحفظة المنفذة",
    spatialStat2Val: "٩ أبراج",
    spatialStat2Lbl: "مشاريع قيد التشغيل",

    web3DetailTitle: "ادخار ذكي ومستدام بعيد عن تقلبات الأسواق المباشرة.",
    web3DetailDesc: "صممنا منتجات وصناديق شراكة عقارية آمنة تمنح رواد الأعمال والمستثمرين عوائد تشغيلية تصل إلى ١٢٪ سنوياً مع تقديم تقارير دورية وامتثال قانوني مطلق.",
    web3DetailButton: "استثمر معنا اليوم",
    web3Stat1Val: "١٢٪",
    web3Stat1Lbl: "العائد السنوي المتوقع",
    web3Stat2Val: "١٠٠٪",
    web3Stat2Lbl: "أمان قانوني واعتماد",

    // Building Section
    buildHeadingSmall: "٠٣ / تشييد وتطوير عقاري",
    buildTitle: "كيف نشيد رؤيتكم معاً؟",
    buildSubtitle: "نعمل يداً بيد مع عملائنا عبر مراحل هندسية وإجرائية متكاملة لضمان كفاءة البناء واستحقاق العوائد والتسليم في الوقت المحدد.",
    step1Title: "01 / التخطيط والدراسة الإنشائية",
    step1Desc: "ندرس الموقع فحصاً دقيقاً ونطابق المخططات المعمارية مع أفضل معايير البناء المستدام بجدة لضمان كفاءة التراخيص وسحريتها.",
    step1Metric: "دقة تخطيط ١٠٠٪",
    step2Title: "02 / التشييد والتشطيب النخبوي",
    step2Desc: "نشرف وننفذ بفرق فنية مرخصة مع صب الخرسانات وعزل المباني بأحدث المواد لتسليم جودة تشطيب ممتازة تليق بوسطنا العمراني.",
    step2Metric: "إشراف هندسي متكامل",
    step3Title: "03 / التسليم القانوني وإدارة الأملاك",
    step3Desc: "نسلم الأصول بكافة وثائق الضمانات وتراخيص التشغيل والمسح العقاري، مع توفير خيارات حصرية لإدارة الأملاك لتعظيم العوائد الاستثمارية للعميل.",
    step3Metric: "أمان واستمرارية",
    buildRoadmapHeader: "مخطط تطبيقي لمرحلة البناء",
    buildRoadmapBtn: "اطلب دراسة تفصيلية للمرحلة",

    // Advisory Section
    adviseHeadingSmall: "٠٤ / مستشار التملك الفوري",
    adviseTitle: "مخطط الخدمات ومستشار التملك",
    adviseSubtitle: "شاركنا أهدافك الإنشائية أو الاستثمارية وسنولد لك مساراً استشارياً فورياً للحصول على تملك آمن وعوائد مستدامة بمدينة جدة.",
    adviseServiceLabel: "١. حدد نوع الخدمة العقارية المطلوبة",
    adviseScaleLabel: "٢. تصنيف العقار أو المشروع المستهدف",
    advisePathwayHeader: "مسار الخدمة والمطابقة المقترحة",
    advisePlaceholder: "الرجاء تحديد نوع الخدمة والتصنيف لتفعيل مولد المسار آلياً وتجهيز الاستشارة...",
    adviseActiveTitle: "مسار استشارات الاتجاهات الآمنة",
    adviseBullet1: "ربط مباشر مع مهندس ومستشار عقاري مرخص بجدة",
    adviseBullet2: "متابعة وتقويم هندسي معتمد وتطابق مع كود البناء",
    adviseBullet3: "طرح خيارات حصرية وإدارة أملاك عبر المطور مباشرة",
    adviseEstimate: "البدء المتوقع لجدولة الجلسة: خلال ٢٤ ساعة",
    adviseCta: "بدء محادثة مستشارنا المباشر",

    // Chat Drawer
    chatTitle: "مساعد الاتجاهات الآمنة",
    chatStatus: "نشط على مدار الساعة 24/7",
    chatInputPlaceholder: "اكتب استفسارك العقاري هنا...",
    chatInputOverlay: "تواصل",
    chatButtonHeader: "استفسر الآن",
    chatChip1: "📊 الاستثمار العقاري",
    chatChip1Query: "أرغب في الاطلاع على برامج الاستثمار والتطوير العقاري المتوفرة بجدة وحجم الأرباح السنوية.",
    chatChip2: "🏗️ معايير البناء والتشييد",
    chatChip2Query: "ما هي معايير التشطيب والضمانات التي توفرها شركة الاتجاهات الآمنة للفلل السكنية؟",
    chatChip3: "🔍 الفحص والتقييم العقاري",
    chatChip3Query: "أود حجز خدمة الفحص المباشر وتقييم سلامة المباني بمدينة جدة.",
  }
};

export default function App() {
  // Lang Toggle Integration (Default is Arabic)
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    const saved = localStorage.getItem('secure_trends_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'ar';
  });

  const t = translations[lang];

  const toggleLang = () => {
    const next = lang === 'en' ? 'ar' : 'en';
    setLang(next);
    localStorage.setItem('secure_trends_lang', next);
  };

  // Navigation & UI States
  const isDarkMode = true;
  const [isMailActive, setIsMailActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter states for visual simulation (user mockup + Create | Brand Intelligence)
  const [typedText, setTypedText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Synchronize typewriter language change
  useEffect(() => {
    setTypedText('');
    setSubIndex(0);
    setPhraseIdx(0);
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const phrases = lang === 'ar' ? [
      "البحث عن فلل فاخرة للأسر المخملية بجدة",
      "برامج الاستثمار العقاري المضمونة",
      "دراسة وتطوير الأراضي والمجمعات الفاخرة",
      "تقييم وفحص جودة الإنشاءات والتشطيب",
      "إدارة الأملاك بمستويات جودة عالمية"
    ] : [
      "Searching for luxury private villas in Jeddah",
      "Bespoke real estate development & high yields",
      "Structuring safe residential & commercial portfolios",
      "Certified builders & structural safety audits",
      "Premium property management & passive leasing"
    ];

    if (isFocused || chatInput) return;

    if (phraseIdx >= phrases.length) {
      setPhraseIdx(0);
      return;
    }

    const currentPhrase = phrases[phraseIdx];
    const typingSpeed = isDeleting ? 30 : 85;
    const pauseDelay = 1800; // Time in ms before starting deletion

    const handleType = () => {
      if (!isDeleting && subIndex < currentPhrase.length) {
        setTypedText(currentPhrase.substring(0, subIndex + 1));
        setSubIndex(prev => prev + 1);
      } else if (isDeleting && subIndex > 0) {
        setTypedText(currentPhrase.substring(0, subIndex - 1));
        setSubIndex(prev => prev - 1);
      } else if (!isDeleting && subIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), pauseDelay);
        return;
      } else if (isDeleting && subIndex === 0) {
        setIsDeleting(false);
        setPhraseIdx(prev => (prev + 1) % phrases.length);
      }
    };

    const timeout = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timeout);
  }, [subIndex, isDeleting, phraseIdx, isFocused, chatInput, lang]);

  // Synchronize welcome messages with language toggle
  useEffect(() => {
    setMessages([
      {
        id: `welcome-${lang}`,
        sender: 'concierge',
        text: lang === 'ar' 
          ? 'مرحباً بكم في الاتجاهات الآمنة للحلول العقارية في جدة. كيف يمكنني مساعدتكم اليوم في العثور على حلولكم العقارية الاستثمارية أو السكنية الفاخرة؟'
          : 'Welcome to Secure Trends Real Estate Solutions in Jeddah. How can I assist you today with luxury residential acquisition or high-yield commercial investments?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  }, [lang]);

  // Apply theme background and text colors to the page body smoothly
  useEffect(() => {
    const body = document.body;
    if (body) {
      if (isDarkMode) {
        body.style.backgroundColor = '#000000';
        body.style.color = '#ffffff';
      } else {
        body.style.backgroundColor = '#f4f4f5';
        body.style.color = '#18181b';
      }
    }
  }, [isDarkMode]);

  // Dynamic aesthetic class styles based on selected mode
  const glassClass = isDarkMode ? 'liquid-glass' : 'liquid-glass liquid-glass-light text-slate-900';
  const textTitleClass = isDarkMode ? 'text-white' : 'text-slate-900';
  const textSubClass = isDarkMode ? 'text-gray-350' : 'text-slate-700 font-normal';
  const textBodyClass = isDarkMode ? 'text-gray-300' : 'text-slate-800 font-light';
  const textMutedClass = isDarkMode ? 'text-gray-400' : 'text-slate-500 font-normal';
  const borderClass = isDarkMode ? 'border-white/15' : 'border-slate-300/60';
  const textMutedMonoClass = isDarkMode ? 'text-white/50' : 'text-slate-500 font-medium';
  
  // Interactive Investing state
  const [activeThesis, setActiveThesis] = useState<'deeptech' | 'spatial' | 'web3'>('deeptech');
  
  // Interactive Builder state
  const [builderStep, setBuilderStep] = useState(0);

  // Advisory Interactive flow state
  const [advisoryNeeds, setAdvisoryNeeds] = useState<string[]>([]);
  const [runwayScale, setRunwayScale] = useState<string>('');

  useEffect(() => {
    setAdvisoryNeeds([]);
    setRunwayScale(lang === 'ar' ? 'سكني شخصي' : 'Private Residential');
  }, [lang]);

  // Video and scroll synchronization refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const scrollPercentRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync video time to page scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      
      const rawPercent = scrollTop / docHeight;
      const clampedPercent = Math.min(Math.max(rawPercent, 0), 0.99);
      scrollPercentRef.current = clampedPercent;
      setScrollProgress(clampedPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    let animationFrameId: number;
    let currentPercent = 0;
    
    const updateVideoTime = () => {
      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration)) {
        // Smooth lerping to produce an elegant floating momentum feeling on scroll
        currentPercent += (scrollPercentRef.current - currentPercent) * 0.08;
        
        const targetTime = currentPercent * video.duration;
        const clampedTargetTime = Math.min(Math.max(targetTime, 0.01), video.duration - 0.05);
        
        // Critical performance check: ONLY set currentTime if the video is NOT already in a seeking stage.
        if (!video.seeking && Math.abs(video.currentTime - clampedTargetTime) > 0.03) {
          if (!video.paused) {
            video.pause();
          }
          video.currentTime = clampedTargetTime;
        }
      }
      animationFrameId = requestAnimationFrame(updateVideoTime);
    };
    
    animationFrameId = requestAnimationFrame(updateVideoTime);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Smooth Scroll Helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-configured Intelligent responses for Chat
  const handleConciergeResponse = (userInput: string) => {
    setIsTyping(true);
    setTimeout(() => {
      let reply = "";
      const lowerInput = userInput.toLowerCase();

      if (lang === 'ar') {
        if (lowerInput.includes('invest') || lowerInput.includes('funding') || lowerInput.includes('capital') || lowerInput.includes('استثمار') || lowerInput.includes('تمويل') || lowerInput.includes('شراء')) {
          reply = "أهلاً بك. في شركة الاتجاهات الآمنة للحلول العقارية بجدة، نقدم استشارات استثمارية مخصصة للفلل والعمائر التجارية تبدأ من قيمة استثمارية تبلغ 500 ألف ريال سعودي فأعلى، مع تقديم تسهيلات وضمانات معتمدة. هل ترغب في الاستفسار عن تفاصيل المسار الاستثماري؟";
        } else if (lowerInput.includes('build') || lowerInput.includes('studio') || lowerInput.includes('co-build') || lowerInput.includes('بناء') || lowerInput.includes('تطوير') || lowerInput.includes('تشطيب')) {
          reply = "أقسام التشييد ومشاريع التطوير لدينا تشرف عليها فرق هندسية سعودية مرخصة لضمان أقصى درجات جودة التشطيب والتسليم الفاخر. تواصل معنا لمراجعة كتالوج مشاريعنا المنفذة بجدة.";
        } else if (lowerInput.includes('advise') || lowerInput.includes('token') || lowerInput.includes('strategy') || lowerInput.includes('استشارة') || lowerInput.includes('موقع') || lowerInput.includes('تقييم')) {
          reply = "يسر مستشارينا تقديم خدمات فحص المباني والتقييم العقاري المعتمد دولياً وعبر منصة إيجار وملاّك في جدة. كيف يمكننا توجيهك اليوم بشكل مثالي؟";
        } else {
          reply = "نشكرك على اهتمامك بـ الاتجاهات الآمنة للحلول العقارية. تم استلام رسالتك، وسيقوم أحد مستشارينا العقاريين بفرع جدة بالتواصل معك خلال ساعتين لمناقشة أهدافك السكنية أو التجارية.";
        }
      } else {
        if (lowerInput.includes('invest') || lowerInput.includes('funding') || lowerInput.includes('capital') || lowerInput.includes('returns') || lowerInput.includes('buy')) {
          reply = "Welcome. At Secure Trends Real Estate Solutions, we offer bespoke investment advisory for custom villas and commercial blocks starting at SAR 500,000, with official development guarantees. Would you like to review active opportunities?";
        } else if (lowerInput.includes('build') || lowerInput.includes('studio') || lowerInput.includes('architecture') || lowerInput.includes('constructing') || lowerInput.includes('construct') || lowerInput.includes('finish')) {
          reply = "Our property development and contracting divisions are audited by licensed Saudi engineering units to ensure absolute finishing quality and SBC compliance. Feel free to request our active portfolio catalog.";
        } else if (lowerInput.includes('advise') || lowerInput.includes('report') || lowerInput.includes('strategy') || lowerInput.includes('valuation') || lowerInput.includes('audit') || lowerInput.includes('inspect')) {
          reply = "Our consultants are certified to deliver comprehensive structural inspection and international-standard valuation reports for Jeddah assets. How can we direct you today?";
        } else {
          reply = "Thank you for contacting Secure Trends Solutions. Your request has been logged. An expert property consultant from our Jeddah team will reach out within two hours.";
        }
      }

      setMessages(prev => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: 'concierge',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  // Fast-submit chip triggers
  const submitQueryChip = (chipText: string) => {
    const newMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: chipText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    handleConciergeResponse(chipText);
  };

  const handleSendMessage = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    const prevInput = chatInput;
    setChatInput('');
    handleConciergeResponse(prevInput);
  };

  const toggleAdvisoryNeed = (need: string) => {
    if (advisoryNeeds.includes(need)) {
      setAdvisoryNeeds(prev => prev.filter(n => n !== need));
    } else {
      setAdvisoryNeeds(prev => [...prev, need]);
    }
  };

  const startAdvisoryChat = () => {
    const summary = lang === 'ar'
       ? `أرغب في الحصول على استشارة عقارية لمجال: ${advisoryNeeds.join(', ')} بتصنيف عقار: ${runwayScale}.`
       : `I would like a premium property consultation regarding: ${advisoryNeeds.join(', ')} with focus area: ${runwayScale}.`;
    setIsChatOpen(true);
    submitQueryChip(summary);
  };

  const builderSteps = [
    {
      title: t.step1Title,
      desc: t.step1Desc,
      metric: t.step1Metric
    },
    {
      title: t.step2Title,
      desc: t.step2Desc,
      metric: t.step2Metric
    },
    {
      title: t.step3Title,
      desc: t.step3Desc,
      metric: t.step3Metric
    }
  ];

  // Services list and Category options depending on active language
  const servicesList = lang === 'ar' 
    ? ['فحص وتقييم إنشائي بجدة', 'استشارات استثمار عقاري', 'وساطة وتسويق معتمد', 'تشغيل وإدارة أملاك حرة']
    : ['Jeddah Structural Inspection', 'Real Estate Investment Consulting', 'Certified Brokerage & Marketing', 'Property Management & Operations'];

  const targetCategories = lang === 'ar'
    ? ['سكني شخصي', 'تجاري ربحي', 'محافظ عقارية']
    : ['Private Residential', 'Yield Commercial', 'Syndicated Portfolio'];

  return (
    <div 
      dir={lang === 'ar' ? 'rtl' : 'ltr'} 
      className={`relative min-h-screen flex flex-col overflow-x-hidden select-none pb-24 transition-colors duration-500 ${
        isDarkMode ? 'text-white' : 'text-slate-900'
      }`}
    >
      {/* Full-screen background video */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover -z-10 bg-black"
      />

      {/* Dynamic light/dark theme overlay on top of video backplate to secure readability */}
      <div className={`fixed inset-0 transition-all duration-500 -z-5 ${
        isDarkMode ? 'bg-black/30' : 'bg-white/45'
      }`} />

      {/* Floating scroll indicator lines */}
      <div className={`fixed top-1/2 -translate-y-1/2 flex flex-col gap-3 items-center z-40 hidden md:flex ${
        lang === 'ar' ? 'right-6' : 'left-6'
      }`}>
        <span className={`text-[10px] font-mono tracking-widest uppercase rotate-90 mb-6 ${
          isDarkMode ? 'text-white/40' : 'text-slate-500/70'
        }`}>SCROLL SYNC</span>
        <div className={`h-40 w-[2px] relative rounded-full overflow-hidden ${
          isDarkMode ? 'bg-white/10' : 'bg-slate-350 bg-slate-900/10'
        }`}>
          <div 
            className={`absolute top-0 left-0 w-full transition-all duration-75 ${
              isDarkMode ? 'bg-white' : 'bg-slate-900'
            }`}
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className={`text-[10px] font-mono mt-4 ${
          isDarkMode ? 'text-white/60' : 'text-slate-700'
        }`}>
          {Math.floor(scrollProgress * 100)}%
        </span>
      </div>

      {/* Navbar with horizontal padding */}
      <header id="navbar" className="w-full px-4 md:px-12 lg:px-16 pt-6 z-30">
        <div className={`${glassClass} rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between gap-4`}>
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`text-xl md:text-2xl font-black tracking-wide cursor-pointer hover:opacity-80 transition-all ${textTitleClass}`}
            style={{ fontFamily: lang === 'en' ? 'Cinzel, serif' : 'Cairo, sans-serif' }}
          >
            {t.logoName}
          </button>

          {/* Navigation Links (Responsive, All layout links recovered correctly!) */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 text-[10px] xs:text-xs md:text-sm font-semibold tracking-wide">
            <button
              onClick={() => scrollToSection('story')}
              className={`transition-colors duration-250 cursor-pointer ${
                isDarkMode ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {t.vision}
            </button>
            <button
              onClick={() => scrollToSection('investing')}
              className={`transition-colors duration-250 cursor-pointer ${
                isDarkMode ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {t.investment}
            </button>
            <button
              onClick={() => scrollToSection('building')}
              className={`transition-colors duration-250 cursor-pointer ${
                isDarkMode ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {t.projects}
            </button>
            <button
              onClick={() => scrollToSection('advisory')}
              className={`transition-colors duration-250 cursor-pointer ${
                isDarkMode ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {t.advisory}
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Fancy Cohesive Lang Selector / Glassy Button */}
            <button
              onClick={toggleLang}
              className={`h-9 px-4 rounded-full flex items-center justify-center gap-2 text-xs font-bold transition-all relative overflow-hidden cursor-pointer shadow-lg active:scale-95 animate-shine-hover group ${
                isDarkMode 
                  ? 'glass-premium-btn text-white' 
                  : 'glass-premium-btn-light text-slate-900'
              }`}
              title={lang === 'en' ? "تغيير اللغة إلى العربية" : "Switch language to English"}
            >
              {/* Sliding glass reflection shine */}
              <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent shine-overlay pointer-events-none" />
              
              <Globe className="w-4 h-4 transition-transform duration-700 ease-out group-hover:rotate-45 text-amber-400 shrink-0" />
              <span className="tracking-wide">
                {lang === 'en' ? 'العربية' : 'EN'}
              </span>
            </button>

            {/* Custom 3D Glassmorphic Contact Switcher */}
            <div 
              onClick={() => {
                setIsMailActive(!isMailActive);
                setTimeout(() => {
                  window.location.href = 'mailto:osamadevlopment@gmail.com';
                }, 180);
              }}
              className="w-[105px] h-8 rounded-full relative cursor-pointer flex items-center justify-between px-3.5 text-[10px] font-bold tracking-widest select-none border border-white/10 bg-black/40 text-white/35 transition-all duration-300 hover:border-orange-500/25 shadow-inner"
              title="Contact osamadevlopment@gmail.com"
            >
              <span className={`z-10 transition-colors duration-350 ${!isMailActive ? 'text-white font-black' : ''}`}>{t.info}</span>
              <span className={`z-10 transition-colors duration-350 ${isMailActive ? 'text-orange-400 font-black' : ''}`}>{t.mail}</span>
              
              {/* Sliding Physical Refracted Glass Orb Sphere */}
              <div 
                className={`absolute top-0.5 w-[42px] h-[26px] rounded-full transition-all duration-300 flex items-center justify-center glass-orb ${
                  !isMailActive 
                    ? 'left-0.5' 
                    : 'left-[calc(100%-44px)]'
                }`}
              >
                {!isMailActive ? (
                  <MessageSquare className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                ) : (
                  <Mail className="w-3.5 h-3.5 text-orange-400 stroke-[2.5]" />
                )}
              </div>
            </div>

            {/* Right Action Button */}
            <button 
              onClick={() => setIsChatOpen(true)}
              className={`px-4 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-250 cursor-pointer flex items-center gap-1.5 shadow-xl hover:scale-103 shrink-0 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-slate-950 text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t.contactAdvisor}</span>
              <span className="xs:hidden">{t.contactAdvisorShort}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Content (First fold) */}
      <main className="min-h-[calc(100vh-100px)] px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 flex flex-col justify-end z-10 relative">
        <div className="w-full lg:grid lg:grid-cols-2 lg:items-end gap-12">
          {/* Column Checklist: Heading + Subtext + Primary CTA */}
          <div className="flex flex-col justify-end">
            <AnimatedHeading
              text={t.heroTitle}
              className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-6 leading-[1.1] ${textTitleClass}`}
            />

            <FadeIn delay={800} duration={1000} className="mb-10">
              <p className={`text-base md:text-lg leading-relaxed max-w-lg ${textMutedClass}`}>
                {t.heroSubtitle}
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000} className="flex flex-wrap gap-5 justify-start">
              <button 
                onClick={() => setIsChatOpen(true)}
                className={`px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 hover:scale-102 ${
                  isDarkMode 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-slate-950 text-white hover:bg-slate-800'
                }`}
              >
                {t.ctaConsult}
                <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>
              <button 
                onClick={() => scrollToSection('story')}
                className={`${glassClass} border ${borderClass} px-10 py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2`}
              >
                {t.ctaExplore}
                <ArrowDown className="w-5 h-5" />
              </button>
            </FadeIn>
          </div>

          {/* Right Column Checklist: Fancy alignment panel */}
          <div className={`flex items-end mt-12 lg:mt-0 ${lang === 'ar' ? 'lg:justify-start' : 'lg:justify-end'}`}>
            <FadeIn delay={1400} duration={1000}>
              <div 
                onClick={() => scrollToSection('investing')}
                className={`${glassClass} border ${borderClass} px-8 py-5 rounded-2xl cursor-pointer hover:opacity-90 transition-all`}
              >
                <span className={`text-xl md:text-2xl lg:text-3xl font-light tracking-tight block ${
                  isDarkMode ? 'text-white/90' : 'text-slate-800'
                }`} style={{ fontFamily: lang === 'en' ? 'Cinzel, serif' : 'Cairo, sans-serif' }}>
                  {t.heroBottomTag}
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </main>

      {/* 2. Story Section */}
      <section id="story" className="w-full px-6 md:px-12 lg:px-16 pt-36 pb-24 z-10 relative">
        <div className="max-w-4xl">
          <p className={`text-xs uppercase tracking-widest font-mono mb-4 ${textMutedMonoClass}`}>
            {t.storyHeadingSmall}
          </p>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 leading-tight ${textTitleClass}`} style={{ fontFamily: lang === 'en' ? 'Cinzel, serif' : 'Cairo, sans-serif' }}>
            {t.storyTitle}
          </h2>
          <div className={`grid md:grid-cols-2 gap-8 text-lg leading-relaxed font-light ${textBodyClass}`}>
            <p>{t.storyP1}</p>
            <p>{t.storyP2}</p>
          </div>
        </div>
      </section>

      {/* 3. Investing Section (Interactive) */}
      <section id="investing" className="w-full px-6 md:px-12 lg:px-16 pt-24 pb-24 z-10 relative">
        <div className="w-full">
          <p className={`text-xs uppercase tracking-widest font-mono mb-4 ${textMutedMonoClass}`}>
            {t.investHeadingSmall}
          </p>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-12 ${textTitleClass}`} style={{ fontFamily: lang === 'en' ? 'Cinzel, serif' : 'Cairo, sans-serif' }}>
            {t.investTitle}
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Thesis Menu cards */}
            <div 
              onClick={() => setActiveThesis('deeptech')}
              className={`${glassClass} rounded-2xl p-8 border cursor-pointer transition-all duration-300 ${
                activeThesis === 'deeptech' 
                  ? (isDarkMode ? 'border-white bg-white/5 shadow-2xl scale-[1.02]' : 'border-slate-900 bg-slate-900/5 shadow-xl scale-[1.02]') 
                  : (isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-slate-350 hover:border-slate-500')
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  isDarkMode ? 'bg-white/10 text-white/80' : 'bg-slate-950/10 text-slate-800'
                }`}>{t.pathway1Label}</span>
                <TrendingUp className={`w-6 h-6 ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${textTitleClass}`}>{t.pathway1Title}</h3>
              <p className={`text-sm leading-relaxed ${textMutedClass}`}>{t.pathway1Desc}</p>
            </div>

            <div 
              onClick={() => setActiveThesis('spatial')}
              className={`${glassClass} rounded-2xl p-8 border cursor-pointer transition-all duration-300 ${
                activeThesis === 'spatial' 
                  ? (isDarkMode ? 'border-white bg-white/5 shadow-2xl scale-[1.02]' : 'border-slate-900 bg-slate-900/5 shadow-xl scale-[1.02]') 
                  : (isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-slate-350 hover:border-slate-500')
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  isDarkMode ? 'bg-white/10 text-white/80' : 'bg-slate-950/10 text-slate-800'
                }`}>{t.pathway2Label}</span>
                <Globe className={`w-6 h-6 ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${textTitleClass}`}>{t.pathway2Title}</h3>
              <p className={`text-sm leading-relaxed ${textMutedClass}`}>{t.pathway2Desc}</p>
            </div>

            <div 
              onClick={() => setActiveThesis('web3')}
              className={`${glassClass} rounded-2xl p-8 border cursor-pointer transition-all duration-300 ${
                activeThesis === 'web3' 
                  ? (isDarkMode ? 'border-white bg-white/5 shadow-2xl scale-[1.02]' : 'border-slate-900 bg-slate-900/5 shadow-xl scale-[1.02]') 
                  : (isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-slate-350 hover:border-slate-500')
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                  isDarkMode ? 'bg-white/10 text-white/80' : 'bg-slate-950/10 text-slate-800'
                }`}>{t.pathway3Label}</span>
                <Layers className={`w-6 h-6 ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${textTitleClass}`}>{t.pathway3Title}</h3>
              <p className={`text-sm leading-relaxed ${textMutedClass}`}>{t.pathway3Desc}</p>
            </div>
          </div>

          {/* Interactive Thesis Details display panel */}
          <div className={`mt-12 ${glassClass} border ${borderClass} rounded-3xl p-8 md:p-12`}>
            <h4 className={`text-xs font-mono uppercase tracking-widest mb-3 ${textMutedMonoClass}`}>
              {t.activeAnalyses}
            </h4>
            
            {activeThesis === 'deeptech' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h5 className={`text-2xl md:text-3xl font-normal mb-4 ${textTitleClass}`}>
                    {t.deeptechDetailTitle}
                  </h5>
                  <p className={`text-base mb-6 font-light ${textSubClass}`}>
                    {t.deeptechDetailDesc}
                  </p>
                  <button 
                    onClick={() => submitQueryChip(lang === 'ar' ? "أود الاستفسار عن فلل نجد ومشاريع الوحدات النخبوية السكنية." : "I would like to inquire about royal Najdi and premium modern residential villas.")}
                    className={`border transition-all px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${
                      isDarkMode 
                        ? 'border-white/20 text-white hover:bg-white hover:text-black' 
                        : 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {t.deeptechDetailButton}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-5 rounded-2xl border ${
                    isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-950/5 border-slate-900/10 text-slate-900'
                  }`}>
                    <span className="block text-2xl font-bold">{t.deeptechStat1Val}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-mono ${textMutedMonoClass}`}>{t.deeptechStat1Lbl}</span>
                  </div>
                  <div className={`p-5 rounded-2xl border ${
                    isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-950/5 border-slate-900/10 text-slate-900'
                  }`}>
                    <span className="block text-2xl font-bold">{t.deeptechStat2Val}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-mono ${textMutedMonoClass}`}>{t.deeptechStat2Lbl}</span>
                  </div>
                </div>
              </div>
            )}

            {activeThesis === 'spatial' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h5 className={`text-2xl md:text-3xl font-normal mb-4 ${textTitleClass}`}>
                    {t.spatialDetailTitle}
                  </h5>
                  <p className={`text-base mb-6 font-light ${textSubClass}`}>
                    {t.spatialDetailDesc}
                  </p>
                  <button 
                    onClick={() => submitQueryChip(lang === 'ar' ? "أرغب في الاطلاع على دراسة جدوى المشاريع التجارية المنفذة بجدة." : "I want to review the blueprints and yields of developed commercial centers.")}
                    className={`border transition-all px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${
                      isDarkMode 
                        ? 'border-white/20 text-white hover:bg-white hover:text-black' 
                        : 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {t.spatialDetailButton}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-5 rounded-2xl border ${
                    isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-950/5 border-slate-900/10 text-slate-900'
                  }`}>
                    <span className="block text-2xl font-bold">{t.spatialStat1Val}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-mono ${textMutedMonoClass}`}>{t.spatialStat1Lbl}</span>
                  </div>
                  <div className={`p-5 rounded-2xl border ${
                    isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-950/5 border-slate-900/10 text-slate-900'
                  }`}>
                    <span className="block text-2xl font-bold">{t.spatialStat2Val}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-mono ${textMutedMonoClass}`}>{t.spatialStat2Lbl}</span>
                  </div>
                </div>
              </div>
            )}

            {activeThesis === 'web3' && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h5 className={`text-2xl md:text-3xl font-normal mb-4 ${textTitleClass}`}>
                    {t.web3DetailTitle}
                  </h5>
                  <p className={`text-base mb-6 font-light ${textSubClass}`}>
                    {t.web3DetailDesc}
                  </p>
                  <button 
                    onClick={() => submitQueryChip(lang === 'ar' ? "أريد مناقشة الانضمام لصندوق الاستثمار العقاري الآمن." : "I am interested in joining your real-estate wealth syndication fund.")}
                    className={`border transition-all px-6 py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${
                      isDarkMode 
                        ? 'border-white/20 text-white hover:bg-white hover:text-black' 
                        : 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {t.web3DetailButton}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-5 rounded-2xl border ${
                    isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-950/5 border-slate-900/10 text-slate-900'
                  }`}>
                    <span className="block text-2xl font-bold">{t.web3Stat1Val}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-mono ${textMutedMonoClass}`}>{t.web3Stat1Lbl}</span>
                  </div>
                  <div className={`p-5 rounded-2xl border ${
                    isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-950/5 border-slate-900/10 text-slate-900'
                  }`}>
                    <span className="block text-2xl font-bold">{t.web3Stat2Val}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-mono ${textMutedMonoClass}`}>{t.web3Stat2Lbl}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Building Section (Interactive Studio Timeline) */}
      <section id="building" className="w-full px-6 md:px-12 lg:px-16 pt-24 pb-24 z-10 relative">
        <div className="w-full">
          <p className={`text-xs uppercase tracking-widest font-mono mb-4 ${textMutedMonoClass}`}>
            {t.buildHeadingSmall}
          </p>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 ${textTitleClass}`} style={{ fontFamily: lang === 'en' ? 'Cinzel, serif' : 'Cairo, sans-serif' }}>
            {t.buildTitle}
          </h2>
          <p className={`text-lg mb-12 max-w-2xl font-light ${textSubClass}`}>
            {t.buildSubtitle}
          </p>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Timeline Step selectors */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {builderSteps.map((step, idx) => (
                <div 
                  key={idx}
                  onClick={() => setBuilderStep(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    builderStep === idx 
                      ? (isDarkMode ? 'bg-white/10 border-white/45 translate-x-1.5 text-white' : 'bg-slate-900/10 border-slate-900/40 translate-x-1.5 text-slate-900 font-bold') 
                      : (isDarkMode ? 'bg-white/0 border-white/10 hover:border-white/25 text-white/75' : 'bg-slate-900/0 border-slate-350/60 hover:border-slate-400 text-slate-700')
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold">{step.title}</h4>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                      lang === 'ar' ? 'rotate-180' : ''
                    } ${
                      builderStep === idx 
                        ? 'text-orange-500' 
                        : (isDarkMode ? 'text-white/40' : 'text-slate-400')
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Timline Detail View Panel */}
            <div className={`lg:col-span-7 ${glassClass} border ${borderClass} p-8 rounded-3xl min-h-[300px] flex flex-col justify-between`}>
              <div>
                <span className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-widest mb-6 inline-block ${
                  isDarkMode ? 'bg-white/10 text-white/60' : 'bg-slate-950/10 text-slate-700 font-bold'
                }`}>
                  {t.buildRoadmapHeader}
                </span>
                <h3 className={`text-3xl font-normal mb-4 ${textTitleClass}`}>
                  {builderSteps[builderStep].title.split('/')[1]?.trim() || builderSteps[builderStep].title}
                </h3>
                <p className={`text-lg leading-relaxed font-light mb-8 ${textSubClass}`}>
                  {builderSteps[builderStep].desc}
                </p>
              </div>

              <div className={`border-t pt-6 flex justify-between items-center flex-wrap gap-4 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className={`w-5 h-5 animate-pulse ${isDarkMode ? 'text-white/80' : 'text-slate-800'}`} />
                  <span className={`text-xs md:text-sm font-mono ${textMutedClass}`}>
                    {lang === 'ar' ? 'المستهدف: ' : 'Objective: '}
                    <strong className={`font-semibold ${textTitleClass}`}>{builderSteps[builderStep].metric}</strong>
                  </span>
                </div>
                <button 
                  onClick={() => submitQueryChip(lang === 'ar' ? `أرغب في معرفة تفاصيل إجرائية عن: ${builderSteps[builderStep].title}` : `I would like to receive blueprints and reports for: ${builderSteps[builderStep].title}`)}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-slate-950 text-white hover:bg-slate-800'
                  }`}
                >
                  {t.buildRoadmapBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Advisory Section (Custom Interactive Calculator Planner) */}
      <section id="advisory" className="w-full px-6 md:px-12 lg:px-16 pt-24 pb-24 z-10 relative">
        <div className="max-w-5xl">
          <p className={`text-xs uppercase tracking-widest font-mono mb-4 ${textMutedMonoClass}`}>
            {t.adviseHeadingSmall}
          </p>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 ${textTitleClass}`} style={{ fontFamily: lang === 'en' ? 'Cinzel, serif' : 'Cairo, sans-serif' }}>
            {t.adviseTitle}
          </h2>
          <p className={`text-lg mb-12 max-w-2xl font-light ${textSubClass}`}>
            {t.adviseSubtitle}
          </p>

          <div className={`${glassClass} border ${borderClass} p-8 md:p-12 rounded-3xl grid md:grid-cols-2 gap-12`}>
            {/* Planner Questionnaire */}
            <div className="flex flex-col gap-8">
              <div>
                <label className={`block text-xs md:text-sm font-mono tracking-wider uppercase mb-3 ${textMutedMonoClass}`}>
                  {t.adviseServiceLabel}
                </label>
                <div className="flex flex-wrap gap-3 justify-start">
                  {servicesList.map((need) => {
                    const isSelected = advisoryNeeds.includes(need);
                    return (
                      <button
                        key={need}
                        type="button"
                        onClick={() => toggleAdvisoryNeed(need)}
                        className={`px-4 py-2 rounded-lg text-sm border font-semibold transition-all cursor-pointer ${
                          isSelected 
                            ? (isDarkMode ? 'bg-white text-black border-white' : 'bg-slate-950 text-white border-slate-950')
                            : (isDarkMode ? 'bg-white/5 text-white/80 border-white/10 hover:border-white/25' : 'bg-slate-100 text-slate-800 border-slate-300 hover:border-slate-400')
                        }`}
                      >
                        {need}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className={`block text-xs md:text-sm font-mono tracking-wider uppercase mb-3 ${textMutedMonoClass}`}>
                  {t.adviseScaleLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {targetCategories.map((scale) => {
                    const isSelected = runwayScale === scale;
                    return (
                      <button
                        key={scale}
                        type="button"
                        onClick={() => setRunwayScale(scale)}
                        className={`py-2 px-1 rounded-lg text-xs font-mono border text-center transition-all cursor-pointer ${
                          isSelected 
                            ? (isDarkMode ? 'bg-white text-black border-white font-bold' : 'bg-slate-950 text-white border-slate-950 font-bold') 
                            : (isDarkMode ? 'bg-white/5 text-white/80 border-white/10 hover:border-white/20' : 'bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400')
                        }`}
                      >
                        {scale}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Generated Alignment Pathway */}
            <div className={`border p-6 md:p-8 rounded-2xl flex flex-col justify-between ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-950/5 border-slate-900/10'
            }`}>
              <div>
                <span className={`text-[10px] uppercase font-mono tracking-widest block mb-2 ${textMutedMonoClass}`}>
                  {t.advisePathwayHeader}
                </span>
                
                {advisoryNeeds.length === 0 ? (
                  <div className={`py-6 text-center font-light italic ${textMutedClass}`}>
                    {t.advisePlaceholder}
                  </div>
                ) : (
                  <div>
                    <h4 className={`text-xl font-bold mb-4 ${textTitleClass}`}>{t.adviseActiveTitle}</h4>
                    <ul className="space-y-3 mb-6">
                      <li className={`flex items-start gap-2.5 text-sm ${textSubClass}`}>
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
                        {t.adviseBullet1}
                      </li>
                      <li className={`flex items-start gap-2.5 text-sm ${textSubClass}`}>
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
                        {t.adviseBullet2}
                      </li>
                      <li className={`flex items-start gap-2.5 text-sm ${textSubClass}`}>
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
                        {t.adviseBullet3}
                      </li>
                    </ul>
                    <div className={`px-4 py-2.5 rounded border text-xs font-mono font-semibold ${
                      isDarkMode ? 'bg-white/5 border-white/5 text-white/80' : 'bg-slate-100 border-slate-200 text-slate-800'
                    }`}>
                      {t.adviseEstimate}
                    </div>
                  </div>
                )}
              </div>

              <div className={`mt-8 border-t pt-5 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                <button
                  type="button"
                  disabled={advisoryNeeds.length === 0}
                  onClick={startAdvisoryChat}
                  className={`w-full py-3 rounded-xl font-bold hover:scale-102 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-slate-950 text-white hover:bg-slate-850'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {t.adviseCta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button (Start a Chat) */}
      <div className={`fixed bottom-6 z-40 ${lang === 'ar' ? 'right-6' : 'left-6'}`}>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="bg-white text-black p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-250 cursor-pointer"
          title="Start Concierge Chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {/* 6. Fully Functional Sliding Chat Drawer */}
      <div 
        className={`fixed inset-y-0 z-50 bg-[#0c0c0c]/98 md:bg-[#080808]/95 backdrop-blur-3xl transition-transform duration-300 flex flex-col justify-between shadow-2xl transform w-full md:w-[480px] ${
          lang === 'ar' ? 'right-0 border-l' : 'left-0 border-r'
        } ${
          lang === 'ar' 
            ? (isChatOpen ? 'translate-x-0' : 'translate-x-full') 
            : (isChatOpen ? 'translate-x-0' : '-translate-x-full')
        } border-white/10`}
      >
        {/* Chat Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping animate-duration-1000" />
            <div>
              <h3 className="text-lg font-medium text-white tracking-tight">{t.chatTitle}</h3>
              <p className="text-[10px] font-mono text-white/50 uppercase">{t.chatStatus}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsChatOpen(false)}
            className="p-1 rounded hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Message Buffer */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.sender === 'user' 
                  ? (lang === 'ar' ? 'mr-auto items-start' : 'ml-auto items-end') 
                  : (lang === 'ar' ? 'ml-auto items-end' : 'mr-auto items-start')
              }`}
            >
              <div 
                className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-white text-black font-normal rounded-tl-none' 
                    : 'liquid-glass border border-white/10 text-white rounded-tr-none font-light'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] font-mono text-white/30 mt-1">{msg.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className={`flex flex-col max-w-[85%] ${lang === 'ar' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
              <div className="liquid-glass border border-white/10 p-3 rounded-2xl rounded-tr-none flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Quick query recommendation chips */}
        <div className="p-4 bg-white/2 border-t border-white/5 flex flex-wrap gap-2 justify-start">
          <button
            type="button"
            onClick={() => submitQueryChip(t.chatChip1Query)}
            className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 hover:border-white/35 hover:bg-white/5 transition-all text-white/70 cursor-pointer"
          >
            {t.chatChip1}
          </button>
          <button
            type="button"
            onClick={() => submitQueryChip(t.chatChip2Query)}
            className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 hover:border-white/35 hover:bg-white/5 transition-all text-white/70 cursor-pointer"
          >
            {t.chatChip2}
          </button>
          <button
            type="button"
            onClick={() => submitQueryChip(t.chatChip3Query)}
            className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 hover:border-white/35 hover:bg-white/5 transition-all text-white/70 cursor-pointer"
          >
            {t.chatChip3}
          </button>
        </div>

        {/* Chat Input Field container */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex flex-col gap-3 bg-[#0c0c0c]">
          <div className="relative flex items-center gap-3 w-full">
            {/* Main Interactive Input Wrapper with rounded-full styling */}
            <div className="relative flex-1 flex items-center bg-[#111113] border border-white/10 rounded-full h-[52px] px-5 focus-within:border-orange-500/50 transition-all duration-300 group overflow-hidden">
              
              {/* Overlay for Mockup Simulation when not typing & not focused */}
              {!chatInput && !isFocused && (
                <div 
                  onClick={() => {
                    setIsFocused(true);
                    chatInputRef.current?.focus();
                  }} 
                  className="absolute inset-0 z-10 flex items-center px-5 cursor-text select-none"
                >
                  {/* Dynamic Typwriter Word Array */}
                  <span className="text-white/60 text-sm font-medium tracking-wide truncate z-10 w-full pr-1">
                    {typedText}
                  </span>

                  {/* Glowing Orange Neon Separator / Interactive Cursor */}
                  <div className="w-[3px] h-4.5 orange-glowing-cursor rounded-full mx-3.5 animate-cursor-blink shrink-0 z-10" />

                  {/* Right Label: + tواصل / Connect */}
                  <div className="flex items-center gap-1.5 shrink-0 z-10">
                    <span className="text-orange-500 font-light text-base leading-none translate-y-[0.5px]">+</span>
                    <span className="text-white text-xs font-semibold uppercase tracking-wider">{t.chatInputOverlay}</span>
                  </div>
                  
                  {/* Glowing orange flashlight spotlight cone behind typed text */}
                  <div className="absolute top-0 bottom-0 w-[260px] orange-spotlight-box z-0" style={{ right: lang === 'ar' ? '82px' : 'auto', left: lang === 'en' ? '82px' : 'auto' }} />
                </div>
              )}

              {/* True Interactive element on top */}
              <input 
                ref={chatInputRef}
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFocused ? (lang === 'ar' ? "اكتب استفسارك العقاري هنا..." : "Type your real-estate inquiry here...") : ""}
                className="w-full bg-transparent border-none text-sm text-white placeholder-white/20 focus:outline-none focus:ring-0 font-light z-20 relative px-1 py-0.5"
              />
            </div>

            {/* Glowing Deep Amber Star Sparkle Send Capsule Button */}
            <div className="amber-glow-outer-ring p-[3px] rounded-full flex items-center justify-center shrink-0">
              <div className="amber-glow-mid-ring p-[2px] rounded-full">
                <button 
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="amber-glow-btn-core w-11 h-11 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title={lang === 'ar' ? "إرسال" : "Send"}
                >
                  <Sparkles className="w-5 h-5 text-orange-400 animate-pulse stroke-[2.3]" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
