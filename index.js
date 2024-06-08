let gridRows = 3; //number of rows in grid

let ansGrid = answerGrid(gridRows); //the solution grid

let grid = randomGrid(gridRows); //random current grid which will be displayed

makeHTMLGrid(gridRows);

updateHTMLGrid(gridRows);

document
  .querySelector(".goal-image")
  .setAttribute("src", "images/goal" + (gridRows * gridRows - 1) + ".png"); //set goal image according to the number of rows

// To check if a key is pressed and apply the respective function.
document.addEventListener("keydown", function (event) {
  event.preventDefault();
  let sound = new Audio("sounds/m2.mp3");
  let keyPressed = event.key;
  switch (keyPressed) {
    case "ArrowDown":
      downKey();
      sound.play();
      break;
    case "ArrowUp":
      upKey();
      sound.play();
      break;
    case "ArrowLeft":
      leftKey();
      sound.play();
      break;
    case "ArrowRight":
      rightKey();
      sound.play();
      break;
  }

  updateHTMLGrid(gridRows);
  //check if you won and act accordingly.
  if (isVictory()) {
    document.querySelectorAll(".box").forEach((x) => {
      x.classList.add("box-hidden");
      document.querySelector(".grid").classList.add("grid-victory");
      document.querySelector(".victory-hidden").classList.add("victory-show");
    });
    let soundVictory = new Audio("sounds/victory.mp3");
    soundVictory.play();
    grid = randomGrid(gridRows);
  }
});

//Add swipe funtionality for mobiles
{
  let sound = new Audio("sounds/m2.mp3");

  let startX, startY, endX, endY;
  function handleTouchStart(event) {
    event.preventDefault();
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }
  function handleTouchMove(event) {
    event.preventDefault();
    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;
  }

  function handleTouchEnd() {
    let diffX = endX - startX;
    let diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > 0) {
        // Swipe right
        leftKey();
        sound.play();
      } else {
        // Swipe left
        rightKey();
        sound.play();
      }
    } else {
      // Vertical swipe
      if (diffY > 0) {
        // Swipe down
        upKey();
        sound.play();
      } else {
        // Swipe up
        downKey();
        sound.play();
      }
    }
    updateHTMLGrid(gridRows);
    if (isVictory()) {
      document.querySelectorAll(".box").forEach((x) => {
        x.classList.add("box-hidden");
        document.querySelector(".grid").classList.add("grid-victory");
        document.querySelector(".victory-hidden").classList.add("victory-show");
      });
      let soundVictory = new Audio("sounds/victory.mp3");
      soundVictory.play();
      grid = randomGrid(gridRows);
    }
  }

  let gridElement = document.querySelector(".grid");

  gridElement.addEventListener("touchstart", handleTouchStart, false);
  gridElement.addEventListener("touchmove", handleTouchMove, false);
  gridElement.addEventListener("touchend", handleTouchEnd, false);
}

// change the grid rows and the grid displays when clicked on a mode.
let modeButton = document.querySelectorAll(".mode *");
modeButton.forEach((mode) => {
  mode.addEventListener("click", () => {
    let soundReset = new Audio("sounds/m1.mp3");
    soundReset.play();
    modeButton.forEach((m) => m.classList.remove("active"));
    mode.classList.add("active");
    gridRows = document.querySelector(".mode .active").classList[0];
    document.querySelectorAll(".box").forEach((x) => {
      x.classList.remove("box-hidden");
      document.querySelector(".grid").classList.remove("grid-victory");
      document
        .querySelector(".victory-hidden")
        .classList.remove("victory-show");
    });
    grid = randomGrid(gridRows);

    makeHTMLGrid(gridRows);

    updateHTMLGrid(gridRows);
  });
});

// adding functioning the the reset button
let resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
  document.querySelectorAll(".box").forEach((x) => {
    x.classList.remove("box-hidden");
    document.querySelector(".grid").classList.remove("grid-victory");
    document.querySelector(".victory-hidden").classList.remove("victory-show");
  });
  grid = randomGrid(gridRows);
  updateHTMLGrid(gridRows);
  let soundReset = new Audio("sounds/m1.mp3");
  soundReset.play();
});

//function to find the index of a key in a 2d array.
function findKey(key, grid) {
  rows = grid.length;
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === key) {
        return [i, j];
      }
    }
}

// Defining function to change the grid accordingly when a key is pressed for each arrow key.
function downKey() {
  let emptyPos = findKey(0, grid);
  let temp = grid[emptyPos[0]][emptyPos[1]];
  if (emptyPos[0] + 1 < gridRows) {
    grid[emptyPos[0]][emptyPos[1]] = grid[emptyPos[0] + 1][emptyPos[1]];
    grid[emptyPos[0] + 1][emptyPos[1]] = temp;
  }
}

function upKey() {
  let emptyPos = findKey(0, grid);
  let temp = grid[emptyPos[0]][emptyPos[1]];
  if (emptyPos[0] - 1 >= 0) {
    grid[emptyPos[0]][emptyPos[1]] = grid[emptyPos[0] - 1][emptyPos[1]];
    grid[emptyPos[0] - 1][emptyPos[1]] = temp;
  }
}

function leftKey() {
  let emptyPos = findKey(0, grid);
  let temp = grid[emptyPos[0]][emptyPos[1]];
  if (emptyPos[1] - 1 >= 0) {
    grid[emptyPos[0]][emptyPos[1]] = grid[emptyPos[0]][emptyPos[1] - 1];
    grid[emptyPos[0]][emptyPos[1] - 1] = temp;
  }
}

function rightKey() {
  let emptyPos = findKey(0, grid);
  let temp = grid[emptyPos[0]][emptyPos[1]];
  if (emptyPos[1] + 1 < gridRows) {
    grid[emptyPos[0]][emptyPos[1]] = grid[emptyPos[0]][emptyPos[1] + 1];
    grid[emptyPos[0]][emptyPos[1] + 1] = temp;
  }
}

//Update the grid displayed according to the 2d array grid.
function updateHTMLGrid(rows) {
  let gridElement = document.querySelector(".grid-" + (rows * rows - 1));
  let boxes = gridElement.querySelectorAll(".box");
  for (let i = 0; i < gridRows; i++)
    for (let j = 0; j < gridRows; j++) {
      let gridNum = grid[i][j];
      let newID = gridRows * i + j;
      if (gridNum === 0) {
        boxes[newID].textContent = "";
      } else {
        boxes[newID].textContent = gridNum;
      }
    }
}

//function to check if you won.
function isVictory() {
  let win = 1;
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridRows; j++) {
      if (grid[i][j] != ansGrid[i][j]) {
        win = 0;
        break;
      }
    }
    if (!win) break;
  }
  return win;
}

//function to make the grid on the webpage according to the number of rows.
function makeHTMLGrid(rows) {
  let boxesTotal = rows * rows;
  let gridElement = document.querySelector(".grid");
  gridElement.innerHTML = "";

  for (let i = 0; i < boxesTotal; i++) {
    let box = document.createElement("div");
    box.className = "box";
    box.id = "box" + (i + 1);
    box.innerText = toString(i + 1);
    gridElement.appendChild(box);
  }
  gridElement.querySelector("#box" + boxesTotal).innerText = "";

  let victoryMessage = document.createElement("div");
  victoryMessage.className = "victory-hidden";
  victoryMessage.innerText = "MISSION COMPLETED";
  gridElement.appendChild(victoryMessage);

  gridElement.classList.remove("grid-8");
  gridElement.classList.remove("grid-15");
  gridElement.classList.remove("grid-24");
  gridElement.classList.add("grid-" + (boxesTotal - 1));
  document
    .querySelector(".goal-image")
    .setAttribute("src", "images/goal" + (gridRows * gridRows - 1) + ".png");
}

//function to make a random 2d array.
function randomGrid(rows) {
  let haveIt = [];
  empty_grid = [];
  for (let a = 0; a < rows; a++) {
    let row = [];
    for (let b = 0; b < rows; b++) {
      row.push(0);
    }
    empty_grid.push(row);
  }
  while (haveIt.length < rows * rows) {
    let randNum = Math.floor(Math.random() * rows * rows);
    if (!haveIt.includes(randNum)) haveIt.push(randNum);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      empty_grid[i][j] = haveIt[rows * i + j];
    }
  }
  return empty_grid;
}

//function to make the answer grid.
function answerGrid(rows) {
  emptyGrid = [];
  for (let a = 0; a < rows; a++) {
    let row = [];
    for (let b = 0; b < rows; b++) {
      row.push(a * rows + b + 1);
    }
    emptyGrid.push(row);
  }
  emptyGrid[rows - 1][rows - 1] = 0;
  return emptyGrid;
}

//code to manage the dropdown menu of bgm music option
{
  const dropdown = document.querySelector(".dropdown");
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    let soundSelect = new Audio("sounds/m3.mp3");
    soundSelect.play();
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      let soundSelect = new Audio("sounds/m3.mp3");
      soundSelect.play();
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
      changeMusic(menu.querySelector(".active").innerText[5]);
    });
  });

  function changeMusic(name) {
    let bgMusic = document.querySelector("audio");
    bgMusic.setAttribute("src", "sounds/bgm/" + name + ".mp3");
  }
}
