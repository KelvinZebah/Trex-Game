var trex,trexrunning, ground, groundimage,invisibleground,restart,over, restarti, overi,score,cactusg,cloudg,abc,cactusg,cloudg,trexstop, diesound, checksound, jumpsound
const RUN = 'run';
const STOP = 'stop';
var gamestate;
function preload(){
  trexrunning = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage = loadImage("ground2.png");
  restarti = loadImage('restart.png');
  overi = loadImage('gameOver.png');
  trexstop = loadAnimation("trex_collided.png");
  diesound = loadSound("die.mp3");
  ckecksound = loadSound("checkpoint.mp3");
  jumpsound = loadSound("jump.mp3");
}
function setup() {
  createCanvas(windowWidth, windowHeight/2);
  console.log(width,height);
  console.log(windowWidth, windowHeight);
  trex=createSprite(30,height-17,20,50);
  ground = createSprite(width/2,height-10,width,5);
  ground.addImage(groundimage);
  trex.addAnimation("trexanimation",trexrunning);
  trex.scale = 0.5;
  invisibleground = createSprite(30,height,50,5);
  restart = createSprite(width/2,height/2);
  restart.addImage(restarti);
  over = createSprite(width/2,height/4);
  over.addImage(overi);
  invisibleground.visible = false;
  restart.visible = false;
  over.visible = false;
  gamestate = RUN;
  score = 0;
  //console.log("random number "+abc);
  //console.log('roundNumber'+round(abc));
  cactusg = createGroup();
  cloudg = new Group();
  trex.addAnimation("stop",trexstop);
}

function draw() {
  background(255);
  text("Score is "+score,width-100,50);
  if(gamestate===RUN){
    if(keyDown("space")&& trex.y>=210){
      trex.velocityY = -13 ;
      jumpsound.play(); 
    }
    trex.velocityY = trex.velocityY + 0.8;
    //console.log(trex.y);
    ground.velocityX = -5;
    if(ground.x<=0){
      ground.x = width/2 ;
    }
    if(score%10===0 && score>0 ){
      ckecksound.play();
    }
    
    cactus();
    clouds();
    scoredist(); 
    
    if(trex.isTouching(cactusg)){
      diesound.play(); 
      ground.velocityX = 0;
    trex.velocityY = 0;
    cactusg.setVelocityXEach(0);
    cactusg.setLifetimeEach(-10);
    cloudg.setVelocityXEach(0);
    cloudg.setLifetimeEach(-10);
    over.visible = true;
    restart.visible = true;
      gamestate = STOP;
    }
  }
  else {
    
    trex.changeAnimation("stop",trexstop);
    if(mousePressedOver(restart)){
      reset();
    }
    if(keyDown("r")){
        gamestate = RUN;
        trex.changeAnimation("trexanimation",trexrunning);
      }
  }
  trex.collide(invisibleground);
  drawSprites();
}

function cactus(){
  if(frameCount%100===0){
    var cactus = createSprite(width,height-20,20,20);
    cactusg.add(cactus);
    var cactusi;
    cactus.velocityX = -5;
    cactus.lifetime = width/5;
    abc = round(random(1,6));  
    switch(abc){
      case 1: cactusi = loadImage("obstacle1.png");
        break;
        case 2: cactusi = loadImage("obstacle2.png");
        break;
        case 3: cactusi = loadImage("obstacle3.png");
        break;
        case 4: cactusi = loadImage("obstacle4.png");
        break;
        case 5: cactusi = loadImage("obstacle5.png");
        break;
        case 6: cactusi = loadImage("obstacle6.png");
        break;
        default:
        break;
    }
    cactus.addImage(cactusi);
    cactus.scale = 0.5; 
  }
}

function clouds(){
  if(World.frameCount % 100 === 0){
    var cloud = createSprite(width-5,random(10,height/2),50,20);
    var cloudi = loadImage("cloud.png");
    cloud.addImage(cloudi);
    cloud.velocityX = -4;
    cloud.lifetime = width/4;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    //console.log(cloud.x);
    cloudg.add(cloud);
  }
}

function reset(){
  cactusg.destroyEach();
  cloudg.destroyEach();
  score = 0;
  restart.visible = false;
  over.visible = false;
  trex.velocityY = 10;
  trex.collide(invisibleground);
}

function scoredist(){
  if(frameCount % 100 === 0){
    score = score + 1;
  }
}