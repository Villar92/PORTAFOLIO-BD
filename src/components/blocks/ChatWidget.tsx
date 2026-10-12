"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, ExternalLink, Sparkles, Phone } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "¡Hola! 👋 Soy el asistente virtual del Portafolio Académico de Jorge Luis Curo Villar. ¿En qué puedo orientarte hoy?",
      time: "Ahora",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  // Respuestas predefinidas
  const quickQuestions = [
    { label: "📚 ¿Cuáles son las Unidades?", query: "unidades" },
    { label: "👤 ¿Quién es el estudiante?", query: "sobre_mi" },
    { label: "🎓 ¿Qué carrera y ciclo cursa?", query: "carrera" },
    { label: "📱 Contactar por WhatsApp", query: "whatsapp" },
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");

    // Respuesta inteligente del bot
    setTimeout(() => {
      let botReply = "";
      const lower = text.toLowerCase();

      if (lower.includes("unidad") || lower.includes("curso") || lower.includes("tema") || lower.includes("semana")) {
        botReply = "El curso 'Base de Datos II' consta de 4 Unidades principales:\n\n• U01: Arquitecturas de Bases de Datos y Entorno Corporativo.\n• U02: Despliegue y Configuración de Motores de Datos.\n• U03: Seguridad Corporativa, Conectividad y Alta Disponibilidad.\n• U04: Monitoreo, Optimización y Recuperación.\n\nPuedes ver todos los detalles y actividades en la sección de Unidades.";
      } else if (lower.includes("quien") || lower.includes("jorge") || lower.includes("sobre mi") || lower.includes("perfil")) {
        botReply = "Jorge Luis Curo Villar es estudiante del V Ciclo de Ingeniería de Sistemas en la Universidad Peruana Los Andes (UPLA), Huancayo. Este portafolio documenta su aprendizaje y proyectos en SQL Server y administración de bases de datos.";
      } else if (lower.includes("carrera") || lower.includes("ciclo") || lower.includes("upla") || lower.includes("docente")) {
        botReply = "• Universidad: UPLA (Huancayo, Perú)\n• Carrera: Ingeniería de Sistemas\n• Ciclo: V Ciclo (Año Académico 2026)\n• Docente de Asignatura: Raul Enrique Fernandez Bejarano";
      } else if (lower.includes("whatsapp") || lower.includes("contacto") || lower.includes("telefono") || lower.includes("celular")) {
        botReply = "Puedes comunicarte directamente con Jorge por WhatsApp al +51 901040184. ¡Estará encantado de responder tus consultas!";
      } else {
        botReply = `Gracias por tu mensaje. Para mayor información sobre los temas del curso puedes revisar las Unidades o contactar directamente a Jorge vía WhatsApp (901040184).`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
      
      {/* 1. VENTANA DE CHAT EXPANDIBLE */}
      {isOpen && (
        <div className="w-[330px] sm:w-[380px] h-[480px] max-h-[80vh] bg-[#0f172a]/95 backdrop-blur-xl border border-cyan-400/40 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.2)] flex flex-col overflow-hidden mb-4 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header del Chat */}
          <div className="p-4 bg-gradient-to-r from-blue-900/90 via-slate-900/90 to-cyan-950/90 border-b border-cyan-400/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-cyan-950/60 border border-cyan-400/50 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                <img
                  src="/robot-assistant.svg"
                  alt="Robot Asistente"
                  className="w-full h-full object-contain"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-slate-900 animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Asistente Virtual
                  <Sparkles className="w-3 h-3 text-cyan-300" />
                </h4>
                <p className="text-[11px] text-cyan-300/80">Portafolio Base de Datos II</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs sm:text-sm">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line leading-relaxed shadow-md ${
                    m.sender === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-sm"
                      : "bg-[#1e293b] text-slate-200 border border-cyan-900/40 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Sugerencias Rápidas */}
          <div className="px-3 py-2 bg-slate-900/70 border-t border-white/5 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (q.query === "whatsapp") {
                    window.open("https://wa.me/51901040184?text=Hola%2C%20me%20contacto%20desde%20tu%20portafolio%20acad%C3%A9mico.", "_blank");
                  } else {
                    handleSend(q.label);
                  }
                }}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/30 text-cyan-300 text-[11px] font-medium transition-colors cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input de Envío */}
          <div className="p-3 bg-[#0B1120] border-t border-cyan-400/20 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-[#1e293b] text-white placeholder-slate-400 text-xs sm:text-sm px-3.5 py-2 rounded-full border border-slate-700 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* 2. GLOBO TOOLTIP DE BIENVENIDA Y BOTÓN FLOTANTE */}
      <div className="flex items-center gap-3">
        
        {/* Tooltip con saludo estilo chat */}
        {showTooltip && !isOpen && (
          <div className="relative animate-bounce duration-1000">
            <div
              onClick={() => setIsOpen(true)}
              className="bg-white text-slate-900 px-4 py-2.5 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(34,211,238,0.5)] border border-cyan-300/60 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer hover:scale-105 transition-all select-none"
            >
              <span>🤖</span>
              <span>¡Hola! ¿Necesitas ayuda?</span>
            </div>
            
            {/* Flecha del globo apuntando al robot */}
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-l-8 border-l-white"></div>
          </div>
        )}

        {/* Botón Flotante con Avatar del Robot */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#0B1120] to-[#1e293b] p-[3px] shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] border border-cyan-400/80 hover:border-cyan-300 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group flex items-center justify-center overflow-hidden"
          aria-label="Abrir asistente virtual"
        >
          {/* Anillo de pulso cian exterior */}
          <span className="absolute inset-0 rounded-full border-2 border-cyan-400/60 animate-ping opacity-30 pointer-events-none"></span>

          {/* Imagen del robot droide */}
          <div className="w-full h-full rounded-full bg-[#0B1120]/90 p-2 flex items-center justify-center">
            {isOpen ? (
              <X className="w-7 h-7 text-cyan-300 transition-transform group-hover:rotate-90" />
            ) : (
              <img
                src="/robot-assistant.svg"
                alt="Robot Asistente"
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] group-hover:scale-110 transition-transform duration-300"
              />
            )}
          </div>
        </button>

      </div>

    </div>
  );
}
