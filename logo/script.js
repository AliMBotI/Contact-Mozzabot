document.addEventListener("DOMContentLoaded", () => {
  const letterM = document.getElementById("letter-m");
  const highlightBtn = document.getElementById("highlight-m-btn");

  document.querySelectorAll(".ink-line").forEach((line, index) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = length;
    line.style.strokeDashoffset = length;
    line.style.animation = `draw-logo 0.7s ${0.08 * index}s ease-out forwards`;
  });

  const toggleMHighlight = () => {
    const active = letterM.classList.toggle("m-highlighted");
    highlightBtn.textContent = active ? 'Unhighlight "M"' : 'Highlight "M"';
  };

  highlightBtn.addEventListener("click", toggleMHighlight);
  letterM.style.cursor = "pointer";
  letterM.addEventListener("click", toggleMHighlight);
});
