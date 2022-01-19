const rows = 16;
const columns = 16;
const sketchGrid = document.querySelector('.sketch-container');

const adaptContainer = function (container, rowNum, colNum) {
    container.style['grid-template-rows'] = `repeat(${rowNum}, 1fr)`;
    container.style['grid-template-columns'] = `repeat(${colNum}, 1fr)`;

};

const appendCells = function (parent, rowNum, colNum, cellCreator) {
    for (let i = 1; i <= rowNum * colNum; i++) {
        newChild = cellCreator();
        newChild.style.backgroundColor = "#000000";
        mouseOverChange(newChild);
        parent.append(newChild);
    }
}


const createCell = function () {
    let cell = document.createElement("div");

    return cell;
}

const mouseOverChange = (cell) => cell.addEventListener('mouseout', changeClass);
const changeClass = function () {
    this.style.backgroundColor = "pink";
};

adaptContainer(sketchGrid, rows, columns);

appendCells(sketchGrid, rows, columns, createCell);