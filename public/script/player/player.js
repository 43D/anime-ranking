
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
        themeClass = theme();
        displayClass = display();
        displayClass.init({ "player": this });
        getMusicsFromLSClass = getMusicsFromLS();
        getMusicsFromLSClass.init();
    }

    function newPlayList(name){
        console.log(name)
    }

    return {
        init,
        newPlayList
    }

}
