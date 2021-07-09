
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var speed = 4;
var tilecount = 20;
let headX = 10;
var headY = 10;
let tilesize = canvas.width / tilecount - 2;

let fruitX = 5;
let fruitY = 5;

let xVelocity = 0;
let yVelocity = 0;
let tailLenght = 2;
const snakeParts = [];



class snakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
function drawGame() {
    clearScreen();
    changeSnakePosition();
    checkAppleCollision();
    checkBodyCollision();
    drawSnake();
    drawFruit();
    //drawScore();
    setTimeout(drawGame, 1000 / speed);

}
// function drawScore(){
//     ctx.fillStyle = 'pink';
//     ctx.font =  "12px Verdana";
//     ctx.fillText("score " + score , canvas.width-50,10);
// }
function clearScreen() {
    ctx.fillStyle = 'rgb(100,100,240)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
    ctx.fillStyle = 'red';
    ctx.fillRect(headX * tilecount, headY * tilecount, tilesize, tilesize);
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tilecount, part.y * tilecount, tilesize, tilesize);
    }
    snakeParts.push(new snakePart(headX, headY));
    if (snakeParts.length > tailLenght) {
        snakeParts.shift();
    }
}
function changeSnakePosition() {
    headX += xVelocity;
    headY += yVelocity;
}
function drawFruit() {
    ctx.fillStyle = 'orange';
    ctx.fillRect(fruitX * tilecount, fruitY * tilecount, tilesize, tilesize);
}

function checkAppleCollision() {
    if (headX == fruitX && headY == fruitY) {
        fruitX = Math.floor(Math.random() * tilecount);
        fruitY = Math.floor(Math.random() * tilecount);
        tailLenght++;
    }
}
function checkBodyCollision() {
    if ((headX < 0 || headY < 0) || (headX > tilecount || headY > tilecount)) {
        alert('Game Over!!!!!!');
    }
}

document.body.addEventListener('keydown', keyDown);
function keyDown(event) {
    //left
    if (event.keyCode == 37) {
        xVelocity = -1;
        yVelocity = 0;

    }

    if (event.keyCode == 39) {
        xVelocity = 1;
        yVelocity = 0;

    }
    if (event.keyCode == 38) {
        xVelocity = 0;
        yVelocity = -1;

    }

    if (event.keyCode == 40) {
        xVelocity = 0;
        yVelocity = 1;

    }
}

drawGame();