// Full-screen scrolling image reel for index.html (splash page)
// Mounts into #particle-container

const splashImages = [
  "images/instructions for a new body/showcase.jpeg",
  "images/alone_growth.png",
  "images/interweb.jpg",
  "images/the desire of a morphing body.png",
  "images/oldboy recreation.png",
  "images/sense of home.JPG",
  "images/re-bloom.png",
  "images/burnout.png",
  "images/Within My Box.png",
  "images/vampire bar.png",
];

let imgs = [];
let imgW, imgH;
const SPEED = 3.5;

function preload() {
  for (let i = 0; i < splashImages.length; i++) {
    imgs[i] = loadImage(splashImages[i]);
  }
}

function setup() {
  const container = select("#particle-container");
  if (!container) return;
  const c = createCanvas(windowWidth, windowHeight);
  c.parent(container);
  imageMode(CENTER);
  noStroke();
  setDimensions();
}

function draw() {
  background(0);
  if (imgs.length === 0) return;

  const totalWidth = imgW * imgs.length;
  const offset = (frameCount * SPEED) % totalWidth;

  for (let i = 0; i < imgs.length * 2; i++) {
    const x = i * imgW - offset + imgW / 2;
    const y = height / 2;
    if (x > -imgW && x < width + imgW) {
      drawCropped(imgs[i % imgs.length], x, y, imgW, imgH);
    }
  }
}

function drawCropped(img, x, y, w, h) {
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
  resizeCanvas(windowWidth, windowHeight);
  setDimensions();
}

function setDimensions() {
  imgH = windowHeight;
  imgW = imgH * (4 / 3);
}
