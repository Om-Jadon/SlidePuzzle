let gridRows = 3;

let ansGrid = answerGrid(gridRows);

let grid = randomGrid(gridRows);

makeHTMLGrid(gridRows);

updateHTMLGrid(gridRows);

document
  .querySelector(".goal-image")
  .setAttribute("src", "images/goal" + (gridRows * gridRows - 1) + ".png");

document.addEventListener("keydown", function (event) {
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

let modeButton = document.querySelectorAll(".mode *");
modeButton.forEach((mode) => {
  mode.addEventListener("click", () => {
    let soundReset = new Audio("sounds/m1.mp3");
    soundReset.play();
    modeButton.forEach((m) => m.classList.remove("active"));
    mode.classList.add("active");
    gridRows = document.querySelector(".mode .active").classList[0];
    grid = randomGrid(gridRows);

    makeHTMLGrid(gridRows);

    updateHTMLGrid(gridRows);
  });
});

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

function findKey(key, grid, rows) {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === key) {
        return [i, j];
      }
    }
}

function downKey() {
  let emptyPos = findKey(0, grid, gridRows);
  let temp = grid[emptyPos[0]][emptyPos[1]];
  if (emptyPos[0] + 1 < gridRows) {
    grid[emptyPos[0]][emptyPos[1]] = grid[emptyPos[0] + 1][emptyPos[1]];
    grid[emptyPos[0] + 1][emptyPos[1]] = temp;
  }
}

function upKey() {
  let emptyPos = findKey(0, grid, gridRows);
  let temp = grid[emptyPos[0]][emptyPos[1]];
  if (emptyPos[0] - 1 >= 0) {
    grid[emptyPos[0]][emptyPos[1]] = grid[emptyPos[0] - 1][emptyPos[1]];
    grid[emptyPos[0] - 1][emptyPos[1]] = temp;
  }
}

function leftKey() {
  let emptyPos = findKey(0, grid, gridRows);
  let temp = grid[emptyPos[0]][emptyPos[1]];
  if (emptyPos[1] - 1 >= 0) {
    grid[emptyPos[0]][emptyPos[1]] = grid[emptyPos[0]][emptyPos[1] - 1];
    grid[emptyPos[0]][emptyPos[1] - 1] = temp;
  }
}

function rightKey() {
  let emptyPos = findKey(0, grid, gridRows);
  let temp = grid[emptyPos[0]][emptyPos[1]];
  if (emptyPos[1] + 1 < gridRows) {
    grid[emptyPos[0]][emptyPos[1]] = grid[emptyPos[0]][emptyPos[1] + 1];
    grid[emptyPos[0]][emptyPos[1] + 1] = temp;
  }
}

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
  console.log("victory!");
  return win;
}

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
