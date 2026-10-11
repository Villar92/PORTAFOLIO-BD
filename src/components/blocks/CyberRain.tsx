"use client";

import React, { useEffect, useRef } from "react";

interface CyberRainProps {
  className?: string;
  density?: number;
}

export function CyberRain({ className = "", density = 80 }: CyberRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Gotas de lluvia cibernéticas
    interface Drop {
      x: number;
      y: number;
      length: number;
      speed: number;
      width: number;
      opacity: number;
      color: string;
      splashRadius: number;
      splashing: boolean;
    }

    const colors = [
      "rgba(34, 211, 238, ", // Cyan neón
      "rgba(56, 189, 248, ", // Celeste
      "rgba(96, 165, 250, ", // Azul claro
      "rgba(255, 255, 255, ", // Blanco brillante
    ];

    const drops: Drop[] = [];
    const count = Math.floor((width / 1920) * density) || 60;

    for (let i = 0; i < count; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        length: Math.random() * 25 + 15,
        speed: Math.random() * 8 + 7,
        width: Math.random() * 1.5 + 0.8,
        opacity: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        splashRadius: 0,
        splashing: false,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      drops.forEach((drop) => {
        // Dibujar el trazo de la gota de lluvia con gradiente
        const gradient = ctx.createLinearGradient(
          drop.x,
          drop.y - drop.length,
          drop.x,
          drop.y
        );
        gradient.addColorStop(0, `${drop.color}0)`);
        gradient.addColorStop(0.7, `${drop.color}${drop.opacity * 0.5})`);
        gradient.addColorStop(1, `${drop.color}${drop.opacity})`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = drop.width;
        ctx.lineCap = "round";
        ctx.moveTo(drop.x, drop.y - drop.length);
        ctx.lineTo(drop.x, drop.y);
        ctx.stroke();

        // Pequeño resplandor en la punta de la gota
        ctx.beginPath();
        ctx.fillStyle = `${drop.color}${drop.opacity * 0.9})`;
        ctx.arc(drop.x, drop.y, drop.width * 1.2, 0, Math.PI * 2);
        ctx.fill();

        // Efecto splash al llegar al final
        if (drop.splashing) {
          ctx.beginPath();
          ctx.strokeStyle = `${drop.color}${Math.max(0, 0.6 - drop.splashRadius / 15)})`;
          ctx.lineWidth = 1;
          ctx.ellipse(drop.x, height - 10, drop.splashRadius, drop.splashRadius * 0.4, 0, 0, Math.PI * 2);
          ctx.stroke();

          drop.splashRadius += 0.8;
          if (drop.splashRadius > 12) {
            drop.splashing = false;
            drop.splashRadius = 0;
            drop.y = -drop.length - Math.random() * 80;
            drop.x = Math.random() * width;
          }
        } else {
          // Caída continua
          drop.y += drop.speed;

          if (drop.y >= height - 10) {
            drop.splashing = true;
            drop.splashRadius = 1;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
}
