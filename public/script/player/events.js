import { display } from "./display.js";

let displayClass;

export function events() {
    function init(config = {}) {
        displayClass = (config.display) ? config.display : display();
    }

    function start() {
        createButtonAction();
    }

    function createButtonAction() {
        buttonAction("music-name", "display-music-name");
        buttonAction("music-anime", "display-music-anime");
        buttonAction("music-season", "display-music-season");
        buttonAction("playlist", "display-playlist");
        buttonAction("new-playlist", "display-new-playlist");
        buttonAction("btn-search", "display-search");
    }

    function buttonAction(btn = "", id = "") {
        $("#" + btn).click(function () {
            displayClass.displayShowById(id);
        });
    }

    return {
        init,
        start
    }
}