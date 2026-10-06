"use client";

import { useState } from "react";
import { Navbar } from "@/components/blocks/Navbar";
import { Presentacion } from "@/components/blocks/Presentacion";
import { Informacion } from "@/components/blocks/Informacion";
import { Trabajos } from "@/components/blocks/Trabajos";
import { Contacto } from "@/components/blocks/Contacto";
import { Login } from "@/components/blocks/Login";
import { Footer } from "@/components/blocks/Footer";
import { AntigravityBackground } from "@/components/blocks/AntigravityBackground";

export default function Home() {
  const [activeTab, setActiveTab] = useState("presentacion");

  return (
    <div className="min-h-screen flex flex-col bg-transparent selection:bg-blue-200 selection:text-blue-900 font-sans relative z-0">
      <AntigravityBackground />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 w-full relative">
        <div className={`transition-opacity duration-300 ${activeTab === 'presentacion' ? 'block' : 'hidden'}`}>
          <Presentacion />
        </div>
        
        <div className={`transition-opacity duration-300 ${activeTab === 'informacion' ? 'block' : 'hidden'}`}>
          <Informacion />
        </div>
        
        <div className={`transition-opacity duration-300 ${activeTab === 'trabajos' ? 'block' : 'hidden'}`}>
          <Trabajos />
        </div>
        
        <div className={`transition-opacity duration-300 ${activeTab === 'contacto' ? 'block' : 'hidden'}`}>
          <Contacto />
        </div>
        
        <div className={`transition-opacity duration-300 ${activeTab === 'login' ? 'block' : 'hidden'}`}>
          <Login />
        </div>
      </main>

      <Footer />
    </div>
  );
}
