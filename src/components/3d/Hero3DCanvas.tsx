"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071329, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0x102c62, 1.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffbd35, 1.5);
    directionalLight.position.set(3, 5, 4);
    scene.add(directionalLight);

    // Diya warm flame point light
    const flameLight = new THREE.PointLight(0xff7518, 3.5, 8);
    flameLight.position.set(0, 0.6, 0);
    scene.add(flameLight);

    const flameSubLight = new THREE.PointLight(0xffd76a, 2.0, 5);
    flameSubLight.position.set(0, 0.75, 0);
    scene.add(flameSubLight);

    // 3. Central Hero 3D Diya Group
    const diyaGroup = new THREE.Group();
    scene.add(diyaGroup);

    // Diya Bowl (Traditional Terracotta / Brass Vessel)
    const bowlPoints = [];
    for (let deg = 0; deg <= 180; deg += 10) {
      const rad = (deg * Math.PI) / 180;
      const x = Math.sin(rad) * 0.9;
      const y = -Math.cos(rad) * 0.45;
      bowlPoints.push(new THREE.Vector2(x, y));
    }
    const bowlGeo = new THREE.LatheGeometry(bowlPoints, 32);
    const bowlMat = new THREE.MeshStandardMaterial({
      color: 0x933008,
      roughness: 0.35,
      metalness: 0.65,
      emissive: 0x3d0b00,
      emissiveIntensity: 0.3,
    });
    const diyaBowl = new THREE.Mesh(bowlGeo, bowlMat);
    diyaBowl.position.y = 0;
    diyaGroup.add(diyaBowl);

    // Golden Ornamental Rim
    const rimGeo = new THREE.TorusGeometry(0.92, 0.05, 16, 48);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffbd35,
      roughness: 0.2,
      metalness: 0.85,
    });
    const rim = new THREE.Mesh(rimGeo, goldMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.42;
    diyaGroup.add(rim);

    // Diya Flame Mesh (Tear-drop flame)
    const flameGeo = new THREE.ConeGeometry(0.22, 0.7, 16);
    flameGeo.translate(0, 0.35, 0);
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffd76a,
    });
    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.y = 0.45;
    diyaGroup.add(flameMesh);

    // Inner Blue Base of Flame
    const flameBaseGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const flameBaseMat = new THREE.MeshBasicMaterial({ color: 0x3a86ff });
    const flameBaseMesh = new THREE.Mesh(flameBaseGeo, flameBaseMat);
    flameBaseMesh.position.y = 0.52;
    diyaGroup.add(flameBaseMesh);

    // 4. Rotating Concentric Rangoli Platform below Diya
    const rangoliGroup = new THREE.Group();
    rangoliGroup.position.set(0, -0.6, 0);
    scene.add(rangoliGroup);

    const ringCount = 5;
    const ringMeshes: THREE.LineSegments[] = [];
    for (let r = 1; r <= ringCount; r++) {
      const radius = r * 0.7;
      const circleGeo = new THREE.RingGeometry(radius - 0.02, radius, 36);
      const circleEdges = new THREE.EdgesGeometry(circleGeo);
      const ringLine = new THREE.LineSegments(
        circleEdges,
        new THREE.LineBasicMaterial({
          color: r % 2 === 0 ? 0xffbd35 : 0xe82c91,
          transparent: true,
          opacity: 0.55 - r * 0.08,
        })
      );
      ringLine.rotation.x = Math.PI / 2;
      rangoliGroup.add(ringLine);
      ringMeshes.push(ringLine);
    }

    // 5. Swaying Traditional Festive Lanterns (Kandils)
    const lanterns: { group: THREE.Group; speed: number; offset: number }[] = [];
    const lanternPositions = [
      { x: -3.2, y: 2.2, z: -1.5, color: 0xffbd35 },
      { x: -1.8, y: 2.8, z: -2.5, color: 0xe82c91 },
      { x: 1.9, y: 2.7, z: -2.3, color: 0xff7518 },
      { x: 3.3, y: 2.1, z: -1.2, color: 0xffbd35 },
    ];

    lanternPositions.forEach((pos, idx) => {
      const lGroup = new THREE.Group();
      lGroup.position.set(pos.x, pos.y, pos.z);

      // Suspension wire
      const wireGeo = new THREE.CylinderGeometry(0.005, 0.005, 1.8, 8);
      const wireMat = new THREE.MeshBasicMaterial({ color: 0xffd76a });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      wire.position.y = 0.9;
      lGroup.add(wire);

      // Lantern Octahedron Jewel Core
      const octaGeo = new THREE.OctahedronGeometry(0.35, 0);
      const octaMat = new THREE.MeshStandardMaterial({
        color: pos.color,
        emissive: pos.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.6,
      });
      const octa = new THREE.Mesh(octaGeo, octaMat);
      lGroup.add(octa);

      // Internal light
      const pLight = new THREE.PointLight(pos.color, 1.2, 3);
      lGroup.add(pLight);

      scene.add(lGroup);
      lanterns.push({ group: lGroup, speed: 1.5 + idx * 0.3, offset: idx });
    });

    // 6. Floating Marigold Petals
    const petalCount = 70;
    const petalGeo = new THREE.PlaneGeometry(0.12, 0.2);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xff9e00,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 0.1,
    });
    const petalData: { mesh: THREE.Mesh; rotSpeed: { x: number; y: number; z: number }; vy: number }[] = [];

    for (let p = 0; p < petalCount; p++) {
      const petal = new THREE.Mesh(petalGeo, petalMat.clone());
      petal.position.set(
        (Math.random() - 0.5) * 8,
        Math.random() * 6 - 1,
        (Math.random() - 0.5) * 6
      );
      petal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(petal);
      petalData.push({
        mesh: petal,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.03,
        },
        vy: 0.006 + Math.random() * 0.01,
      });
    }

    // 7. Golden Ember Particle System
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 6 - 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = Math.random();
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffbd35,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. Distant 3D Fireworks Explosions
    interface FireworkBurst {
      points: THREE.Points;
      velocities: Float32Array;
      age: number;
      maxAge: number;
    }
    const activeBursts: FireworkBurst[] = [];

    const spawnFirework = (x: number, y: number, z: number, colorHex: number) => {
      const count = 120;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const vels = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const speed = 0.03 + Math.random() * 0.05;

        vels[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
        vels[i * 3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
        vels[i * 3 + 2] = speed * Math.cos(phi);
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

      const mat = new THREE.PointsMaterial({
        color: colorHex,
        size: 0.08,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
      });

      const pMesh = new THREE.Points(geo, mat);
      scene.add(pMesh);
      activeBursts.push({ points: pMesh, velocities: vels, age: 0, maxAge: 65 });
    };

    let fireworkTimer = 0;

    // 9. Mouse interaction parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Mouse Parallax Smooth Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      camera.position.x = mouse.x * 0.5;
      camera.position.y = 1.2 + mouse.y * 0.3;
      camera.lookAt(0, 0.4, 0);

      // Flickering Diya Flame
      const flicker = Math.sin(time * 14) * 0.08 + Math.cos(time * 23) * 0.04;
      flameMesh.scale.set(1 + flicker, 1 + flicker * 1.5, 1 + flicker);
      flameLight.intensity = 3.2 + Math.sin(time * 18) * 0.6 + (Math.random() - 0.5) * 0.2;
      flameSubLight.intensity = 2.0 + Math.cos(time * 15) * 0.4;

      // Diya Gentle Floating Bob
      diyaGroup.position.y = Math.sin(time * 1.8) * 0.06;
      diyaGroup.rotation.y = Math.sin(time * 0.6) * 0.1 + mouse.x * 0.2;

      // Rangoli Rotation
      rangoliGroup.rotation.y = time * 0.08;

      // Swaying Lanterns
      lanterns.forEach((l) => {
        l.group.rotation.z = Math.sin(time * l.speed + l.offset) * 0.12;
        l.group.rotation.x = Math.cos(time * l.speed * 0.7 + l.offset) * 0.08;
      });

      // Drifting Petals
      petalData.forEach((p) => {
        p.mesh.position.y -= p.vy;
        p.mesh.position.x += Math.sin(time + p.mesh.position.y) * 0.005;
        p.mesh.rotation.x += p.rotSpeed.x;
        p.mesh.rotation.y += p.rotSpeed.y;
        p.mesh.rotation.z += p.rotSpeed.z;

        if (p.mesh.position.y < -2) {
          p.mesh.position.y = 4.5;
          p.mesh.position.x = (Math.random() - 0.5) * 8;
        }
      });

      // Ember Particles Rise
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += 0.008;
        posArray[i * 3] += Math.sin(time + i) * 0.003;
        if (posArray[i * 3 + 1] > 4.5) {
          posArray[i * 3 + 1] = -1.5;
          posArray[i * 3] = (Math.random() - 0.5) * 10;
        }
      }
      posAttr.needsUpdate = true;

      // Spawn periodic fireworks
      fireworkTimer++;
      if (fireworkTimer > 110) {
        fireworkTimer = 0;
        const colors = [0xffbd35, 0xe82c91, 0x00b4d8, 0xff7518, 0xffd76a];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const rx = (Math.random() - 0.5) * 6;
        const ry = 2.0 + Math.random() * 2.0;
        const rz = -2.5 - Math.random() * 2.5;
        spawnFirework(rx, ry, rz, randomColor);
      }

      // Update active firework bursts
      for (let b = activeBursts.length - 1; b >= 0; b--) {
        const burst = activeBursts[b];
        burst.age++;
        const pPositions = burst.points.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < pPositions.length / 3; i++) {
          pPositions[i * 3] += burst.velocities[i * 3];
          pPositions[i * 3 + 1] += burst.velocities[i * 3 + 1] - 0.0006; // gravity
          pPositions[i * 3 + 2] += burst.velocities[i * 3 + 2];
        }
        burst.points.geometry.attributes.position.needsUpdate = true;

        const mat = burst.points.material as THREE.PointsMaterial;
        mat.opacity = 1 - burst.age / burst.maxAge;

        if (burst.age >= burst.maxAge) {
          scene.remove(burst.points);
          burst.points.geometry.dispose();
          mat.dispose();
          activeBursts.splice(b, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-fest-midnight/90 pointer-events-none">
        <div className="text-center p-6 glass-panel rounded-2xl max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-fest-gold/20 flex items-center justify-center mb-3">
            <span className="text-3xl">🪔</span>
          </div>
          <p className="text-xs text-fest-cream/70">
            Rendering in Lightweight Festive CSS Mode
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
