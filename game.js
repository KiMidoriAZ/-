const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height - 30;
const ballRadius = 10;
let dx = 2;
let dy = -2;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

let score = 0;

let brickRowCount = 5;
let brickColumnCount = 3;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
bricks[c] = [];
for(let r=0; r<brickRowCount; r++) {
bricks[c][r] = { x: 0, y: 0, status: 1 };
}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.code === "ArrowRight") {
        rightPressed = true;
    } else if(e.code === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.code === "ArrowRight") {
        rightPressed = false;
    } else if(e.code === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD"; // 明るい色にしてボールが見えやすくする
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
ctx.beginPath();
ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

function drawBricks() {
for(let c=0; c<brickColumnCount; c++) {
for(let r=0; r<brickRowCount; r++) {
if(bricks[c][r].status === 1) {
let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
let brickY = (r * (brickHeight+brickPadding)) + brickOffsetTop;
bricks[c][r].x = brickX;
bricks[c][r].y = brickY;
ctx.beginPath();
ctx.rect(brickX, brickY, brickWidth, brickHeight);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}
}
}
}

function collisionDetection() {
    for(let c = 0; c < brickColumnCount; c++) {
        for(let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if(b.status === 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // スコアがブロックの総数と等しいかチェック
                    if(score === brickRowCount * brickColumnCount) {
                        alert("おめでとうございます！全てのブロックを破壊しました！");
                        document.location.reload(); // ゲームをリロード
                    }
                }
            }
        }
    }
}


function drawScore() {
ctx.font = "16px Arial";
ctx.fillStyle = "#0095DD";
ctx.fillText("Score: "+score, 8, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall(); // ボールを描画する関数の呼び出し
    drawPaddle();
    drawScore();
    collisionDetection();
    // ボールの壁衝突検知と反射
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert('ゲームオーバーです！');
            document.location.reload();
            clearInterval(interval); // ゲームループをクリア
        }
    }

    // パドルの移動
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();

// パドル操作の関数
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

