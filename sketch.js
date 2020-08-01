//Global Variables
var bananaImage, obstacle_img, backImage;

var bG, score;

var ground, monkey;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver, gameOverImage;
var restart, restartImage;

var obstacleGroup, bananaGroup;

var survivalTime=5;



function preload(){
  backImage=loadImage("jungle.jpg");
 monkey_running =
  loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png","Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png")
  
   gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  
}


function setup() {
  createCanvas(600,300);
  
  bG=createSprite(20,20,400,400);
  bG.addImage(backImage);
  bG.x = bG.width/2
  
  ground=createSprite(200,180,400,20);
  ground.visiblity=false;
  
  monkey=createSprite(100,340,20,50)
 monkey.addAnimation(player_running);
  monkey.scale=0.2;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  survivalTime = 5;
  
  restart=createSprite(300,110,50,50);
  gameOver=createSprite(300,80,50,50);
  
  restart.addImage(restartImage);
  gameOver.addImage(gameOverImage);
  restart.scale=0.5;
  gameOver.scale=0.5;
  gameOver.visible=false;
  restart.visible=false;
 
stroke("black"); 
textSize(20);
fill("black");

  
}


function draw(){
  
 background(255); 
  
 
if(gameState===PLAY){
  
      bG.velocityX=-4;
  
      monkey.collide(ground);
  
      if (bG.x < 0 ){
      bG.x = bG.width/2;
      }
  
      if (bananaGroup.isTouching(monkey)){
      survivalTime = survivalTime + 1;
      bananaGroup.destroyEach();
      } 
    
      if (obstacleGroup.isTouching(monkey)){
      survivalTime = survivalTime - 1;
      monkey.scale=0.1;
      obstacleGroup.destroyEach();
      }
    
      if(keyDown("space") && monkey.y>313){
      monkey.velocityY = -13;
      }
    
     switch(survivalTime) {
      case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.14;
      break;
      case 30: monkey.scale=0.16;
      break;
      case 40: monkey.scale=0.18;
      break;
      default:break;
     }
    
    monkey.velocityY = monkey.velocityY + 0.8;
  
    food();
    obstacles();
     

    if(survivalTime===0){
      gameState=END;
    } 
}
  
else if (gameState===END){
    
    bG.velocityX=0;
    
    gameOver.visible = true;
    restart.visible = true;
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    monkey.velocityY = 0;
    monkey.scale=0.1;
     
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
}

  if(mousePressedOver(restart)) {
    reset();
  }
   
  drawSprites();
       
 text("Survival Time: " + survivalTime , 200, 50);
    
}

function reset(){

  gameState=PLAY;
  monkey.scale=0.1;
  restart.visible = false;
  gameOver.visible = false;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  survivalTime = 5;
  
}

function obstacles(){
  if(frameCount % 100 === 0){
  var obstacle= createSprite(400,335,10,40);
  obstacle.velocityX=-4;
  obstacle.addImage(obstacle_img);
  obstacle.scale=0.15;
    obstacle.lifetime=120;
  
  obstacleGroup.add(obstacle);
  
  }
}

function food(){
  if(frameCount % 70 === 0) {
    var banana=createSprite(400,365,10,40);
    banana.velocityX=-4;
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.y = Math.round(random(220,280));
     banana.lifetime=120;
    
     bananaGroup.add(banana);
}
}
