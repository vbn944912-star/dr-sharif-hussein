import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertOctagon, AlertTriangle, ShieldCheck, Heart, Info, ArrowRight, UserCheck } from 'lucide-react';
import { servicesData } from '../data';

interface Symptom {
  id: string;
  name: string;
  description: string;
  weight: 'critical' | 'important' | 'routine';
}

const symptomsList: Symptom[] = [
  {
    id: 'chest_pain',
    name: 'ألم أو ضغط أو ثقل عاصر في الصدر',
    description: 'يمتد أحياناً للكتف الأيسر، الفك، أو الظهر، ويزداد عند المجهود.',
    weight: 'critical'
  },
  {
    id: 'shortness_of_breath',
    name: 'ضيق أو صعوبة في التنفس',
    description: 'سواء مع بذل مجهود بسيط أو يمنعك من النوم مستوياً على الفراش.',
    weight: 'critical'
  },
  {
    id: 'palpitations',
    name: 'خفقان أو تسارع عشوائي في نبض الساقين أو الصدر',
    description: 'الشعور بنبضات قوية مفاجئة أو غير منتظمة وصدمات خفيفة في الصدر.',
    weight: 'important'
  },
  {
    id: 'dizziness',
    name: 'دوخة مفاجئة أو إغماء مؤقت',
    description: 'الشعور بهبوط حاد في الضغط أو فقدان توازن مفاجئ.',
    weight: 'critical'
  },
  {
    id: 'leg_swelling',
    name: 'تورم في القدمين أو الكاحلين',
    description: 'ارتشاح وتراكم السوائل في الأطراف السفلية بعد الوقوف أو خلال اليوم.',
    weight: 'important'
  },
  {
    id: 'claudication',
    name: 'ألم وتقلص شديد في عضلات الساق مع المشي',
    description: 'يختفي بمجرد التوقف عن الحركة (مؤشر لضيق الشرايين الطرفية).',
    weight: 'important'
  },
  {
    id: 'checkup',
    name: 'الرغبة في الاطمئنان الوقائي لمرضى المزمن',
    description: 'مرضى السكري، ضغط الدم المرتفع، الكوليسترول، أو من لديهم تاريخ وراثي عائلي.',
    weight: 'routine'
  }
];

interface HeartAdvisorProps {
  onSelectServiceAndBook: (serviceId: string, symptomsSelected: string[]) => void;
}

export default function HeartAdvisor({ onSelectServiceAndBook }: HeartAdvisorProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [calculated, setCalculated] = useState(false);

  const toggleSymptom = (id: string) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
    setCalculated(false);
  };

  const getUrgencyLevel = () => {
    const selectedObjects = symptomsList.filter(s => selectedSymptoms.includes(s.id));
    if (selectedObjects.some(s => s.weight === 'critical')) {
      return {
        level: 'critical',
        title: 'استشارة قلبية عاجلة / تدخل فوري',
        color: 'border-red-500 bg-red-50/90 text-red-950',
        textColor: 'text-red-700',
        badgeColor: 'bg-red-600 text-white',
        icon: <AlertOctagon className="w-8 h-8 text-red-600 shrink-0" />,
        recommendation: 'ننصحك بالتوجه الفوري لاستشارة الدكتور شريف حسين في العيادة لمناقشة عمل قسطرة تشخيصية أو رسم قلب فوري. في حالات الألم الشديد المستمر الكابت للصدر، يرجى التوجه فوراً لأقرب قسم طوارئ مجهز لقسطرة القلب الأولية PCI.',
        recommendedService: 'coronary_cath'
      };
    }
    if (selectedObjects.some(s => s.weight === 'important')) {
      return {
        level: 'important',
        title: 'موعد متقدم مع استشاري القلب',
        color: 'border-amber-500 bg-amber-50/90 text-amber-950',
        textColor: 'text-amber-800',
        badgeColor: 'bg-amber-600 text-white',
        icon: <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />,
        recommendation: 'يجب جدولة فحص دوري دقيق في أقرب وقت. يوصى بإجراء موجات فوق صوتية على القلب (إيكو) ورسم قلب بالمجهود أو مراقبة بالهولتر لتحديد سبب الأعراض ووصف العلاج المناسب للشرايين أو النبض.',
        recommendedService: 'echo'
      };
    }
    return {
      level: 'routine',
      title: 'فحص وقائي وتقييم دوري',
      color: 'border-[#C8A45D] bg-indigo-50/50 text-[#0A2342]',
      textColor: 'text-[#C8A45D]',
      badgeColor: 'bg-[#C8A45D] text-white',
      icon: <ShieldCheck className="w-8 h-8 text-[#C8A45D] shrink-0" />,
      recommendation: 'حالتك تبدو مستقرة، ولكن الفحص والاطمئنان الوقائي لمرضى السكري والضغط والمحرضات الوراثية يمنع أزمات عضلات القلب مسبقاً. يوصى بعمل فحص شامل لضغط الدم ورسم قلب روتيني.',
      recommendedService: 'ecg'
    };
  };

  const result = getUrgencyLevel();
  const matchedService = servicesData.find(s => s.id === result.recommendedService);

  return (
    <div className="glass-panel rounded-3xl p-6 lg:p-8 shadow-xl border border-[#C8A45D]/15 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#C8A45D]/5 to-transparent rounded-tr-full pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-[#0A2342] to-[#1E3E66] rounded-2xl shadow-md">
          <Heart className="w-6 h-6 text-[#C8A45D]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0A2342] font-display">مساعد صحة القلب التفاعلي</h3>
          <p className="text-xs text-slate-500">حدد ما تشعر به لتتعرف على التقييم الأولي والخدمة الطبية المطلوبة</p>
        </div>
      </div>

      <p className="text-sm font-semibold text-[#0A2342] mb-4">اختر الأعراض أو العوامل التي تعاني منها حالياً:</p>

      <div className="space-y-3 mb-6">
        {symptomsList.map((symptom) => {
          const isSelected = selectedSymptoms.includes(symptom.id);
          return (
            <button
              key={symptom.id}
              onClick={() => toggleSymptom(symptom.id)}
              className={`w-full text-right p-4 rounded-xl border transition-all duration-300 flex items-start gap-3 relative overflow-hidden ${
                isSelected
                  ? 'border-[#C8A45D] bg-[#0A2342]/5 shadow-sm'
                  : 'border-slate-200/60 bg-white/70 hover:border-[#C8A45D]/40 hover:bg-white'
              }`}
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                isSelected ? 'bg-[#C8A45D] border-[#C8A45D]' : 'border-slate-300'
              }`}>
                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              
              <div className="flex-1">
                <span className={`block text-xs font-bold leading-normal ${isSelected ? 'text-[#0A2342]' : 'text-[#0A2342]'}`}>
                  {symptom.name}
                </span>
                <span className="block text-[11px] text-slate-500 mt-1">
                  {symptom.description}
                </span>
              </div>
              
              {symptom.weight === 'critical' && (
                <span className="text-[10px] py-0.5 px-2 rounded-full font-bold bg-red-100 text-red-700 shrink-0 self-start hidden sm:inline-block">
                  هام للغاية
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setCalculated(true)}
          disabled={selectedSymptoms.length === 0}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
            selectedSymptoms.length > 0 
              ? 'bg-[#0A2342] text-white hover:bg-[#1E3E66] cursor-pointer' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>تحليل الأعراض وطباعة التوصية</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        {selectedSymptoms.length > 0 && (
          <button
            onClick={() => {
              setSelectedSymptoms([]);
              setCalculated(false);
            }}
            className="py-3 px-5 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all text-xs"
          >
            مسح المحدد
          </button>
        )}
      </div>

      <AnimatePresence>
        {calculated && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className={`p-5 rounded-2xl border-l-4 shadow-inner ${result.color}`}>
              <div className="flex items-center gap-3 mb-3">
                {result.icon}
                <div className="flex-1">
                  <span className={`text-[10px] py-0.5 px-2 rounded font-bold uppercase tracking-wider ${result.badgeColor}`}>
                    مستوى الفحص المقترح
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1 font-display">
                    {result.title}
                  </h4>
                </div>
              </div>
              
              <div className="text-xs leading-relaxed text-slate-700 border-t border-slate-200/50 pt-3">
                <p className="mb-4">
                  {result.recommendation}
                </p>

                {matchedService && (
                  <div className="bg-[#0A2342]/5 p-4 rounded-xl border border-[#C8A45D]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div>
                      <span className="text-[10px] text-[#C8A45D] font-extrabold uppercase block">الخدمة الطبية الأنسب لحالتك:</span>
                      <strong className="text-sm text-[#0A2342] font-display block mt-1">{matchedService.title}</strong>
                      <span className="text-[11px] text-slate-500 block mt-1">{matchedService.description}</span>
                    </div>

                    <button
                      onClick={() => {
                        const symptomNames = symptomsList
                          .filter(s => selectedSymptoms.includes(s.id))
                          .map(s => s.name);
                        onSelectServiceAndBook(result.recommendedService, symptomNames);
                      }}
                      className="w-full md:w-auto shrink-0 bg-[#C8A45D] hover:bg-[#B79350] text-[#0A2342] hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-xs flex items-center justify-center gap-2 shadow-sm"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>حجز الخدمة وتعبئة الموعد</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#F5F7FA] p-3 rounded-lg border border-slate-100 flex items-center gap-2 mt-4">
              <Info className="w-4 h-4 text-[#C8A45D] shrink-0" />
              <p className="text-[10px] text-slate-400 leading-normal">
                * إخلاء مسؤولية: هذا التحليل أداة تثقيفية وتوجيهية في المقام الأول، ولا يعوض بأي شكل من الأشكال عن الفحص الإكلينيكي المباشر الذي يجريه الدكتور شريف حسين داخل العيادة.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
