// Probably did not complete the assignment as it was given. However, if one of the objectives was to create an interactive game that can be played by the user, then it works. IF anything else, I didn't achieve it.  Spent too much time with my other crud-construtor to get nowhere so I made this, which is something I couldn't have made a few days ago.


// Found a couple of places to build simple games.  I started over with this game. Once I understand how to construct this one, going to attempt a more advanced game. Thanks to this site for the how-to  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/



// #1 Canvas element for game - setting the width and height and inserting into the body. The getContext is for rendering context.  Context is object on which you call all of the rendering APIs.


var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// use the context variable to render all


// #2 need a Game Loop for rendering and updating the game. Main loop is what controls the flow of the game. We are taking the current timestamp with the final timestamp and dividing by 1 second. UPDATE takes the time that has changed since the last update. We render and call the timestamp. the rAF is the que for the next loop


var lastTime;
function main() {
    var now = Date.now();
    var delta = (now - lastTime) / 1000.0;

    update(delta);
    render();

    lastTime = now;
    requestAnimFrame(main);
};

// need some images

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background_canvas.jpg";

// hero image

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src ="tiny_karate_dude.jpg";

// heavy image

var heavyReady = false;
var heavyImage = new Image();
heavyImage.onload = function () {
	heavyReady = true;
};
heavyImage.src ="dino_heavy.jpg";

// Game objects -- now we have the images.  We have three global variables- hero, heavy and how many times the dinosaur has been caught (the objective of this game).  We are basing the speed of the hero in px/second.  The dinosaur is stationary here.


var hero = {
	speed: 256,
	x: 0,
	y: 0
};
var heavy = {
	x: 0,
	y: 0
};
var dinoCaught = 0;

// Player input - we will be inserting keycodes to allow user to control our hero. We want to store the user input for later instead of acting on it immediately. Creating event keydown stores keycode

var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Game reset once dinosaur has been captured. Hero goes in same starting space but we want to have dinosaur begin in different places

var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
// creating a random integer to give a randomness to where our dinosaur will be located. The numbers represent the size of characters
  heavy.x = 60 + (Math.random() * (canvas.width - 74));
  heavy.y = 60 + (Math.random() * (canvas.height - 74));
  };

// Update game objects, we are going to assign movement based off of keypresses on arrows. update is called in each one

var update = function (modifier) {
	if (38 in keysDown) { // controls up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // controls down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // controls left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // controls right
		hero.x += hero.speed * modifier;
	}

	// once the hero and heavy intersect, the dinosaur is caught and the score has been tallied up, it then resets and the game starts over.  Dinosaur captures tally kills by increments of one

	if (
		hero.x <= (heavy.x + 60)
		&& heavy.x <= (hero.x + 33)
		&& hero.y <= (heavy.y + 60)
		&& heavy.y <= (hero.y + 33)
	) {
		++dinoCaught;
		reset();
	}
};

// Rendering the objects. drawImage is what actually gets them onto screen. Taking the images we have inside our canvas and getting context method to find any context in id of 2d which will return the context

var render = function () {
	if (bgReady) {
		context.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		context.drawImage(heroImage, hero.x, hero.y);
	}

	if (heavyReady) {
		context.drawImage(heavyImage, heavy.x, heavy.y);
	}

// Tally numbers - Scoreboard. fillText inserts the score, selected a font, chosen where the Scoreboard

	context.fillStyle = "rgb(250, 250, 250)";
	context.font = "24px Monospace";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Dinosaurs: Captured " + dinoCaught, 60, 74);
};


// thanks to jlongster for the cross-browser info to include
// https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/

var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

// Time to play the game if it works

var then = Date.now();
reset();
main();


//objects go beyond the boundary so I am attempting to create a function so the characters do not leave the field
