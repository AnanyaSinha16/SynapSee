// src/components/ParticlesBackground.jsx
import React, { useEffect, useRef } from "react";

/**
 * Canvas particle background with subtle motion, parallax on mouse move,
 * glow effect and responsive behavior. Drop this near root of app so it
 * sits behind the UI (uses position fixed and z-index).
 */
export default function ParticlesBackground({
  particleColor = "#b200ff",
  particleCount = 80,
  maxRadius = 2.5,
}) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    mouse: { x: null, y: null },
    width: 0,
    height: 0,
    hue: 270,
  });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let dpr = window.devicePixelRatio || 1;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      stateRef.current.width = window.innerWidth;
      stateRef.current.height = window.innerHeight;
      canvas.width = stateRef.current.width * dpr;
      canvas.height = stateRef.current.height * dpr;
      canvas.style.width = stateRef.current.width + "px";
      canvas.style.height = stateRef.current.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function initParticles() {
      const { width, height } = stateRef.current;
      const targetCount = Math.round((particleCount * width) / 1366); // scale with width
      const arr = [];
      for (let i = 0; i < targetCount; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: rand(-0.2, 0.2),
          vy: rand(-0.2, 0.2),
          r: rand(0.6, maxRadius),
          life: rand(0.5, 1.5),
          baseR: rand(0.6, maxRadius),
          flick: Math.random() * Math.PI * 2,
        });
      }
      stateRef.current.particles = arr;
    }

    function draw() {
      const s = stateRef.current;
      const { width, height, particles, mouse } = s;

      // subtle background fill (keeps deep purple)
      ctx.clearRect(0, 0, width, height);
      // soft dark overlay to keep depth
      ctx.fillStyle = "rgba(6,2,18,0.96)";
      ctx.fillRect(0, 0, width, height);

      // glow halos
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let p of particles) {
        // motion
        p.x += p.vx + Math.sin(p.flick) * 0.05;
        p.y += p.vy + Math.cos(p.flick) * 0.05;
        p.flick += 0.01 + Math.random() * 0.01;

        // wrap edges
        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        // parallax on mouse
        if (mouse.x !== null) {
          const dx = (p.x - mouse.x) * 0.0025;
          const dy = (p.y - mouse.y) * 0.0025;
          p.x += dx;
          p.y += dy;
        }

        // drifting radius
        const rr = p.baseR + Math.sin(p.flick) * (p.baseR * 0.35);

        // draw glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rr * 10);
        grd.addColorStop(0, `${hexToRgba(particleColor, 0.35)}`);
        grd.addColorStop(0.25, `${hexToRgba(particleColor, 0.16)}`);
        grd.addColorStop(0.6, `${hexToRgba("#2a0a2f", 0.05)}`);
        grd.addColorStop(1, `${hexToRgba("#090018", 0)}`);

        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(p.x, p.y, rr * 10, 0, Math.PI * 2);
        ctx.fill();

        // core small dot
        ctx.beginPath();
        ctx.fillStyle = hexToRgba("#ffffff", 0.85);
        ctx.arc(p.x, p.y, Math.max(0.3, rr * 0.55), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    function loop() {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    function onMove(e) {
      stateRef.current.mouse.x = e.clientX;
      stateRef.current.mouse.y = e.clientY;
    }

    function onLeave() {
      stateRef.current.mouse.x = null;
      stateRef.current.mouse.y = null;
    }

    // helper
    function hexToRgba(hex, alpha = 1) {
      const h = hex.replace("#", "");
      const bigint = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r},${g},${b},${alpha})`;
    }

    // init
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("mouseleave", onLeave);

    loop();

    // cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount, particleColor, maxRadius]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -2,
        pointerEvents: "none",
      }}
    />
  );
}

