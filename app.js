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
        console.log(ctx);
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

    }
    Draw(context){
        context.save();
        context.beginPath();
        context.strokeStyle = '#fff'
        context.lineWidth = 10;
        context.moveTo(this.width/2, 0);
        context.lineTo(this.width/2, this.height);
        context.stroke();
        context.closePath();
        context.restore();
    }
    Update(deltaTime){

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
    constructor(){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

    }
}