function setup() {
    pixelDensity(1);
    let cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent("canvas-host");
    
  
}
function draw() {
    background(135, 206, 235);

    circle(width/2, height/2, 50)

    textSize(16);
    fill('black');
    textAlign(CENTER, TOP);

    text("Drew a circle in the middle", width/2,  height/2-40);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}