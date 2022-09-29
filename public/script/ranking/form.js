import { jsonManipulator } from "../jsonManipulator.js";
import { fileReader } from "../fileReader.js";
import { display } from "./display.js";

let jsonManClass;
let displayClass;
let fileReaderClass;

export function form() {
    let musicFinalList = undefined;

    function init(config = {}) {
        jsonManClass = (config.jsonManipulator) ? config.jsonManipulator() : jsonManipulator();
        displayClass = (config.display) ? config.display() : display();
        fileReaderClass = (config.fileReader) ? config.fileReader() : fileReader();
    }

    async function generatorList() {

        switch (getValueOfOption()) {
            case "1":
                return false;
            case "2":
                return false;
            case "3":
                const amq = getJsonAMQ();
                musicFinalList = await amq.getAMQ();
                return musicFinalList;
            default:
                return undefined;
        }
    }

    function getValueOfOption() {
        return $('#options').find(":selected").val();
    }

    function getList() {
        console.log(musicFinalList);
        return musicFinalList;
    }

    return {
        init,
        generatorList,
        getValueOfOption,
        getList
    }
}

function getJsonAMQ() {
    let data;

    async function getAMQ() {
        try {
            data = await getJsonLink();

        } catch (e) {
            try {
                data = await getFileJson();
            } catch (e) {
                return undefined;
            }
        }
        return data;
    }

    async function getJsonLink() {
        return await jsonManClass.getJs($("#urlJson").val());
    }

    async function getData() {
        return data;
    }

    async function getFileJson() {
        const file = $('#fileJson').prop('files')[0];
        await fileReaderClass.getFileJson(file);
        return fileReaderClass.getJson();
    }

    return {
        getAMQ,
        getData
    }
}
