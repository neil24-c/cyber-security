body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow-x: hidden;
  color: white;
}

.centered {
  position: absolute;
  top: 40%;
  width: 100%;
  text-align: center;
}

button {
  background: #ff66b2;
  border: none;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

.hidden {
  display: none;
}

#timeline {
  margin-top: 150px;
  text-align: center;
}

.timeline-item {
  font-size: 1.3rem;
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 0 15px #ffccff;
}

.timeline-nav {
  margin: 10px;
}

.music-controls {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

#stars {
  width: 100%;
  height: 100%;
  background: transparent url('https://raw.githubusercontent.com/VincentGarreau/particles.js/master/demo/media/star.png') repeat;
  position: fixed;
  top: 0;
  left: 0;
  animation: starAnim 100s linear infinite;
  z-index: -1;
}

@keyframes starAnim {
  from { background-position: 0 0; }
  to { background-position: 10000px 10000px; }
}

.hearts::before {
  content: "💖 💕 💓 💘 💗 💝 💞 ";
  font-size: 2rem;
  position: fixed;
  width: 100%;
  animation: fall 10s linear infinite;
  z-index: -2;
  top: -10%;
}

@keyframes fall {
  0% { top: -10%; }
  100% { top: 110%; }
}
