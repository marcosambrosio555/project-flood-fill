import floodFill from "./floodFill.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const colorsBtns = document.querySelectorAll(".colors button");
const tools = document.querySelectorAll(".tools button")
const btnClean = document.querySelector(".btn-clean")

let isDrawing = false;
let selectedTool = "pencil"
let pencilWidth = 2;
let selectedColor = "black";

let rectLeft = canvas.getBoundingClientRect().left
let rectTop = canvas.getBoundingClientRect().top
let prevMouseX
let prevMouseY



const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
};

window.addEventListener("load", (e) => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

colorsBtns.forEach(btn => {
    btn.style.background = btn.id;
    btn.addEventListener("click", () => {
        document.querySelector(".colors button.selected").classList.remove("selected")
        btn.classList.add("selected")
        selectedColor = `${btn.id}`;
    });
});

tools.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".tools button.selected").classList.remove("selected")
        button.classList.add("selected")
        selectedTool = button.id
    })
})

btnClean.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
    setCanvasBackground();
})

const startDraw = (e) => {

    isDrawing = true;

    const { clientX, clientY } = e;

    prevMouseX = clientX - rectLeft
    prevMouseY = clientY - rectTop

    ctx.beginPath();
    ctx.lineWidth = pencilWidth;
    ctx.lineCap = "round"
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    drawing(e)

};

const drawing = (clientX, clientY) => {
    if (!isDrawing) return;
    if (selectedTool === "brush") return

    if (selectedTool === "pencil") {
        draw(clientX, clientY)
    } else if (selectedTool === "eraser") {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 16;
        draw(clientX, clientY)
    }
};

const draw = (clientX, clientY) => {
    ctx.lineTo(clientX - rectLeft, clientY - rectTop);
    ctx.stroke();
}

canvas.addEventListener("mousedown", (e) => {
    const { clientX, clientY } = e;
    startDraw(clientX, clientY)
});

canvas.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    drawing(clientX, clientY)
});

canvas.addEventListener("mouseup", (e) => {
    isDrawing = false;
    ctx.beginPath();
});


canvas.addEventListener("click", (e) => {

    if (selectedTool === "brush") {

        const { clientX, clientY } = e;
        const posX = Math.round(clientX - rectLeft)
        const posY = Math.round(clientY - rectTop)

        // flood fill function only receive rgba color in array , like [red,green,blue,alpha] ( ex of green : [0,128,0,255])
        const color = returnRGBAColor()

        floodFill(canvas, posX, posY, color);
    }

})

function returnRGBAColor() {
    const colorHTMLValue = document.querySelector(".colors button.selected").accessKey // '255,255,0'
    const array = colorHTMLValue.split(",") // ['255','255','0']
    const numbers = [Number(array[0]), Number(array[1]), Number(array[2]), 255] // [255,255,0,255]
    return numbers
}





// Mobile

canvas.addEventListener("touchstart", (e) => {
    const { clientX, clientY } = e.touches[0];
    startDraw(clientX, clientY)
});
canvas.addEventListener("touchmove", (e) => {
    const { clientX, clientY } = e.touches[0];
    drawing(clientX, clientY)
});
canvas.addEventListener("touchend", (e) => {
    isDrawing = false;
    ctx.beginPath();
});