import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Award, Star, ThumbsUp, Activity } from 'lucide-react';
import { achievementsData } from '../data';

export default function ClinicStats() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    success_rate: 0,
    reviews: 0,
    experience: 0,
    cath_procedures: 0,
  });

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const fps = 30;
    const steps = duration / (1000 / fps);
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCounts({
          success_rate: 4.9,
          reviews: 571,
          experience: 18,
          cath_procedures: 4500,
        });
        clearInterval(interval);
      } else {
        const factor = currentStep / steps;
        // Easing out quadratic
        const easeFactor = factor * (2 - factor);
        
        setCounts({
          success_rate: parseFloat((easeFactor * 4.9).toFixed(1)),
          reviews: Math.floor(easeFactor * 571),
          experience: Math.floor(easeFactor * 18),
          cath_procedures: Math.floor(easeFactor * 4500),
        });
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (id: string) => {
    switch (id) {
      case 'success_rate':
        return <Star className="w-7 h-7 text-[#C8A45D]" />;
      case 'reviews':
        return <ThumbsUp className="w-7 h-7 text-[#C8A45D]" />;
      case 'experience':
        return <Award className="w-7 h-7 text-[#C8A45D]" />;
      case 'cath_procedures':
        return <Activity className="w-7 h-7 text-[#C8A45D]" />;
      default:
        return <Star className="w-7 h-7 text-[#C8A45D]" />;
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 select-none" id="stats-section">
      {achievementsData.map((stat) => {
        const id = stat.id;
        const currentCount = counts[id] || 0;
        
        // Format of displaying the values beautifully
        let displayValue = '';
        if (id === 'success_rate') {
          displayValue = `${currentCount}/5`;
        } else if (id === 'reviews') {
          displayValue = `+${currentCount}`;
        } else if (id === 'experience') {
          displayValue = `+${currentCount} عاماً`;
        } else if (id === 'cath_procedures') {
          displayValue = `+${currentCount}`;
        }

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center shadow-lg border hover:border-[#C8A45D]/45 transition-all group relative overflow-hidden"
          >
            {/* Absolute decorative glow background */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[#C8A45D]/10 to-transparent rounded-bl-full pointer-events-none" />
            
            <div className="bg-[#0A2342]/10 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {getIcon(stat.id)}
            </div>
            
            <div className="text-3xl lg:text-4xl font-extrabold text-[#0A2342] mb-1 tracking-tight font-display">
              {displayValue}
            </div>
            
            <div className="font-semibold text-[#C8A45D] text-sm mb-2">
              {stat.label}
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              {stat.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
