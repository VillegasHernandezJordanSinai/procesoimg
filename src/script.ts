const canvas: any = document.getElementById('canvas1');
const ctx: any = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createRadialGradient(
  canvas.width / 2,
  canvas.height / 2,
  200,
  canvas.width / 2,
  canvas.height / 2,
  canvas.width / 2,
);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'Cyan');
gradient.addColorStop(0.4, 'magenta');

class Symbolo {
  x: number;
  y: number;
  fontSize: number;
  canvasHeight: number;
  text: any;
  characters: any;
  constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
    this.characters =
      'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.text = '';
    this.canvasHeight = canvasHeight;
  }
  draw(context: any) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length),
    );
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}
class Effect {
  canvasWidth: number;
  canvasHeight: number;
  fontSize: number;
  columns: number;
  symbols: any;
  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 55;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
    console.log(this.symbols); //Imprimir en consola los simbolos
  }
  #initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbolo(i, 0, this.fontSize, this.canvasHeight);
    }
  }
  resize(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.#initialize();
  }
}
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 600;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp: any) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (timer > nextFrame) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.textAlign = 'center';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = gradient; //"#aff0a";
    ctx.font = effect.fontSize + 'px monospace';
    effect.symbols.forEach((symbol: any) => symbol.draw(ctx));
    timer = 0;
  } else {
    timer += deltaTime;
  }
  requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.resize(canvas.width, canvas.height);
  let gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    200,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2,
  );
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.2, 'Cyan');
  gradient.addColorStop(0.4, 'magenta');
});
