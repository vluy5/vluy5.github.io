const playButton = document.getElementById("playButton");
let videoWindow = null;

playButton.addEventListener("click", () => {
  const videoUrl = "rik.mp4";
  videoWindow = window.open(videoUrl, "Video Player", "fullscreen=yes,location=no,menubar=no,status=no,toolbar=no");
  
  if (videoWindow) {
    videoWindow.moveTo(0, 0);
    videoWindow.resizeTo(screen.width, screen.height);
    
    // Добавляем обработчик для попытки закрытия окна
    videoWindow.onbeforeunload = function(event) {
      const confirmationMessage = "Вы уверены, что хотите закрыть окно? Возможно, вы потеряете данные.";
      (event || window.event).returnValue = confirmationMessage; // Для совместимости с разными браузерами
      return confirmationMessage;
    };
  }
});

// Добавляем обработчик для клавиши F11
window.addEventListener("keydown", (event) => {
  if (event.key === "F11") {
    event.preventDefault(); // Предотвращаем действие по умолчанию
    const videoUrl = "rik.mp4";
    videoWindow = window.open(videoUrl, "Video Player", "fullscreen=yes,location=no,menubar=no,status=no,toolbar=no");
    
    if (videoWindow) {
      videoWindow.moveTo(0, 0);
      videoWindow.resizeTo(screen.width, screen.height);
      
      // Добавляем обработчик для попытки закрытия окна
      videoWindow.onbeforeunload = function(event) {
        const confirmationMessage = "Вы уверены, что хотите закрыть окно? Возможно, вы потеряете данные.";
        (event || window.event).returnValue = confirmationMessage; // Для совместимости с разными браузерами
        return confirmationMessage;
      };
    }
  }
});
