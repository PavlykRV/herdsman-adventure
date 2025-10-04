export class CounterUI {
    private element: HTMLDivElement;

    constructor() {
        this.element = document.createElement("div");
        this.element.style.position = "absolute";
        this.element.style.top = "10px";
        this.element.style.left = "50%";
        this.element.style.transform = "translateX(-50%)";
        this.element.style.fontSize = "32px";
        this.element.style.fontWeight = "bold";
        this.element.style.color = "#222";
        this.element.style.textShadow = "0 2px 4px #fff";
        this.element.innerText = "Animals in farm: 0";
        document.body.appendChild(this.element);
    }

    update(count: number) {
        this.element.innerText = `Animals in farm: ${count}`;
    }
}
