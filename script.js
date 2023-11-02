const playButton = document.getElementById("playButton");
let videoWindow = null;

playButton.addEventListener("click", () => {
  const videoUrl = "rik.mp4";
  videoWindow = window.open(videoUrl, "Video Player", "fullscreen=yes,location=no,menubar=no,status=no,toolbar=no");
  
  if (videoWindow) {
    videoWindow.moveTo(0, 0);
    videoWindow.resizeTo(screen.width, screen.height);
    
    // Noooooooooooooooooooooooooooooooooooooo
    videoWindow.onbeforeunload = function(event) {
      const confirmationMessage = "GG";
      (event || window.event).returnValue = confirmationMessage; 
      return confirmationMessage;
    };
  }
});


