"use client";
import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  TorusGeometry,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";

type Preset = {
  knot: number;
  knotEmissive: number;
  knotEmissiveIntensity: number;
  ring: number;
  ringOpacity: number;
  speck: number;
  speckOpacity: number;
  ambient: number;
  ambientIntensity: number;
};

const PRESETS: Record<"light" | "dark", Preset> = {
  light: {
    knot: 0xd7dee9,
    knotEmissive: 0x9aa8bb,
    knotEmissiveIntensity: 0.15,
    ring: 0xb8944a,
    ringOpacity: 0.55,
    speck: 0x15213d,
    speckOpacity: 0.3,
    ambient: 0xdfe7f3,
    ambientIntensity: 1.4,
  },
  dark: {
    knot: 0x131722,
    knotEmissive: 0x0a0c14,
    knotEmissiveIntensity: 1,
    ring: 0xc5a059,
    ringOpacity: 0.4,
    speck: 0xe2e8f0,
    speckOpacity: 0.35,
    ambient: 0x0e121d,
    ambientIntensity: 1.8,
  },
};

const currentTheme = () => (document.documentElement.classList.contains("theme-dark") ? "dark" : "light");

/** The reference prototype's sculpture (torus knot, two gold orbit rings, sparse specks),
 *  re-lit per theme, paused whenever the page says decorative motion should stop. */
export function Hero3D({ onState }: { onState: (state: "active" | "paused" | "unavailable") => void }) {
  const mount = useRef<HTMLDivElement>(null);
  const report = useRef(onState);
  report.current = onState;

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      // No context to be had after all: tell the loader so it can take the scene back down.
      report.current("unavailable");
      return;
    }
    const width = host.clientWidth || window.innerWidth;
    const height = host.clientHeight || 700;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.setAttribute("role", "presentation");
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 900ms ease-out";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, width / height, 0.1, 1000);
    // Far enough left that the knot's edge clears the hero copy at 1440 in the light theme.
    camera.position.set(-5, 0, 22);

    const ambient = new AmbientLight(0x0e121d, 1.8);
    const key = new DirectionalLight(0xf5ead4, 2.8);
    key.position.set(12, 14, 16);
    const rim = new DirectionalLight(0xcfd8e3, 1.6);
    rim.position.set(-14, -10, 10);
    const gold = new PointLight(0xd4af37, 2.0, 45);
    gold.position.set(0, 8, 8);
    scene.add(ambient, key, rim, gold);

    const group = new Group();
    scene.add(group);

    const knotGeometry = new TorusKnotGeometry(4.6, 0.9, 220, 40, 2, 3);
    const knotMaterial = new MeshPhysicalMaterial({
      roughness: 0.22,
      metalness: 0.88,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });
    const knot = new Mesh(knotGeometry, knotMaterial);
    group.add(knot);

    const ringGeometry1 = new TorusGeometry(8.2, 0.025, 16, 120);
    const ringGeometry2 = new TorusGeometry(8.9, 0.02, 16, 120);
    const ringMaterial = new MeshStandardMaterial({ roughness: 0.3, metalness: 0.95, transparent: true });
    const ring1 = new Mesh(ringGeometry1, ringMaterial);
    const ring2 = new Mesh(ringGeometry2, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    group.add(ring1, ring2);

    const speckCount = 70;
    const positions = new Float32Array(speckCount * 3);
    for (let i = 0; i < speckCount; i++) {
      const radius = 8 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const speckGeometry = new BufferGeometry();
    speckGeometry.setAttribute("position", new BufferAttribute(positions, 3));
    const speckMaterial = new PointsMaterial({ size: 0.08, transparent: true, blending: AdditiveBlending });
    group.add(new Points(speckGeometry, speckMaterial));

    const applyTheme = () => {
      const preset = PRESETS[currentTheme()];
      knotMaterial.color = new Color(preset.knot);
      knotMaterial.emissive = new Color(preset.knotEmissive);
      knotMaterial.emissiveIntensity = preset.knotEmissiveIntensity;
      ringMaterial.color = new Color(preset.ring);
      ringMaterial.opacity = preset.ringOpacity;
      speckMaterial.color = new Color(preset.speck);
      speckMaterial.opacity = preset.speckOpacity;
      ambient.color = new Color(preset.ambient);
      ambient.intensity = preset.ambientIntensity;
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.0004;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.0004;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Own the elapsed time: three's Clock.start() resets to zero, which would make the sculpture jump on resume.
    let elapsed = 0;
    let last = 0;
    let frame = 0;
    let running = false;
    let firstFrame = true;
    const render = () => {
      frame = requestAnimationFrame(render);
      const now = performance.now();
      elapsed += (now - last) / 1000;
      last = now;
      const t = elapsed;
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      group.rotation.y = t * 0.06 + targetX;
      group.rotation.x = Math.sin(t * 0.04) * 0.12 + targetY;
      knot.rotation.z = t * 0.03;
      ring1.rotation.z = -t * 0.04;
      ring2.rotation.x = t * 0.05;
      group.position.y = Math.sin(t * 0.6) * 0.25;
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        renderer.domElement.style.opacity = "1";
      }
    };

    let hidden = document.hidden;
    let paused = document.documentElement.dataset.motionPaused === "true";
    // Assume offscreen until the IntersectionObserver's first observation says otherwise, so a hero
    // that starts below the fold never renders a frame just to freeze on it.
    let offscreen = true;
    const sync = () => {
      const shouldRun = !hidden && !paused && !offscreen;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        render();
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
      // Reported on every pass, not only on transitions: the attribute then self-heals if a render
      // ever leaves it disagreeing with what the scene is actually doing.
      report.current(shouldRun ? "active" : "paused");
    };
    const onVisibility = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const pauseObserver = new MutationObserver(() => {
      paused = document.documentElement.dataset.motionPaused === "true";
      sync();
    });
    pauseObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-paused"] });
    const visibility = new IntersectionObserver(([entry]) => {
      offscreen = !entry.isIntersecting;
      sync();
    });
    visibility.observe(host);
    const resize = new ResizeObserver(() => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      // `setSize` clears the drawing buffer. A paused scene has no loop to redraw it, so without
      // this one frame the sculpture would sit blank until something resumes it.
      if (!running) renderer.render(scene, camera);
    });
    resize.observe(host);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      pauseObserver.disconnect();
      visibility.disconnect();
      resize.disconnect();
      knotGeometry.dispose();
      ringGeometry1.dispose();
      ringGeometry2.dispose();
      speckGeometry.dispose();
      knotMaterial.dispose();
      ringMaterial.dispose();
      speckMaterial.dispose();
      // Hand the GPU context back now rather than waiting for the canvas to be collected.
      renderer.forceContextLoss();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

export default Hero3D;
