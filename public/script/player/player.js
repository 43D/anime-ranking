
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
        getParam();
    }

    function newPlayList(name) {
        playlistManagerClass.newPlayList(name);
    }

    function getParam() {
        const url = window.location.hash.split("fast=")[1];
        displayClass.actionUrl(url);
    }

    return {
        init,
        newPlayList
    }

}
