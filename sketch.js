var WAIT= 2;
var PLAY= 1;
var END= 0;
var gameState= WAIT;
var astronaut;
var backgroundImage;
var enemyGroup;
var alien1, alien2, alien3, alien4;
var spaceship1, spaceship2;
var invisibleGround;

function preload(){
    backgroundImage= loadImage("Sprites/Background.png");

    alien1Image= loadImage("Sprites/Alien1.png");
    alien2Image= loadImage("Sprites/Alien2.png");
    alien3Image= loadImage("Sprites/Alien3.png");
    alien4Image= loadImage("Sprites/Alien4.png");

    astronautImage= loadImage("Sprites/Astronaut.png");

    spaceship1= loadImage("Sprites/Spaceship1.png");
    spaceship2= loadImage("Sprites/Spaceship2.png");
}

function setup(){
    createCanvas(800,1000);

    backgroundImage= createSprite(800,1500);

    astronaut= createSprite(100,400,100,100);
    astronaut.addImage("Astronaut.png");

    enemyGroup= new Group();

    invisibleGround= createSprite(800,0,50,1000);
    invisibleGround.visible= false;    

    score=0;
    miles=0;
    
}

function draw(){
    background("black");
    if(gameState=== WAIT){
        
        backgroundImage.visible= false;
        astronaut.visible= false;
       /* alien1.visible=false;
        alien2.visible=false;
        alien3.visible=false;
        alien4.visible=false;
        spaceship1.visible=false;
        spaceship2.visible=false;
       */
       

        text("Use the up and down arrow keys to move the astronaut",500, 120);
        text("Press the right arrow key to shoot", 500,220);
        text("If the astronaut touches an alien or a spaceship, the game will end", 500, 335);
        text("You will get 5 point for shooting an alien and 10 point for shooting a spaceship", 500, 450);
        text("If an alien passes, you will lose 5. If a spaceship passes, you will lose 10 point", 500, 570);
        text("Press the space key to start the game", 500, 720);

        score=0;
        miles= 0;
        
        if(keyDown("space")){
            gameState= PLAY;
        }

    }

    else if(gameState=== PLAY){

        backgroundImage.visible= true;
        astronaut.visible= true;
        /*alien1.visible=true;
        alien2.visible=true;
        alien3.visible=true;
        alien4.visible=true;
        spaceship1.visible=true;
        spaceship2.visible=true;
        */

        if(keyDown("right")){
            var bullet= createSprite(100,400,20,20);
            bullet.velocity= 4;
        }

        if(bullet.isTouching(spaceship1)){
            bullet.destroy();
            spaceship1.destroy();
            score= score+10;
        }

        if(bullet.isTouching(spaceship2)){
            bullet.destroy();
            spaceship2.destroy();
            score= score+10;
        }

        if(bullet.isTouching(alien1)){
            bullet.destroy();
            alien1.destroy();
            score= score+5;
        }

        if(bullet.isTouching(alien2)){
            bullet.destroy();
            alien2.destroy();
            score= score+5;
        }

        if(bullet.isTouching(alien3)){
            bullet.destroy();
            alien3.destroy();
            score= score+5;
        }

        if(bullet.isTouching(alien4)){
            bullet.destroy();
            alien4.destroy();
            score= score+5;
        }

        if(keyDown("up")){
            astronaut.velocityY= -5;
        }
        
        if(keyDown("down")){
            astronaut.velocityY= 5; 
        }

        astronaut.collide(invisibleGround);


        miles= miles+ Math.round(getFrameRate()/60);
        backgroundImage= -(6+3*miles/100);

        if(backgroundImage.x < 0){
            backgroundImage.x= backgroundImage.width/2;
        }

        spawnEnemy();

        if(enemyGroup.isTouching(astronaut)){
            gameState=END;
        }

       createEdgeSprites();
       astronaut.bounceOff(edges);
       text("Score: "+ score,20,30 );
       text("Miles Travelled: "+ miles,45,30 );

    }

    else if(gameState=== END){

        backgroundImage.velocityX= 0;
        enemyGroup.velocityX=0;
        enemyGroup.setLifetimeEach(-1);

        if(keyDown("r")){
            enemyGroup.destroyEach();
            score= 0;
            miles= 0;
            gameState=WAIT;
        }

    }

    drawSprites();

}

function spawnEnemy(){
    if(frameCount% 100 === 0){
        var enemy = createSprite(900,400,150,150);
        enemy.y= Math.round(random(50,950));
        var rand= Math.round(random(1,6));
        switch(rand){
        case 1: enemy.addImage(alien1);
        break;
        case 2: enemy.addImage(alien2);
        break;
        case 3: enemy.addImage(alien3);
        break;
        case 4: enemy.addImage(alien4);
        break;
        case 5: enemy.addImage(spaceship1);
        break;
        case 6: enemy.addImage(spaceship2);
        break;
        default: break;
        }

        enemy.lifetime= 1100;
        enemyGroup.add(enemy);
    }
}