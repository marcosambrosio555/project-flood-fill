function floodFill(canvas, startX, startY, newColor) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const startColor = getPixelColor(data, canvas.width, startX, startY);

    const queue = [];
    queue.push([startX, startY]);

    while (queue.length) {
        const [x, y] = queue.shift();
        const pixelPos = (y * canvas.width + x) * 4;

        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height && isSameColor(data, pixelPos, startColor)) {
            setPixelColor(data, pixelPos, newColor);
            queue.push([x + 1, y]);
            queue.push([x - 1, y]);
            queue.push([x, y + 1]);
            queue.push([x, y - 1]);
        }
    }

    ctx.putImageData(imageData, 0, 0);

}

function getPixelColor(data, width, x, y) {
    const pixelPos = (y * width + x) * 4;
    return [data[pixelPos], data[pixelPos + 1], data[pixelPos + 2], data[pixelPos + 3]];
}

function isSameColor(data, pixelPos, color) {
    return data[pixelPos] === color[0] &&
        data[pixelPos + 1] === color[1] &&
        data[pixelPos + 2] === color[2] &&
        data[pixelPos + 3] === color[3];
}

function setPixelColor(data, pixelPos, color) {
    data[pixelPos] = color[0];
    data[pixelPos + 1] = color[1];
    data[pixelPos + 2] = color[2];
    data[pixelPos + 3] = color[3];
}


export default floodFill;