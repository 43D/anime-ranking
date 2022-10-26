import { localStorageObject } from "../localStorageObject.js";
import { events } from "./events.js";

let eventsClass;
let localStorageClass;

export function playlistManager() {

    let musics = {};
    let playlist = {};

    function init(config = {}) {
        localStorageClass = (config.localStorageObject) ? config.localStorageObject : localStorageObject();
        eventsClass = (config.events) ? config.events : events();
        musics = localStorageClass.getMusics();
        playlist = localStorageClass.getPlayLists();
        start();
    }

    function newPlayList(name) {
        const play =  { "name": name, musics: [] };
        const keys = Object.keys(playlist);
        let id = (Number(keys[keys.length - 1]) + 1).toString();
        if (id == 'NaN')
            id = "1";
        makeObj(playlist, id, play);
        localStorageClass.setPlayLists(playlist);
        reload();
    }

    
    function makeObj(obj, key, value) {
        if (obj[key]) {
            obj[key][obj[key].length] = value
        } else {
            obj[key] = [value];
        }
    }

    function reload(){
        $("#display-playlist").empty();
        musics = localStorageClass.getMusics();
        playlist = localStorageClass.getPlayLists();
        start();
    }

    function start() {
        const keys = Object.keys(playlist);

        if (keys.length == 0)
            addWarning("display-playlist");
        else{
            keys.sort().forEach(function (k) {
                let listMusics = [];
                let finalList = [];
                playlist[k][0].musics.forEach(function (j) {
                    listMusics[listMusics.length] = getNameItem(j);
                });
                listMusics.sort(function (a, b) {
                    return compareMusic(a[Object.keys(a)[0]], b[Object.keys(b)[0]]);
                });
                Object.keys(listMusics).forEach(function (j) {
                    finalList[finalList.length] = Object.keys(listMusics[j])[0];
                });
                makeList(k, playlist[k][0], finalList);
            });
            eventsClass.btnsPlaylists();
        }
        
    }

    function addWarning(id) {
        const h4 = $("<h4>").addClass("text-center mt-4").html("Não a nada aqui, acesse Import");
        $("#" + id).append(h4);
    }

    function getNameItem(key) {
        let json = {};
        json[key] = musics[key].name;
        return json;
    }

    function makeIcon(icon) {
        return $('<i>').addClass(icon);
    }

    function compareMusic(a, b) {
        a = a.toUpperCase();
        b = b.toUpperCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    function makeList(id, playlist, finalList) {
        const display = $("#display-playlist");

        let mainDiv = $("<div>");
        let ul = $("<ul>").addClass("list-group");
        let li = $("<li>").addClass("list-group-item");
        let row = makeMenu(id, playlist);
        let table = makeTable(id, finalList);
        li.append(row);
        li.append(table);
        ul.append(li);
        mainDiv.append(ul);
        display.append(mainDiv);
    }

    function makeMenu(id, playlist) {
        let divRow = $("<div>").addClass("row");

        let div1 = $("<div>").addClass("col-2 col-sm-1 border-end  d-flex align-items-center");
        let btn = $('<button>').addClass("btn w-100 playlistNow").attr("id", "playlist-id-" + id);
        btn.append(makeIcon("bi bi-play"));
        div1.append(btn);
        divRow.append(div1);

        let div2 = $("<div>").addClass("col-10 col-sm d-flex justify-content-start align-items-center").attr("data-bs-toggle", "collapse").attr("data-bs-target", "#collapse-playlist-" + id);
        let name = $("<span>").text(playlist.name);
        div2.append(name);
        divRow.append(div2);

        let div3 = $("<div>").addClass("col-10 col-sm-3 col-lg-2 d-flex align-items-center").attr("data-bs-toggle", "collapse").attr("data-bs-target", "#collapse-playlist-" + id);
        let qtd = $("<span>").text(playlist.musics.length + " músicas");
        div3.append(qtd);
        divRow.append(div3);

        let div4 = $("<div>").addClass("col-2 col-sm-1 border-start d-flex align-items-center justify-content-end");
        let btnMenu = $('<button>').addClass("btn w-100").attr("data-bs-toggle", "dropdown").attr("aria-expanded", "false");
        btnMenu.append(makeIcon("bi bi-three-dots"));
        div4.append(btnMenu);
        div4.append(makeOptionMusicList(id));
        divRow.append(div4);


        return divRow;
    }

    function makeOptionMusicList(id) {
        let ul = $("<ul>").addClass("dropdown-menu").attr("style", "z-index: 1035;");

        ul.append(makeLiDropdown("", "bi bi-collection", "Exibir músicas").attr("data-bs-toggle", "collapse").attr("data-bs-target", "#collapse-playlist-" + id));
        ul.append(makeLiDropdown("downPlaylist", "bi bi-box-arrow-down", "JSON", "playlist-down-" + id));
        ul.append(makeLiDropdown("editPlaylist", "bi bi-pencil", "Editar", "playlist-edit-" + id));
        ul.append(makeLiDropdown("duplicatePlaylist", "bi bi-clipboard2", "Duplicar", "playlist-duplicate-" + id));
        ul.append(makeLiDropdown("removePlaylist", "bi bi-x-lg", "Remover", "playlist-remove-" + id));
        return ul;
    }

    function makeLiDropdown(classe, icon, title, id = "") {
        let li = $("<li>");
        let a = $("<a>").addClass("dropdown-item " + classe).attr("href", "#").attr("id", id);
        a.append(makeIcon(icon));
        a.html(a.html() + " " + title);

        li.append(a);
        return li;
    }

    function makeTable(id, finalList) {
        let div = $("<div>").addClass("collapse").attr("id", "collapse-playlist-" + id);
        let table = $("<table>").addClass("table table-striped table-hover");
        let tbody = $("<tbody>");

        let i = 1;
        finalList.forEach(function (k) {
            let t = makeRow(i, k);
            tbody.append(t);
            i++;
        });
        table.append(tbody);
        div.append(table);
        return div;
    }

    function makeRow(i, id) {
        let tr = $("<tr>");
        let th = $("<th>").html("#" + i);
        let td1 = $("<td>").html(musics[id].name);
        let td2 = $("<td>").html(musics[id].artist);
        let td3 = $("<td>").html(musics[id].time);
        tr.append(th);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        return tr;
    }

    return {
        init,
        newPlayList,
        reload
    }
}