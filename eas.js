const canvasWidth = 480;
const gridMargin = 1;
const gridColor = "lightgray";

// Sets up a new grid with the given size
function setupGrid(gridSize) {
    const container = document.querySelector(".container");

    container.replaceChildren();    // clear the existing elements

    // create the grid elements
    for (let i = 0; i < gridSize; i++) {
        const divRow = document.createElement("div");
        divRow.classList.add("gridRow");
        container.appendChild(divRow);
        for (let j = 0; j < gridSize; j++) {
            const divElement = document.createElement("div");
            divElement.classList.add("gridElement");
            divElement.style.backgroundColor = gridColor;
            divElement.style.width = `${canvasWidth / gridSize}px`;
            divElement.style.height = `${canvasWidth / gridSize}px`;
            divElement.style.margin = `${gridMargin}px`;
            divElement.addEventListener("mouseenter", mouseEnter);  // add the mouse listener
            divRow.appendChild(divElement);
        }
    }
}

// Returns a random color
function randomColor() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

// Returns string representing darkened color
function addBlack(colorString) {
    colorString = colorString.split("rgb(")[1];
    colorString = colorString.split(")")[0];
    colors = colorString.split(",");

    // reduce colors by 10%
    let r = colors[0] * 0.9;
    let g = colors[1] * 0.9;
    let b = colors[2] * 0.9;

    return `rgb(${r},${g},${b})`;
}

// Colors the grid element that has been moused over
function mouseEnter(e) {
    const gridElement = e.target;
    if (gridElement.classList.contains("colored")) {
        gridElement.style.backgroundColor = addBlack(gridElement.style.backgroundColor);
    } else {
        gridElement.classList.add("colored");
        gridElement.style.backgroundColor = randomColor();
    }
}

// Prompts the user for a new grid size
function newGrid(e) {
    let userGrid = prompt("Enter a new grid width");
    if (userGrid > 100) {
        alert("Limiting to max size of 100");
        userGrid = 100;
    }
    if (userGrid < 1) {
        alert("Limiting to min size of 1");
        userGrid = 1;
    }
    setupGrid(userGrid);
}

// Set up the initial grid
setupGrid(16);

const button = document.querySelector("#btnNew");
button.addEventListener("click", newGrid);