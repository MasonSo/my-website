// Scrolling image reel for the right panel on home.html
// Uses global p5 mode, mounted into #reel-panel

const reelImages = [
  "images/instructions for a new body/showcase.jpeg",
  "images/the desire of a morphing body.png",
  "images/interweb.jpg",
  "images/alone_growth.png",
  "images/sense of home.JPG",
  "images/oldboy recreation.png",
  "images/re-bloom.png",
  "images/burnout.png",
  "images/Within My Box.png",
  "images/vampire bar.png",
];

let reelImgs = [];
let reelW, reelH;
const SCROLL_SPEED = 3.5;

function preload() {
  for (let i = 0; i < reelImages.length; i++) {
    reelImgs[i] = loadImage(reelImages[i]);
  }
}

function setup() {
  const panel = document.getElementById('reel-panel');
  const c = createCanvas(panel.offsetWidth, panel.offsetHeight);
  c.parent('reel-panel');
  imageMode(CENTER);
  noStroke();
  reelH = panel.offsetHeight;
  reelW = reelH * (3 / 4);
}

function draw() {
  background(0);
  if (reelImgs.length === 0) return;

  const totalWidth = reelW * reelImgs.length;
  const offset = (frameCount * SCROLL_SPEED) % totalWidth;

  for (let i = 0; i < reelImgs.length * 2; i++) {
    const x = i * reelW - offset + reelW / 2;
    const y = height / 2;
    if (x > -reelW && x < width + reelW) {
      reelDrawCropped(reelImgs[i % reelImgs.length], x, y, reelW, reelH);
    }
  }
}

function reelDrawCropped(img, x, y, w, h) {
  const imgAspect = img.width / img.height;
  const boxAspect = w / h;
  let srcW, srcH, srcX, srcY;

  if (imgAspect > boxAspect) {
    srcH = img.height;
    srcW = img.height * boxAspect;
    srcX = (img.width - srcW) / 2;
    srcY = 0;
  } else {
    srcW = img.width;
    srcH = img.width / boxAspect;
    srcX = 0;
    srcY = (img.height - srcH) / 2;
  }

  image(img, x, y, w, h, srcX, srcY, srcW, srcH);
}

function windowResized() {
  const panel = document.getElementById('reel-panel');
  if (!panel) return;
  resizeCanvas(panel.offsetWidth, panel.offsetHeight);
  reelH = panel.offsetHeight;
  reelW = reelH * (3 / 4);
}
