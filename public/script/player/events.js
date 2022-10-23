import { display } from "./display.js";
import { player } from "./player.js";

let displayClass;
let playerClass;

export function events() {
    function init(config = {}) {
        displayClass = (config.display) ? config.display : display();
        playerClass = (config.player) ? config.player : player();
    }

    function start() {
        createButtonAction();
        muteActionMod();
        createButtonCollapse();
        btnPlaylist();
        playlist();
    }

    function muteActionMod() {
        $('#volume-mute').click(function (e) {
            e.stopPropagation();
        });
    }

    function createButtonCollapse() {
        buttonCollapse("btn-video-collapse", "display-video", "collapseVideo");
        buttonCollapse("btn-list-collapse", "display-list", "list-collapse");
    }

    function createButtonAction() {
        buttonAction("music-name", "display-music-name");
        buttonAction("music-anime", "display-music-anime");
        buttonAction("music-season", "display-music-season");
        buttonAction("playlist", "display-playlist");
        buttonAction("btn-search", "display-search");
        buttonAction("btn-json-fast", "display-json-fast");
    }

    function buttonAction(btn = "", id = "") {
        $("#" + btn).click(function () {
            $("#musicbarNav").removeClass("show");
            displayClass.displayShowById(id);
        });
    }

    function buttonCollapse(btn = "", idDisplay = "", collapse = "") {
        $("#" + btn).click(function () {
            $("#" + collapse).show();
            displayClass.displayMainShowById(idDisplay);
        });
    }

    function btnPlaylist() {
        $("#new-playlist").click(function () {
            $("#musicbarNav").removeClass("show")
            displayClass.displayShowById("display-new-playlist");
            displayClass.showById("new-playlist-child");
            displayClass.hiddenById("finish-playlist-child");
        });
    }

    function playlist() {
        $("#btnSaveNewPlaylist").click(function () {
            if ($("#newPlaylistName").val() != "") {
                displayClass.hiddenById("new-playlist-child");
                displayClass.showById("finish-playlist-child");
                playerClass.newPlayList($("#newPlaylistName").val());
            }
        });
    }

    return {
        init,
        start
    }
}