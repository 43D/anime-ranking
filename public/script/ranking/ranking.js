import { form } from "./form.js";
import { musicChoose } from "./musicChoose.js";
import { media } from "./media.js";
import { events } from "./events.js";
import { display } from "./display.js";
import { jsonManipulator } from "../jsonManipulator.js";
import { theme } from "../theme.js";
import { defaultConfigs } from "../defaultConfigs.js";

let defaultConfigsClass;
let themeClass;
let jsonManClass;
let formClass;
let musicChooseClass;
let eventsClass;
let mediaClass;
let displayClass;

export function ranking() {
    displayClass = display();
    formClass = form();
    eventsClass = events();
    mediaClass = media();
    musicChooseClass = musicChoose();
    jsonManClass = jsonManipulator();
    themeClass = theme();

    function init() {
        defaultConfigsClass = defaultConfigs();
        defaultConfigsClass.init();
        displayClass.init({formClass});
        formClass.init({jsonManClass});
        eventsClass.init({displayClass, formClass, musicChooseClass});
        musicChooseClass.init({mediaClass});
        
        eventsStart();
        mediaClass.defaultVolume();
    }
  
    function eventsStart() {
        eventsClass.startEvent();
    }

    return {
        init
    }
}


















