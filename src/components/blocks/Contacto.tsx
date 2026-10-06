import React from "react";
import NextImage from "next/image";
import { User, Hash, MapPin, Phone, MessageCircle } from "lucide-react";

export function Contacto() {
  const whatsappNumber = "51901040184";
  const whatsappMessage = "Hola, me contacto desde tu portafolio académico.";

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">CONTACTO</h2>
        <div className="h-1.5 w-24 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/20 flex flex-col md:flex-row">
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 md:w-2/5 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border-2 border-white/20 relative overflow-hidden">
            <NextImage 
              src="/JORGE CV.jpg" 
              alt="Jorge Luis Curo Villar" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover rounded-full"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">Jorge Luis Curo Villar</h3>
          <p className="text-blue-200 font-medium tracking-wide">Estudiante de Ingeniería</p>
        </div>
        
        <div className="p-10 md:w-3/5 space-y-6 bg-transparent">
          <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-xl shadow-sm border border-white/10">
            <div className="p-2 bg-blue-900/50 rounded-lg text-blue-400">
              <Hash className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 mb-0.5">CÓDIGO</p>
              <p className="text-white font-medium">H14203C</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-xl shadow-sm border border-white/10">
            <div className="p-2 bg-blue-900/50 rounded-lg text-blue-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 mb-0.5">UBICACIÓN</p>
              <p className="text-white font-medium">Huancayo / Perú</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/60 p-4 rounded-xl shadow-sm border border-white/10">
            <div className="p-2 bg-green-900/50 rounded-lg text-green-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 mb-0.5">TELÉFONO / WHATSAPP</p>
              <p className="text-white font-medium">901040184</p>
            </div>
          </div>

          <div className="pt-4">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
