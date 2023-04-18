const player1ScoreEl = document.getElementById('player1');
const player2ScoreEl = document.getElementById('player2');
window.addEventListener('load', ()=>{
    
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    let deltaTime = 0;
    
    function Initialize(){
        game.Initialize();
    }
    function Animate(timeStamp){
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.Draw(ctx);
        game.Update(deltaTime);
        window.requestAnimationFrame(Animate);
    }

    Initialize();
    Animate(0);
});

class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.ball = new Ball(this.width/2, this.height/2, this);
        this.players = [];
    }
    Initialize(){
        this.players.push(new Player(this.width/2-(15*this.width/32), this.height/2, 15, 150, this));
        this.players.push(new Enemy(this.width/2+(15*this.width/32), this.height/2, 15, 150, this));
        this.players[0].inputHandler = new InputHandler();
        this.ball.Initialize();
    }
    Draw(context){
        context.save();
        context.setLineDash([Math.floor(this.height/28),Math.floor(this.height/28)]);
        context.beginPath();
        context.strokeStyle = '#fff';
        context.lineWidth = 10;
        context.moveTo(this.width/2, 0);
        context.lineTo(this.width/2, this.height);
        context.stroke();
        context.closePath();
        context.restore();
        this.players.forEach(player=>player.Draw(context));
        this.ball.Draw(context);
    }
    Update(deltaTime){
        this.players[0].y = clamp(this.players[0].y, 0, this.height);
        this.players[1].y = clamp(this.players[1].y, 0, this.height);
        player1ScoreEl.innerText = this.players[0].score;
        player2ScoreEl.innerText = this.players[1].score;
        this.players.forEach(player=>{
            player.Update(deltaTime);
        });
        this.ball.Update(deltaTime);
    }
}
class Ball{
    constructor(x, y, game){
        this.x = x;
        this.y = y;
        this.color = "#fff";
        this.game = game;
        this.size = 10;
        this.speed = 0.45;
        this.directionY = 0;
        this.directionX = 0;
    }
    Initialize(){
        this.InitialDirection();
    }
    Draw(context){
        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.rect(this.x-this.size/2, this.y-this.size/2, this.size, this.size);
        context.fill();
        context.closePath();
        context.restore();
    }
    Update(deltaTime){
        this.CheckPaddleCollisions();
        this.CheckWallCollisions();
        this.x += this.directionX*Math.cos(this.directionX)*this.speed*deltaTime;
        this.y += Math.sin(this.directionY)*this.speed*deltaTime;
    }
    InitialDirection(){
        this.x = this.game.width/2;
        this.y = this.game.height/2;
        this.speed = 0.45;
        this.directionX = Math.random()<0.5?1:-1;
        this.directionY = Math.random()<0.5?randomRange(-0.45,-1.0):randomRange(1.0,0.45);
    }
    CheckWallCollisions(){
        if(this.y-this.size/2<=0) this.directionY*=-1;
        if(this.y+this.size/2>=this.game.height) this.directionY*=-1;
        if(this.x-this.size/2<=0){
            this.InitialDirection();
            this.game.players[1].score++;
        }
        if(this.x+this.size/2>=this.game.width){
            this.InitialDirection();
            this.game.players[0].score++;
        }
    }
    CheckPaddleCollisions(){
        this.game.players.forEach(player=>{
            let collisionX = this.x+this.size/2>=(player.x-player.width/2) && player.x+player.width/2>=(this.x-this.size/2);
            let collisionY = this.y+this.size/2>=(player.y-player.height/2) && player.y+player.height/2>=(this.y-this.size/2);
            if(collisionX && collisionY){
                this.directionX*=-1;
                this.speed += 0.05;
            }
        });        
    }
}
class Player{
    constructor(x, y, width, height, game){
        this.game = game;
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.color = "#fff";
        this.paddleSpeed = 0.5;
        this.friction = 0.9;
        this.directionY = 0;
        this.score = 0;
        this.width = width;
        this.height = height;
        this.inputHandler = new InputHandler();
    }
    Draw(context){
        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.rect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        context.fill();
        context.closePath();
        context.restore();
    }
    Update(deltaTime){
        this.handleVerticalMovement();
        this.vy = this.paddleSpeed * (this.directionY*=this.friction) * deltaTime;
        
        this.y += this.vy;
    }
    handleVerticalMovement(){
        if(this.inputHandler.keys.w.pressed && this.y-this.height>=0) this.directionY=this.inputHandler.vertical;
        if(this.inputHandler.keys.s.pressed && this.y+this.height<=this.game.height) this.directionY=this.inputHandler.vertical;
    }
}
class Enemy{
    constructor(x, y, width, height, game){
        this.game = game;
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.color = "#fff";
        this.paddleSpeed = 0.5;
        this.friction = 0.9;
        this.directionY = 0;
        this.score = 0;
        this.width = width;
        this.height = height;
    }
    Draw(context){
        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.rect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        context.fill();
        context.closePath();
        context.restore();
    }
    Update(deltaTime){
        this.handleVerticalMovement();
        this.vy = this.paddleSpeed * (this.directionY*=this.friction) * deltaTime;
        
        this.y += this.vy;
    }
    handleVerticalMovement(){
        if(this.game.ball.y<this.y && this.y-this.height>=0 && this.game.ball.directionX>=0) this.directionY=-1;
        if(this.game.ball.y>this.y && this.y+this.height<=this.game.height && this.game.ball.directionX>=0) this.directionY=1;
    }
}
class InputHandler{
    constructor(){
        this.lastKey = '';
        this.vertical = 0;
        this.keys = {
            w: {
                pressed: false
            },
            s: {
                pressed: false
            },
            p: {
               pressed: false
            }
        }
        window.addEventListener('keydown', (e)=>{
            switch(e.key){
                case 'w':
                    this.keys.w.pressed = true;
                    this.vertical = -1;
                    break;
                case 's':
                    this.keys.s.pressed = true;
                    this.vertical = 1;
                    break;
                case 'p':
                    this.keys.p.pressed = true;
                    break;
            }
        });
        window.addEventListener('keyup', (e)=>{
            switch(e.key){
                case 'w':
                    this.keys.w.pressed = false;
                    this.vertical = 0;
                    break;
                case 's':
                    this.keys.s.pressed = false;
                    this.vertical = 0;
                    break;
            }
        })
    }
}

function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
}
function randomRange(max, min){
    return Math.random()*((max-min)+1)+min;
}