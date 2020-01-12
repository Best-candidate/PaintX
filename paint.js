let cnvs;
let pen;
let rectangle;
let hex;
let eraser;
let line;
let ctx;
let color;
let sizeRange;
let ismouseClicked;
let imgData;
let a;
let h;
let link;
let showSize;

let padding = {
    x: 15,
    y: 15
}

let beginLine = {
    x: null,
    y: null
}

let beginRect = {
    x: null,
    y: null
}
let hexCenter = {
    x: null,
    y: null
}

window.onload = function(){
    document.getElementById("drawable").addEventListener("mousemove", mousemoved);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseReleased);

    rectangle = document.getElementById("rectImg");
    hex = document.getElementById("hexImg");
    cnvs = document.getElementById("canv");
    pen = document.getElementById("penImg");
    eraser = document.getElementById("eraserImg");
    line = document.getElementById("lineImg");
    sizeRange = document.getElementById("sz");
    color = document.getElementById("clr");
    ctx = cnvs.getContext("2d");
    link = document.getElementById('link');
    showSize = this.document.getElementById('showSize');

    color.value = "#000000"
    sizeRange.value = 20;
    currentTool = null;
    imgData = 0;
    ismouseClicked = false;
}

function mousemoved(){
    if(ismouseClicked){
        switch(currentTool){
            case 'pen':
                draw(event);
                break;
            case 'eraser':
                erase(event);
                break;
            case 'line':
                lineShape(event);
                break;
            case 'rectangle':
                rectShape(event);
                break;
            case 'hexagon':
                hexShape(event);
                break;
        }
    }    
}




function mouseDown(){
    switch(currentTool){
        case 'pen':
            draw(event);
            break;
        case 'eraser':
            erase(event);
            break;
        case 'line':
            lineShape(event);
            break;
    }
    ismouseClicked = true;
}

function mouseReleased(){
    ismouseClicked = false;
    switch(currentTool){
        case 'line':
            drawLine(event);
            break;
        case 'rectangle':
            drawRect(event);
            break;
        case 'hexagon':
           drawHex(event);
           break;
    }
}

function changeSize(){
    showSize.innerHTML = sizeRange.value + "px"
}

function toolClicked(tool){
    switch(tool){
        case 'pen':
            pen.classList.add('selected');
            eraser.classList.remove('selected');
            line.classList.remove('selected');
            rectangle.classList.remove('selected');
            hex.classList.remove('selected');
            break;
        case 'eraser':
            eraser.classList.add('selected');
            pen.classList.remove('selected');
            line.classList.remove('selected');
            rectangle.classList.remove('selected');
            hex.classList.remove('selected');
            break;
        case 'line':
            line.classList.add('selected');
            eraser.classList.remove('selected');
            pen.classList.remove('selected');
            rectangle.classList.remove('selected');
            hex.classList.remove('selected');
            break;
        case 'rectangle':
            rectangle.classList.add('selected');
            eraser.classList.remove('selected');
            pen.classList.remove('selected');
            line.classList.remove('selected');
            hex.classList.remove('selected');
            break;
        case 'hexagon':
            hex.classList.add('selected');
            rectangle.classList.remove('selected');
            eraser.classList.remove('selected');
            pen.classList.remove('selected');
            line.classList.remove('selected');
            break;
    }
    
    currentTool = tool;
}

function draw(e){
    ctx.fillStyle = color.value;
    ctx.beginPath();
    ctx.arc(e.clientX - padding.x, e.clientY - padding.y, sizeRange.value, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

function erase(e){
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(e.clientX - padding.x, e.clientY - padding.y, sizeRange.value, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

function lineShape(e){
    if(beginLine.x == null){
        beginLine.x = e.clientX - padding.x;
        beginLine.y = e.clientY - padding.y;
    }
    else{
        if(imgData != 0){
            ctx.putImageData(imgData, 0, 0);
        }
        imgData = ctx.getImageData(0, 0, 1000, 800);
        ctx.strokeStyle = color.value;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(beginLine.x,beginLine.y);
        ctx.lineTo(e.clientX - padding.x, e.clientY - padding.y);
        ctx.lineWidth = sizeRange.value;
        ctx.stroke();
        ctx.closePath();
        ctx.globalAlpha = 1;
    }
}

function rectShape(e){
    if(beginRect.x == null){
        beginRect.x = e.clientX - padding.x;
        beginRect.y = e.clientY - padding.y;
    }
    else{
        if(imgData != 0){
            ctx.putImageData(imgData, 0, 0);
        }
        imgData = ctx.getImageData(0, 0, 1000, 800);
        ctx.strokeStyle = color.value;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.rect(beginRect.x, beginRect.y, e.clientX - padding.x - beginRect.x, e.clientY - padding.y - beginRect.y);
        ctx.lineWidth = sizeRange.value;
        ctx.stroke();
        ctx.closePath();
        ctx.globalAlpha = 1;
    }
}

function hexShape(e){
    if(hexCenter.x == null){
        hexCenter.x = e.clientX - padding.x;
        hexCenter.y = e.clientY - padding.y;
    }
    else{
        if(imgData != 0){
            ctx.putImageData(imgData, 0, 0);
        }
        imgData = ctx.getImageData(0, 0, 1000, 800);
        XX = Math.abs(hexCenter.x - e.clientX + padding.x);
        YY = Math.abs(hexCenter.y - e.clientY + padding.y);
        a = Math.sqrt(XX * XX + YY * YY);
        h = Math.sqrt(3) / 2 * a;
        ctx.strokeStyle = color.value;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(hexCenter.x + a, hexCenter.y);
        ctx.lineTo(hexCenter.x + a/2, hexCenter.y + h);
        ctx.lineTo(hexCenter.x - a/2, hexCenter.y + h);
        ctx.lineTo(hexCenter.x - a, hexCenter.y);
        ctx.lineTo(hexCenter.x - a/2, hexCenter.y - h);
        ctx.lineTo(hexCenter.x + a/2, hexCenter.y - h);
        ctx.lineTo(hexCenter.x + a, hexCenter.y);
        ctx.lineTo(hexCenter.x + a/2, hexCenter.y + h);
        ctx.lineWidth = sizeRange.value;
        ctx.stroke();
        ctx.closePath();
        ctx.globalAlpha = 1;

    }
}


function drawLine(e){
    if(e.clientX > 1200){
        beginLine.x = null;
        return;
    }
    ctx.beginPath();
    ctx.strokeStyle = color.value;
    ctx.moveTo(beginLine.x,beginLine.y);
    ctx.lineTo(e.clientX - padding.x, e.clientY - padding.y);
    ctx.lineWidth = sizeRange.value;
    ctx.stroke();
    ctx.closePath();
    beginLine.x = null;
    imgData = 0;
}

function drawRect(e){
    if(e.clientX > 1200){
        beginRect.x = null;
        return;
    }
    ctx.beginPath();
    ctx.strokeStyle = color.value;
    ctx.rect(beginRect.x, beginRect.y, e.clientX - padding.x - beginRect.x, e.clientY - padding.y - beginRect.y);
    ctx.lineWidth = sizeRange.value;
    ctx.stroke();
    ctx.closePath();
    beginRect.x = null;
    imgData = 0;
}

function drawHex(e){
    if(e.clientX > 1200){
        beginRect.x = null;
        return;
    }
    ctx.beginPath();
    ctx.strokeStyle = color.value;
    ctx.moveTo(hexCenter.x + a, hexCenter.y);
    ctx.lineTo(hexCenter.x + a/2, hexCenter.y + h);
    ctx.lineTo(hexCenter.x - a/2, hexCenter.y + h);
     ctx.lineTo(hexCenter.x - a, hexCenter.y);
    ctx.lineTo(hexCenter.x - a/2, hexCenter.y - h);
    ctx.lineTo(hexCenter.x + a/2, hexCenter.y - h);
    ctx.lineTo(hexCenter.x + a, hexCenter.y);
    ctx.lineTo(hexCenter.x + a/2, hexCenter.y + h);
    ctx.lineWidth = sizeRange.value;
    ctx.stroke();
    ctx.closePath();
    hexCenter.x = null;
    imgData = 0;
}

function saveImg(){
    link.setAttribute('download', 'Untitled.png');
    link.setAttribute('href', cnvs.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}