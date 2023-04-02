// Set up canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set up game variables
let snake = [{ x: 10, y: 10 }];
let direction = "right";
let food = { x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 25) };
let score = 0;
let gameLoop;
let speed = 100;

// Draw initial game state
draw();

// Handle key presses
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case "ArrowLeft":
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case " ":
      reset();
      break;
  }
});

// Set up game loop
function startGame() {
  gameLoop = setInterval(() => {
    // Move snake
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }
    snake.unshift(head);

    // Check for collisions
    if (head.x < 0 || head.x > 24 || head.y < 0 || head.y > 24) {
      clearInterval(gameLoop);
      alert(`Game over! Score: ${score}. Click "Enter" and then the space bar to replay`);
    }
    if (head.x === food.x && head.y === food.y) {
      food = { x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 25) };
      score++;
      speed -= 2;
      if (speed < 50) { // Set a minimum speed
        speed = 50;
      }
    } else {
      snake.pop();
    }
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        clearInterval(gameLoop);
        alert(`Game over! Score: ${score}`);
      }
    }

    // Draw game state
    draw();
  }, speed);
}

function reset() {
  clearInterval(gameLoop);
  snake = [{ x: 10, y: 10 }];
  var directions = ["right", "left", "up", "down"];
  direction = directions[Math.floor(Math.random() * directions.length)];
  food = { x: Math.floor(Math.random() * 25), y: Math.floor(Math.random() * 25) };
  score = 0;
  startGame();
}

startGame();

// Draw game state
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "purple";
  for (const segment of snake) {
    ctx.fillRect(segment.x * 25, segment.y * 25, 25, 25);
  }
  for (let i = 0; i < snake.length; i++) {
    let segment = snake[i];
    let x = segment.x * 25;
    let y = segment.y * 25;
    let w = 25;
    let h = 25;
    ctx.fillStyle = "purple";
    ctx.fillRect(x, y, w, h);
    // Add eyes to head
    if (i === 0) {
      let eyeSize = w / 5;
      let leftEyeX = x + eyeSize * 2;
      let rightEyeX = x + w - eyeSize * 3;
      let eyeY = y + eyeSize * 2;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(leftEyeX, eyeY, eyeSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(rightEyeX, eyeY, eyeSize, 0, Math.PI * 2);
      ctx.fill();
      // Add pupils
      ctx.fillStyle = "black";
      let pupilSize = eyeSize / 2;
      let dx = 0;
      let dy = 0;
      switch (direction) {
        case "up":
          dy = -1;
          break;
        case "down":
          dy = 1;
          break;
        case "left":
          dx = -1;
          break;
        case "right":
          dx = 1;
          break;
      }
      ctx.beginPath();
      ctx.arc(leftEyeX + dx * eyeSize / 2, eyeY + dy * eyeSize / 2, pupilSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(rightEyeX + dx * eyeSize / 2, eyeY + dy * eyeSize / 2, pupilSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "20px Times New Roman";
      ctx.fillText(`Score: ${score}`, canvas.width - 80, 30);
    }
  }

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x *25, food.y * 25, 25, 25);

  // Draw score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  }
