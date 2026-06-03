import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Phone, ClipboardList, Info, CheckCircle, Share2, Printer, CalendarDays, ExternalLink, RefreshCw } from 'lucide-react';
import { servicesData, clinicHours } from '../data';

interface BookingFormProps {
  preselectedServiceId: string;
  preselectedSymptoms: string[];
  onResetPreselection: () => void;
}

export default function BookingForm({ 
  preselectedServiceId, 
  preselectedSymptoms,
  onResetPreselection 
}: BookingFormProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceId, setServiceId] = useState(servicesData[0].id);
  const [appointmentDay, setAppointmentDay] = useState('الأحد');
  const [appointmentTime, setAppointmentTime] = useState('6:00 مساءً - 8:00 مساءً');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [phoneError, setPhoneError] = useState('');

  // Handle outside preselection updates
  useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
      const element = document.getElementById('booking-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedSymptoms && preselectedSymptoms.length > 0) {
      setSymptoms(preselectedSymptoms);
    }
  }, [preselectedSymptoms]);

  // Available times based on clinics' shifts
  const getAvailableTimes = (day: string) => {
    if (day === 'الأحد' || day === 'الإثنين') {
      return ['6:00 مساءً', '7:00 مساءً', '8:00 مساءً', '9:00 مساءً', '10:00 مساءً'];
    }
    if (day === 'الأربعاء') {
      return ['7:00 مساءً', '8:00 مساءً', '9:00 مساءً', '10:00 مساءً'];
    }
    if (day === 'الخميس') {
      return ['5:00 مساءً', '6:00 مساءً', '7:00 مساءً', '8:00 مساءً', '9:00 مساءً'];
    }
    return ['موعد استثنائي (يرجى مراجعة إدارة العيادة)'];
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setAppointmentDay(selected);
    const times = getAvailableTimes(selected);
    setAppointmentTime(times[0]);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    
    // Simple validation for Egyptian phone (starts with 010, 011, 012, 015 or is 11 digits)
    if (val && !/^(010|011|012|015)[0-9]{8}$/.test(val)) {
      setPhoneError('يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً ويبدأ بـ 01');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');

    if (!fullName.trim()) {
      return;
    }

    if (!/^(010|011|012|015)[0-9]{8}$/.test(phone)) {
      setPhoneError('يرجى إدخال رقم هاتف مصري صحيح مكون من 11 رقماً ويبدأ بـ 01');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury API booking response
    setTimeout(() => {
      const selectedService = servicesData.find(s => s.id === serviceId);
      const randNum = Math.floor(100000 + Math.random() * 900000);
      const ticketId = `SH-${randNum}`;
      
      const newTicket = {
        ticketId,
        fullName,
        phone,
        serviceTitle: selectedService ? selectedService.title : 'استشارة عامة',
        appointmentDay,
        appointmentTime,
        symptoms: symptoms.length > 0 ? symptoms.join(' ، ') : 'لا يوجد',
        notes: notes || 'لا يوجد ملحوظات إضافية',
        createdDate: new Date().toLocaleDateString('ar-EG', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      };

      setTicketData(newTicket);
      setIsSubmitting(false);
    }, 1200);
  };

  // Pre-formatted Whatsapp message
  const triggerWhatsAppRedirect = () => {
    if (!ticketData) return;

    const text = `السلام عليكم ورحمة الله وبركاته،

أود تأكيد حجز موعد كشف في عيادة الدكتور شريف حسين.

البيانات الطبية للحجز:
- الكود المرجعي للطلب: [ ${ticketData.ticketId} ]
- اسم المريض بالكامل: ${ticketData.fullName}
- رقم الهاتف للمتابعة: ${ticketData.phone}
- الخدمة الطبية المطلوبة: ${ticketData.serviceTitle}
- يوم الحجز المختار: ${ticketData.appointmentDay}
- موعد الحضور التقريبي: ${ticketData.appointmentTime}
- الأعراض التي أشعر بها: ${ticketData.symptoms}
- ملاحظات شخصية: ${ticketData.notes}

تاريخ تقديم الطلب الرقمي: ${ticketData.createdDate}

أتمنى التفضل بمراجعة الطلب وإشعارنا بمطابقة التوقيت المتاح لبدء الكشف. شكراً جزيلاً لكم.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/201013004231?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setFullName('');
    setPhone('');
    setSymptoms([]);
    setNotes('');
    setTicketData(null);
    onResetPreselection();
  };

  return (
    <div id="booking-section" className="scroll-mt-24">
      <AnimatePresence mode="wait">
        {!ticketData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-6 lg:p-8 rounded-3xl border border-[#C8A45D]/20 shadow-xl relative overflow-hidden bg-white/95"
          >
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#0A2342]/5 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-[#C8A45D]/5 to-transparent rounded-tr-full pointer-events-none" />

            {/* Header titles */}
            <div className="text-center mb-8 relative">
              <span className="text-xs font-bold text-[#C8A45D] bg-[#0A2342]/10 py-1 px-4 rounded-full tracking-wider inline-block mb-3">
                أنظمة الحجز الرقمية الفاخرة
              </span>
              <h3 className="text-2xl font-bold text-[#0A2342] mb-2 font-display">تنسيق الموعد الطبي فوريًا</h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed">
                ادخل بياناتك للتأكيد الآلي المبدئي والحصول على رمز الموعد الخاص بك لإرساله مباشرة لإدارة العيادة
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative">
              {/* Service & Day Preselection Alert Indicator */}
              {preselectedServiceId && (
                <div className="bg-[#C8A45D]/10 border border-[#C8A45D]/30 p-3.5 rounded-xl flex items-center justify-between text-xs text-[#0A2342]">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C8A45D] animate-ping" />
                    <span>تم تخصيص الخدمة الطبية الموصى بها تلقائياً بناءً على محاكي الأعراض.</span>
                  </p>
                  <button 
                    type="button" 
                    onClick={onResetPreselection}
                    className="underline text-slate-500 hover:text-slate-800"
                  >
                    إعادة ضبط
                  </button>
                </div>
              )}

              {/* Group name and phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0A2342] mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C8A45D]" />
                    <span>اسم المريض بالكامل ثنائياً أو ثلاثياً *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: خالد الجميل"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A45D] focus:ring-2 focus:ring-[#C8A45D]/10 bg-white shadow-inner outline-none text-xs transition-all placeholder:text-slate-400 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A2342] mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C8A45D]" />
                    <span>رقم الهاتف الخلوي المصري (للتواصل والواتساب)*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 01013004231"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 bg-white shadow-inner outline-none text-xs transition-all placeholder:text-slate-400 text-slate-800 ${
                      phoneError 
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-100' 
                        : 'border-slate-200 focus:border-[#C8A45D] focus:ring-[#C8A45D]/10'
                    }`}
                  />
                  {phoneError ? (
                    <p className="text-[10px] text-red-600 mt-1 font-semibold">{phoneError}</p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-1">يجب أن يتكون الرقم من 11 خانة ويبدأ بـ 01</p>
                  )}
                </div>
              </div>

              {/* Grid service & preferred day */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-[#0A2342] mb-2 flex items-center gap-1.5">
                    <ClipboardList className="w-3.5 h-3.5 text-[#C8A45D]" />
                    <span>الخدمة الطبية المطلوبة</span>
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A45D] bg-white outline-none text-xs transition-all text-slate-800 cursor-pointer"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A2342] mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C8A45D]" />
                    <span>يوم الكشف المفضل المتاح بالعيادة</span>
                  </label>
                  <select
                    value={appointmentDay}
                    onChange={handleDayChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A45D] bg-white outline-none text-xs transition-all text-slate-800 cursor-pointer"
                  >
                    <option value="الأحد">الأحد (6 م - 11 م)</option>
                    <option value="الإثنين">الإثنين (6 م - 11 م)</option>
                    <option value="الأربعاء">الأربعاء (7 م - 11 م)</option>
                    <option value="الخميس">الخميس (5 م - 10 م)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A2342] mb-2 flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-[#C8A45D]" />
                    <span>توقيت الحضور التقريبي المفضل</span>
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A45D] bg-white outline-none text-xs transition-all text-slate-800 cursor-pointer"
                  >
                    {getAvailableTimes(appointmentDay).map((t, idx) => (
                      <option key={idx} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Detailed symptoms toggle or notes */}
              <div>
                <label className="block text-xs font-bold text-[#0A2342] mb-2">
                  هل تعاني من مشكلات حالية؟ (تحديد سريع للاطلاع قبل الكشف)
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {['ألم بالصدر', 'ارتفاع الضغط', 'ضيق تنفس', 'خفقان سريع', 'ضعف الساقين المتقطع'].map((symptomItem) => {
                    const isSelected = symptoms.includes(symptomItem);
                    return (
                      <button
                        type="button"
                        key={symptomItem}
                        onClick={() => {
                          if (isSelected) {
                            setSymptoms(symptoms.filter(s => s !== symptomItem));
                          } else {
                            setSymptoms([...symptoms, symptomItem]);
                          }
                        }}
                        className={`py-1.5 px-3 rounded-lg text-[11px] font-bold border transition-all ${
                          isSelected 
                            ? 'bg-[#0A2342] border-[#0A2342] text-white shadow-sm' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {symptomItem}
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0A2342] mb-2">
                    أو اكتب تاريخك المرضي باختصار شديد
                  </label>
                  <textarea
                    rows={2}
                    placeholder="مثل: أعاني من سكر مركب منذ 5 سنوات أو تم تركيب قسطرة سابقاً..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#C8A45D] focus:ring-2 focus:ring-[#C8A45D]/10 bg-white shadow-inner outline-none text-xs transition-all placeholder:text-slate-400 text-slate-800 resize-none"
                  />
                </div>
              </div>

              {/* Working hours reminder alert */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 flex gap-2.5 items-start">
                <Info className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 leading-normal">
                  بمجرد تأكيد طلبك، سنقوم بإنتاج <strong>تذكرة مراجعة حجز دورية</strong> لتقديمها فورياً لمدير العيادة عبر الواتساب لتأكيد مكانك دون الحاجة للانتظار الطويل. أيام الثلاثاء، الجمعة والسبت هي أيام تخص العمليات والقساطر الطارئة بالمراكز الطبية للدكتور.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2 relative overflow-hidden bg-gradient-to-r from-[#0A2342] to-[#14325a] hover:brightness-110 cursor-pointer`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-[#C8A45D]" />
                    <span>جاري معالجة الطلب وبناء تذكرتك الطبية...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-[#C8A45D]" />
                    <span>إرسال طلب الحجز آلياً وطباعة التذكرة</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          /* Visual Digital Confirmation Ticket */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="p-1 max-w-xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#0A2342] to-[#102D52] p-6 lg:p-8 rounded-3xl border-2 border-[#C8A45D] shadow-2xl text-white relative overflow-hidden ticket-to-print">
              {/* Radial background style */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(200,164,93,0.12),transparent_60%)] pointer-events-none" />
              
              {/* Ticket cut-outs visual decorations */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hidden md:block" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white hidden md:block" />
              
              {/* Barcode side visual design */}
              <div className="absolute bottom-6 right-6 left-6 border-t border-dashed border-white/20 pt-4 flex justify-between items-center flex-wrap gap-4">
                <div className="font-mono text-[9px] text-[#C8A45D] tracking-widest uppercase">
                  DR. SHERIF HUSSEIN - PATIENT RESERVATION SERVICE SYSTEM APPV1
                </div>
                <div className="bg-white/10 p-1 rounded">
                  {/* CSS Mock Barcode */}
                  <div className="flex gap-0.5 items-end h-7 w-28 px-1">
                    {[1,3,1,2,3,1,4,1,2,1,3,1,2,1,1,3,1,2].map((w, idx) => (
                      <div key={idx} className="bg-white h-full" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Branding Header */}
              <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-5">
                <div>
                  <h4 className="text-xl font-bold font-display text-[#C8A45D] flex items-center gap-2">
                    <span>عيادة الدكتور شريف حسين</span>
                  </h4>
                  <p className="text-[10px] text-slate-300 mt-0.5">المنصة الطبية للقسطرة الاستشارية والقلب</p>
                </div>
                <div className="bg-[#C8A45D] text-[#0A2342] font-mono text-xs font-black py-1 px-3.5 rounded-full border border-white/20">
                  {ticketData.ticketId}
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-[#C8A45D] text-xs font-bold tracking-widest uppercase mb-1">
                  تذكرة مراجعة موعد مبدئي
                </div>
                <h3 className="text-lg font-bold">تمت جدولة الطلب بنجاح</h3>
                <p className="text-[11px] text-slate-300 mt-1">يرجى الضغط على الزر الذهبي بالأسفل لإرسالها فوراً لمدير العيادة عبر واتساب</p>
              </div>

              <div className="space-y-4 text-xs mb-16">
                <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div>
                    <span className="text-slate-400 block text-[10px] mb-1">المريض الفاضل:</span>
                    <strong className="text-slate-50 block font-bold text-sm">{ticketData.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] mb-1">رقم الهاتف:</span>
                    <strong className="text-slate-50 block font-mono font-bold text-sm">{ticketData.phone}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block text-[10px] grid-cols-1">الخدمة المطلوبة:</span>
                    <span className="text-slate-50 font-semibold">{ticketData.serviceTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">تاريخ الموعد:</span>
                    <span className="text-[#C8A45D] font-bold block">{ticketData.appointmentDay}</span>
                    <span className="text-[11px] text-slate-300 block">{ticketData.appointmentTime}</span>
                  </div>
                </div>

                <div className="bg-white/5 p-3.5 rounded-xl text-[11px] space-y-2 leading-relaxed">
                  <div>
                    <span className="text-slate-300 font-bold">الأعراض: </span> 
                    <span className="text-slate-200">{ticketData.symptoms}</span>
                  </div>
                  <div>
                    <span className="text-slate-300 font-bold">ملحوظات: </span> 
                    <span className="text-slate-200">{ticketData.notes}</span>
                  </div>
                </div>

                <div className="text-right text-[10px] text-slate-400">
                  <span>تم التوثيق الرقمي في: {ticketData.createdDate}</span>
                </div>
              </div>

              {/* Action Buttons inside Ticket container */}
              <div className="space-y-3 relative z-10 no-print">
                <button
                  onClick={triggerWhatsAppRedirect}
                  className="w-full bg-[#C8A45D] hover:bg-[#B79350] text-[#0A2342] hover:text-white py-3.5 px-6 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98]"
                >
                  <Share2 className="w-4 h-4" />
                  <span>تأكيد الموعد عبر واتساب مباشر (01013004231)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handlePrint}
                    className="bg-white/10 hover:bg-white/15 text-white py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة التذكرة</span>
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-300 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1"
                  >
                    <span>طلب حجز جديد</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
