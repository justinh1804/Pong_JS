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
    function animate(timeStamp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        
        game.Draw(ctx);
        game.Update(deltaTime);
        window.requestAnimationFrame(animate);
    }
});

class Game{
    constructor(width, height, ball){
        this.width = width;
        this.height = height;
        this.ball = ball;
        this.players = [];
    }
    Initialize(){

    }
    Draw(){

    }
    Update(){

    }
}
class Ball{
    constructor(){

    }
}
