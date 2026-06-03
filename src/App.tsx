import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Activity, 
  Award, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ActivitySquare, 
  ArrowLeft, 
  Menu, 
  X, 
  Stethoscope, 
  AlertCircle, 
  Sparkles,
  Zap,
  ChevronLeft
} from 'lucide-react';

// Import our interactive modular sub-components
import ClinicStats from './components/ClinicStats';
import HeartAdvisor from './components/HeartAdvisor';
import BookingForm from './components/BookingForm';
import ClinicMap from './components/ClinicMap';

// Import our rich structured data
import { 
  servicesData, 
  reviewsData, 
  faqData, 
  clinicHours 
} from './data';

export default function App() {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Selected category in Medical Services Explorer
  const [activeCategory, setActiveCategory] = useState<'all' | 'diagnostic' | 'interventional' | 'valves' | 'pacemaker'>('all');
  
  // State for preselecting service from the Explorer or Symptom Advisor to pass to BookingForm
  const [bookingPreselectedService, setBookingPreselectedService] = useState('ecg');
  const [bookingPreselectedSymptoms, setBookingPreselectedSymptoms] = useState<string[]>([]);
  
  // Active states for Accordion FAQs
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq_1');
  
  // Selected Service Detail Modal / expanded card
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Active testimonial index for review section carousel or grid toggle
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Function to navigate patients directly to booking form with the chosen test
  const handleDirectServiceBooking = (serviceId: string, symptomsList: string[] = []) => {
    setBookingPreselectedService(serviceId);
    setBookingPreselectedSymptoms(symptomsList);
    
    // Smooth scroll down to registration
    const targetElement = document.getElementById('booking-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter services list
  const filteredServices = activeCategory === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-slate-900 selection:bg-[#C8A45D] selection:text-white relative">
      
      {/* Dynamic Background Pattern Decorator */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-[#0A2342] to-[#0D2E55] text-white -z-10 overflow-hidden">
        {/* Subtle Heart Rate Graph Graphic */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="heart-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#heart-grid)" />
          </svg>
        </div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C8A45D]/10 rounded-full blur-[120px]" />
        <div className="absolute top-96 -right-32 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px]" />
      </div>

      {/* STICKY NAV BAR */}
      <header className="sticky top-0 z-50 transition-all duration-300">
        <div className="glass-panel-dark text-white shadow-lg mx-3 lg:mx-12 mt-3 rounded-2xl border-b border-[#C8A45D]/20 px-4 py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Elegant Clinic Logo with heart S design */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 bg-gradient-to-br from-[#C8A45D] to-[#EEDAA2] p-0.5 rounded-xl shadow-md overflow-hidden flex items-center justify-center">
                {/* Visual SVG heartbeat integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/90 to-transparent z-10" />
                <svg className="w-8 h-8 text-white relative z-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {/* Heart path blended with S curve + pulse */}
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2.5" 
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                    className="stroke-[#0A2342]"
                  />
                  {/* Subtle S character inside */}
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M10 8c1-.5 2 0 2 1s-1 1.5-2 2a1.5 1.5 0 001.5 2"
                    className="stroke-white"
                  />
                </svg>
              </div>
              <div className="text-right">
                <span className="block text-sm lg:text-base font-extrabold text-white tracking-wide font-display group-hover:text-[#C8A45D] transition-colors">
                  عيادة الدكتور شريف حسين
                </span>
                <span className="block text-[9px] text-slate-300">استشاري القلب والأوعية الدموية والقسطرة</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold">
              <a href="#about-dr" className="text-slate-200 hover:text-[#C8A45D] transition-colors">عن الطبيب</a>
              <a href="#services-hub" className="text-slate-200 hover:text-[#C8A45D] transition-colors">الخدمات الطبية</a>
              <a href="#symptom-analyzer" className="text-slate-200 hover:text-[#C8A45D] transition-colors">مساعد صحة القلب</a>
              <a href="#faq" className="text-slate-200 hover:text-[#C8A45D] transition-colors">الأسئلة الشائعة</a>
              <a href="#clinic-location" className="text-slate-200 hover:text-[#C8A45D] transition-colors">موقعنا بمصر الجديدة</a>
            </nav>

            {/* Top Bar CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a 
                href="#booking-section"
                className="bg-[#C8A45D] hover:bg-[#B79350] text-[#0A2342] font-extrabold text-xs py-2 px-5 rounded-xl transition-all shadow-md hover:scale-[1.02] duration-300"
              >
                📅 احجز موعدك الآن
              </a>
              <a 
                href="tel:01013004231"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs py-2 px-4 rounded-xl transition-all border border-white/10"
              >
                📞 اتصل بنا
              </a>
            </div>

            {/* Mobile Hamburger menu */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:text-[#C8A45D] p-2 focus:outline-none focus:ring-1 focus:ring-[#C8A45D]/30 rounded-lg transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 mx-3 mt-1 bg-[#0A2342] border border-[#C8A45D]/30 p-5 rounded-2xl shadow-2xl text-white block md:hidden z-50 text-right space-y-4"
            >
              <nav className="flex flex-col gap-4 text-sm font-semibold border-b border-white/15 pb-4">
                <a 
                  href="#about-dr" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#C8A45D]"
                >
                  عن الطبيب دكتور شريف
                </a>
                <a 
                  href="#services-hub" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#C8A45D]"
                >
                  الخدمات والأشعة المتوفرة
                </a>
                <a 
                  href="#symptom-analyzer" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#C8A45D]"
                >
                  مساعد صحة القلب التفاعلي
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#C8A45D]"
                >
                  الأسئلة الشائعة للمرضى
                </a>
                <a 
                  href="#clinic-location" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#C8A45D]"
                >
                  عنوان العيادة والمواعيد
                </a>
              </nav>

              <div className="flex flex-col gap-2 pt-2">
                <a 
                  href="#booking-section"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#C8A45D] hover:bg-[#B79350] text-[#0A2342] text-center font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md inline-block w-full"
                >
                  📅 احجز موعدك بالعيادة الآن
                </a>
                <div className="grid grid-cols-2 gap-2">
                  <a 
                    href="tel:01013004231"
                    className="bg-white/10 text-white text-center font-semibold text-xs py-3 px-3 rounded-lg transition-all border border-white/5 inline-block"
                  >
                    📞 اتصل بالعيادة
                  </a>
                  <a 
                    href="https://wa.me/201013004231"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 text-white text-center font-semibold text-xs py-3 px-3 rounded-lg transition-all inline-block"
                  >
                    💬 واتساب مباشر
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-8 lg:pt-16 pb-16 lg:pb-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Bio Text - Right details on desktop for Arabic RTL layout */}
          <div className="lg:col-span-7 text-white text-right space-y-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#C8A45D]/15 border border-[#C8A45D]/35 py-1.5 px-3.5 rounded-full text-xs text-[#C8A45D] font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>استشاري أمراض وعلاجات صمامات وشرايين القلب بالقسطرة والبالون</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight lg:leading-tight font-display text-white"
            >
              خبرة متقدمة في تشخيص وعلاج <br />
              <span className="text-[#C8A45D] animate-gold-shine">أمراض القلب والشرايين والقسطرة التداخلية</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-100 text-xs lg:text-sm leading-relaxed max-w-2xl"
            >
              يجمع الدكتور شريف حسين في عيادته بمصر الجديدة بين أحدث الابتكارات الطبية العالمية لرصد نقص التروية، ضيق صمامات القلب، واضطرابات النبض، مستخدماً قساطر دقيقة تضمن التعافي السريع دون جراحات تقليدية مرهقة. حاصل على دكتوراه أمراض القلب، زمالة الكلية الأمريكية للقلب، وزميل الجمعية الأمريكية لقسطرة الأوعية الدموية.
            </motion.p>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-3 border-t border-b border-white/10 py-5 my-3 text-right"
            >
              <div>
                <strong className="block text-xl lg:text-2xl text-[#C8A45D] font-extrabold">+18 عاماً</strong>
                <span className="text-[10px] text-slate-300">الخبرة السريرية والأكاديمية</span>
              </div>
              <div className="border-r border-l border-white/10 px-4">
                <strong className="block text-xl lg:text-2xl text-[#C8A45D] font-extrabold">4.9 نجوم</strong>
                <span className="text-[10px] text-slate-300">أكثر من 571 رضا موثق</span>
              </div>
              <div>
                <strong className="block text-xl lg:text-2xl text-[#C8A45D] font-extrabold">100%</strong>
                <span className="text-[10px] text-slate-300">أمان القساطر التداخلية</span>
              </div>
            </motion.div>

            {/* CTA Buttons group */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <a
                href="#booking-section"
                className="bg-[#C8A45D] hover:bg-[#B79350] text-[#0A2342] font-black text-xs py-3.5 px-8 rounded-xl shadow-lg hover:scale-[1.02] duration-300 text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>📅 احجز موعدك الآمن الآن</span>
              </a>
              
              <div className="grid grid-cols-2 gap-3 sm:flex">
                <a
                  href="tel:01013004231"
                  className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs py-3.5 px-6 rounded-xl duration-300 text-center flex items-center justify-center gap-1.5"
                >
                  <span>📞 اتصل بالعيادة</span>
                </a>
                <a
                  href="https://wa.me/201013004231"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-emerald-600 text-white font-bold text-xs py-3.5 px-6 rounded-xl duration-300 text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>💬 واتساب مباشر</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Desktop Right side: Professional Doctor Avatar Design Overlay Card */}
          <div className="lg:col-span-5 relative flex justify-center mt-6 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-sm "
            >
              {/* Outer decorative gold ring circle glowing */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C8A45D] to-[#0A2342] rounded-[2rem] rotate-3 blur-sm -z-10 opacity-30 animate-pulse" />
              
              {/* Main doctor representation card layout */}
              <div className="bg-gradient-to-br from-[#0D2E55] to-[#0A2342] border-2 border-[#C8A45D]/30 p-6 rounded-[2rem] shadow-2xl relative text-right text-white">
                
                {/* Visual Medical abstract representation representing ECG and precision care */}
                <div className="rounded-2xl overflow-hidden bg-slate-900/40 border border-white/10 relative p-8 mb-6 h-64 flex flex-col justify-end">
                  <div className="absolute top-2 right-2 bg-[#C8A45D] text-[#0A2342] text-[10px] font-bold py-1 px-2.5 rounded-full z-10 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>نائب رئيس شعبة صمامات القلب</span>
                  </div>
                  
                  {/* Visual Background decorative elements */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <Stethoscope className="w-48 h-48 text-[#C8A45D]" />
                  </div>
                  
                  {/* Pulse signal vector graph animating */}
                  <div className="absolute bottom-12 left-0 right-0 h-16 pointer-events-none opacity-30 select-none">
                    <svg className="w-full h-full text-[#C8A45D]" viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d="M0,50 L80,50 L90,20 L100,80 L110,10 L120,50 L200,50 L210,35 L220,65 L230,50 L300,50" 
                        stroke="currentColor" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>

                  {/* Text over image block */}
                  <div className="relative z-10 text-right">
                    <span className="text-[10px] text-[#C8A45D] font-bold block">جمعية القلب المصرية & الجمعية الأمريكية</span>
                    <h3 className="text-xl font-bold font-display mt-1 text-white">د. شريف حسين</h3>
                    <p className="text-[11px] text-slate-300 mt-1">استشاري أمراض القلب والقسطرة والأشعة التخصصية</p>
                  </div>
                </div>

                {/* Bullet certification notes inside Card */}
                <div className="space-y-3 text-xs border-t border-white/10 pt-4">
                  <div className="flex gap-2.5 items-start">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <p className="text-slate-200">دكتوراه أمراض القلب والأوعية الدموية بالجامعات المصرية</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <p className="text-slate-200">زمالة الكلية الأمريكية للقلب بميريلاند (FACC)</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <p className="text-slate-200">زمالة الجمعية الأمريكية لقسطرة الشرايين والتداخلات العلاجية (SCAI)</p>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Check className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <p className="text-slate-200">محاضر معتمد للجمعية الأوروبية لإنعاش القلب والأوعية الدموية</p>
                  </div>
                </div>

                {/* Sub-card small sticker */}
                <div className="bg-white text-slate-900 p-3 rounded-xl mt-5 shadow-lg border border-[#C8A45D]/20 flex items-center gap-3">
                  <div className="p-2 bg-[#0A2342]/10 rounded-lg text-[#0A2342]">
                    <ActivitySquare className="w-5 h-5 text-[#0A2342]" />
                  </div>
                  <div className="text-right flex-1">
                    <span className="block text-[10px] text-slate-400 font-bold">العيادة الحالية بمصر الجديدة</span>
                    <span className="block text-xs font-bold text-[#0A2342]">بجوار كنيسة البازيليك، أمام سينما هليوبوليس</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* DETAILED STATS COUNTER */}
      <section className="bg-white py-12 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0A2342] font-display">لماذا يُعد عيادة دكتور شريف حسين الأفضل؟</h2>
            <p className="text-xs text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
              تكامل تشخيصي دقيق يبدأ من رسم القلب البسيط ويمتد لدعامات الشرايين الطرفية وعلاج اعتلال الصمامات
            </p>
          </div>
          
          {/* Animated statistical grid counter */}
          <ClinicStats />
        </div>
      </section>

      {/* BIOGRAPHY SECTION ABOUT THE DOCTOR */}
      <section id="about-dr" className="py-20 bg-slate-50 relative overflow-hidden">
        {/* Subtle shape decorator */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#0A2342]/5 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Biography details inside vector visual lists - Left Column */}
            <div className="lg:col-span-4 flex flex-col justify-center text-center lg:text-right relative">
              <div className="absolute left-1/2 lg:left-0 top-0 w-12 h-12 border-t-2 border-r-2 border-[#C8A45D] -translate-x-1/2 lg:translate-x-0" />
              
              <div className="pt-6">
                <span className="text-xs text-[#C8A45D] font-extrabold tracking-widest block mb-2">الشخصية الأبرز في علاجات الصمامات</span>
                <h3 className="text-3xl font-bold text-[#0A2342] font-display mb-4">الدكتور شريف حسين</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  نائب رئيس شعبة صمامات القلب بالجمعية المصرية للقلب، ويعتبر من الكفاءات الطبية الاستثنائية التي طورت الممارسات الميدانية لقصور الشرايين التاجية وعمليات توسيع الصمام الميترالي بالقسطرة.
                </p>
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border border-slate-200/50 shadow-md">
                <Quote className="w-10 h-10 text-[#C8A45D]/20 mb-3" />
                <p className="text-xs italic text-slate-700 leading-relaxed font-medium">
                  "إن كفاءة الطبيب ليست مجرد مهارة يدوية بالعمليات والقسطرة، بل تبدأ من الإنصات الدقيق لنبض شكوى المريض، وبناء خطة علاجية مخصصة تجنبه التدخلات غير الضرورية."
                </p>
                <span className="block text-[10px] text-slate-400 font-bold mt-3 text-left">— دكتور شريف حسين</span>
              </div>
            </div>

            {/* Structured certifications list - Right Column */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-6 lg:p-10 rounded-3xl border border-slate-200/50 shadow-xl relative">
                <div className="absolute top-0 left-0 bg-[#0A2342] text-[#C8A45D] py-1 px-4 text-[10px] font-black rounded-br-2xl uppercase">
                  العضوية والأوسمة الأكاديمية
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  
                  {/* Bio block 1 */}
                  <div className="flex gap-3 items-start">
                    <div className="bg-[#C8A45D]/10 p-2.5 rounded-lg text-[#C8A45D] shrink-0 mt-0.5">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A2342]">دكتوراه أمراض القلب والأوعية الدموية</h4>
                      <p className="text-xs text-slate-500 leading-normal mt-1">
                        أرفع مرجع علمي تخصصي في علاج ضغط الدم، والاعتلالات التاجية، وفشل عضلة القلب المتقدم والانتكاسات الحادة.
                      </p>
                    </div>
                  </div>

                  {/* Bio block 2 */}
                  <div className="flex gap-3 items-start">
                    <div className="bg-[#C8A45D]/10 p-2.5 rounded-lg text-[#C8A45D] shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A2342]">زمالة الكلية الأمريكية للقلب (FACC)</h4>
                      <p className="text-xs text-slate-500 leading-normal mt-1">
                        أعرق زمالة قلب عالمية في تشخيص اضطرابات النبض ووصف حلول القساطر التوسيعية والوقوف على أحدث البرتوكولات.
                      </p>
                    </div>
                  </div>

                  {/* Bio block 3 */}
                  <div className="flex gap-3 items-start">
                    <div className="bg-[#C8A45D]/10 p-2.5 rounded-lg text-[#C8A45D] shrink-0 mt-0.5">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A2342]">زمالة الجمعية الأمريكية للقسطرة التداخلية (SCAI)</h4>
                      <p className="text-xs text-slate-500 leading-normal mt-1">
                        تثبت الكفاءة الجراحية اليدوية العالية في عمليات القسطرة التداخلية المستعجلة للشرايين التاجية والطرفية لمرضى السكري والاعتلال.
                      </p>
                    </div>
                  </div>

                  {/* Bio block 4 */}
                  <div className="flex gap-3 items-start">
                    <div className="bg-[#C8A45D]/10 p-2.5 rounded-lg text-[#C8A45D] shrink-0 mt-0.5">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0A2342]">رئاسة شعبة صمامات القلب المصرية</h4>
                      <p className="text-xs text-slate-500 leading-normal mt-1">
                        تولّى لسنوات منصب نائب رئيس شعبة صمامات القلب، لقيادة تدريب الأطباء ومتابعة مستجدات الصمامات بالقسطرة (TAVI).
                      </p>
                    </div>
                  </div>

                </div>

                {/* Additional academic items */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-8">
                  <span className="text-[10px] font-bold text-[#C8A45D] block mb-2 uppercase tracking-wide">تربّع ومشاركات في المؤتمرات الطبية بالخليج العربي ومصر:</span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 pr-4 list-disc">
                    <li>عضو الجمعية الأوروبية لأمراض القلب والقصور المزمن</li>
                    <li>عضو الجمعية الأوروبية لأطباء القسطرة والتدخلات التاجية وعلاج الانسداد</li>
                    <li>محاضر وخبير دولي معتمد للجمعية الأوروبية لأمراض الإنعاش القلبي الرئوي</li>
                    <li>طبيب ومستشار معتمد في مستشفيات مرموقة بالخليج العربي لرؤساء الأوعية الطرفية</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DETAILED MEDIC SERVICES SECTION */}
      <section id="services-hub" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          {/* Section titles */}
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#C8A45D] bg-[#0A2342]/10 py-1 px-3.5 rounded-full inline-block mb-3">
              رعاية قلبية متكاملة تضاهي أفضل مراكز القلب العالمية
            </span>
            <h2 className="text-3xl font-bold text-[#0A2342] font-display">خدمات تشخيص وعلاج القلب المتقدمة</h2>
            <p className="text-slate-500 text-xs max-w-lg mx-auto leading-relaxed mt-2">
              اضغط على التصنيف بالأسفل لاستعراض كافة الفحوصات المتوفرة والعمليات التداخلية المتاحة بالعيادة والمراكز التابعة
            </p>
          </div>

          {/* Categorization Tabs selectors */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
            {[
              { id: 'all', label: 'كل الخدمات والعمليات' },
              { id: 'diagnostic', label: 'الفحوصات العيادية التشخيصية' },
              { id: 'interventional', label: 'القسطرة التداخلية والتوسيع' },
              { id: 'valves', label: 'علاج صمامات القلب' },
              { id: 'pacemaker', label: 'كهرباء ومنظمات القلب' }
            ].map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#0A2342] border-[#0A2342] text-white shadow-md scale-105'
                      : 'border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100 hover:border-[#C8A45D] hover:text-[#0A2342]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Services grid displaying interactive details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => {
                const isExpanded = selectedServiceId === service.id;
                return (
                  <motion.div
                    key={service.id}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className={`p-6 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                      isExpanded
                        ? 'bg-slate-50 border-[#C8A45D] shadow-xl ring-1 ring-[#C8A45D] md:col-span-2'
                        : 'bg-white border-slate-200/70 hover:border-[#C8A45D]/50 hover:shadow-lg hover:y-[-2px]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-[#0A2342]/10 p-3 rounded-xl text-[#0A2342]">
                          <Activity className="w-5 h-5 text-[#C8A45D]" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          {service.category === 'diagnostic' ? 'التشخيص والفحوصات' :
                           service.category === 'interventional' ? 'قسطرة تداخلية' :
                           service.category === 'valves' ? 'صمامات القلب' : 'كهرباء ومنظمات'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#0A2342] mb-2 font-display">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Display detail bullet lists when clicked/expanded */}
                      {isExpanded && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-white p-4 rounded-xl border border-slate-200 mt-4 space-y-2 text-xs text-slate-600 leading-relaxed"
                        >
                          <strong className="text-[#0A2342] block mb-2 text-xs">تفاصيل الإجراء وكيفية التحضير:</strong>
                          {service.details.map((detail, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A45D] mt-1.5 shrink-0" />
                              <p>{detail}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-2 mt-6">
                      <button
                        onClick={() => setSelectedServiceId(isExpanded ? null : service.id)}
                        className="text-xs text-[#0A2342] hover:text-[#C8A45D] font-bold underline cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'عرض تفاصيل أقل' : 'اقرأ المزيد والتفاصيل'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <button
                        onClick={() => handleDirectServiceBooking(service.id)}
                        className="bg-[#0A2342] text-white hover:bg-[#C8A45D] hover:text-[#0A2342] py-2 px-4 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>حجز فوري</span>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* SYMPTOM ADVISOR & PRE-DIAGNOSTIC SECTION */}
      <section id="symptom-analyzer" className="py-20 bg-slate-100 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#C8A45D] bg-[#0A2342]/10 py-1 px-3.5 rounded-full inline-block mb-3">
              خدمة تثقيفية تفاعلية
            </span>
            <h2 className="text-3xl font-bold text-[#0A2342] font-display">مساعد تقييم الأعراض والتوصيات الأساسية</h2>
            <p className="text-slate-500 text-xs max-w-lg mx-auto leading-relaxed mt-2">
              إذا كنت تواجه أعراضًا قلبية، حددها بالأسفل للحصول على توجيه طبي احترافي وتعيين الفحص الأنسب مباشرة
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Heart assessment interactive component */}
            <HeartAdvisor onSelectServiceAndBook={handleDirectServiceBooking} />
          </div>
        </div>
      </section>

      {/* DETAILED WORKING HOURS & FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: FAQ Accordion list */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-[#C8A45D] bg-[#0A2342]/10 py-1 px-3 rounded-full inline-block mb-3">
                إجابات طبية تهمك
              </span>
              <h3 className="text-2xl font-bold text-[#0A2342] mb-6 font-display">الأسئلة الشائعة لأمراض وقسطرة القلب</h3>

              <div className="space-y-4">
                {faqData.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div 
                      key={faq.id} 
                      className={`border rounded-2xl transition-all duration-300 ${
                        isOpen 
                          ? 'border-[#C8A45D] bg-[#0A2342]/5 shadow-sm' 
                          : 'border-slate-200 bg-white hover:border-[#C8A45D]/45'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full text-right p-5 flex items-center justify-between gap-4 font-bold text-[#0A2342] text-xs sm:text-sm cursor-pointer"
                      >
                        <span className="font-display leading-snug">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-[#C8A45D] shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="p-5 pt-0 text-slate-600 text-[11px] sm:text-xs leading-relaxed border-t border-slate-100 pt-3">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Working Hours detailed card */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="bg-[#0A2342] text-white p-6 lg:p-8 rounded-3xl border border-[#C8A45D]/30 shadow-xl relative overflow-hidden h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-[10px] text-[#C8A45D] font-extrabold block">تنظيم مواعيد الفحوصات والاستشارات</span>
                      <h3 className="text-lg font-bold font-display text-white mt-1">جدول مواعيد وساعات عمل عيادة الكوربة</h3>
                    </div>
                    <div className="bg-[#C8A45D]/15 p-2 rounded-xl text-[#C8A45D]">
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs text-slate-100 mb-6">
                    {clinicHours.map((hour, idx) => (
                      <div 
                        key={idx} 
                        className={`flex justify-between items-center py-2 border-b border-white/5 ${
                          hour.isClosed ? 'opacity-50' : ''
                        }`}
                      >
                        <span className="font-bold flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${hour.isClosed ? 'bg-red-400' : 'bg-emerald-400'}`} />
                          {hour.day}
                        </span>
                        <span className={hour.isClosed ? 'text-red-300' : 'text-slate-200'}>
                          {hour.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0D2E55] p-4 rounded-xl border border-white/5 space-y-3 text-right">
                  <div className="flex gap-2.5 items-start">
                    <AlertCircle className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-300 leading-normal">
                      * يرجى العلم بأن أيام <strong>الثلاثاء، الجمعة والسبت</strong> مخصصة لحالات القسطرة الحرجة للمرضى المنومين بالمستشفيات والعمليات المستعجلة بالمراكز الطبية.
                    </p>
                  </div>
                  <a
                    href="#booking-section"
                    className="w-full bg-[#C8A45D] hover:bg-[#B79350] text-[#0A2342] hover:text-white text-center font-bold text-xs py-2.5 px-4 rounded-lg block transition-all"
                  >
                    حجز موعد عملي مباشر
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REVIEWS & RECOMMENDATIONS carousel/grid */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-96 h-96 bg-[#C8A45D]/5 rounded-full blur-[110px]" />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#C8A45D] bg-[#0A2342]/10 py-1 px-3 rounded-full inline-block mb-3">
              شهادات نعتز بها للتطوير الطبي المستمر
            </span>
            <h2 className="text-3xl font-bold text-[#0A2342] font-display">آراء المرضى وتجارب الشفاء الناجحة</h2>
            <p className="text-slate-500 text-xs mt-2 max-w-lg mx-auto">
              فخورون بثقتكم الغالية ومستمرون في العطاء بأعلى معايير الرعاية والضمير الطبي المهني
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsData.map((review) => (
              <motion.div
                key={review.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-md relative"
              >
                {/* Visual quote overlay */}
                <div className="absolute top-4 left-6 text-[#C8A45D]/10 text-6xl font-serif leading-none select-none">
                  “
                </div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <h4 className="text-sm font-bold text-[#0A2342]">{review.author}</h4>
                    <span className="text-[10px] text-[#C8A45D] block font-semibold mt-0.5">{review.relation}</span>
                  </div>
                  
                  {/* Rating gold stars */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal mb-4 relative z-10">
                  {review.text}
                </p>

                <div className="text-left text-[9px] text-slate-400">
                  <span>تاريخ المراجعة: {review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* BOOKING INTERACTIVE SECTION (FORM WRAPPER) */}
      <section className="py-20 bg-indigo-50/40 relative">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(circle_at_center,rgba(200,164,93,0.06),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          
          {/* Main Booking Form integration */}
          <BookingForm 
            preselectedServiceId={bookingPreselectedService} 
            preselectedSymptoms={bookingPreselectedSymptoms}
            onResetPreselection={() => {
              setBookingPreselectedService('ecg');
              setBookingPreselectedSymptoms([]);
            }}
          />

        </div>
      </section>

      {/* CLINIC DETAILED MAP DIRECTION SECTION */}
      <section id="clinic-location" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          {/* Component holding location guidance and route maps */}
          <ClinicMap />

        </div>
      </section>

      {/* DETAILED EDUCATIONAL & HEALTH ARTICLES / PREPARATION HUB */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h3 className="text-xl font-bold text-[#0A2342] font-display">توصيات وتحضيرات هامة قبل الكشف والعمليات</h3>
            <p className="text-xs text-slate-400 mt-1">توجيهات الدكتور شريف لضمان دقة فحوصات القلب المنزلية والعيادية والتحضير السليم</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Guide Card 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-[#C8A45D] font-bold block uppercase mb-1">قبل رسم القلب بالمجهود (Stress Test)</span>
              <h4 className="text-xs font-bold text-[#0A2342] mb-2 font-display">كيفية التحضير لفحص رسم المجهود</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                يرجى ارتداء ملابس رياضية قطنية مريحة وحذاء مناسب للمشي. يمتنع المريض عن تناول الوجبات الثقيلة والمشروبات التي تحتوي على الكافيين لـ 4 ساعات قبل الفحص، والتشاور مع الطبيب في إيقاف أدوية معينة قبلها بيوم.
              </p>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-[#C8A45D] font-bold block uppercase mb-1">قبل عمليات القسطرة التداخلية (PCI)</span>
              <h4 className="text-xs font-bold text-[#0A2342] mb-2 font-display">الاستعداد لعملية القسطرة وتركيب الدعامات</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                الصيام المطبق لـ 6 إلى 8 ساعات أمر بالغ الأهمية قبل القسطرة. استمر بتناول أدوية السيولة المتفق عليها واجلب معك كافة الفحوصات الطبية السابقة والتحاليل من وظائف الكلى وغيرها لتقديمها لفريق العلاج فورا.
              </p>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[10px] text-[#C8A45D] font-bold block uppercase mb-1">قياس ضغط الدم المنزلي الصحيح</span>
              <h4 className="text-xs font-bold text-[#0A2342] mb-2 font-display">نصائح لقياس دقيق لضغط الدم</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                اجلس مسترخياً لخميس دقائق هادئة قبل تفعيل الجهاز، مع تدعيم ظهرك وذراعك عند مستوى قلبك. يرجى الامتناع عن التدخين أو شرب الشاي والقهوة لمدة 30 دقيقة على الأقل قبل الفحص لتفادي قراءات الضغط المغلوطة.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A2342] text-white border-t border-[#C8A45D]/30 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 items-start">
            
            {/* Column 1: Info and logo */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#C8A45D] to-[#EEDAA2] p-0.5 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#0A2342]" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#C8A45D] font-display">عيادة الدكتور شريف حسين</h4>
                  <p className="text-[10px] text-slate-300">استشاري أمراض القلب والأوعية الدموية والقسطرة التداخلية</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                نسعي لتقديم أرقى مستويات الرعاية التشخيصية والعلاجية لقلب مريضنا بالجمع بين المعرفة الأكاديمية الراسخة والتدخلات الطبية متناهية الدقة في مصر والخليج العربي.
              </p>

              <div className="bg-[#0D2E55] p-3 rounded-xl border border-white/5 inline-flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-slate-300">طاقم الدعم والواتساب نشط للاستجابة السريعة</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#C8A45D] border-r-2 border-[#C8A45D] pr-2.5">
                الوصول السريع
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li><a href="#about-dr" className="hover:text-[#C8A45D] transition-colorsBlock">عن دكتور شريف</a></li>
                <li><a href="#services-hub" className="hover:text-[#C8A45D] transition-colorsBlock">الخدمات الطبية بالعيادة</a></li>
                <li><a href="#symptom-analyzer" className="hover:text-[#C8A45D] transition-colorsBlock">تحليل ومساعد الأعراض التفاعلي</a></li>
                <li><a href="#faq" className="hover:text-[#C8A45D] transition-colorsBlock">الأسئلة المتداولة الشائعة</a></li>
                <li><a href="#clinic-location" className="hover:text-[#C8A45D] transition-colorsBlock">موقع ومواعيد عيادة الكوربة</a></li>
              </ul>
            </div>

            {/* Column 3: Contacts */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#C8A45D] border-r-2 border-[#C8A45D] pr-2.5">
                تواصل مع إدارة العيادة فورا
              </h4>
              <p className="text-xs text-slate-300">نحن بانتظارك لتنسيق وتأكيد الحجز والإجابة على استفساراتك الطبية.</p>
              
              <div className="space-y-2.5 font-mono text-xs pt-2 text-slate-200">
                <a href="tel:01013004231" className="flex items-center gap-2 hover:text-[#C8A45D] transition-colors">
                  <Phone className="w-4 h-4 text-[#C8A45D]" />
                  <span>01013004231</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                  <span className="font-sans leading-normal">
                    2 شارع الفيوم، ميدان الكوربة، متفرع من شارع كليوباترا، مصر الجديدة، القاهرة، جمهورية مصر العربية.
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright notice */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-slate-400">
            <p className="text-center sm:text-right">
              © جميع الحقوق محفوظة لعيادة الدكتور شريف حسين {new Date().getFullYear()} م.
            </p>
            <div className="flex gap-4 text-[10px]">
              <span className="text-slate-500">منصة طبية فاخرة مؤمنة بنظام التشفير التام للبيانات الخاصة بالمرضى</span>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING DIRECT WHATSAPP AND ASSISTANCE CTA */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5">
        <a
          href="https://wa.me/201013004231?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D9%8A%D8%A7%20%D8%AF%D9%83%D8%AA%D9%88%D8%B1%20%D8%B4%D8%B1%D9%8A%D9%81...%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D9%85%D9%88%D8%B9%D8%AF%20%D9%83%D8%B4%D9%81%20%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9%20%D8%A7%D9%84%D9%82%D9%84%D8%A8"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group"
          title="تواصل معنا فوراً على الواتساب"
        >
          {/* Animate ring background to grab attention */}
          <span className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 -z-10" />
          
          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.49-3.214c1.611.956 3.197 1.467 4.861 1.468 5.582 0 10.126-4.544 10.129-10.13.002-2.705-1.037-5.247-2.929-7.143-1.891-1.895-4.406-2.938-7.116-2.939-5.586 0-10.132 4.544-10.136 10.13-.001 1.747.478 3.444 1.385 4.956l-.999 3.648 3.737-.98l.069.041zm11.215-7.739c-.114-.191-.416-.307-.831-.515-.417-.208-2.464-1.215-2.843-1.353-.379-.138-.655-.208-.831.056-.176.264-.679.846-.831 1.018-.152.172-.303.193-.718.016-.415-.208-1.751-.645-3.335-2.057-1.233-1.1-2.066-2.457-2.308-2.873-.243-.416-.026-.641.182-.847.187-.186.417-.485.624-.728.207-.243.276-.416.415-.693.14-.278.07-.52-.035-.728-.104-.208-.831-2-.138-2.709-.267-.263-.585-.31-.831-.31H7.817c-.379 0-.999.142-1.522.716-.522.574-1.999 1.955-1.999 4.773 0 2.818 2.053 5.54 2.338 5.922.285.382 4.042 6.174 9.8 8.654 1.37.59 2.44.943 3.272 1.207 1.376.438 2.63.376 3.619.228 1.103-.165 2.464-.813 2.81-1.6 1.353-.314.544-1.597.51-1.782z" />
          </svg>
        </a>
      </div>

    </div>
  );
}
