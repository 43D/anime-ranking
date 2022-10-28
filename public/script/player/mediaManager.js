
import { localStorageObject } from "../localStorageObject.js";

let localStorageObjectClass;
export function mediaManager() {
    let currentPlayList = [];

    function init(config = {}) {
        localStorageObjectClass = (config.localStorageObject) ? config.localStorageObject : localStorageObject();
        currentPlayList = localStorageObjectClass.getCurrentPlayList();
        start();
    }

    function start() {
        const config = localStorageObjectClass.getConfig();
        selectStreaming(config["streaming"]);
        createList();
    }

    function createList(){
        
    }

    function selectStreaming(value = "0") {
        $("#select-quality").val(value);
    }

    function setStreaming(qld = "0") {
        localStorageObjectClass.setStreaming(qld);
    }

    function setOneTimeline(id) {
        currentPlayList = [id];
        save();
    }
    function addOneTimeline(id) {
        if (!currentPlayList.includes(id)) {
            currentPlayList[currentPlayList.length] = id;
            save();
        }
    }
    function setAllTimeline(array = []) {
        currentPlayList = array;
        save();
    }

    function save() {
        localStorageObjectClass.setCurrentPlayList(currentPlayList);
        createList();
    }

    return {
        init,
        setStreaming,
        setOneTimeline,
        addOneTimeline,
        setAllTimeline
    }
}