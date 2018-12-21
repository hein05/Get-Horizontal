var clickHistory = [];
var progress;

function setup() { //initialize everything
  fillFunctionButtons();
  fillStatusText()      ;
  fillProgressBar();
  fillMatrix();
  setStartText("Loaded succesfully!", "text-bold");

  // setStatusText("Loaded succesfully!", "text-bold");
  setMinute("0" , "text-bold");
  setTimer(":" , "text-bold");
  setSec("00" , "text-bold");
  // setScore("SCORE : " , "text-bold");
  // chosenBtn.length = 2;
}

function fillFunctionButtons() {
  var headDiv = document.getElementById("head");
  var funcBtnRow = createRow();
  funcBtnRow.id = "topRow";
  // createButton(buttonText, styleClass, functionName);
  funcBtnRow.appendChild(createButton("Play", "btn btn-primary btn-sm m-3", "f1()"));
  // funcBtnRow.appendChild(createButton("Drop the beat", "btn btn-warning btn-sm m-3", "f2()"));
  funcBtnRow.appendChild(createBingoChip("white",0));
  funcBtnRow.appendChild(createButton("Defile", "btn btn-dark btn-sm m-3", "f3()"));
  funcBtnRow.appendChild(createButton("Submit!", "btn btn-light m-3", "f4()"));
  funcBtnRow.appendChild(createButton("SCORE :", "btn btn-timer m-timer", ""));
  funcBtnRow.appendChild(createButton("0 ", "btn btn-timer m-timer", ""));

  // funcBtnRow.appendChild(setScore("SCORE :" , "text-bold m-3"));
  headDiv.appendChild(funcBtnRow);
}

function fillStatusText() {
  var headDiv = document.getElementById("head");
  var infoTextRow = createRow("ml-3");
  infoTextRow.id = "infoText"; //set id of this element so we can change it later
  headDiv.appendChild(infoTextRow);
}

function setScore (text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild(document.createTextNode(text));
  // textDiv.innerHTML = "";
  textDiv.appendChild(newText);
  // return newText;
}

function setStartText(text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild((createButton(text, "btn btn-timer m-timer", "")));
  // newText.appendChild(document.createTextNode(text));
  textDiv.innerHTML = "";
  // var oldChild = textDiv.firstElementChild;
  // textDiv.replaceChild(newText, oldChild);
  textDiv.appendChild(newText);
}

function setStatusText(text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild((createButton(text, "btn btn-timer m-timer", "")));
  // newText.appendChild(document.createTextNode(text));
  // textDiv.innerHTML = "";
  var oldChild = textDiv.firstElementChild;
  textDiv.replaceChild(newText, oldChild);
  // textDiv.appendChild(newText);
}

function setMinute (text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild((createButton(text, "btn btn-timer m-timer", "")));
  textDiv.appendChild(newText);
}

function setTimer (text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild((createButton(text, "btn btn-timer m-timer", "")));
  textDiv.appendChild(newText);
}

function setSec (text, style) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild((createButton(text, "btn btn-timer m-timer", "")));
  textDiv.appendChild(newText);
}

function changeTimer (text, style, index) {
  var textDiv = document.getElementById("infoText");
  var newText = document.createElement("p");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild((createButton(text, "btn btn-timer m-timer", "")));
  // newText.appendChild(document.createTextNode(text));
  // textDiv.innerHTML = "";
  var oldChild = textDiv.childNodes[index];
  textDiv.replaceChild(newText, oldChild);
  // textDiv.appendChild(newText);
  
}

function changeScore (text, style, index) {
  var textDiv = document.getElementById("topRow");
  var newText = document.createElement("s");
  if (style != null) {
    newText.className = style;
  }
  newText.appendChild((createButton(text, "btn btn-timer m-timer", "")));
  // newText.appendChild(document.createTextNode(text));
  // textDiv.innerHTML = "";
  var oldChild = textDiv.childNodes[index];
  textDiv.replaceChild(newText, oldChild);
  // textDiv.appendChild(newText);
  
}

function fillProgressBar() {
  var headDiv = document.getElementById("head");
  var progessRow = createRow("progress");
  progress = 100;
  //a green colored bar
  var bar = createProgressBar("bar", "bg-success", progress);
  progessRow.appendChild(bar);
  headDiv.appendChild(progessRow);
}

function fillMatrix() {
  var matrix = document.getElementById("grid");
  for (i = 0; i < 8; i++) {
    var newRow = createRow("justify-content-md-center");
    for (j = 0; j < 8; j++) {
      newRow.appendChild(createDefaultButton(i, j));
    }
    matrix.appendChild(newRow);
  }
}

function fillAllRandom() { //sample function 1
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, getRandomColor(2));
      setButtonText(i, j, getRandomNumber(1, 10));
    }
  }
}

function drop() { //sample function 2
  for (i = 7; i > 0; i--) {
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, getButtonColor(i-1, j));
      setButtonText(i, j, getButtonText(i-1, j));
    }
  }
  //for row 0
    for (j = 0; j < 8; j++) {
      setButtonColor(i, j, getRandomColor(8));
      setButtonText(i, j, getRandomNumber(1, 10));
    }
}

function defile(number) { //sample function 3 (recursion and time)
  if (number < 0) return;
  for (n = 0; n < number; n++) {
    setTimeout(function(){
      var i = getRandomNumber(0, 7);
      var j = getRandomNumber(0, 7);
      setButtonColor(i, j, "black");
      setButtonText(i, j, "");
      setProgressBar("bar", "bg-danger", progress--);
    }, (number+1)*number - n*n);
  }
}

function purge() { //sample function 4
  // for (i = 0; i < 8; i++) {
  //   for (j = 0; j < 8; j++) {
  //     setButtonColor(i, j, "white");
  //     setButtonText(i, j, "");
  //   }
  // }
  gameLevel.restartLevel();
  checkWinColor();
  // currentScore = 0;
  changeScore(currentScore,"text-bold",5);  
  progress = 0;
  clickHistory = [];
  setProgressBar("bar", "bg-success", progress);
  stopTimer();
}

function f1() {
  setStatusText("TIMER :");
  fillAllRandom();
  runTimer();
  setTmpColor(0,getRandomColor(2));
  currentScore = 0;
  changeScore(currentScore,"text-bold",5); 
  gameStatus.changeStatus();
}

function f2() {
  setStatusText("Drop everything by 1 row");
  drop();
}

function f3() {
  setStatusText("BAM! BAM! BAM!");
  defile(32);
}

function f4() {
  setStatusText("Submitted");
  purge();
}

// helper functions below

function createRow(className) {
  var rowDiv = document.createElement("div");
  if (className == null) {
    rowDiv.className = "row";
  } else {
    rowDiv.className = "row " + className;
  }
  return rowDiv;
}

function createButton(buttonText, styleClass, functionName) {
  var button = document.createElement("button");
  button.className = styleClass;
  button.appendChild(document.createTextNode(buttonText));
  button.setAttribute("onclick", functionName);
  return button;
}

function createProgressBar(bar_id, color, value) {
  var bar = document.createElement("div");
  bar.id = bar_id;
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  return bar;
}

function setProgressBar(bar_id, color, value) {
  var bar = document.getElementById(bar_id);
  bar.className = "progress-bar " + color;
  bar.setAttribute("style", "width: " + value + "%");
  bar.innerHTML = value + "%";
}

function createBingoChip (color,i) {
  var button = document.createElement("div");
  button.className = "thumbnail";
  // button.setAttribute("onclick", "buttonClicked("+i+","+j+")");
  
  // var button = document.getElementById("img_" + i + "_" + j);

  //the image part
  var img = document.createElement("img");
  img.id = "tmp_" + i;
  img.setAttribute("src", "images/" + color + ".jpg");
  img.setAttribute("alt", color);
  img.setAttribute("style", "border: 3px dotted " + color);
  // img.style.border = "none";
  // img.setAttribute("src", "images/white.jpg");
  // img.setAttribute("alt", "white");
  img.setAttribute("class", "rounded-circle");
  img.setAttribute("width", "45");
  img.setAttribute("height", "45");

  //the text part
  var text = document.createElement("label");
  text.setAttribute("class", "caption unselectable");
  // text.id = "text_" + i + "_" + j;

  button.appendChild(img);
  button.appendChild(text);
  // button.style.right = 'none';
  // button.style.left = 'none';
  return button;
}

function createDefaultButton() {
  var button = document.createElement("div");
  button.className = "thumbnail";
  button.setAttribute("onclick", "buttonClicked("+i+","+j+")");

  //the image part
  var img = document.createElement("img");
  img.id = "img_" + i + "_" + j;
  img.setAttribute("src", "images/white.jpg");
  img.setAttribute("alt", "white");
  img.setAttribute("class", "rounded-circle");
  img.setAttribute("width", "75");
  img.setAttribute("height", "75");

  //the text part
  var text = document.createElement("label");
  text.setAttribute("class", "caption unselectable");
  text.id = "text_" + i + "_" + j;

  button.appendChild(img);
  button.appendChild(text);
  // button.style.right = 'none';
  // button.style.left = 'none';
  return button;
}

function setTmpColor (i, color) {
  var button = document.getElementById("tmp_" + i);
  button.setAttribute("src", "images/" + color + ".jpg");
  button.setAttribute("alt", color);
  // img.setAttribute("style", "border: 3px dotted " + color);
  // button.style.border = "none";
}

function setButtonColor(i, j, color) {
  var button = document.getElementById("img_" + i + "_" + j);
  button.setAttribute("src", "images/" + color + ".jpg");
  button.setAttribute("alt", color);
  button.style.border = "none";
}

function setButtonText(i, j, text) {
  var button = document.getElementById("text_" + i + "_" + j);
  button.innerHTML = text;
}

function getButtonColor(i, j) {
  var img = document.getElementById("img_" + i + "_" + j);
  
  var color = (img != null) ? img.getAttribute("alt") : "";
  return color;
}

function getButtonText(i, j) {
  var text = document.getElementById("text_" + i + "_" + j);
  return text.innerHTML;
}

function getRandomColor(total) {
  //you might want to change this to get more colors
  var random = Math.floor(Math.random() * total);
  if (random < 1) {
    return "red";
  } else if (random < 2) {
    return "green";
  } else if (random < 3) {
    return "turquoise";
  } else if (random < 4) {
    return "purple";
  } else if (random < 5) {
    return "indigo";
  } else if (random < 6) {
    return "orange";
  } else if (random < 7) {
    return "yellow";
  } 
  return "yellow";
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

//console interaction functions
function logAllHistory() {
  if (clickHistory.length == 0) {
    console.log("History is empty");
    return;
  }
  for (i = 0; i < clickHistory.length; i++) {
    console.log(clickHistory[i]);
  }
}

function logLastClicked() {
  if (clickHistory.length == 0) {
    console.log("History is empty");
  } else {
    console.log(clickHistory[clickHistory.length - 1]);
  }
}

//this is what's triggered when any button in the matrix is pressed

function buttonClicked(i, j) { //this is where you should start
  setStatusText("Button [" + i + ", " + j + "] pressed");
  clickHistory.push(i*8 + j);
  //set this button to a random color
  // setButtonColor(i, j, getRandomColor());
  var currentText = getButtonText(i, j);
  var textValue = 0;
  if (currentText != "") {
    textValue = parseInt(currentText, 10); //convert the text to base10 (decimal) number
  }
  // setButtonText(i, j, test.increment());
  setButtonText(i, j, textValue-1);

  //Show selected Button
  doingSelect(i , j);
  // move(i , j);
 
  //increase the progress bar a bit
  progress += textValue;
  setProgressBar("bar", "bg-success", progress);
}

