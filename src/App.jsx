import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const lines = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.5 + Math.random(),
      length: 100 + Math.random() * 100,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(0, 255, 255, 0.2)";
      ctx.lineWidth = 1;

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x, line.y + line.length);
        ctx.stroke();

        line.y += line.speed;
        if (line.y > height) {
          line.y = -line.length;
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center">
      <canvas
        id="bg-canvas"
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>
      <div className="z-10 text-center">
        <h1 className="text-3xl font-bold">DS SELLER LIGHT</h1>
        <p className="text-lg mt-2">Automação para Marketplaces</p>
      </div>
    </div>
  );
}
