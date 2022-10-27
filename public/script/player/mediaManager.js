
import { localStorageObject } from "../localStorageObject.js";

let localStorageObjectClass;
export function mediaManager() {

    function init(config = {}) {
        localStorageObjectClass = (config.localStorageObject) ? config.localStorageObject : localStorageObject();
        start();
    }

    function start() {
        const config = localStorageObjectClass.getConfig();
        selectStreaming(config["streaming"]);
    }

    function selectStreaming(value = "0") {
        $("#select-quality").val(value);
    }

    function setStreaming(qld = "0") {
        localStorageObjectClass.setStreaming(qld);
    }


    return {
        init,
        setStreaming
    }
}