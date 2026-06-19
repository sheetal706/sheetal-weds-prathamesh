import { useEffect, useRef } from "react";

export default function MandalaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      spinSpeed: number;
      opacity: number;
    }> = [];

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      growing: boolean;
    }> = [];

    // Resize handling using ResizeObserver as instructed by Guidelines
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        canvas.width = width;
        canvas.height = height;
        
        // Re-initialize lists with density proportional to screen area
        initAesthetics(width, height);
      }
    });

    const parentElement = canvas.parentElement || document.body;
    resizeObserver.observe(parentElement);

    // Seed beautiful romantic floating particles & flower petals
    function initAesthetics(width: number, height: number) {
      petals = [];
      particles = [];

      const petalCount = Math.min(30, Math.floor((width * height) / 45000));
      for (let i = 0; i < petalCount; i++) {
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height - height,
          size: Math.random() * 8 + 5,
          speedY: Math.random() * 0.8 + 0.5,
          speedX: Math.random() * 0.4 - 0.2,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() * 0.02 - 0.01),
          opacity: Math.random() * 0.5 + 0.3
        });
      }

      const particleCount = Math.min(60, Math.floor((width * height) / 25000));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          speedY: -(Math.random() * 0.3 + 0.1),
          speedX: Math.random() * 0.2 - 0.1,
          opacity: Math.random() * 0.6 + 0.1,
          growing: Math.random() > 0.5
        });
      }
    }

    // Animation loop
    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Draw subtle warm alabaster/ivory white luxury background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#FDFCF7"); // Pearl Ivory
      gradient.addColorStop(0.5, "#FAF6EE"); // Soft Cream
      gradient.addColorStop(1, "#F4EDE0"); // Satin Alabaster
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw elegant abstract geometric glowing mandala arcs at corners (parallax aesthetic)
      const time = Date.now() * 0.00015;
      
      // Top Right Mandala (Gold Accent)
      drawBackgroundMandala(ctx, width, 0, 320, time, "rgba(197, 160, 89, 0.05)");
      drawBackgroundMandala(ctx, width, 0, 160, -time * 1.5, "rgba(197, 160, 89, 0.03)");
      
      // Bottom Left Mandala (Gold Accent)
      drawBackgroundMandala(ctx, 0, height, 400, -time * 0.8, "rgba(197, 160, 89, 0.045)");
      drawBackgroundMandala(ctx, 0, height, 220, time * 1.2, "rgba(197, 160, 89, 0.03)");

      // Center Background Mandala for stunning aesthetic
      drawBackgroundMandala(ctx, width / 2, height / 2, Math.min(width * 0.35, 350), time * 0.5, "rgba(197, 160, 89, 0.025)");

      // 1. Draw glowing background fairy dust / sparkles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 160, 89, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(197, 160, 89, 0.6)";
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Update particle
        p.y += p.speedY;
        p.x += p.speedX;

        // Pulse opacity
        if (p.growing) {
          p.opacity += 0.005;
          if (p.opacity >= 0.8) p.growing = false;
        } else {
          p.opacity -= 0.005;
          if (p.opacity <= 0.1) p.growing = true;
        }

        // Wrap around screen boundaries
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) p.speedX *= -1;
      });

      // 2. Draw falling Jasmine / Marigold cream petals
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        // Draw elegant petal shape (ellipse-vector)
        ctx.beginPath();
        // Drawing an organic leaf-like petal vector
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size * 0.6, -p.size * 0.5, p.size * 0.2, p.size);
        ctx.quadraticCurveTo(0, p.size * 1.2, -p.size * 0.2, p.size);
        ctx.quadraticCurveTo(-p.size * 0.6, -p.size * 0.5, 0, -p.size);
        
        // Traditional wedding colors (cream yellow and warm saffron blush)
        const petalGrad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        petalGrad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`); // Pure Cream
        petalGrad.addColorStop(0.6, `rgba(255, 235, 180, ${p.opacity * 0.9})`); // Pale Gold
        petalGrad.addColorStop(1, `rgba(212, 163, 89, ${p.opacity * 0.5})`); // Saffron Scent
        
        ctx.fillStyle = petalGrad;
        ctx.fill();
        ctx.restore();

        // Update petal positions
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.15; // Gentle sway
        p.angle += p.spinSpeed;

        // Reset if it flows offscreen
        if (p.y > height + p.size) {
          p.y = -p.size;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.5 + 0.3;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Clean up animation loop and resize observers
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  // Helper routine to draw a procedural gold mandala on canvas
  function drawBackgroundMandala(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    rotation: number,
    color: string
  ) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    // Outer ring
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Intermediate rings
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.7, 0, Math.PI * 2);
    ctx.arc(0, 0, radius * 0.4, 0, Math.PI * 2);
    ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
    ctx.stroke();

    // Beautiful procedural flower petals (8-point symmetry)
    const points = 16;
    for (let j = 0; j < 2; j++) {
      const currentRadius = j === 0 ? radius : radius * 0.6;
      ctx.beginPath();
      for (let i = 0; i < points; i++) {
        const theta1 = (i * Math.PI * 2) / points;
        const theta2 = ((i + 1) * Math.PI * 2) / points;
        const controlTheta = (theta1 + theta2) / 2;

        const x1 = Math.cos(theta1) * currentRadius;
        const y1 = Math.sin(theta1) * currentRadius;
        const x2 = Math.cos(theta2) * currentRadius;
        const y2 = Math.sin(theta2) * currentRadius;

        // Expand vector outwards for control
        const cx = Math.cos(controlTheta) * currentRadius * 1.25;
        const cy = Math.sin(controlTheta) * currentRadius * 1.25;

        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cx, cy, x2, y2);
      }
      ctx.stroke();
    }

    // Sacred geometric cross lines
    ctx.beginPath();
    for (let i = 0; i < points; i += 2) {
      const theta = (i * Math.PI * 2) / points;
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
    }
    ctx.stroke();

    ctx.restore();
  }

  return (
    <canvas
      id="wedding-aesthetics-canvas"
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 block"
    />
  );
}
