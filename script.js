const timelineItems = document.querySelectorAll(".timeline-item");
let currentIndex = 0;

function revealTimeline() {
  document.getElementById("timelineContainer").classList.remove("hidden");
  showTimelineItem(currentIndex);
}

function showTimelineItem(index) {
  timelineItems.forEach(item => item.style.display = "none");
  timelineItems[index].style.display = "block";
}

function nextTimeline() {
  if (currentIndex < timelineItems.length - 1) {
    currentIndex++;
    showTimelineItem(currentIndex);
  }
}

function prevTimeline() {
  if (currentIndex > 0) {
    currentIndex--;
    showTimelineItem(currentIndex);
  }
}

// Music controls
const audio = document.getElementById("loveSong");
const playBtn = document.getElementById("playBtn");
const seekSlider = document.getElementById("seekSlider");

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    playBtn.textContent = "Play";
  }
}

audio.addEventListener("timeupdate", () => {
  seekSlider.value = (audio.currentTime / audio.duration) * 100;
});

seekSlider.addEventListener("input", () => {
  const seekTo = (seekSlider.value / 100) * audio.duration;
  audio.currentTime = seekTo;
});
