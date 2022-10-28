
import { localStorageObject } from "../localStorageObject.js";
import { musicManager } from "./musicManager.js";


let musicManagerClass;
let localStorageObjectClass;
export function mediaManager() {
    let currentPlayList = [];

    function init(config = {}) {
        localStorageObjectClass = (config.localStorageObject) ? config.localStorageObject : localStorageObject();
        musicManagerClass = (config.musicManager) ? config.musicManager : musicManager();
        currentPlayList = localStorageObjectClass.getCurrentPlayList();
        start();
    }

    function start() {
        const config = localStorageObjectClass.getConfig();
        selectStreaming(config["streaming"]);
        createList();
    }

    function createList() {
        $("#list-play-ul").empty();
        currentPlayList.forEach(function (k) {
            makeLi(k, musicManagerClass.getMusicById(k));
        });

    }

    function makeIcon(icon) {
        return $('<i>').addClass(icon);
    }

    function makeLi(id, music) {
        if (music) {
            let li = $("<li>").addClass("list-group-item");
            let row = $("<div>").addClass("row");
            let div1 = $("<div>").addClass("col-2 col-sm-1 border-end d-flex align-items-center");
            let btnPlay = $("<button>").addClass("btn w-100 listPlayNow").attr("id", "list-play-music-" + id);
            btnPlay.append(makeIcon("bi bi-play"));
            div1.append(btnPlay);

            let div2 = $("<div>").addClass("col-8 col-sm d-flex justify-content-start align-items-center").html(music.name);
            let div3 = $("<div>").addClass("col-2 col-sm-1 d-flex align-items-center").html("00:00");

            row.append(div1);
            row.append(div2);
            row.append(div3);

            li.append(row);
            $("#list-play-ul").append(li);
        }
    }

    function selectStreaming(value = "0") {
        $("#select-quality").val(value);
    }

    function setStreaming(qld = "0") {
        localStorageObjectClass.setStreaming(qld);
    }

    function setOneTimeline(id) {
        currentPlayList = [];
        currentPlayList[0] = id;
        save();
    }
    function addOneTimeline(id) {
        if (!currentPlayList.includes(id)) {
            currentPlayList[currentPlayList.length] = id;
            save();
        }
    }
    function setAllTimeline(array = []) {
        currentPlayList = array.join().split(',');
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