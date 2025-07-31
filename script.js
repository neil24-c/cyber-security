function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 2 + Math.random() * 3 + "s";
  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);

const style = document.createElement("style");
style.innerHTML = `
.heart {
  width: 20px;
  height: 20px;
  position: absolute;
  background: red;
  transform: rotate(45deg);
  animation: floatUp ease-in infinite;
  top: 100%;
  opacity: 0.7;
  border-radius: 50%;
}
.heart::before,
.heart::after {
  content: '';
  width: 20px;
  height: 20px;
  position: absolute;
  background: red;
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
@keyframes floatUp {
  0% {
    transform: translateY(0) rotate(45deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) rotate(45deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);
