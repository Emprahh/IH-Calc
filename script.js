const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 80;
ctx = canvas.getContext('2d');

//easier to write the number to the display if it's backwards, this splits the string into an array, reverses it and joins it back together as a string, all on one line, super useful trick to know.
function reverseNum(num){
    return num.split("").reverse().join("");
}

//these are the coordinates of the shapes that make up a digit display, i didn't realise how crazy this would get when I had the idea! This creates an array of segments in a specific order so I can know which to turn on or off. All these numbers are relative to the origin passed with the x and y when they are created.
class charSegment {
	constructor(pos, x, y) {
  	this.pos = pos;
    this.x = x;
    this.y = y;
    this.segments = [];
    this.segments.push({
    	bit: 0,
      path: [[this.x + 3.5, this.y + 40], [this.x + 0, this.y + 43.5], [this.x + 0, this.y + 69], [this.x + 3.5, this.y + 72.5], [this.x + 8, this.y + 69], [this.x + 8, this.y + 43.5], [this.x + 3.5, this.y + 40]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 5.5, this.y + 72.5], [this.x + 9, this.y + 76], [this.x + 41, this.y + 76], [this.x + 44.5, this.y + 72.5], [this.x + 41, this.y + 69], [this.x + 9, this.y + 69], [this.x + 5.5, this.y + 72.5]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 46.5, this.y + 40], [this.x + 43, this.y + 43.5], [this.x + 43, this.y + 69], [this.x + 46.5, this.y + 72.5], [this.x + 50, this.y + 69], [this.x + 50, this.y + 43.5], [this.x + 46.5, this.y + 40]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 46.5, this.y + 7.5], [this.x + 43, this.y + 11], [this.x + 43, this.y + 36.5], [this.x + 46.5, this.y + 40], [this.x + 50, this.y + 36.5], [this.x + 50, this.y + 11], [this.x + 46.5, this.y + 7.5]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 5.5, this.y + 7.5], [this.x + 9, this.y + 11], [this.x + 41, this.y + 11], [this.x + 44.5, this.y + 7.5], [this.x + 41, this.y + 4], [this.x + 9, this.y + 4], [this.x + 5.5, this.y + 7.5]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 3.5, this.y + 7.5], [this.x + 0, this.y + 11], [this.x + 0, this.y + 36.5], [this.x + 3.5, this.y + 40], [this.x + 8, this.y + 36.5], [this.x + 8, this.y + 11], [this.x + 3.5, this.y + 7.5]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 9, this.y + 61.5], [this.x + 9, this.y + 67], [this.x + 11, this.y + 67], [this.x + 19.5, this.y + 49], [this.x + 19.5, this.y + 45.5], [this.x + 18, this.y + 45.5], [this.x + 9, this.y + 61.5]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 41, this.y + 61.5], [this.x + 41, this.y + 67], [this.x + 39.5, this.y + 67], [this.x + 30.5, this.y + 49], [this.x + 30.5, this.y + 45.5], [this.x + 32, this.y + 45.5], [this.x + 41, this.y + 61.5]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 41, this.y + 18.5], [this.x + 41, this.y + 13], [this.x + 39.5, this.y + 13], [this.x + 30.5, this.y + 31], [this.x + 30.5, this.y + 35.5], [this.x + 32, this.y + 35.5], [this.x + 41, this.y + 18.5]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 9, this.y + 18.5], [this.x + 9, this.y + 13], [this.x + 11, this.y + 13], [this.x + 19.5, this.y + 31], [this.x + 19.5, this.y + 35.5], [this.x + 18, this.y + 35.5], [this.x + 9, this.y + 18.5]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 5.5, this.y + 40], [this.x + 9, this.y + 43.5], [this.x + 19.5, this.y + 43.5], [this.x + 23.5, this.y + 40], [this.x + 19.5, this.y + 36.5], [this.x + 9, this.y + 36.5], [this.x + 5.5, this.y + 40]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 27, this.y + 40], [this.x + 30.5, this.y + 43.5], [this.x + 41.5, this.y + 43.5], [this.x + 45, this.y + 40], [this.x + 41.5, this.y + 36.5], [this.x + 30.5, this.y + 36.5], [this.x + 27, this.y + 40]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 25, this.y + 41], [this.x + 21.5, this.y + 43.5], [this.x + 21.5, this.y + 67], [this.x + 28.5, this.y + 67], [this.x + 28.5, this.y + 43.5], [this.x + 25, this.y + 41]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 25, this.y + 39], [this.x + 21.5, this.y + 36.5], [this.x + 21.5, this.y + 13], [this.x + 28.5, this.y + 13], [this.x + 28.5, this.y + 36.5], [this.x + 25, this.y + 39]]
      });
    this.segments.push({
    	bit: 0,
      path: [[this.x + 55, this.y + 70], [this.x + 60, this.y + 70], [this.x + 60, this.y + 75], [this.x + 55, this.y + 75], [this.x + 55, this.y + 70]]
      });
  }
}

//set up buttons
function setup() {
  var calcButtons = document.getElementsByClassName('calcbutton');
	for (var i = 0; i < calcButtons.length; i++) {
		calcButtons[i].addEventListener('click', function(e) {
    		//this turns off the scrolling that happens when you have an error, like when you divide by 0, 					when you press a button
    		if(scrolling === true) {stickScroll(null, 1);}
        //if button is a number button, pass it's value to the logic function
        if(Number.isInteger(parseInt(this.id)) || this.id === ".") {
  				calcMem(null, this.id);
  			}
        //passes a reset command to logic function
        else if (this.id === "C") {
        	calcMem("reset", null);
        }
        //if neither number or reset code, pass operator symbol to logic function
        else {
      		calcMem("operation", this.id);
    		}
		});
  }
  //this handles some bugs I was having with the scrolling starting immediately 
  if(scrolling === true) {stickScroll(null, 1);}
  calcMem("reset", null);
}

//creates an array of digit displays in order so I can turn them on in sequence
let displaySpots = [];
function setupDisplay() {
	for (var i = 0; i < 12; i++) {
    // the int args control the spacing between the digits
  	displaySpots.push(new charSegment(i, (i * 65) + 20, 0 ));
  }

}

function calcMem(cmd, ele) {
	switch(cmd){
  	//clears the memory and resets the display
  	case "reset":
    	intMem = "";
    	taskMem = [];
      lastProduct = 0;
      lastOp = "";
      refreshSticks();
      break;
    //if math error, resets the calculator and starts err message scrolling
    case "err":
      intMem = "";
    	taskMem = [];
      lastProduct = 0;
      lastOp = "";
      scrollBreaker = false;
      refreshSticks();
      //20 is the number of spots the message will travel before automatically stopping * actually I might have made it infinite when I got the function to stop the scrolling with button press working* 
      stickScroll(["ERROR", 20, 0]);
      break;
    case "operation":
    	taskMem.push([intMem, ele]);
      //if first operator used, just redisplay the number entered
      if (lastOp === "") {
        lastProduct = parseFloat(intMem);
      }
      //if number was entered, update product to new result and display it
      else if (intMem !== "") {
      	switch (lastOp) {
          case "+":
            lastProduct += parseInt(intMem);
            break;
          case "-":
            lastProduct -= parseInt(intMem);
            break;
          case "/":
            lastProduct = lastProduct / parseInt(intMem);
            break;
          case "*":
            lastProduct = lastProduct * parseInt(intMem);
            break;
          case "%":
            lastProduct = lastProduct % parseInt(intMem);
            break;
        }
      }
      //this handles limiting the min and max number the calculator will display
      if (lastProduct.toString().length > 12) {
      	var pString = lastProduct.toString();
      	if (pString.includes(".")) {
        	var decimalPos = pString.indexOf(".");
          if (decimalPos === 11) {
          	pString = pString.slice(0, 10);
          }
          else {
          	pString = pString.slice(0, 11);
          }
          lastProduct = parseFloat(pString);
        }
        else {
        	if (lastProduct < 0) {lastProduct = -999999999999;}
          if (lastProduct > 0) {lastProduct = 999999999999;}
        }
      }
      //console.log(lastProduct);
      // if operator button was "=", display the result and clear the memory of calc
      if (ele === "=") {
        refreshSticks();
      	displaySticks(String(lastProduct));
        intMem = "";
    		taskMem = [];
      	lastProduct = 0;
      	lastOp = "";
      }
      //displays product and resets current int entered memory, remembers last operator used
      else {
      	refreshSticks();
      	displaySticks(String(lastProduct));
      	lastOp = ele;
      	intMem = "";
      }
      break;
    //updates display when just a digit is pressed
    default:
    	if (intMem.length < 12){
      	//this isn't adding two numbers together, this is concating two strings, number conversion only           happens when an operator is pressed
    		intMem += ele;
        refreshSticks();
      	displaySticks(intMem);
      }
      break;
  }
}

//this tells the program what digit segments to turn on or off depending on which character is should be displaying
function getSticks(char) {
	switch(char) {
    case "0": return [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0]; 
    case "1": return [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]; 
    case "2": return [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0]; 
    case "3": return [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]; 
    case "4": return [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0]; 
    case "5": return [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0]; 
    case "6": return [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0]; 
    case "7": return [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    case "8": return [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0]; 
    case "9": return [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0]; 
    case "-": return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0]; 
    case "+": return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0]; 
    case "/": return [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0]; 
    case "*": return [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0]; 
    case "%": return [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]; 
    case ".": return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    case "E": return [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0];
    case "R": return [1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0];
    case "O": return [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    case " ": return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  }
}

//a function to simply reset the display to default before rewriting new numbers, otherwise shorter numbers do not overwrite larger numbers
function refreshSticks() {
	for (var i = 0; i < displaySpots.length; i++) {
  	var charPos = displaySpots[i];
    //console.log(charPos.segments);
    for (var x = 0; x < charPos.segments.length; x++){
    		charPos.segments[x].bit = 0;
    }
  }
  animate();
}

function displaySticks(num, scroll, reverse) {
	//error handling, sends err function to logic
  if (num === "Infinity") {
  	calcMem("err", null);
    return;
  }
  //easier to display number when reversed
	var rNum = reverseNum(num);
  //this portion of the code slices off a number from the end (the num is reversed so it's actually the beggining) and feeds it to the function that returns which segments to turn on and off
	for (var i = 0; i < rNum.length; i++) {
  	var charPos = displaySpots[i];
    var displayChar = getSticks(rNum.slice(i, i + 1));
      for (var x = 0; x < displayChar.length; x++){
          displaySpots[displaySpots.length - 1 - i].segments[x].bit = displayChar[x];
      }
  }
  animate();
  //this controls the scrolling, I use a timeout function that repeatedly calls itself, this is an infinite loop if not broken out of
  if (scroll >= 1) {
  	var newScroll = scroll;
    if (num.length < 12 && reverse !== 1) { setTimeout(function(){ stickScroll([num + " ", newScroll, 0], null); }, 500);}
    else if (num.indexOf(" ") !== -1) { setTimeout(function(){ stickScroll([num.slice(0, -1), newScroll, 1], null); }, 500); }
    else { setTimeout(function(){ stickScroll([num + " ", newScroll, 0], null); }, 500); }
  }
}

//this is the function that handles calling the loop for scrolling and also breaking that loop, this is a little hacky since originally I had this all in the above function but because of the way setTimeout works, you can't ever break the loop once the setTimeout has been started, if it calls itself directly. this acts as a middleman
var scrollBreaker = false;
var scrolling = false;
function stickScroll(scrollArgs, breaker) {
	//console.log(scrollArgs);
	if (breaker === 1) {scrollBreaker = true;}
  else if (scrollArgs.length > 0 && scrollBreaker === false) {
  	refreshSticks();
  	displaySticks(scrollArgs[0], scrollArgs[1], scrollArgs[2]);
    scrolling = true;
  }
  else if (scrollArgs.length > 0 && scrollBreaker === true) {
  	scrollBreaker = false;
    scrolling = false;
  }
}

//this is the function that actually handles drawing the segments to the screen, they are all just polygons
function animate() {
    //requestAnimationFrame(animate);
	
  ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < displaySpots.length; i++) {
  	var spot = displaySpots[i];
    //console.log(spot.segments.length);
		 for (var x = 0; x < spot.segments.length; x++) {
    	var seg = spot.segments[x];
      ctx.beginPath();
      ctx.moveTo(seg.path[0][0], seg.path[0][1]);
      for (var z = 1; z < seg.path.length; z++) {
      	//console.log(seg.path[z][0]);
      	ctx.lineTo(seg.path[z][0], seg.path[z][1]);
      }
      ctx.closePath();
      if (seg.bit === 1) {ctx.fillStyle = 'rgb(255, 0, 0)';}
      if (seg.bit === 0) {ctx.fillStyle = 'rgb(50, 0, 0)';}
      ctx.fill();
    } 
  }
}


setup();
setupDisplay();
animate();
