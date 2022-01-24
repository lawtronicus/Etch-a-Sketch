const slider = document.getElementById("myRange");
const rainbowButton = document.querySelector('.rainbow');
const singleColorButton = document.querySelector('.single-color')
const eraseButton = document.querySelector('.erase');
const colorInput = document.getElementById('color-display');
let currentMode = 'single-color';


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    let output = document.getElementById("size-display");
      output.innerHTML = `${getSize()} x ${getSize()}`;
};

/* change single color button if already selected but new color is selected */
const changeButtonColor = function () {
    if (currentMode === 'single-color') {
        singleColorButton.style.backgroundColor = getColor();
        singleColorButton.style.textShadow = '-1px -1px 0px black, 1px -1px black, -1px 1px black, 1px 1px black'
    }
}
    
/* get color value */
const getColor = function () {
    return document.getElementById("color-display").value;
};

/* get size of grid area */
const getSize = function () {
    return document.getElementById("myRange").value;
};

const paintGrid = function (cell) {
    let color = document.getElementById("color-display");
    cell.style.backgroundColor = color;
};

/* change button colors when selected or deselected */
const rainbowButtonFocus = function () {
    this.classList.add('rainbow-clicked');
    currentMode = 'rainbow';
}

const singleColorButtonFocus = function () {
    console.log(this);
    this.style.backgroundColor = getColor();
    this.style.color = "white";
    this.style.textShadow = '-1px -1px 0px black, 1px -1px black, -1px 1px black, 1px 1px black'
    currentMode = 'single-color';
}

const removeRainbowButtonFocus = function () {
    rainbowButton.classList.remove('rainbow-clicked');
}

const removeSingleColorButtonFocus = function () {
    singleColorButton.style.backgroundColor = 'white';
    singleColorButton.style.color = `var(--text-color)`;
    singleColorButton.style.textShadow = 'none'
}

rainbowButton.addEventListener('click', rainbowButtonFocus);
rainbowButton.addEventListener('click', removeSingleColorButtonFocus);
singleColorButton.addEventListener('click', removeRainbowButtonFocus);
singleColorButton.addEventListener('click', singleColorButtonFocus);

const setSketch = function () {

    const sketchArea = document.querySelector('.sketch-container');

    /* if sketch area already has cells, remove them */
    while (sketchArea.firstChild) {
        sketchArea.firstChild.remove();
    }

    /* apply inputs to etch a sketch container */
    const setGridSize = function () {
        const size = document.getElementById("myRange");
        return size.value;
    }

    /* set properties for container */
    const adaptContainer = function (container, size) {
        container.style['grid-template-rows'] = `repeat(${size}, 1fr)`;
        container.style['grid-template-columns'] = `repeat(${size}, 1fr)`;
    }

    /* append appropriate number of cells to container */
    const appendCells = function (parent, size) {
        for (let i = 1; i <= size**2; i++) {
            let cell = document.createElement("div");
            cell.addEventListener('mouseover', changeColor);
            parent.append(cell);
        }
    }

    adaptContainer(sketchArea, setGridSize());
    appendCells(sketchArea, setGridSize());
};

function changeColor(e) {
    if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else {
        e.target.style.backgroundColor = getColor();
    }
};

/* set initial sketch area */
setSketch();

/* recreate sketch area if density is changed */
slider.addEventListener('change', setSketch);
eraseButton.addEventListener('click', setSketch);
colorInput.addEventListener('change', changeButtonColor);
