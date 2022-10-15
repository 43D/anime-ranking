
import { theme } from "../theme.js";
import { display } from "./display.js";

let themeClass;
let displayClass;

export function player() {

    function init() {
        themeClass =  theme();
        displayClass = display();
        displayClass.init();
    }

    return {
        init
    }

}
