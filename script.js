const revealBtn = document.getElementById("revealBtn");
const timeline = document.getElementById("timeline");

const events = [
  "Sighting each other secretly",
  "Talking to each other through Mack",
  "Texting on Insta",
  "Drifted apart",
  "Life brought us back on Oct 2nd",
  "Met at Gold Rush and hugged so tight",
  "Fell in love too deep",
  "Again faced hardships",
  "Jan 1st started fresh",
  "Purple moda",
  "Highs and lows but still strong for now and ever"
];

let index = 0;

revealBtn.addEventListener("click", () => {
  revealBtn.disabled = true;
  timeline.classList.remove("hidden");
  const interval = setInterval(() => {
    if (index < events.length) {
      const p = document.createElement("p");
      p.textContent = events[index];
      timeline.appendChild(p);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 1000);
});

// Floating hearts
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}, 500);
