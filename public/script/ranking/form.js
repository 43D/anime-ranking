import { jsonManipulator } from "../jsonManipulator.js";
import { display } from "./display.js";

let jsonManClass;
let displayClass;

export function form() {
    let musicFinalList = undefined;

    function init(config = {}) {
        jsonManClass = (config.jsonManipulator) ? config.jsonManipulator() : jsonManipulator();
        displayClass = (config.display) ? config.display() : display();
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
        if (file.type == 'application/json') {
            if (file) {
                let b = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = res => {
                        let resultado = res.target.result;
                        resolve(resultado);
                    };
                }).then(resultado =>  {
                    return JSON.parse(resultado);
                    
                });
                return b;
            }
        }
    }

    return {
        getAMQ,
        getData
    }
}
