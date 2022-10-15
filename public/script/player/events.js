import { display } from "./display.js";

let displayClass;

export function events() {
    function init(config = {}) {
        console.log(config.display);
        displayClass = (config.display) ? config.display : display();
    }

    function start() {
        console.log("start...");
    }

    return {
        init,
        start
    }
}