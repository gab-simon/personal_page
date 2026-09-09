/* Adapted from React Bits CRT Warp (TS/Tailwind variant). */
import { useEffect, useRef } from "react";
import * as THREE from "three";

type CRTWarpProps = {
  color?: string;
  backgroundColor?: string;
  speed?: number;
  curvature?: number;
  scanlineStrength?: number;
  scanlineFrequency?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  bloom?: number;
  bloomRadius?: number;
  noise?: number;
  vignette?: number;
  brightness?: number;
  pixelation?: number;
  rgbShift?: number;
  mouseReact?: boolean;
  mouseStrength?: number;
  dpr?: number;
  fps?: number;
  paused?: boolean;
  className?: string;
};

const vertexShader = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uBackgroundColor;
uniform float uCurvature, uScanlineStrength, uScanlineFrequency;
uniform float uWaveAmplitude, uWaveFrequency, uBloom, uBloomRadius;
uniform float uNoise, uVignette, uBrightness, uPixelation, uRgbShift;
uniform vec2 uPointer;
uniform float uMouseReact, uMouseStrength;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 crtCurve(vec2 uv, float radius) {
  vec2 p = (uv - 0.5) * 2.0;
  radius = max(radius, 1.415);
  float cornerScale = radius / sqrt(max(radius * radius - 2.0, 0.001));
  p = radius * p / sqrt(max(radius * radius - dot(p, p), 0.001));
  return (p / cornerScale) * 0.5 + 0.5;
}

float plasma(vec2 uv, float t) {
  uv = (uv - 0.5) * max(uWaveFrequency / 2.2, 0.001) + 0.5;
  float scanline = 0.5 - 0.5 * cos(uv.y * 3.14159265 * uScanlineFrequency);
  scanline = mix(1.0, scanline, uScanlineStrength);
  uv *= vec2(80.0, 24.0);
  uv = ceil(uv) / vec2(80.0, 24.0);
  float field = 0.7 * sin(0.5 * uv.x + t / 5.0);
  field += 3.0 * sin(1.6 * uv.y + t / 5.0);
  field += sin(10.0 * (uv.y * sin(t / 2.0) + uv.x * cos(t / 5.0)) + t / 2.0);
  float cx = uv.x + 0.5 * sin(t / 2.0);
  float cy = uv.y + 0.5 * cos(t / 4.0);
  field += 0.4 * sin(sqrt(100.0 * cx * cx + 100.0 * cy * cy + 1.0) + t);
  field += 0.9 * sin(sqrt(75.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  field -= 1.4 * sin(sqrt(256.0 * cx * cx + 25.0 * cy * cy + 1.0) + t);
  return scanline * floor(3.0 * (0.5 + 0.499 * sin(field * (uWaveAmplitude / 0.28)))) / 3.0;
}

void main() {
  vec2 baseUv = vUv;
  if (uPixelation > 1.001) {
    vec2 cells = max(uResolution / uPixelation, vec2(1.0));
    baseUv = (floor(baseUv * cells) + 0.5) / cells;
  }
  float curveRadius = 1.1 + 0.42 / max(uCurvature, 0.001);
  if (uMouseReact > 0.5) curveRadius *= exp(-uPointer.y * uMouseStrength * 0.4);
  vec2 uv = crtCurve(baseUv, curveRadius);
  if (uMouseReact > 0.5) uv.x -= uPointer.x * uMouseStrength * 0.035;
  float signal = plasma(uv, uTime);
  float radius = 0.01 * uBloomRadius;
  float glow = signal * 0.2;
  glow += plasma(uv + vec2(radius, 0.0), uTime) * 0.18;
  glow += plasma(uv - vec2(radius, 0.0), uTime) * 0.18;
  glow += plasma(uv + vec2(0.0, radius), uTime) * 0.18;
  glow += plasma(uv - vec2(0.0, radius), uTime) * 0.18;
  float edge = clamp(1.0 - dot(vUv - 0.5, vUv - 0.5) * 2.0, 0.0, 1.0);
  float edgeFade = mix(1.0, smoothstep(0.0, 1.0, edge), uVignette);
  float mask = clamp(signal * 0.72 + glow * uBloom * 0.42, 0.0, 1.0) * edgeFade;
  float grain = hash21(gl_FragCoord.xy + vec2(fract(uTime) * 173.0));
  float redSignal = plasma(uv + vec2(uRgbShift, 0.0), uTime);
  float blueSignal = plasma(uv - vec2(uRgbShift, 0.0), uTime);
  vec3 wave = uColor * (0.22 + signal * 0.58 + glow * uBloom * 0.32);
  wave += (vec3(redSignal, signal, blueSignal) - signal) * 0.42;
  wave *= uBrightness;
  vec3 color = mix(uBackgroundColor, wave, mask);
  color += (grain - 0.5) * uNoise;
  gl_FragColor = vec4(max(color, vec3(0.0)), 1.0);
}
`;

export default function CRTWarp({
  color = "#a92f3a",
  backgroundColor = "#090607",
  speed = 0.28,
  curvature = 0.25, scanlineStrength = 0.25, scanlineFrequency = 200,
  waveAmplitude = 0.3, waveFrequency = 2.5, bloom = 1.5, bloomRadius = 1,
  noise = 0.1, vignette = 0, brightness = 1.25, pixelation = 1, rgbShift = 0.015,
  mouseReact = true, mouseStrength = 0.5, dpr = 1, fps = 30,
  paused = false,
  className = "",
}: CRTWarpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const pointerTargetRef = useRef(new THREE.Vector2());
  const pointerCurrentRef = useRef(new THREE.Vector2());

  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: {
      uResolution: { value: new THREE.Vector2(1, 1) }, uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) }, uBackgroundColor: { value: new THREE.Color(backgroundColor) },
      uCurvature: { value: curvature }, uScanlineStrength: { value: scanlineStrength }, uScanlineFrequency: { value: scanlineFrequency },
      uWaveAmplitude: { value: waveAmplitude }, uWaveFrequency: { value: waveFrequency }, uBloom: { value: bloom }, uBloomRadius: { value: bloomRadius },
      uNoise: { value: noise }, uVignette: { value: vignette }, uBrightness: { value: brightness }, uPixelation: { value: pixelation }, uRgbShift: { value: rgbShift },
      uPointer: { value: new THREE.Vector2() }, uMouseReact: { value: mouseReact ? 1 : 0 }, uMouseStrength: { value: mouseStrength },
    }});
    scene.add(new THREE.Mesh(geometry, material));
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "low-power" });
    } catch {
      /* No WebGL (disabled, blocked or unsupported): the hero keeps its flat background. */
      geometry.dispose();
      material.dispose();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dpr));
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    container.appendChild(renderer.domElement);
    const resize = () => {
      const width = Math.max(container.clientWidth, 1), height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      material.uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container); resize();
    let frame = 0, lastFrame = 0, visible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibilityObserver.observe(container);
    const clock = new THREE.Clock();
    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden || now - lastFrame < 1000 / Math.max(1, fps)) return;
      lastFrame = now;
      if (!pausedRef.current) material.uniforms.uTime.value += Math.min(clock.getDelta(), 0.1) * speed;
      pointerCurrentRef.current.lerp(pointerTargetRef.current, 0.08);
      material.uniforms.uPointer.value.copy(pointerCurrentRef.current);
      renderer.render(scene, camera);
    };
    render(0);
    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerTargetRef.current.set(((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1, -(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1));
    };
    const onPointerLeave = () => pointerTargetRef.current.set(0, 0);
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); visibilityObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove); container.removeEventListener("pointerleave", onPointerLeave);
      geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, [backgroundColor, bloom, bloomRadius, brightness, color, curvature, dpr, fps, mouseReact, mouseStrength, noise, pixelation, rgbShift, scanlineFrequency, scanlineStrength, speed, vignette, waveAmplitude, waveFrequency]);

  return <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`} aria-hidden="true" />;
}
