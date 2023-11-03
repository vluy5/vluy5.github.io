const kImage = document.getElementById("kImage");
const container = document.querySelector(".container");
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
const imageWidth = kImage.clientWidth;
const imageHeight = kImage.clientHeight;
const speed = 1;

let x = containerWidth / 2;
let y = containerHeight / 2;
let dx = speed;
let dy = speed;

function moveImage() {
    x += dx;
    y += dy;

    if (x + imageWidth > containerWidth || x < 0) {
        dx = -dx;
    }

    if (y + imageHeight > containerHeight || y < 0) {
        dy = -dy;
    }

    kImage.style.left = x + "px";
    kImage.style.top = y + "px";

    requestAnimationFrame(moveImage);
}

moveImage();

// window
const confirmationDialog = document.getElementById("confirmationDialog");
confirmationDialog.style.display = "block";

// full screen
document.addEventListener("keydown", openFullscreen);
document.addEventListener("mousedown", openFullscreen);

function openFullscreen() {
    confirmationDialog.style.display = "none"; // close dialog
    document.documentElement.requestFullscreen = document.documentElement.requestFullscreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullscreen || document.documentElement.msRequestFullscreen;

    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
}
