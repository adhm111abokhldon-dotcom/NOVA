"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  uniform vec3 uColor;

  // ----------------------------------------
  // Soft organic blob
  // ----------------------------------------

  float blob(
    vec2 uv,
    vec2 center,
    float radius,
    float seed
  ) {
    vec2 p = uv - center;

    float angle = atan(p.y, p.x);
    float dist = length(p);

    // Very cheap organic deformation
    float deformation =
        sin(angle * 3.0 + uTime * 0.35 + seed) * 0.025 +
        sin(angle * 5.0 - uTime * 0.25 + seed) * 0.015;

    float r = radius + deformation;

    return 1.0 - smoothstep(
      r * 0.15,
      r,
      dist
    );
  }

  void main() {
    vec2 uv = vUv;

    // ----------------------------------------
    // Aspect correction
    // ----------------------------------------

    float aspect =
      uResolution.x / uResolution.y;

    vec2 p = uv;
    p.x *= aspect;

    // ----------------------------------------
    // Lightweight fluid distortion
    // ----------------------------------------

    vec2 distorted = p;

    distorted.x +=
      sin(p.y * 3.0 + uTime * 0.18) * 0.025;

    distorted.y +=
      cos(p.x * 2.5 - uTime * 0.15) * 0.018;

    // Scroll creates subtle movement
    distorted.y +=
      uScroll * 0.10;

    // ----------------------------------------
    // Blob 1 — main
    // ----------------------------------------

    vec2 c1 = vec2(
      0.78 * aspect,
      0.68
    );

    c1.x +=
      sin(uTime * 0.16) * 0.09;

    c1.y +=
      cos(uTime * 0.12) * 0.06;

    c1.y -=
      uScroll * 0.24;

    float b1 = blob(
      distorted,
      c1,
      0.56,
      1.0
    );

    // ----------------------------------------
    // Blob 2
    // ----------------------------------------

    vec2 c2 = vec2(
      0.20 * aspect,
      0.32
    );

    c2.x +=
      cos(uTime * 0.13) * 0.10;

    c2.y +=
      sin(uTime * 0.11) * 0.07;

    c2.y +=
      uScroll * 0.16;

    float b2 = blob(
      distorted,
      c2,
      0.43,
      3.0
    );

    // ----------------------------------------
    // Blob 3 — smaller accent
    // ----------------------------------------

    vec2 c3 = vec2(
      0.52 * aspect,
      0.12
    );

    c3.x +=
      sin(uTime * 0.10) * 0.13;

    c3.y +=
      cos(uTime * 0.15) * 0.05;

    float b3 = blob(
      distorted,
      c3,
      0.25,
      5.0
    );

    // ----------------------------------------
    // Layer the blobs
    // ----------------------------------------

    float glow =
      b1 * 0.85 +
      b2 * 0.65 +
      b3 * 0.35;

    // Main soft glow
    float softGlow =
      smoothstep(
        0.0,
        1.0,
        glow
      );

    // Concentrated center
    float core =
      pow(
        softGlow,
        2.4
      );

    // ----------------------------------------
    // Subtle moving energy
    // ----------------------------------------

    float energy =
      sin(
        p.x * 2.5 +
        p.y * 2.0 +
        uTime * 0.25
      );

    energy =
      energy * 0.5 + 0.5;

    energy *= core;

    // ----------------------------------------
    // Color
    // ----------------------------------------

    vec3 color =
      uColor * softGlow;

    color +=
      vec3(
        1.0,
        0.72,
        0.32
      ) *
      core *
      0.18;

    color +=
      vec3(
        1.0,
        0.88,
        0.60
      ) *
      energy *
      0.06;

    // ----------------------------------------
    // Very subtle vignette
    // ----------------------------------------

    vec2 centered =
      vUv - 0.5;

    float vignette =
      1.0 -
      smoothstep(
        0.35,
        0.85,
        length(centered)
      );

    color *=
      0.82 +
      vignette * 0.18;

    // ----------------------------------------
    // Alpha
    // ----------------------------------------

    float alpha =
      softGlow * 0.52 +
      core * 0.22;

    alpha =
      clamp(
        alpha,
        0.0,
        0.72
      );

    gl_FragColor =
      vec4(
        color,
        alpha
      );
  }
`;

function Backdrop({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const { size } = useThree();

  useFrame((state) => {
    const material = materialRef.current;

    if (!material) return;

    material.uniforms.uTime.value = state.clock.elapsedTime;

    material.uniforms.uScroll.value = scrollRef.current;

    material.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: {
            value: 0,
          },

          uScroll: {
            value: 0,
          },

          uResolution: {
            value: new THREE.Vector2(1, 1),
          },

          uColor: {
            value: new THREE.Color("#C6A15B"),
          },
        }}
      />
    </mesh>
  );
}

export default function AmbientCanvas() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;

      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Canvas
      orthographic
      dpr={[1, 1.5]}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
      camera={{
        position: [0, 0, 1],
      }}
    >
      <Backdrop scrollRef={scrollRef} />
    </Canvas>
  );
}
