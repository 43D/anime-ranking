import { media } from "./media.js";
import { display } from "./display.js";
let mediaClass;
let displayClass;

let score = new Map();
let videoQuality = 0;
let option;
let ordem = [];
let indexOrdem = 1;
let roundCount;
let musicInSelected = [0, 1];
let musicList = {};

export function musicChoose() {


    function init(config = {}) {
        mediaClass = (config.media) ? config.media : media();
        displayClass = (config.display) ? config.display : display();
    }

    function setOption(optionSelected) {
        option = optionSelected;
    }

    function setList(list) {
        musicList = list;
    }

    function getList() {
        return musicList;
    }

    function getVideoQuality() {
        return videoQuality;
    }

    function setVideoQuality(vq) {
        videoQuality = displayClass.getVideoQuality();
    }

    function incrementIndexOrdem() {
        indexOrdem += 1;
    }

    function setIndexOrdem(num) {
        indexOrdem = num;
    }
    function getIndexOrdem() {
        return indexOrdem;
    }

    function setScore(upID, downID) {
        score.set(musicInSelected[upID], score.get(musicInSelected[upID]) + 1);
        score.set(musicInSelected[downID], score.get(musicInSelected[downID]) - 1);
    }

    function createScore() {
        for (let i = 0; i < musicList.length; i++) {
            score.set(i, 0);
            ordem[i] = i;
        }
    }

    function setMusicInSelected(key, value) {
        musicInSelected[key] = value;
    }

    function initFistRound() {
        displayClass.displayList(1, musicList, 0);
        displayClass.displayList(2, musicList, 1);
    }

    function countRodada() {
        roundCount = parseInt(musicList.length * parseFloat(displayClass.getround()) / 100);
        $("#rodadaFinal").html(roundCount);
    }

    function displayNextMusic(id) {
        displayClass.displayList(id, musicList, ordem[indexOrdem]);
    }

    function nextRound() {
        score = new Map([...score.entries()].sort((a, b) => a[1] - b[1]));
        ordem = Array.from(score.keys());
        displayClass.displayList(1, musicList, ordem[0]);
        displayClass.displayList(2, musicList, ordem[1]);
    }

    function finalRound() {
        score = new Map([...score.entries()].sort((a, b) => b[1] - a[1]));
        ordem = Array.from(score.keys());
        displayClass.displayTable();
        displayClass.displayResult();
    }

    function getOrdem(){
        return ordem;
    }

    function getRoundCount(){
        return roundCount;
    }

    return {
        init,
        getVideoQuality,
        setVideoQuality,
        setOption,
        createScore,
        countRodada,
        initFistRound,
        setList,
        getList,
        setScore,
        setMusicInSelected,
        incrementIndexOrdem,
        getIndexOrdem,
        setIndexOrdem,
        displayNextMusic,
        nextRound,
        finalRound,
        getOrdem,
        getRoundCount
    }
}
