let enemySizes = [75,65,25,45,55];
let randNum = Math.round(Math.random()*4);
//let enemySize = enemySizes[randNum];
let userSpeed = 10;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let log = {};
let trigger;
let loopTimer = 0;
let userXmove = 250;
let userYmove = 400;
let enemyXmove = 220;
let enemyYmove = 100;
let enemyClear = 0;
let drawBullet = 1;

let enemy;
function Enemy() {
    if (enemy != null) {
        return;
    }
    // y = Math.random() * (150 - enemySize-50) + 50;
    // x = Math.random() * (500 - enemySize - 0) + 0;
    enemy = new enemyDraw(ctx);
    enemy.createEnemy();

}
class enemyDraw {
    constructor(ctx) {
        this.ctx = ctx;
        this.enemySizes = enemySizes = [75,65,25,45,55];
        randNum = randNum = Math.round(Math.random()*4);
        this.enemySize = enemySizes[randNum];
        this.enemyYmove = Math.random() * (150 - this.enemySize-100) + 50;
        this.enemyXmove = Math.random() * (500 - this.enemySize - 0) + 0;
        // this.enemyXmove = x;
        // this.enemyYmove = y;
    }

    createEnemy() {
        this.ctx.beginPath();
        this.ctx.rect(this.enemyXmove, this.enemyYmove, this.enemySize, this.enemySize);
        this.ctx.fillStyle = "rgb(255,0,0)";
        this.ctx.fill();
        this.ctx.closePath();
    }

    deleteEnemy() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, 500, 400);
        this.ctx.fillStyle = "#5d5d5d";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

//tama
class createBullet {
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.shootLoopCount = 0;
        this.loopTimer;
        this.enemyXmove = enemyXmove;
        this.enemyYmove = enemyYmove;
        this.enemyClear = enemyClear;
        this.drawBullet = drawBullet;
        this.endLoop = false;
    }

    exeShoot() {
        this.loopTimer = setInterval(this.move.bind(this), 50)
    }
    move() {
        if (this.shootLoopCount > 50 || this.endLoop == true) {
            clearInterval(this.loopTimer);
            this.shootLoopCount = 0;
            return;
        }
        else {
            this.bulletClear()
            this.shootLoopCount++;
            this.ctx.beginPath();
            //xは1/2で半分にyは-50で自機のtopに、shootRoopCount*10で上に進む
            this.ctx.rect(this.x, this.y - 50 - this.shootLoopCount * 10, 5, 20);
            this.ctx.fillStyle = "rgb(255,255,255)";
            this.ctx.fill();
            this.ctx.closePath();
            
            // 弾が敵の一番下に来た時に 弾のx座標が敵のx+75の範囲であれば Bulletを消す
            if (enemy == null) {
                return;
            } 
            if ((this.y - 45 - this.shootLoopCount * 10) <= enemy.enemyYmove + enemy.enemySize) {
                let eneEnesize = enemy.enemyXmove + enemy.enemySize;
                if (enemy.enemyXmove <= this.x && eneEnesize >= this.x) {
                    this.deleteEnemy();
                    this.endLoop = true;
                }
            }
        }
    }

    bulletClear() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#5d5d5d";
        this.ctx.rect(this.x -1, this.y - 50 - this.shootLoopCount * 10, 10, 20);
        this.ctx.fill();
        this.ctx.closePath();
    }
    deleteBullet() {
        this.ctx.beginPath();
        this.ctx.rect((this.x) - 2, this.y - 50 - this.shootLoopCount * 10, 10, 40);
        this.ctx.fillStyle = "#5d5d5d";
        this.ctx.fill();
        this.ctx.closePath();
        clearInterval(this.loopTimer);
        this.shootLoopCount = null;
    }
    deleteEnemy() {
        // ctx.beginPath();
        // ctx.rect(enemy.enemyXmove-2, enemy.enemyYmove, enemySize+5, enemySize);
        // ctx.fillStyle = "#5d5d5d";
        // ctx.fill();
        // ctx.closePath();
        enemy.deleteEnemy();


        // enemyXmove = 0;
        // enemyYmove = 0;
        this.deleteBullet();
        enemy = null;
    }
}



//描画してセットでアニメーション
function draw() {
    function User() {
        //userの描画
        ctx.beginPath();
        ctx.rect(userXmove, userYmove, 25, 25);
        ctx.fillStyle = "rgb(255,255,0)";
        ctx.fill();
        ctx.closePath();
    }
    //動かすためのset
    setInterval(User, userSpeed);
    setInterval(Enemy, 500);
}
//左右の矢印による移動
function userMove() {
    addEventListener('keydown', walk);
    //移動の際の不要部分の削除
    function clearUserRight() {
        ctx.beginPath();
        ctx.rect(userXmove - 25, userYmove, 25, 25);
        ctx.fillStyle = "#5d5d5d";
        ctx.fill();
        ctx.closePath();
    }
    function clearUserLeft() {
        ctx.beginPath();
        ctx.rect(userXmove + 25, userYmove, 25, 25);
        ctx.fillStyle = "#5d5d5d";
        ctx.fill();
        ctx.closePath();
    }
    //矢印移動
    function walk(event) {
        direction = event.code;
        //spaceで射撃
        userShooting();
        if (direction == "ArrowRight") {
            if (userXmove > 475) {
                return;
            }
            userXmove += 10;
            clearUserRight();
        }
        else if (direction == "ArrowLeft") {
            if (userXmove < 10) {
                return;
            }
            userXmove -= 10;
            clearUserLeft();
        }
    }

}
function userShooting() {
    addEventListener('keydown', shoot);

    function shoot(event) {
        trigger = event.code;
        if (trigger == 'Space') {
            let shoot = new createBullet(userXmove+25/2, userYmove, ctx);
            shoot.exeShoot();
        }
    }
}
draw();
userMove();