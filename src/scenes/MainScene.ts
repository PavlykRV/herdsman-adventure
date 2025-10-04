import { Application, Container, Graphics } from "pixi.js";
import { Player } from "../entities/Player";
import { Animal } from "../entities/Animal";
import { CounterUI } from "../ui/CounterUI";

export class MainScene {
    private app: Application;
    private player: Player;
    private animals: Animal[] = [];
    private counter: CounterUI;
    private yardRect: { x: number; y: number; width: number; height: number };
    private respawnTimeout: any = null;

    constructor(app: Application) {
        this.app = app;

        const yardHeight = 100;
        this.yardRect = {
            x: 0,
            y: app.screen.height - yardHeight,
            width: app.screen.width,
            height: yardHeight,
        };

        const yardZone = new Graphics();
        yardZone.fill(0xffff00);
        yardZone.rect(this.yardRect.x, this.yardRect.y, this.yardRect.width, this.yardRect.height);
        yardZone.fill();
        app.stage.addChild(yardZone);

        this.counter = new CounterUI();

        this.player = new Player(app.screen.width / 2, app.screen.height / 2);
        app.stage.addChild(this.player.sprite);

        this.spawnAnimals();

        app.ticker.add(this.update.bind(this));

        const container = new Container();
        container.width = app.screen.width;
        container.height = app.screen.height;
        container.hitArea = app.screen;
        container.interactive = true;
        container.eventMode = "static";
        container.on("pointerdown", (event) => {
            this.player.target = { x: event.data.global.x, y: event.data.global.y };
        });
        app.stage.addChild(container);
    }

    private spawnAnimals() {
        for (const a of this.animals) this.app.stage.removeChild(a.sprite);
        this.animals.length = 0;

        const animalCount = Math.floor(Math.random() * 6) + 5;


        for (let i = 0; i < animalCount; i++) {
            const offset = { x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 40 };
            const animal = new Animal(
                Math.random() * this.app.screen.width,
                Math.random() * (this.app.screen.height - this.yardRect.height),
                offset
            );
            this.animals.push(animal);
            this.app.stage.addChild(animal.sprite);
        }
    }

    private update() {
        this.player.update();
        let farmCount = 0;
        let following = 0;

        for (const animal of this.animals) {
            if (!animal.inFarm && following < 5) {
                animal.update(this.yardRect, this.player);
                following++;
            } else {
                animal.update(this.yardRect, this.player);
            }
            if (animal.inFarm) farmCount++;
        }

        this.counter.update(farmCount);

        if (farmCount === this.animals.length && !this.respawnTimeout) {
            this.respawnTimeout = setTimeout(() => {
                this.spawnAnimals();
                this.respawnTimeout = null;
            }, 1200);
        }
    }
}
