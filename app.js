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
        this.ball = 0;
        this.players = [];
    }
    Initialize(){
        this.players.push(new Player(this.width/2-(15*this.width/32), this.height/2, 15, 150, this));
        this.players.push(new Player(this.width/2+(15*this.width/32), this.height/2, 15, 150, this));
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
    }
    Update(deltaTime){
        this.players.forEach(player=>player.Update(deltaTime));
    }
}
class Ball{
    constructor(){
        this.x = x;
        this.y = y;
    }
    Initialize(){

    }
    Draw(context){

    }
    Update(deltaTime){
        
    }
}
class Player{
    constructor(x, y, width, height, game){
        this.game = game;
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.paddleSpeed = 0.5;
        this.friction = 0.9;
        this.directionY = 0;
        this.width = width;
        this.height = height;
        this.inputHandler = new InputHandler();
    }
    Draw(context){
        context.save();
        context.fillStyle = '#fff';
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
        if(this.inputHandler.keys.w.pressed && this.y-this.height>0) this.directionY=this.inputHandler.vertical;
        if(this.inputHandler.keys.s.pressed && this.y+this.height<this.game.height) this.directionY=this.inputHandler.vertical;
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