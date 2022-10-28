
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
        setVolume(config["volume"]);
        createList();
    }

    function isPlay() {
        if (!$("#video")[0].paused)
            return true;
        if (!$("#audio")[0].paused)
            return true;
        return false;
    }

    function play() {
        const config = localStorageObjectClass.getConfig();
        const musicId = config["playnow"];
        if (musicId == "-1") {
            firstMusic();
            play();
        } else {
            const music = musicManagerClass.getMusicById(currentPlayList[Number(musicId)]);
            setVolume(config["volume"]);
            $("#name-bar").html(music.name);
            switch (config["streaming"]) {
                case "720":
                    if (music.urls.catbox["720"])
                        playVideo(music.urls.catbox["720"]);
                    else
                        playAudio(music.urls.catbox["0"]);
                    break;
                case "480":
                    if (music.urls.catbox["480"])
                        playVideo(music.urls.catbox["480"]);
                    else
                        playAudio(music.urls.catbox["0"]);
                    break;
                default:
                    playAudio(music.urls.catbox["0"]);
                    break;
            }
        }
    }

    function endPlay() {
        let config = localStorageObjectClass.getConfig();
        console.log(config["playnext"]);
        if (Number(config["playnext"]) > -1) {
            nextMusic();
            play();
        }
    }

    function nextMusic() {
        let config = localStorageObjectClass.getConfig();
        config["playlast"] = config["playnow"];
        config["playnow"] = config["playnext"];
        localStorageObjectClass.setConfig(config);
        createNextPlay();
    }

    function playAudio(url) {
        $("#btn-video-collapse").prop("disabled", true);
        if (!$("#display-video").attr("class").includes("d-none"))
            $("#btn-video-collapse").click();
        cleanMedia();
        $("#audio").attr("src", url);
        $("#audio")[0].play();
    }

    function playVideo(url) {
        $("#btn-video-collapse").prop("disabled", false);
        cleanMedia();
        $("#video").attr("src", url);
        $("#video")[0].play();
        $("#video").prop("controls", false);
    }

    function setVolume(vol) {
        $("#video")[0].volume = vol;
        $("#audio")[0].volume = vol;
        $("#volume").val((Number(vol) * 100));

        let config = localStorageObjectClass.getConfig();
        config["volume"] = vol;
        localStorageObjectClass.setConfig(config);
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
        firstMusic();
        save();
    }
    function addOneTimeline(id) {
        if (!currentPlayList.includes(id)) {
            currentPlayList[currentPlayList.length] = id;
            createNextPlay();
            save();
        }
    }
    function setAllTimeline(array = []) {
        currentPlayList = array.join().split(',');
        firstMusic();
        save();
    }

    function save() {
        localStorageObjectClass.setCurrentPlayList(currentPlayList);
        createList();
    }

    function cleanMedia() {
        $("#video").attr("src", "");
        $("#audio").attr("src", "");
    }

    function firstMusic() {
        let config = localStorageObjectClass.getConfig();
        config["playnow"] = 0;
        config["playnext"] = -1;
        localStorageObjectClass.setConfig(config);
    }
    function createNextPlay() {
        let config = localStorageObjectClass.getConfig();

        const next = Number(config["playnow"]) + 1;
        if (currentPlayList[next])
            config["playnext"] = next;
        else if (config["loop"])
            config["playnext"] = 0;
        else
            config["playnext"] = -1;

        localStorageObjectClass.setConfig(config);
    }

    return {
        init,
        setStreaming,
        setOneTimeline,
        addOneTimeline,
        setAllTimeline,
        setVolume,
        play,
        endPlay
    }
}