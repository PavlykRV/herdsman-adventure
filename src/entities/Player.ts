import { Graphics } from "pixi.js";

export class Player {
    public sprite: Graphics;
    public target: { x: number; y: number };
    public speed: number = 5;

    constructor(x: number, y: number) {
        this.sprite = new Graphics();
        this.sprite.setStrokeStyle(2);
        this.sprite.fill(0xff0000);
        this.sprite.circle(0, 0, 10);
        this.sprite.fill();
        this.sprite.x = x;
        this.sprite.y = y;
        this.target = { x, y };
    }

    update() {
        const dx = this.target.x - this.sprite.x;
        const dy = this.target.y - this.sprite.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > this.speed) {
            this.sprite.x += (dx / dist) * this.speed;
            this.sprite.y += (dy / dist) * this.speed;
        } else {
            this.sprite.x = this.target.x;
            this.sprite.y = this.target.y;
        }
    }
}