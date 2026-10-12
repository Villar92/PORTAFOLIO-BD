"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/blocks/Navbar";
import { Presentacion } from "@/components/blocks/Presentacion";
import { Informacion } from "@/components/blocks/Informacion";
import { Trabajos } from "@/components/blocks/Trabajos";
import { Login } from "@/components/blocks/Login";
import { Footer } from "@/components/blocks/Footer";
import { AntigravityBackground } from "@/components/blocks/AntigravityBackground";
import { ChatWidget } from "@/components/blocks/ChatWidget";

export default function Home() {
  const [activeTab, setActiveTab] = useState("inicio");

  // Auto-scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-transparent selection:bg-blue-200 selection:text-blue-900 font-sans relative z-0">
      <AntigravityBackground />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 w-full relative">
        {activeTab === "login" ? (
          <div className="animate-in fade-in duration-300">
            <Login />
          </div>
        ) : (
          <div className="flex flex-col gap-12 sm:gap-20 pb-16">
            {/* 1. Inicio / Presentación */}
            <section id="inicio" className="scroll-mt-20">
              <Presentacion setActiveTab={setActiveTab} />
            </section>

            {/* 2. Sobre Mí */}
            <section id="sobre-mi" className="scroll-mt-20">
              <Informacion />
            </section>

            {/* 3. Unidades del Curso */}
            <section id="unidades" className="scroll-mt-20">
              <Trabajos />
            </section>
          </div>
        )}
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
