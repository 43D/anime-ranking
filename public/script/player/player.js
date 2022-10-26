
import { theme } from "../theme.js";
import { display } from "./display.js";
import { defaultConfigs } from "../defaultConfigs.js";
import { musicManager } from "./musicManager.js";
import { playlistManager } from "./playlistManager.js";
import { search } from "./search.js";
import { localStorageObject } from "../localStorageObject.js";

let localStorageObjectClass;
let searchClass;
let musicManagerClass;
let playlistManagerClass;
let defaultConfigsClass;
let themeClass;
let displayClass;

export function player() {
    function init() {
        localStorageObjectClass = localStorageObject();
        defaultConfigsClass = defaultConfigs();
        defaultConfigsClass.init();
        themeClass = theme();
        displayClass = display();
        displayClass.init({ "player": this });
        musicManagerClass = musicManager();
        musicManagerClass.init();
        playlistManagerClass = playlistManager();
        playlistManagerClass.init();
        searchClass = search();
        searchClass.init();
        getParam();
    }

    function newPlayList(name) {
        playlistManagerClass.newPlayList(name)
    }

    function getParam() {
        const url = window.location.hash.split("fast=")[1];
        displayClass.actionUrl(url);
    }

    function reload() {
        musicManagerClass.reload();
        playlistManagerClass.reload();
    }

    function searchAction() {
        searchClass.start();
    }

    function clearData(){
        localStorageObjectClass.clear();
    }
    return {
        init,
        newPlayList,
        reload,
        searchAction,
        clearData
    }

}
