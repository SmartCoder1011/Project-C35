//Create variables here
var database;
var dog,foodS,dogIMG,happyDogIMG;
var foodS = 0;
var feedPetBtn,addFoodBtn;
var  lastFed;
var foodObJ;
var gs=0;
var s;
var milkIMG;
function preload()
{
dogIMG=loadImage("images/dogImg.png")
happyDogIMG=loadImage("images/dogImg1.png")
milkIMG=loadImage("images/milk.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  dog=createSprite(800,250)
  dog.scale=0.15;
  dog.addImage(dogIMG)



  foodStock=database.ref('food');
  foodStock.on('value',readStock);
  foodS=20;
  
  feedPetBtn=createButton("Feed the Dog")
  feedPetBtn.position(700,95);
  feedPetBtn.mousePressed(function(){
    dog.addImage(happyDogIMG);
    
    lastFed=lastFed+1;
    console.log(s);
    gs=1;
    database.ref("/").update({
      feedTime:lastFed
    })
    database.ref("/").update({
      food:foodS-1
    })

  });

  addFoodBtn=createButton("Add Food");
  addFoodBtn.position(800,95);
  addFoodBtn.mousePressed(function(){
    database.ref("/").update({
      food:foodS+1
    })
  })

  var fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
 })
  

}


function draw() {  
  background(46,139,87);
  fill("black")
  text("Food Remaining: "+foodS,600,200)



if(lastFed!==undefined&&lastFed!==null&&gs!==0){
  if(lastFed>=12){
    text("Last Fed: "+lastFed%12+"PM",350,30);
  } else if(lastFed===0){
    text("Last Fed: 12 AM",350,30);
  } else {
    text("Last Fed: "+lastFed+"AM",350,30);
  }
}

var x=80
var y=100;

imageMode(CENTER);
image(milkIMG,720,220,70,70)


if(foodS!==0){
    for(var i=0;i<foodS;i++){
        if(i%10===0){
            x=80;
            y=y+50;
        }
        image(milkIMG,x,y,50,50);
        x=x+30;
    }
}

drawSprites();
  //add styles here
  textSize(20);
  /*fill("black")
  text("Food Remaining: "+foodStock,100,200);*/
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref("/").update({
    food:x
  })
}

