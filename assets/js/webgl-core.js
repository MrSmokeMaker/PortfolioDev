/**
 * ==========================================================================
 * INTERACTIVE 3D CYBER-CORE (Vanilla Canvas 3D Math)
 * 60 FPS Quaternion-style 3D Polyhedron with Orbital Rings & Particle Constellation
 * 0 KB External Dependencies · Hardware Compositor Safe · Mouse Interactive
 * ==========================================================================
 */

(function () {
  'use strict';

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init3DCore() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      const parent = canvas.parentElement;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // 3D Icosahedron Vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
    ];

    // Normalize and scale
    const scale = Math.min(width, height) * 0.28;
    const vertices = baseVertices.map(v => {
      const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      return [ (v[0]/len) * scale, (v[1]/len) * scale, (v[2]/len) * scale ];
    });

    // Edges connecting vertices
    const edges = [];
    const threshold = scale * 1.15;
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist < threshold) {
          edges.push([i, j]);
        }
      }
    }

    // Orbit particles
    const particles = [];
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * Math.PI * 2;
      const r = scale * (1.3 + (i % 3) * 0.2);
      particles.push({
        angle,
        r,
        speed: (0.01 + (i % 4) * 0.005) * ((i % 2 === 0) ? 1 : -1),
        yOffset: Math.sin(angle * 2) * 20,
        size: 1.5 + (i % 2) * 1.5
      });
    }

    // Rotation angles and mouse inertia
    let angleX = 0.3;
    let angleY = 0.4;
    let targetAngleX = 0.3;
    let targetAngleY = 0.4;
    let pulseWave = 0;

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetAngleY = nx * 1.8;
      targetAngleX = -ny * 1.8;
    });

    canvas.addEventListener('click', () => {
      pulseWave = 1.0;
      if (window.playUiSound) window.playUiSound(720, 0.08, 'sine');
    });

    // 3D Projection functions
    function rotatePoint(x, y, z, ax, ay) {
      // Rotate Y
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotate X
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      return [x1, y2, z2];
    }

    function project(x, y, z) {
      const fov = 420;
      const cameraDist = 480;
      const factor = fov / (cameraDist + z);
      return [x * factor + width / 2, y * factor + height / 2, z];
    }

    function render() {
      if (!isReduced) {
        // Inertia tracking
        angleX += (targetAngleX - angleX) * 0.05 + 0.003;
        angleY += (targetAngleY - angleY) * 0.05 + 0.005;
      }

      ctx.clearRect(0, 0, width, height);

      // Pulse wave propagation
      if (pulseWave > 0) {
        ctx.strokeStyle = `rgba(37, 99, 235, ${pulseWave * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, (1 - pulseWave) * scale * 2.2, 0, Math.PI * 2);
        ctx.stroke();
        pulseWave -= 0.02;
      }

      // Rotate and project vertices
      const currentScaleMult = 1 + Math.sin(Date.now() / 800) * 0.04;
      const projected = vertices.map(v => {
        const [rx, ry, rz] = rotatePoint(v[0] * currentScaleMult, v[1] * currentScaleMult, v[2] * currentScaleMult, angleX, angleY);
        return project(rx, ry, rz);
      });

      // Draw 3D Edges with depth fading
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1[2] + p2[2]) / 2;
        const alpha = Math.max(0.15, Math.min(0.85, (avgZ + scale) / (scale * 2)));

        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.lineWidth = alpha * 1.8;
        ctx.beginPath();
        ctx.moveTo(p1[0], p1[1]);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
      });

      // Draw Vertices glowing nodes
      projected.forEach(p => {
        const alpha = Math.max(0.2, Math.min(0.9, (p[2] + scale) / (scale * 2)));
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Orbiting Constellation Particles
      particles.forEach(pt => {
        if (!isReduced) pt.angle += pt.speed;
        const px = Math.cos(pt.angle) * pt.r;
        const pz = Math.sin(pt.angle) * pt.r;
        const py = pt.yOffset;

        const [rx, ry, rz] = rotatePoint(px, py, pz, angleX * 0.5, angleY * 0.5);
        const [projX, projY, depth] = project(rx, ry, rz);

        const alpha = Math.max(0.1, Math.min(0.7, (depth + pt.r) / (pt.r * 2)));
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.beginPath();
        ctx.arc(projX, projY, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(render);
    }

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DCore);
  } else {
    init3DCore();
  }
})();
