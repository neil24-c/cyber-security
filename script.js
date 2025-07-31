document.getElementById('revealBtn').addEventListener('click', () => {
  const timeline = document.getElementById('timeline');
  timeline.classList.remove('hidden');

  const entries = timeline.querySelectorAll('.entry');
  entries.forEach((entry, i) => {
    setTimeout(() => {
      entry.classList.add('visible');
    }, i * 700);
  });
});

// Floating hearts generator
const hearts = document.getElementById('hearts');
setInterval(() => {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (Math.random() * 2 + 4) + 's';
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);
