//Create variables here
var dog,dogimg,dogimg1;
var database;
var foodS,foodStock;
var foodObj,feed,addFood,fedTime,lastFed;
function preload()
{
  dogimg = loadImage("images/dogimg.png");
  dogimg1 = loadImage("images/dogimg1.png");
	//load images here
}

function setup(){
	createCanvas(1000,400);
  database = firebase.database();
  foodObj = new Food();
  dog = createSprite(250,300,150,150);
  dog.addImage(dogimg);
  dog.scale = 0.15;
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  textSize(20);
}


function draw() {  
background(46,139,87);
foodObj.display();
fedTime = database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed = data.val();
})


  drawSprites();
  //add styles here
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }
  else if(lastFed==0){ 
    text("Last Feed : 12 AM",350,30); }
    else{ 
      text("Last Feed : "+ lastFed + " AM", 350,30); }
  
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(dogimg1);
  if(foodObj.getFoodStock()<= 0){ 
    foodObj.updateFoodStock(foodObj.getFoodStock()*0); }
    else{ f
      oodObj.updateFoodStock(foodObj.getFoodStock()-1); }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}