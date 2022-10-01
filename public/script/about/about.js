import { theme } from "../theme.js";

let themeClass;

export function about() {

    function init() {
        themeClass =  theme();
    }

    return {
        init
    }

}
