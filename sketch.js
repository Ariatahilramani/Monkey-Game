var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=5;


var PLAY=1;
var END=0;
var gameState=PLAY;



function preload(){
  backImage=loadImage("jungle2.jpg");

  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(500,400);
  
  backgr=createSprite(0,0,400,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.12;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 5;
}

function draw() {
  
  background(255);
  
  if(gameState===PLAY){
    if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 5: player.scale=0.12;
                break;
        case 10: player.scale=0.14;
                break;
        case 15: player.scale=0.16;
                break;
        case 20: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space")&&player.y>280 ) {
      player.velocityY = -14;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
       
     score=score-1;
      player.scale=player.scale-0.05;   
      obstaclesGroup.destroyEach();
    
    }
     if(score===0){
      gameState=END;
    } 
  }
    
else if(gameState===END){
  
backgr.velocityX=0;
    
    //gameOver.visible = true;
    //restart.visible = true;
    
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    player.velocityY = 0;
  
     
    obstaclesGroup.destroyEach();
   FoodGroup.destroyEach();
}
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
