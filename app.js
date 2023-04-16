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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        console.log(ctx)
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
        this.players.push(new Player(this.width/2-(15*this.width/32), this.height/2, 20, 50));
        this.players.push(new Player(this.width/2+(15*this.width/32), this.height/2, 20, 50));
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
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Initialize(){

    }
    Draw(context){
        context.save();
        context.fillStyle = '#fff';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fill();
    }
    Update(deltaTime){

    }
}