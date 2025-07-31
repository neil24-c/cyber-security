const timelineData = [
  "💌 The day we met — my universe shifted.",
  "🚕 The kiss in the cab… magic in motion.",
  "💞 Our first fight — and how love won.",
  "🫶 Holding your hand under the moonlight.",
  "🎁 That birthday surprise you never expected.",
  "💍 My forever promise — coming soon..."
];

let currentIndex = 0;
const timelineContent = document.getElementById("timelineContent");
const revealBtn = document.getElementById("revealBtn");
const timeline = document.getElementById("timeline");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const audio = document.getElementById("bg-music");
const toggleMusicBtn = document.getElementById("toggleMusic");

function showTimelineItem(index) {
  timelineContent.textContent = timelineData[index];
}

revealBtn.addEventListener("click", () => {
  document.querySelector(".centered").style.display = "none";
  timeline.classList.remove("hidden");
  showTimelineItem(currentIndex);
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    showTimelineItem(currentIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < timelineData.length - 1) {
    currentIndex++;
    showTimelineItem(currentIndex);
  }
});

toggleMusicBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    toggleMusicBtn.textContent = "Pause Music";
  } else {
    audio.pause();
    toggleMusicBtn.textContent = "Play Music";
  }
});
