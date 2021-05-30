const body = document.querySelector("body");

const IMG_Number = 5;

function handleImageload() {
  console.log("finished loading");
}
function paintImage(imgnumber) {
  const image = new Image();
  image.src = `pictures/${imgnumber + 1}.jpg`;
  image.classList.add("bgImg");
  body.prepend(image);
  image.addEventListener("load", handleImageload);
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_Number);
  return number;
}
function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}
init();
