"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Brand metaballs: a WebGL fragment shader that renders the Cloveode molecule
 * as living, merging blobs in the brand gradient. One ball follows the pointer.
 */

const BALLS = 7;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_balls[${BALLS}]; // x, y (in aspect-corrected units), radius
uniform float u_alpha;

const vec3 PINK = vec3(1.0, 0.06, 0.42);
const vec3 ORANGE = vec3(1.0, 0.48, 0.30);
const vec3 DEEP = vec3(0.86, 0.0, 0.36);

void main(){
  vec2 uv = (gl_FragCoord.xy / u_res.xy) * 2.0 - 1.0;
  uv.x *= u_res.x / u_res.y;

  float field = 0.0;
  float wx = 0.0;
  for (int i = 0; i < ${BALLS}; i++) {
    vec2 d = uv - u_balls[i].xy;
    float r = u_balls[i].z;
    float f = (r * r) / max(dot(d, d), 1e-5);
    field += f;
    wx += f * u_balls[i].x;
  }
  float cx = wx / max(field, 1e-5);

  // gradient runs left (pink) to right (orange), softly
  float t = smoothstep(-0.9, 0.9, cx + 0.15 * sin(u_time * 0.35));
  vec3 base = mix(PINK, ORANGE, t);
  // subtle depth shading toward the edges of a blob
  float edge = smoothstep(1.0, 2.6, field);
  vec3 col = mix(mix(DEEP, base, 0.55), base, edge);

  // anti-aliased threshold
  float aa = 0.035;
  float shape = smoothstep(1.0 - aa, 1.0 + aa, field);

  // faint glow outside the surface
  float glow = smoothstep(0.35, 1.0, field) * 0.12 * (1.0 - shape);

  float alpha = (shape + glow) * u_alpha;
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

type Props = { className?: string; intensity?: number };

export function Metaballs({ className = "", intensity = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) {
      canvas.style.background =
        "radial-gradient(closest-side at 45% 55%, #ff7a4c, transparent 70%), radial-gradient(closest-side at 60% 40%, #ff0f6a, transparent 70%)";
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
      }
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uBalls = gl.getUniformLocation(prog, "u_balls");
    const uAlpha = gl.getUniformLocation(prog, "u_alpha");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // Orbits loosely echo the logo: a cluster of nodes joined by necks.
    const seeds = Array.from({ length: BALLS }, (_, i) => ({
      ax: 0.28 + 0.42 * Math.abs(Math.sin(i * 1.7 + 0.4)),
      ay: 0.12 + 0.2 * Math.abs(Math.cos(i * 2.3)),
      sx: 0.16 + 0.08 * (i % 3),
      sy: 0.14 + 0.06 * ((i + 1) % 3),
      px: i * 1.3,
      py: i * 0.9 + 1.1,
      r: 0.17 + 0.07 * Math.abs(Math.sin(i * 2.1)),
    }));

    const target = { x: 0, y: 0, active: false };
    const pointer = { x: 0, y: 0, r: 0 };
    let aspect = 1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      aspect = canvas.width / canvas.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      target.x *= aspect;
      target.active = true;
    };
    const onLeave = () => {
      target.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);
    const onVis = () => (visible = document.visibilityState === "visible" && visible);
    document.addEventListener("visibilitychange", onVis);

    const balls = new Float32Array(BALLS * 3);
    let raf = 0;
    const start = performance.now();
    let last = start;
    const staticFrame = !!reduced;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible && !staticFrame) return;
      const t = (now - start) / 1000;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // pointer easing
      const tx = target.active ? target.x : 0.15 * Math.sin(t * 0.5);
      const ty = target.active ? target.y : -0.1 + 0.12 * Math.cos(t * 0.4);
      pointer.x += (tx - pointer.x) * Math.min(1, dt * 4);
      pointer.y += (ty - pointer.y) * Math.min(1, dt * 4);
      // the pointer ball only exists while a pointer is over the page
      pointer.r += ((target.active ? 0.12 : 0) - pointer.r) * Math.min(1, dt * 3);

      for (let i = 0; i < BALLS; i++) {
        const s = seeds[i];
        const tt = staticFrame ? 0 : t;
        let x = s.ax * Math.sin(tt * s.sx + s.px) * (i % 2 ? 1 : -1);
        let y = -0.15 + s.ay * Math.sin(tt * s.sy + s.py);
        // gentle attraction toward the pointer so the cluster leans in
        x += (pointer.x - x) * 0.05;
        y += (pointer.y - y) * 0.05;
        balls[i * 3] = x;
        balls[i * 3 + 1] = y;
        balls[i * 3 + 2] = s.r;
      }
      // the last ball is the pointer itself
      balls[(BALLS - 1) * 3] = pointer.x;
      balls[(BALLS - 1) * 3 + 1] = pointer.y;
      balls[(BALLS - 1) * 3 + 2] = pointer.r;

      gl.uniform1f(uTime, t);
      gl.uniform3fv(uBalls, balls);
      gl.uniform1f(uAlpha, intensity);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (staticFrame) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [reduced, intensity]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
