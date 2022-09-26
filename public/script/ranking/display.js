import { form } from "./form.js";
import { media } from "./media.js";
import { musicChoose } from "./musicChoose.js";
let formClass;
let mediaClass;
let musicChooseClass;

let selectedDiv = "dRanking1";
let round = 1;

export function display() {

    function init(config = {}) {
        formClass = (config.form) ? config.form() : form();
        mediaClass = (config.media) ? config.media() : media();
        musicChooseClass = (config.musicChoose) ? config.musicChoose() : musicChoose();
    }

    function removeDisable(id) {
        id.prop("disabled", false);
    }

    function diplayNone() {
        $(".display").addClass("d-none");
    }

    function diplayOptionNone() {
        $(".dOP").addClass("d-none");
    }

    function displayOption() {
        const selected_option_value = formClass.getValueOfOption();

        diplayOptionNone();
        $("#dOp" + selected_option_value).removeClass("d-none");
    }


    function config() {
        diplayNone();
        $("#dConfig").removeClass("d-none");
        displayOption();
    }

    function displayChoose() {
        diplayNone();
        $("#dRanking1").removeClass("d-none");
        $("#dRanking2").removeClass("d-none");
        $("#dRankingBtn").removeClass("d-none");
        $("#titulo").html("Escolha o melhor entre os dois!!");
    }

    function displayList(id_div, data, id_list) {
        mediaClass.pause();
        $("#name" + id_div).html(data[id_list].anime.english);
        $("#romaji" + id_div).html(data[id_list].anime.romaji);
        $("#type" + id_div).html(data[id_list].type);
        $("#song" + id_div).html(data[id_list].name);
        $("#author" + id_div).html(data[id_list].artist);
        $("#mal" + id_div).attr("href", "https://myanimelist.net/anime/" + data[id_list].siteIds.malId);

        musicChooseClass.setMusicInSelected(id_div - 1, id_list);

        const videoQuality = musicChooseClass.getVideoQuality();

        if (videoQuality == "0") {
            $("#audio" + id_div).attr("src", data[id_list].urls.catbox[0]);
            sourceAMQAudio(id_div);
        } else
            if (data[id_list].urls.catbox[videoQuality] != undefined) {
                $("#video" + id_div).attr("src", data[id_list].urls.catbox[videoQuality]);
                sourceAMQVideo(id_div);
            } else {
                $("#audio" + id_div).attr("src", data[id_list].urls.catbox[0]);
                sourceAMQAudio(id_div);
            }
    }

    function sourceAMQVideo(id_div) {
        $("#vi" + id_div).removeClass("d-none");
        $("#au" + id_div).addClass("d-none");

    }

    function sourceAMQAudio(id_div) {
        $("#vi" + id_div).addClass("d-none");
        $("#au" + id_div).removeClass("d-none");
    }

    function displayResult() {
        diplayNone();
        $("#dResultado").removeClass("d-none");
    }

    function chooseOne() {
        if (selectedDiv == "dRanking1") {
            musicChooseClass.setScore(0, 1);
            next(2);
        } else {
            musicChooseClass.setScore(1, 0);
            next(1);
        }
    }

    function next(id) {
        musicChooseClass.incrementIndexOrdem();
        if (musicChooseClass.getIndexOrdem() == musicChooseClass.getList().length)
            reordem();
        else
            musicChooseClass.displayNextMusic(id);
    }

    function reordem() {
        round += 1;
        if (round > musicChooseClass.getRoundCount()) {
            musicChooseClass.finalRound();
        } else {
            musicChooseClass.setIndexOrdem(1);
            musicChooseClass.nextRound();
            $("#titulo").html("Rodada " + round + "!!!!!!!");
            $("#rodadaAtual").html(round);

        }

    }

    function displayTable() {
        $("#titulo").html("Resultado Final");
        const ordem = musicChooseClass.getOrdem();
        const data = musicChooseClass.getList();

        for (let i = 0; i < ordem.length; i++) {
            let obj = data[(ordem[i])];
            inserirTBody(obj, i + 1);
        }
    }

    function inserirTBody(obj, pos) {
        var row = $('<tr>').addClass('rows');

        var td1 = $('<td>').html(pos);
        var td2 = $('<td>').html(obj.name);
        var td3 = $('<td>').html(obj.anime.english);
        var td4 = $('<td>');
        var link1 = $('<a>').attr("href", obj.urls.catbox[0]).attr("target", "_blank").html("Audio");
        td4.append(link1);
        var td5 = $('<td>');

        if (obj.urls.catbox[480] != undefined)
            var link2 = $('<a>').attr("href", obj.urls.catbox[480]).attr("target", "_blank").html("Vídeo 720p");
        else if (obj.urls.catbox[720] != undefined)
            var link2 = $('<a>').attr("href", obj.urls.catbox[720]).attr("target", "_blank").html("Vídeo 480p");
        else
            var link2 = $('<span>').html("Vídeo??");
        td5.append(link2);
        var td6 = $('<td>');
        var link3 = $('<a>').attr("href", "https:myanimelist.net/anime/" + obj.siteIds.malId).attr("target", "_blank").html("MAL");
        td6.append(link3);
        row.append(td1);
        row.append(td2);
        row.append(td3);
        row.append(td4);
        row.append(td5);
        row.append(td6);
        $("#tbody").append(row);
    }

    function getSelectedDiv() {
        return selectedDiv;
    }
    function setSelectedDiv(text) {
        selectedDiv = text;
    }

    function getround() {
        return $('#radio input[type="radio"]:checked').val();
    }

    function getVideoQuality() {
        return $("#QVnOptions option:selected").val();
    }

    function isEmptyValue(el) {
        return !$.trim(el.val())
    }

    return {
        removeDisable,
        config,
        displayChoose,
        displayList,
        displayResult,
        displayTable,
        getSelectedDiv,
        setSelectedDiv,
        getVideoQuality,
        getround,
        chooseOne,
        isEmptyValue,
        init
    }
}