import { theme } from "../theme.js";
import { defaultConfigs } from "../defaultConfigs.js";

let defaultConfigsClass;
let themeClass;

export function about() {

    function init() {
        defaultConfigsClass = defaultConfigs();
        defaultConfigsClass.init();
        themeClass =  theme();
    }

    return {
        init
    }

}
