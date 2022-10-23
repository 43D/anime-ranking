import { localStorageObject } from "../localStorageObject.js";

let localStorageClass;

export function playlistManager() {

    let musics = {};
    let playlist = {};

    function init(config = {}) {
        localStorageClass = (config.localStorageObject) ? config.localStorageObject : localStorageObject();
        musics = localStorageClass.getMusics();
        playlist = localStorageClass.getPlayLists();
        start();
    }

    function newPlaylist(name) {
        console.log(name)
    }

    function start() {
        const keys = Object.keys(playlist);

        if (keys.length == 0)
            addWarning("display-playlist");
        else
            keys.sort().forEach(function (k) {
                let listMusics = [];
                playlist[k][0].musics.forEach(function (j) {
                    listMusics[listMusics.length] = getNameItem(j);
                });
                listMusics.sort(function (a, b) {
                    return compareMusic(a[Object.keys(a)[0]], b[Object.keys(b)[0]]);
                });
                makeList(playlist[k][0], listMusics);
            });

    }

    function addWarning(id) {
        const h4 = $("<h4>").addClass("text-center mt-4").html("Não a nada aqui, acesse Import");
        $("#" + id).append(h4);
    }

    function getNameItem(key) {
        let json = {};
        json[key] = musics[key].name;
        return json;
    }

    function compareMusic(a, b) {
        a = a.toUpperCase();
        b = b.toUpperCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    function  makeList(playlist, listMusics){
        const display = $("#display-playlist");

        let mainDiv = $("<div>");





        display.append(mainDiv);
    }

    return {
        init,
        newPlaylist
    }
}