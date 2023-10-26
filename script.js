const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {
  const videoUrl = "rik.mp4";
  const newTab = window.open(videoUrl, "_blank");
  if (newTab) {
    newTab.onload = () => {
      const videoElement = newTab.document.createElement("video");
      videoElement.src = videoUrl;
      videoElement.controls = true;
      videoElement.autoplay = true;
      videoElement.style.width = "100%";
      videoElement.style.height = "100%";
      
      newTab.document.body.appendChild(videoElement);
      
      setTimeout(() => {
        // Попробуем включить полноэкранный режим после задержки в 1 секунду
        if (videoElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if (videoElement.mozRequestFullScreen) {
          videoElement.mozRequestFullScreen();
        } else if (videoElement.webkitRequestFullscreen) {
          videoElement.webkitRequestFullscreen();
        }
      }, 1000); // Задержка в 1 секунду (1000 миллисекунд)
    };
  }
});
