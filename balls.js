///////////////////////////////////////
////////////// FUNCTIONS //////////////
///////////////////////////////////////

// Draw Player on Screen
const drawPlayer = () => {

    ctx.beginPath();
    ctx.arc(playerX,462,8,0,Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(playerX,470);
    ctx.lineTo(playerX,488);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(playerX,470);
    ctx.lineTo(playerX - 10,482 );
    ctx.moveTo(playerX,470);
    ctx.lineTo(playerX + 10,482);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(playerX,488);
    ctx.lineTo(playerX - 10,500);
    ctx.moveTo(playerX,488);
    ctx.lineTo(playerX + 10,500);
    ctx.stroke();

}

// Show Score on Screen
const drawPoints = () => {
    ctx.font = "16px Comic Sans MS"
    ctx.strokeText(`Score: ${score}`,700,20);
}

// Create Ball Object
// Each Ball will have randomly assigned properties
function Ball(){
    this.radius = Math.floor(Math.random()*10)+5;
    this.x = Math.ceil(Math.random()*250) + 20;
    this.y = Math.ceil(Math.random()*250) + 20;
    // dx and dy are changes in x/y, used to move the ball
    this.dx = Math.floor(Math.random()*5) + 2;
    this.dy = Math.floor(Math.random()*5) + 2;
}

// Determines Number of Balls
const difficulty = (lvl) => {
    switch(lvl){
        case 1:
            ballsTotal = 10;
            break;
        case 2:
            ballsTotal = 30;
            break;
        case 3:
            ballsTotal = 50;
            break;
        case 4:
            ballsTotal = 100;
            break;
    }
}

// Determines how points are scored based on difficulty
const pointsTally = (lvl) => {
    switch(lvl){
        case 1:
            score += 1;
            break;
        case 2:
            score += 3;
            break;
        case 3:
            score += 5;
            break;
        case 4:
            score += 10;
            break;
    }
}

// Create an Array of Balls
const addBalls = () => {
    for(i= 0 ; i < ballsTotal ; i++){
       let bola = new Ball();
       ballsArr.push(bola);
    }
}

// Draw Balls on Screen
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draws a ball for each "Ball" in the array
    for(i in ballsArr){
        let ball = ballsArr[i];
        ctx.beginPath();

        //Bounce off boundaries
        (ball.x <= ball.radius || ball.x >= (width-ball.radius)) ? ball.dx = -ball.dx : ball.dx = ball.dx;
        (ball.y <= ball.radius || ball.y >= (height-ball.radius)) ? ball.dy = -ball.dy : ball.dy = ball.dy;

        // Adjust ball position
        ball.x += ball.dx;
        ball.y += ball.dy;

        ctx.arc(ball.x, ball.y, ball.radius, 0, 2*Math.PI, true);
        ctx.stroke();
        // Ensure the player icon stays on the screen
        drawPlayer();
        // Ensure points are continuously updated
        drawPoints();

        // Endgame Condition
        if(ball.y > 450 && Math.abs(ball.x - playerX) < 10){
            endgame = true;
        }
    }
}

// Sets the Difficulty (Adds Functionality to Buttons)
const optControl = () => {
    var ez = document.querySelector('#easy');
    var med = document.querySelector('#med');
    var tough = document.querySelector('#hard');
    var crazy = document.querySelector('#extreme');

    ez.addEventListener('click', function() {
        difficulty(1);
        level = 1;
        this.style.color = "green";
        med.style.color = "black";
        tough.style.color = "black";
        crazy.style.color = "black";
    });
    med.addEventListener('click', function() {
        difficulty(2);
        level = 2;
        this.style.color = "yellow";
        ez.style.color = "black";
        tough.style.color = "black";
        crazy.style.color = "black";
    });
    tough.addEventListener('click', function() {
        difficulty(3);
        level = 3;
        this.style.color = "orange";
        ez.style.color = "black";
        med.style.color = "black";
        crazy.style.color = "black";
    });
    crazy.addEventListener('click', function() {
        difficulty(4);
        level = 4;
        this.style.color = "red";
        ez.style.color = "black";
        med.style.color = "black";
        tough.style.color = "black";
    });
}


// Play The Game
const playGame = () => {
    addBalls();
    let drawInt = setInterval(draw, 25);
    let pointsInt = setInterval(function(){
        pointsTally(level);
    },1000)
    setInterval(function(){
        gameOver(drawInt,pointsInt);
    },25);
    back.addEventListener("click", function(){
        ballsArr = [];
        clearInterval(drawInt);
        clearInterval(pointsInt);
        score = 0;
        playerX = 10;
        movement = 0;
    });
}

// Endgame sequence
const gameOver = (draw,points) => {
    if(endgame){
        clearInterval(draw);
        clearInterval(points);
        canvas.style.display = "none";
        results.style.display = "flex";
        scoreDisp.innerHTML = `Score: ${score}`;
        ballsArr = [];
        playerX = 10;
        movement = 0;
        endgame = false;
    }
}

// Update High Scores
const updateScores = () => {
    let scores = [];
    let sortedScores = [];
    let players = [];
    let num = 1
    for(let i = 0; i < highScores.length; i ++){
        players.push(highScores.key(i));
        scores.push(parseInt(highScores.getItem(highScores.key(i))));
        sortedScores.push(parseInt(highScores.getItem(highScores.key(i))));
    }
    sortedScores.sort((a, b) => b - a);
    for(let i in topScores){
        if(i >= scores.length){
            break;
        }
        topScores[i].innerHTML = `${num}) ${players[scores.indexOf(sortedScores[i])]}: ${sortedScores[i]}`;
        num += 1;
    }
}
///////////////////////////////////////
////////////// VARIABLES //////////////
///////////////////////////////////////

let canvas = document.getElementById("space");
let ctx=canvas.getContext("2d");
let width = 800; // Canvas Width
let height = 500; // Canvas Height
let playerX = 10; // Tracks player's position
let ballsArr = []; // Stores Balls
let ballsTotal = 10; // Change based on difficulty
let movement = 0; // Tracks player's movement
let score = 0; // Tracks player's score
let level = 1; // Difficulty
let endgame = false; // Checks if endgame condition is met
let playBtn = document.querySelector("#play");
let instrBtn = document.querySelector("#instr");
let diffBtn = document.querySelector("#diff");
let rules = document.querySelector(".rules");
let menu = document.querySelector(".menu");
let title = document.querySelector(".title");
let menuItem = document.querySelectorAll(".menuitem");
let diffOpt = document.querySelectorAll(".diffopt");
let back = document.querySelector("#back");
let results = document.querySelector(".results");
let scoreDisp = document.querySelector("#points");
let username = document.querySelector("#name");
let submit = document.querySelector("#submit");
let records = document.querySelector("#records");
let topScores = document.querySelectorAll(".scoreitem");
let scoreList = document.querySelector(".scorelist");
let highScores = window.localStorage;

///////////////////////////////////////
 ///////////// DOM EVENTS ////////////
///////////////////////////////////////

// Control Player Movement Left/Right
document.addEventListener("keydown", function(event){
    switch(event.keyCode){
        case 39:
            if(movement < 780){
                movement += 20;
                playerX += 20;
            }
            drawPlayer();
            break;
        case 37:
            if(movement > 0){
                movement -= 20;
                playerX -= 20;
            }
            drawPlayer();
            break;
    }
});

// Starts the Game
playBtn.addEventListener("click", function(){
    menu.style.display = "none";
    title.style.display = "none";
    canvas.style.display = "flex";
    back.style.display = "flex";
    playGame();
    drawPlayer();
});

// Opens difficulty selection menu
diffBtn.addEventListener("click", function(){
    for(let i = 0; i < menuItem.length; i ++) {
        menuItem[i].style.display = "none";
    }
    for(let i = 0; i < diffOpt.length; i ++) {
        diffOpt[i].style.display = "flex";
    }
    optControl();
});

// Returns to Main Menu
back.addEventListener("click", function(){
    canvas.style.display = "none";
    title.style.display = "flex";
    menu.style.display = "flex";
    results.style.display = "none";
    scoreList.style.display = "none";
    rules.style.display = "none";
    for(let i = 0; i < menuItem.length; i ++) {
        menuItem[i].style.display = "flex";
    }
    for(let i = 0; i < diffOpt.length; i ++) {
        diffOpt[i].style.display = "none";
    }

});

// Shows Instructions
instrBtn.addEventListener('click',function(){
    menu.style.display = "none";
    back.style.display = "flex";
    rules.style.display = "flex";
});

submit.addEventListener('click',function(){
    highScores.setItem(username.value,score);
    canvas.style.display = "none";
    title.style.display = "flex";
    menu.style.display = "flex";
    results.style.display = "none";
    scoreList.style.display = "none";
    for(let i = 0; i < menuItem.length; i ++) {
        menuItem[i].style.display = "flex";
    }
    for(let i = 0; i < diffOpt.length; i ++) {
        diffOpt[i].style.display = "none";
    }
});

records.addEventListener('click', function(){
    updateScores();
    scoreList.style.display = "flex";
    menu.style.display = "none";
    back.style.display = "flex";
})