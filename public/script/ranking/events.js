import { display } from "./display.js";
import { form } from "./form.js";
import { musicChoose } from "./musicChoose.js";

let displayClass;
let formClass;
let musicChooseClass;

export function events() {
    function init(config = {}) {
        displayClass = (config.display) ? config.display : display();
        formClass = (config.form) ? config.form : form();
        musicChooseClass = (config.musicChoose) ? config.musicChoose : musicChoose();
    }

    function startEvent() {
        changeOption();
        BtnConfirmForm();
        BtnClean();
        selectDivs();
        BtnNextMusic();

        BtnStart();
    }


    function BtnStart() {
        const btn = $("#btnStart");

        btn.click(function () {
            displayClass.config();
        });
        displayClass.removeDisable(btn);
    }

    function changeOption() {
        $('#options').on('change', function () {
            displayClass.displayOption();
        });
    }
    //-------------- form

    function BtnConfirmForm() {
        $("#btnConfirmForm").click(async function () {
            const data = await formClass.generatorList();
            if (data != undefined) {
                musicChooseClass.init();
                musicChooseClass.setList(data);
                musicChooseClass.createScore();
                musicChooseClass.countRodada();
                musicChooseClass.setVideoQuality();
                displayClass.displayChoose();
                musicChooseClass.initFistRound();
            } else
                console.log("No list");
        });
    }

    function BtnClean() {
        const btn = $("#btnClean");

        btn.click(function () {
            console.log("clear");
        });
    }


    // video 
    function BtnNextMusic() {
        $("#btnNextMusic").click(function () {
            displayClass.chooseOne();
        });
    }

    function selectDivs() {
        $("#dRanking1").click(function () {
            $("#dRanking2").removeClass("border-success");
            $("#dRanking1").addClass("border-success");
            displayClass.setSelectedDiv("dRanking1");
        });
        $("#dRanking2").click(function (e) {
            $("#dRanking1").removeClass("border-success");
            $("#dRanking2").addClass("border-success");
            displayClass.setSelectedDiv("dRanking2");
        });
    }
    return {
        init,
        startEvent
    }








    $('#radio input[type="radio"]').click(function () {
        rodadaFinal = $(this).val();
    });
}