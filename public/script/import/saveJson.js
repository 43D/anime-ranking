import { localStorageObject } from "./localStorageObject.js";

let localStorageClass;

export function saveJson() {
    function init(config = {}) {
        localStorageClass = (config.localStorageObject) ? config.localStorageObject : localStorageObject();
    }

    function make(obj, objChoose) {
        for (let i = 0; i < objChoose.length; i++) {
            console.log(obj[i]);
        }
    }

    return {
        make,
        init
    }
}