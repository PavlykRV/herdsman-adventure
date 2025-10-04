import { Application } from "pixi.js";
import { MainScene } from "./scenes/MainScene";

async function bootstrap() {
  const app = new Application();
  await app.init({ background: "0x4CAF50", resizeTo: window });
  document.body.appendChild(app.canvas);

  new MainScene(app);
}

bootstrap();
