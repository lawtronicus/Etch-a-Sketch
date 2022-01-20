const defaultRows = 16;
const defaultColumns = 16;
const sketchGrid = document.querySelector('.sketch-container');
const gridButton = document.querySelector(".setGrid");

const getGridSize = () => prompt('How many squares would you like per side? Max is 100.');

const informWrongNumber = () => alert("Apologies. I cannot process that number.");

const setGridSize = function () {
    gridSize = parseInt(getGridSize());
    if (gridSize > 100 || gridSize <= 0 || isNaN(gridSize)) {
        informWrongNumber();
        return setGridSize();
    } else {
        return gridSize;
    }
};

const rebuildGridFromUser = function () {
    let gridSize = setGridSize();
    const grid = document.querySelector('.sketch-container');
    console.log(grid.childElementCount);
    while (grid.firstChild) {
        grid.firstChild.remove();
    }
    console.log(grid.childElementCount);
    adaptContainer(sketchGrid, gridSize, gridSize);
    appendCells(sketchGrid, gridSize, gridSize, createCell);
    console.log(grid.childElementCount);
}


const adaptContainer = function (container, rowNum, colNum) {
    container.style['grid-template-rows'] = `repeat(${rowNum}, 1fr)`;
    container.style['grid-template-columns'] = `repeat(${colNum}, 1fr)`;

};

const appendCells = function (parent, rowNum, colNum, cellCreator) {
    for (let i = 1; i <= rowNum * colNum; i++) {
        newChild = cellCreator();
        newChild.classList.add('color1');
        mouseOverChange(newChild);
        parent.append(newChild);
    }
}


const createCell = function () {
    let cell = document.createElement("div");

    return cell;
}

const mouseOverChange = (cell) => cell.addEventListener('mouseover', changeClass);
const changeClass = function () {
    let colorClass = this.classList[this.classList.length - 1];
    let colorNum = parseInt(colorClass.charAt(colorClass.length - 1));
    if (colorNum != 8) {
        colorNum ++;
        newClass = "color" + colorNum.toString();
        this.classList.remove(this.classList[this.classList.length - 1]);
        this.classList.add(newClass);
    } else {
        this.classList.remove(this.classList[this.classList.length-1]);
        this.classList.add("color1");
    }
    
/*    this.style.backgroundColor = "pink"; */
};

/* set initial grid */
adaptContainer(sketchGrid, defaultRows, defaultColumns);

appendCells(sketchGrid, defaultRows, defaultColumns, createCell);

/* let user set grid */
gridButton.addEventListener('click', rebuildGridFromUser);
