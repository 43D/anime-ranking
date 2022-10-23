import { localStorageObject } from "../localStorageObject.js";

let localStorageClass;

export function getMusicsFromLS() {
    let musics = {};
    let musicsByAnime = {};
    let musicsByName = {};
    let musicsBySeason = {};
    let playlists = {};

    function init(config = {}) {
        localStorageClass = (config.localStorageObject) ? config.localStorageObject : localStorageObject();
        musics = localStorageClass.getMusics();
        musicsByAnime = localStorageClass.getMusicsAnime();
        musicsByName = localStorageClass.getMusicsName();
        musicsBySeason = localStorageClass.getMusicsSeason();
        playlists = localStorageClass.getPlayLists();
        start();
    }

    function start() {
        makeItensMusic("display-music-name", musicsByName, "name");
        makeItensMusic("display-music-anime", musicsByAnime, "anime");
        makeItensMusic("display-music-season", musicsBySeason, "season");
    }

    function makeItensMusic(id, musicsId, typeList) {
        let list = [];
        Object.keys(musicsId).sort().forEach(function (k) {
            let listMusics = [];
            musicsId[k].forEach(function (k) {
                listMusics[listMusics.length] = getNameItem(k);
            });
            listMusics.sort(function (a, b) {
                return compareMusic(a[Object.keys(a)[0]], b[Object.keys(b)[0]]);
            });
            listMusics.forEach(function (k) {
                list[list.length] = makeItem(Object.keys(k)[0], typeList);
            });

            if (typeList == "anime")
                makeList(id, list, musics[musicsId[k][0]].anime.romaji, musics[musicsId[k][0]].anime.english);
            else if (typeList == "season")
                makeList(id, list, musics[musicsId[k][0]].season);
            else
                makeList(id, list, k);

            list = [];
        });

    }

    function getNameItem(idMusic) {
        let json = {};
        json[idMusic] = musics[idMusic].name;
        return json;
    }
    function makeItem(idMusic, typeList) {
        let li = $("<li>").addClass("list-group-item");
        let divRow = makeMenuMusic(idMusic, typeList);
        li.append(divRow);

        let div = makeTableMusicList("music-" + typeList + idMusic, idMusic);
        li.append(div);

        return li;
    }

    function makeIcon(icon) {
        return $('<i>').addClass(icon);
    }

    function makeMenuMusic(idMusic, typeList) {
        let divRow = $("<div>").addClass("row");
        const music = musics[idMusic];

        let div1 = $("<div>").addClass("col-2 col-sm-1 border-end  d-flex align-items-center");
        let btn = $('<button>').addClass("btn w-100 playNow").attr("id", typeList + "-music-" + idMusic);
        btn.append(makeIcon("bi bi-play"));
        div1.append(btn);
        divRow.append(div1);

        let div2 = $("<div>").addClass("col-10 col-sm d-flex justify-content-start align-items-center").attr("data-bs-toggle", "collapse").attr("data-bs-target", "#music-" + typeList + idMusic);
        let name = $("<span>").text(music.name);
        div2.append(name);
        divRow.append(div2);

        let div3 = $("<div>").addClass("col-10 col-sm-2 col-lg-1 d-flex align-items-center").attr("data-bs-toggle", "collapse").attr("data-bs-target", "#music-" + typeList + idMusic);
        let time = $("<span>").text("00:00");
        div3.append(time);
        divRow.append(div3);

        let div4 = $("<div>").addClass("col-2 col-sm-1 d-flex align-items-center justify-content-end border-start");
        let btnMenu = $('<button>').addClass("btn").attr("data-bs-toggle", "dropdown").attr("aria-expanded", "false");
        btnMenu.append(makeIcon("bi bi-three-dots"));
        div4.append(btnMenu);
        div4.append(makeOptionMusicList(idMusic, typeList));
        divRow.append(div4);

        return divRow;
    }

    function makeOptionMusicList(idMusic, typeList) {
        let ul = $("<ul>").addClass("dropdown-menu").attr("style", "z-index: 1035;");
        ul.append(makeLiDropdown("addMusic", "bi bi-plus-lg", "Adicionar na fila", typeList + "-add-music-" + idMusic));
        ul.append(makeLiDropdown("playlistAdd", "bi bi-journal-plus", "Adicionar a uma PlayList", typeList + "-playlist-music-" + idMusic));
        ul.append(makeLiDropdown("", "bi bi-collection", "Exibir Lista").attr("data-bs-toggle", "collapse").attr("data-bs-target", "#music-" + typeList + idMusic));
        ul.append(makeLiDropdown("downloadMusic", "bi bi-box-arrow-down", "JSON", typeList + "-down-music-" + idMusic));
        ul.append(makeLiDropdown("removeMusic", "bi bi-x-lg", "Remover", typeList + "-remove-music-" + idMusic));

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

    function makeTableMusicList(id, idMusic) {
        const music = musics[idMusic];

        let div = $("<div>").addClass("collapse").attr("id", id);
        let table = $("<table>").addClass("table table-striped table-hover");
        let tbody = $("<tbody>");

        let tr1 = makeTr();
        let th1 = makeTh("Música");
        let td1 = makeTd(music.name);
        let th2 = makeTh("Artista");
        let td2 = makeTd(music.artist);
        tr1.append(th1);
        tr1.append(td1);
        tr1.append(th2);
        tr1.append(td2);
        tbody.append(tr1);

        let tr2 = makeTr();
        let th3 = makeTh("Tipo");
        let td3 = makeTd(music.type);
        let th4 = makeTh("Temporada");
        let td4 = makeTd(music.season);
        tr2.append(th3);
        tr2.append(td3);
        tr2.append(th4);
        tr2.append(td4);
        tbody.append(tr2);

        let tr3 = makeTr();
        let th5 = makeTh("Anime");
        let td5 = makeTd(music.anime.romaji);
        let td6 = makeTd(music.anime.english).attr("colspan", "2");
        tr3.append(th5);
        tr3.append(td5);
        tr3.append(td6);
        tbody.append(tr3);

        let tr4 = makeTr();
        let th6 = makeTh("Links");
        let link = $("<a>").attr("href", "https://myanimelist.net/anime/" + music.malID).attr("target", "_blank").html("MyAnimeList");
        let td7 = makeTdObj(link);
        tr4.append(th6);
        tr4.append(td7);
        tbody.append(tr4);

        table.append(tbody);
        div.append(table);
        return div;

    }

    function makeTr() {
        return $("<tr>");
    }
    function makeTh(value) {
        return $("<th>").html(value);
    }
    function makeTd(value) {
        return $("<td>").text(value);
    }
    function makeTdObj(obj) {
        return $("<td>").append(obj);
    }

    function makeList(id, li = [$("<li>")], title, subTitle = "") {
        let mainDiv = $("<div>");
        let h4 = $("<h4>").addClass("mt-4 ms-3").html(title);
        let h6 = $("<h6>").addClass("mb-2 ms-3").html(subTitle);
        mainDiv.append(h4);
        if (subTitle != "")
            mainDiv.append(h6);

        let ul = $("<ul>").addClass("list-group");
        for (let i = 0; i < li.length; i++)
            ul.append(li[i]);
        mainDiv.append(ul);

        $("#" + id).append(mainDiv);
    }

    function compareMusic(a, b) {
        a = a.toUpperCase();
        b = b.toUpperCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    return {
        init
    }
}


        // getMusics,
// getPlayLists,
// getCurrentPlayList,
// getTheme,
// getLanguage,
// getConfig,
// getMusicsAnime,
// getMusicsName,
// getMusicsSeason,