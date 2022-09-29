import { eventos } from "./events.js";
import { display } from "./display.js";

let eventsClass;
let displayClass;

export function importJson() {

    function init() {
        displayClass = display();
        eventsClass = eventos();
        eventsClass.init({ displayClass, 'importJson': this });
        eventsClass.start();
    }

    function confirmar() {
        displayClass.exibirList();
    }

    return {
        init,
        confirmar
    }
}