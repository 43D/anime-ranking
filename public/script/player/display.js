import { events } from "./events.js";

let eventsClass;

export function display() {
    function init(config = {}) {
        eventsClass = (config.events) ? config.events : events();
        eventsClass.init({ 'display': this });
        eventsClass.start();
    }

    function displayHiddenAll(){
        $(".tela").addClass("d-none");
    }

    function displayShowById(id = "") {
        displayHiddenAll();
        $("#"+ id).removeClass("d-none");
    }

    return {
        init,
        displayShowById
    }
}