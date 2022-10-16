import { display } from "./display.js";

let displayClass;

export function events() {
    function init(config = {}) {
        displayClass = (config.display) ? config.display : display();
    }

    function start() {
        createButtonAction();
        muteActionMod();
        createButtonCollapse();
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
        buttonAction("new-playlist", "display-new-playlist");
        buttonAction("btn-search", "display-search");
        buttonAction("btn-json-fast", "display-json-fast");
    }

    function buttonAction(btn = "", id = "") {
        $("#" + btn).click(function () {
            displayClass.displayShowById(id);
        });
    }

    function buttonCollapse(btn = "", idDisplay = "", collapse = "") {
        $("#" + btn).click(function () {
            $("#"+collapse).show();
            displayClass.displayMainShowById(idDisplay);
        });
    }

    return {
        init,
        start
    }
}