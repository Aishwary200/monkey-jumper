var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running,monkeyCollided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var survivalTime=0;
var ground;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyCollided = loadImage("sprite_7.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  monkey = createSprite(50,height-200,20,50)
  monkey.addAnimation("running",monkey_running);
  monkey.addImage("collided",monkeyCollided)
  monkey.scale=0.1
  
  ground=createSprite(50,350,1200,20)
  ground.x=ground.width/2;
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();
}


function draw() {
background("white")
  if(gameState===PLAY){
   if(touches.lenght>0||keyDown("space")&& monkey.y>240){
     monkey.velocityY=-10
     touches=[];
     } 
  if(monkey.isTouching(FoodGroup)){
    score=score+2;
    FoodGroup.destroyEach();
  }
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    switch(score){
      case 10:monkey.scale=0.12;
        break;
       case 20:monkey.scale=0.14;
        break;
       case 30:monkey.scale=0.16;
        break;
      case 40:monkey.scale=0.18;
        break;
       case 50:monkey.scale=0.20;
        break;
      default:break
    }
    
  survivalTime=survivalTime + Math.ceil(getFrameRate()/60)
  spawnObstacles();
  spawnFood();
  if(score>10){
      obstacleGroup.velocityX=-12;
      FoodGroup.velocityX=-12;
      ground.velocityX=-12;
          
     }
    if(score>20){
      obstacleGroup.velocityX=-20;
      FoodGroup.velocityX=-20;
      ground.velocityX=-20;
     }
  if(monkey.isTouching(obstacleGroup)&&monkey.scale>0.3){
    monkey.scale=0.1;
    obstacleGroup.destroyEach();
    }
  if(monkey.isTouching(obstacleGroup)&&monkey.scale<0.2){
    
    gameState=END;
    }
  }
  if(gameState===END){
    
    FoodGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    monkey.changeAnimation("collided",monkeyCollided);
    monkey.velocityY=0
    text("press r to restart",width-500,200)
    if(keyDown("r")){
      reset();
    }
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(ground);
  drawSprites();
  stroke("white");
  textSize(20);
  fill("black");
  text("score: "+ score,width-200,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("survival Time: "+ survivalTime,width-600,50);
  
  
  
}
function spawnObstacles(){
  if(frameCount%150===0){
  obstacle=createSprite(500,322,10,40);
  obstacle.addImage("obstacle",obstacleImage)
  obstacle.scale=0.1;
  obstacle.velocityX=-6;
  obstacle.setCollider("rectangle",0,0,60,50);
  obstacle.collide(ground);
  obstacle.lifetime=400;
  
  obstacleGroup.add(obstacle);
}
}
function spawnFood(){
  if(frameCount%80===0){
  banana= createSprite(400,120,20,20);
  banana.addImage("food",bananaImage)
  banana.scale=0.1;
  banana.y=Math.round(random(150,250))
  banana.velocityX=-6;
  banana.lifetime=600;
  FoodGroup.add(banana);
  }
  
}
function reset(){
  gameState=PLAY
  monkey.changeAnimation("running",monkey_running);
  obstacleGroup.destroyEach();
  score=0
  survivalTime=0;
}


