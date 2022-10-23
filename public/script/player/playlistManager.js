import { localStorageObject } from "../localStorageObject.js";

let localStorageClass;

export function playlistManager() {

    function init(config = {}) {
        localStorageClass = (config.localStorageObject) ? config.localStorageObject : localStorageObject();

    }

    function newPlaylist(name){
        console.log(name)
        
    }

    return {
        init,
        newPlaylist
    }
}