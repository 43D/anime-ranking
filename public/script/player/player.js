
import { theme } from "../theme.js";
import { display } from "./display.js";
import { defaultConfigs } from "../defaultConfigs.js";
import { getMusicsFromLS } from "./getMusicsFromLS.js";

let getMusicsFromLSClass;
let defaultConfigsClass;
let themeClass;
let displayClass;

export function player() {

    function init() {
        defaultConfigsClass = defaultConfigs();
        defaultConfigsClass.init();
        themeClass =  theme();
        displayClass = display();
        displayClass.init();
        getMusicsFromLSClass = getMusicsFromLS();
        getMusicsFromLSClass.init();
    }

    return {
        init
    }

}
