import { useState } from "react";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);
  const [particles, setParticles] = useState([]);

  const burstEmojis = ["💖", "💕", "💘", "💝", "🌸", "🌷", "🌹", "🌺", "✨", "🩷"];

  const handleEnvelopeClick = () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      const newParticles = Array.from({ length: 30 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 180 + Math.random() * 220;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const rotate = -180 + Math.random() * 360;
        const delay = Math.random() * 0.15;
        const duration = 1.8 + Math.random() * 1.2;

        return {
          id: i + Date.now(),
          emoji: burstEmojis[Math.floor(Math.random() * burstEmojis.length)],
          x,
          y,
          rotate,
          delay,
          duration,
          size: 24 + Math.random() * 18,
        };
      });

      setParticles(newParticles);

      setTimeout(() => {
        setParticles([]);
      }, 3500);
    } else {
      setParticles([]);
    }
  };

  return (
    <div className="container">
      <div className="envelope-wrapper">
        <div
          className={`envelope ${open ? "open" : ""}`}
          onClick={handleEnvelopeClick}
        >
          <div className="flap"></div>

          {open && <img src="/burak.jpeg" alt="" className="photo" />}

          <div className="letter">
            {open && (
              <div className="content">
                <p className="inside-text">
                  Belki büyüdük ve kırıldık ama içimizdeki o küçük hâlimiz hâlâ
                  birbirini çok seviyor 🤍
                </p>
              </div>
            )}
          </div>

          {!open && (
            <p className="envelope-text">Ravza Albayrak&apos;a özel</p>
          )}
        </div>

        {particles.map((p) => (
          <span
            key={p.id}
            className="burst-particle"
            style={{
              "--x": `${p.x}px`,
              "--y": `${p.y}px`,
              "--r": `${p.rotate}deg`,
              "--d": `${p.duration}s`,
              "--delay": `${p.delay}s`,
              fontSize: `${p.size}px`,
            }}
          >
            {p.emoji}
          </span>
        ))}

        {!open && <p className="hint">Beni seviyorsa zarfı aç 🩷</p>}
      </div>
    </div>
  );
}

export default App;