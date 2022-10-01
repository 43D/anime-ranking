
import { theme } from "../theme.js";

let themeClass;

export function player() {

    function init() {
        themeClass =  theme();
    }

    return {
        init
    }

}
