const boardCard = document.getElementById("board");
const scoreCard = document.getElementById("score");

let dx = 0;
let dy = 0;
let snake = [{ x: 7, y: 9 }];
let food = { x: 3, y: 8 };
let score = 0;
let lastRenderTime = 0;
let speed = 5;

function cellDisplay(x, y, className) {
    let newElement = document.createElement("div");
    newElement.style.gridRowStart = y;
    newElement.style.gridColumnStart = x;
    newElement.classList.add(className);
    boardCard.appendChild(newElement);
}
function draw() {
    boardCard.innerHTML = ''
    snake.forEach(part => {
        cellDisplay(part.x, part.y, "snake");
    })
    cellDisplay(food.x, food.y, "food");
    scoreCard.textContent = `Your score is ${score}` ;
}
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
        return gameOver() ;
    }
    if (snake.some(body => body.x === head.x && body.y === head.y)) {
        return gameOver();
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    }
    else {
        snake.pop()
    };
};
function gameOver() {
    dx = 0;
    dy = 0;
    lastRenderTime = 0;
    score = 0;
    snake = [{ x: 3, y: 8 }];
    food = { x: 8, y: 11 };
}

function gameloop (cTime){
    window.requestAnimationFrame(gameloop)
    if ((cTime - lastRenderTime) / 1000 < 1 / speed ) {
        return ;
    }
    lastRenderTime = cTime ;
    draw();
    moveSnake();
}
window.addEventListener("keydown" , (e)=>{
    switch (e.key) {
        case "ArrowUp":
            if (dy !== 1){
                dx = 0 ;
                dy = -1 ;
            }
            break;
        case "ArrowDown":
            if (dy !== -1){
                dx = 0 ;
                dy = 1 ;
            }
            break;
        case "ArrowLeft":
            if (dx !== 1){
                dx = -1 ;
                dy = 0 ;
            }
            break;
        case "ArrowRight":
            if (dx !== -1){
                dx = 1 ;
                dy = 0;
            }
            break;
    
        default:
            break;
    }
})
window.requestAnimationFrame(gameloop)