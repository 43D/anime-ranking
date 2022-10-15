import { events } from "./events.js";

let eventsClass;

export function display() {
    function init(config = {}) {
        eventsClass = (config.events) ? config.events : events();
        eventsClass.init({ 'display': this });
        eventsClass.start();
    }


    function exibirImport() {
        $("#divOptions").addClass("d-none");
        $("#divImport").removeClass("d-none");
    }

    function exibirList() {
        $("#divImport").addClass("d-none");
        $("#divList").removeClass("d-none");
    }

    return {
        init,
        exibirImport
    }
}