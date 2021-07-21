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

  ctx.fillStyle = "white"; // fill is the inside
  ctx.strokeStyle = "black"; // stroke is the border

  // top text font size
  fontSize = canvas.width * topTextSize; // set the font size realative to canvas width // just for testing
  ctx.font = `${fontSize}px bold Raleway`;
  ctx.textBaseline = "top"; // where do you measure the distance from the top https://www.w3schools.com/tags/canvas_textbaseline.asp
  ctx.textAlign = "center";

  //top text
  ctx.lineWidth = fontSize / 25;
  topText.split("\n").forEach((t, i) => {
    // we are selecting the array from each newline adn then we are rendering the both
    ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width); // fill the inside of the text with the text x pos is half of that of canvas width and because we have text align center it centers it, y pos is i * fontSize it starts with 0 now because we have baseline as top it take the top 0 from the top, the next element in the array will have a index of 1 so it will be that plus the font size so it will not overlap the previous one, and the max width should not be more than canvas's width
    ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width); // same here but now we making the outline of the text to make it look like bordered
  });

  // bottom text font size
  fontSize = canvas.width * bottomTextSize; // set the font size realative to canvas width // just for testing
  ctx.font = `${fontSize}px bold Raleway`;
  ctx.textBaseline = "top"; // where do you measure the distance from the top https://www.w3schools.com/tags/canvas_textbaseline.asp
  ctx.textAlign = "center";

  //bottom text
  ctx.textBaseline = "bottom"; // where do you measure the distance from the bottom
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
    let reader = new FileReader(); // creating a new fileReader object
    reader.readAsDataURL(imageInput.files[0]); // reading the data from the file[0] which is the first index of the uploaded file and reading it as binary
    reader.onload = () => {
      // after the image is finished reading and converting it as binary
      let image = new Image(); // creating a new image object to store the image in it
      image.src = reader.result; // storing the result of the reader in the image.src to display it
      image.onload = () => {
        // it takes time for the image to load so after the image loads ...
        generateMeme(
          // call the function with these attributes
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
