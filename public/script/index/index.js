import { theme } from "../theme.js";

let themeClass;

export function index() {

    function init() {
        themeClass =  theme();
    }

    return {
        init
    }

}
