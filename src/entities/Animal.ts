import { Graphics } from "pixi.js";
import { Player } from "./Player";

export class Animal {
    public sprite: Graphics;
    public offset: { x: number; y: number };
    public followThreshold: number = 100;
    public speed: number = 4;
    public inFarm: boolean = false;

    public patrolDir: { x: number; y: number };
    public patrolSpeed: number = 0.35;
    public patrolOrigin: { x: number; y: number };
    public patrolRange: number = 100;

    constructor(x: number, y: number, offset: { x: number; y: number }) {
        this.sprite = new Graphics();
        this.sprite.setStrokeStyle(2);
        this.sprite.fill(0xffffff);
        this.sprite.circle(0, 0, 10);
        this.sprite.fill();
        this.sprite.x = x;
        this.sprite.y = y;
        this.offset = offset;

        const angle = Math.random() * Math.PI * 2;
        this.patrolDir = { x: Math.cos(angle), y: Math.sin(angle) };
        this.patrolOrigin = { x, y };
    }

    private _randomizeBounce() {
        const angle =
            Math.atan2(this.patrolDir.y, this.patrolDir.x) +
            (Math.random() - 0.5) * 0.5;

        const len = Math.sqrt(
            this.patrolDir.x * this.patrolDir.x + this.patrolDir.y * this.patrolDir.y
        );

        this.patrolDir.x = Math.cos(angle) * len;
        this.patrolDir.y = Math.sin(angle) * len;
    }

    update(farmRect: { x: number; y: number; width: number; height: number }, player?: Player,) {
        if (!player) {
            this._patrol(farmRect);
            return;
        }

        if (this.inFarm) {
            this._clampInFarm(farmRect);
            return;
        }

        if (this._insideFarm(farmRect)) {
            this.inFarm = true;
            this._clampInFarm(farmRect);
            return;
        }

        this._followOrPatrol(player, farmRect);
    }

    private _insideFarm(farmRect: { x: number; y: number; width: number; height: number }) {
        return (
            this.sprite.x > farmRect.x + 10 &&
            this.sprite.x < farmRect.x + farmRect.width - 10 &&
            this.sprite.y > farmRect.y + 10 &&
            this.sprite.y < farmRect.y + farmRect.height - 10
        );
    }

    private _clampInFarm(farmRect: { x: number; y: number; width: number; height: number }) {
        this.sprite.x = Math.max(
            farmRect.x + 10,
            Math.min(this.sprite.x, farmRect.x + farmRect.width - 10)
        );
        this.sprite.y = Math.max(
            farmRect.y + 10,
            Math.min(this.sprite.y, farmRect.y + farmRect.height - 10)
        );
    }

    private _followOrPatrol(player: Player, farmRect: { x: number; y: number; width: number; height: number }) {
        const tx = player.sprite.x + this.offset.x;
        const ty = player.sprite.y + this.offset.y;
        const ax = tx - this.sprite.x;
        const ay = ty - this.sprite.y;
        const animalDist = Math.sqrt(ax * ax + ay * ay);

        if (animalDist < this.followThreshold && animalDist > this.speed) {

            this.sprite.x += (ax / animalDist) * this.speed;
            this.sprite.y += (ay / animalDist) * this.speed;
        } else if (animalDist <= this.speed) {

            this.sprite.x = tx;
            this.sprite.y = ty;
        } else {
            this._patrol(farmRect);
        }
    }

    private _patrol(farmRect: { x: number; y: number; width: number; height: number }) {

        this.sprite.x += this.patrolDir.x * this.patrolSpeed;
        this.sprite.y += this.patrolDir.y * this.patrolSpeed;

        const dx = this.sprite.x - this.patrolOrigin.x;
        const dy = this.sprite.y - this.patrolOrigin.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > this.patrolRange) {
            this.patrolDir.x *= -1;
            this.patrolDir.y *= -1;
        }

        const minX = 10;
        const maxX = window.innerWidth - 10;
        const minY = 10;
        const maxY = farmRect.y - 10;

        if (this.sprite.x < minX || this.sprite.x > maxX) {
            this.patrolDir.x *= -1;
            this._randomizeBounce();
        }

        if (this.sprite.y < minY || this.sprite.y > maxY) {
            this.patrolDir.y *= -1;
            this._randomizeBounce();
        }
    }
}
