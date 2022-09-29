import { display } from "./display.js";
import { importJson } from "./importJson.js";

let displayClass;
let importJsonClass;

export function eventos() {

    function init(config = {}) {
        displayClass = (config.display) ? config.display() : display();
        importJsonClass = (config.importJson) ? config.importJson : importJson();
    }

    function start() {
        btnImport();
        btnConfirm();
    }

    function btnImport() {
        $("#btnImport").click(function () {
            displayClass.exibirImport();
        });
    }

    function btnConfirm() {
        $("#btnConfirmForm").click(function () {
            importJsonClass.confirmar();
        });
    }

    return {
        init, start
    }

}