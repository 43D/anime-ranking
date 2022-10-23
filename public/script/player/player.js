
import { theme } from "../theme.js";
import { display } from "./display.js";
import { defaultConfigs } from "../defaultConfigs.js";
import { musicManager } from "./musicManager.js";
import { playlistManager } from "./playlistManager.js";

let musicManagerClass;
let playlistManagerClass;
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
        musicManagerClass = musicManager();
        musicManagerClass.init();
        playlistManagerClass = playlistManager();
        playlistManagerClass.init();
    }

    function newPlayList(name){
        console.log(name)
    }

    return {
        init,
        newPlayList
    }

}
