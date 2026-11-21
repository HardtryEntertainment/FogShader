let myShader;
let img;
let fogColor = [0.8, 0.9, 1, 1];
let draggingUI = false;
let angle;
let sliderNear;
let sliderFar;
let valueLabelNear;
let valueLabelFar;

const numCubes = 30;

async function setup() {
  img = await loadImage('assets/placeholder.png')
  font = await loadFont('assets/Minecraft.ttf')
  // load each shader file
  // (don't worry, we will come back to these!)
  myShader = await loadShader('shader.vert', 'shader.frag');
  const cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  // cnv.getTexture(img).setInterpolation(NEAREST, NEAREST);
  window.addEventListener('pointerdown', (e) => {
    if (e.target !== cnv.elt) draggingUI = true;
  });
  window.addEventListener('pointerup', () => (draggingUI = false));
  window.addEventListener('pointercancel', () => (draggingUI = false));

  // Create sliders and place them at the top of the canvas.
  sliderNear = createSlider(0.0, 400.0, 10.0, 0.01);
  sliderNear.position(100, 10);
  sliderNear.size(180);

  const labelNear = createDiv('fogNear');
  labelNear.class('slider-label');
  labelNear.position(10, 10);
  valueLabelNear = createDiv(sliderNear.value().toFixed(2));
  valueLabelNear.class('slider-label');
  valueLabelNear.position(290, 10);

  sliderFar = createSlider(0.0, 400.0, 200.0, 0.01);
  sliderFar.position(100, 40);
  sliderFar.size(180);

  const labelFar = createDiv('fogFar');
  labelFar.class('slider-label');
  labelFar.position(10, 40);
  valueLabelFar = createDiv(sliderFar.value().toFixed(2));
  valueLabelFar.class('slider-label');
  valueLabelFar.position(290, 40);

  camera(20, 0 , 90,20,0,0)
}

function draw() {
  background(204,229.5,255);
  lights();
  if (!draggingUI) {
    orbitControl();
  }
  noStroke();
  // // shader() sets the active shader,
  // // which will be applied to what is drawn next
  shader(myShader);

  myShader.setUniform('u_texture', img);
  myShader.setUniform('u_fogColor', fogColor);
  myShader.setUniform('u_fogNear', sliderNear.value());
  myShader.setUniform('u_fogFar', sliderFar.value());
  valueLabelNear.html(sliderNear.value().toFixed(2));
  valueLabelFar.html(sliderFar.value().toFixed(2));
  // // Pass the time from p5 to the shader
  myShader.setUniform('time', millis());

  angle = frameCount * 0.01;
  
  
  drawCubes();
  
}

function drawCubes() {
  for (let i = 0;i <= numCubes; i++) {
    push()
    rotateY(angle);
    rotateX(angle);
    box(6);
    pop()
    translate(8, 0, -10)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
