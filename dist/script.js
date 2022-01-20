"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Effect_instances, _Effect_initialize;
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 200, canvas.width / 2, canvas.height / 2, canvas.width / 2);
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.2, 'Cyan');
gradient.addColorStop(0.4, 'magenta');
class Symbolo {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters =
            'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }
    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        }
        else {
            this.y += 1;
        }
    }
}
class Effect {
    constructor(canvasWidth, canvasHeight) {
        _Effect_instances.add(this);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 55;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        __classPrivateFieldGet(this, _Effect_instances, "m", _Effect_initialize).call(this);
        console.log(this.symbols);
    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        __classPrivateFieldGet(this, _Effect_instances, "m", _Effect_initialize).call(this);
    }
}
_Effect_instances = new WeakSet(), _Effect_initialize = function _Effect_initialize() {
    for (let i = 0; i < this.columns; i++) {
        this.symbols[i] = new Symbolo(i, 0, this.fontSize, this.canvasHeight);
    }
};
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 600;
const nextFrame = 1000 / fps;
let timer = 0;
function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient; //"#aff0a";
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach((symbol) => symbol.draw(ctx));
        timer = 0;
    }
    else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}
animate(0);
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
    let gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 200, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.2, 'Cyan');
    gradient.addColorStop(0.4, 'magenta');
});
