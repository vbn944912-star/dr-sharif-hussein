import React from 'react';
import { MapPin, Navigation, Map, Compass, PhoneCall } from 'lucide-react';

export default function ClinicMap() {
  const mapAddressQuery = "Cairo, Heliopolis, Korba, El-Fayoum Street";
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(
    "2 Al Fayoum, El-Koba, Heliopolis, Cairo Governorate, Egypt"
  )}`;

  // Safe fallback map using Heliopolis Korba embeddable coordinates directly to avoid API key limitations 
  const embeddedMapIframe = "https://maps.google.com/maps?q=Heliopolis%20Korba%20Al%20Fayoum%20Street%20Cairo%20Egypt&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-[#C8A45D]/15 shadow-xl relative overflow-hidden bg-white/95">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C8A45D]/5 to-transparent rounded-bl-full pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Address text details */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#C8A45D] bg-[#0A2342]/10 py-1 px-3 rounded-full inline-block mb-3">
              سهولة الوصول والتواصل
            </span>
            <h3 className="text-2xl font-bold text-[#0A2342] mb-3 font-display">موقع العيادة ومنافذ الحضور</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              تقع العيادة في أرقى أحياء القاهرة بميدان الكوربة، بمصر الجديدة، في بيئة هادئة ومجهزة لاستقبالكم.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="p-2.5 bg-[#C8A45D]/15 rounded-xl text-[#C8A45D] shrink-0 h-10 w-10 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0A2342]">العنوان بالتفصيل</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    📍 2 شارع الفيوم، ميدان الكوربة
                    <br />
                    متفرع من شارع كليوباترا، مصر الجديدة، القاهرة.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 bg-[#0A2342]/10 rounded-xl text-[#0A2342] shrink-0 h-10 w-10 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0A2342]">علامات مميزة وحيويّة</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    على بعد خطوات من كنيسة البازيليك ومحطة مترو كليوباترا، وبجانب أشهر الخدمات الرئيسية بالكوربة.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
            <div className="bg-[#0A2342]/5 p-3 rounded-xl flex items-center justify-between text-xs text-[#0A2342]">
              <span>تلفون العيادة: <strong>01013004231</strong></span>
              <a 
                href="tel:01013004231"
                className="bg-[#0A2342] hover:bg-[#153259] text-white p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[10px]"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#C8A45D]" />
                اتصال
              </a>
            </div>

            <a
              href="https://maps.google.com/?q=2+Al+Fayoum,+El-Korba,+Heliopolis,+Cairo"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#C8A45D] hover:bg-[#B79350] text-[#0A2342] hover:text-white font-bold py-3 px-5 rounded-xl transition-all duration-300 text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Navigation className="w-4 h-4 shrink-0" />
              <span>افتح في خرائط Google للاتجاهات</span>
            </a>
          </div>
        </div>

        {/* Map iframe section */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200/60 shadow-inner h-[280px] lg:h-auto min-h-[300px] relative">
          <iframe
            title="موقع عيادة الدكتور شريف حسين في الكوربة"
            src={embeddedMapIframe}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </div>
  );
}
