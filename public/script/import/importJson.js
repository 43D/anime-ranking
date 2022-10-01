import { eventos } from "./events.js";
import { display } from "./display.js";
import { theme } from "../theme.js";

let eventsClass;
let displayClass;
let themeClass;
export function importJson() {

    function init() {
        themeClass = theme();
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