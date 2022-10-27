import { localStorageObject } from "./localStorageObject.js";

let localStorageClass;

export function defaultConfigs() {
    function init(config = {}) {
        localStorageClass = (config.localStorageObject) ? config.localStorageObject : localStorageObject();
        start();
    }

    function start() {
        if (isNull(localStorageClass.getConfig()))
            createConfig();
        if (isNull(localStorageClass.getLanguage()))
            createLanguage();
        if (isNull(localStorageClass.getMusics()))
            createMusic();


    }

    function createConfig() {
        const config = {
            "volume": 1.0,
            "lastMusic": "-1",
            "playtime": "0",
            "streaming": "0"
        }
        localStorageClass.setConfig(config);

    }

    function createLanguage() {
        const lg = {
            "language": [
                "pt",
                "en"
            ],
            "currentLanguage": "pt"
        };
        localStorageClass.setLanguage(lg);

    }

    function createMusic() {
        const empity = {};
        localStorageClass.setMusics(empity);
        localStorageClass.setPlayLists(empity);
        localStorageClass.setCurrentPlayList(empity);
        localStorageClass.setMusicsAnime(empity);
        localStorageClass.setMusicsName(empity);
        localStorageClass.setMusicsSeason(empity);
    }

    function isNull(obj) {
        return (obj == null) ? true : false;
    }

    return {
        init
    }
}