body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", sans-serif;
  background: linear-gradient(to bottom right, #4a148c, #880e4f);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.container {
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.1em;
  margin-bottom: 20px;
}

button {
  padding: 10px 25px;
  font-size: 1em;
  border: none;
  border-radius: 20px;
  background: #ff4081;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #f50057;
}

.timeline {
  list-style: none;
  margin-top: 30px;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
  text-align: left;
}

.timeline li {
  margin: 15px 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.timeline li.show {
  opacity: 1;
  transform: translateY(0);
}

.hidden {
  display: none;
}

/* Floating Hearts */
@keyframes float {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-800px) scale(1.5);
    opacity: 0;
  }
}

.heart {
  position: absolute;
  width: 20px;
  height: 20px;
  background: pink;
  transform: rotate(45deg);
  animation: float 5s linear infinite;
  opacity: 0.8;
}

.heart::before,
.heart::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: pink;
  border-radius: 50%;
}

.heart::before {
  top: -10px;
  left: 0;
}

.heart::after {
  left: -10px;
  top: 0;
}

