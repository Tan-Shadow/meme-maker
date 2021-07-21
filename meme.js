let topTextInput,
  bottomTextInput,
  topTextInputSize,
  bottomTextInputSize,
  imageInput,
  generateBtn,
  canvas,
  ctx;

function generateMeme(image, topText, bottomText, topTextSize, bottomTextSize) {
  let fontSize;

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";

  // top text font size
  fontSize = canvas.width * topTextSize;
  ctx.font = `${fontSize}px bold Raleway`;
  ctx.textBaseline = "top"; // where do you measure the distance from the top https://www.w3schools.com/tags/canvas_textbaseline.asp
  ctx.textAlign = "center";

  //top text
  ctx.lineWidth = fontSize / 25;
  topText.split("\n").forEach((t, i) => {
    ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
    ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
  });

  // bottom text font size
  fontSize = canvas.width * bottomTextSize;
  ctx.font = `${fontSize}px bold Raleway`;
  ctx.textBaseline = "top";
  ctx.textAlign = "center";

  //bottom text
  ctx.textBaseline = "bottom";
  ctx.lineWidth = fontSize / 25;
  bottomText
    .split("\n")
    .reverse() // we are reversing the array because we want to start from the last element and render it first to the bottom and go for the next one
    .forEach((t, i) => {
      ctx.fillText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize - 10,
        canvas.width
      ); // fill the inside of the text with the text x pos is half of that of canvas width and because we have text align center it centers it, y pos is 0 now because we have baseline as top it take the top 0 from the top and the max width should not be more than canvas's width
      ctx.strokeText(
        t,
        canvas.width / 2,
        canvas.height - i * fontSize - 10,
        canvas.width
      );
    });
}

function init() {
  topTextInput = document.getElementById("top-text-input");
  bottomTextInput = document.getElementById("bottom-text-input");
  imageInput = document.getElementById("image-input");
  bottomTextInputSize = document.getElementById("bottom-text-input-size");
  topTextInputSize = document.getElementById("top-text-input-size");
  generateBtn = document.getElementById("generate-btn");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  canvas.width = canvas.height = 0;

  generateBtn.addEventListener("click", () => {
    let reader = new FileReader();
    reader.readAsDataURL(imageInput.files[0]);
    reader.onload = () => {
      let image = new Image();
      image.src = reader.result;
      image.onload = () => {
        generateMeme(
          image,
          topTextInput.value.trim(),
          bottomTextInput.value.trim(),
          topTextInputSize.value,
          bottomTextInputSize.value
        );
      };
    };
  });
}

init();
