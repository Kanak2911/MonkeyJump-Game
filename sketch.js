var monkey, monkey_running, banana ,bananaImage, obstacle, obstacleImage, bananaGroup, obstacleGroup, ground,  score;
var survivalTime = 0;

function preload(){  
  monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   
   bananaImage = loadImage("banana.png");
   obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 300);
  
  monkey = createSprite(35,260,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(150,290,800,10);
  ground.x = ground.width /2;
  ground.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  score = 0;
  
  monkey.setCollider("rectangle",0,0, monkey.width, monkey.height);
  monkey.debug = true;
}

function draw() {
  background('green');
  textSize(20);
  fill('white');
  text("Score : "+score,500,50);
  
  fill('black');
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time :",+survivalTime,50,50);
  
  if(keyDown("space") && monkey.y >= 159) {
    monkey.velocityY = -10;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  ground.velocityX = -(4 + 3* score/100);
  
  if(ground.x < 0){
     ground.x = ground.width/2;
  }
  monkey.collide(ground);
  
  if (bananaGroup.isTouching(monkey)) { 
     bananaGroup.destroyEach();
     score = score + 1;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    obstacleGroup.velocityX = 0;
  }
  
  spawnBanana();
  spawnObstacle();
  
  drawSprites();
}

function spawnObstacle(){
 if (frameCount % 135 === 0){
    var obstacle = createSprite(600,265,40,40);
    obstacle.addImage(obstacleImage); 
    obstacle.velocityX = -3;
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);    
 }
}

function spawnBanana() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,165,40,10);
    banana.y = Math.round(random(80,220));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.scale = 0.07;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}