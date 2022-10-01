export function localStorageObject() {
    const musics = "musics";
    const playlists = "playlists";
    const fastPlayer = "fastPlayer";
    const theme = "theme";
    const language = "language";

    function getLocalStorage(key) {
        return getJson(localStorage.getItem(key));
    }

    function setLocalStorage(key, value) {
        localStorage.setItem(key, getString(value));
    }

    function getString(value) {
        return JSON.stringify(value);
    }

    function getJson(value) {
        return JSON.parse(value);
    }

    function getMusics() {
        return getLocalStorage(musics);
    }
    function getPlayLists() {
        return getLocalStorage(playlists);
    }

    function getFastPlayer() {
        return getLocalStorage(fastPlayer);
    }
    function getTheme() {
        return getLocalStorage(theme);
    }
    function getLanguage() {
        return getLocalStorage(language);
    }
    function setMusics(json) {
        return setLocalStorage(musics, json);
    }
    function setPlayLists(json) {
        return setLocalStorage(playlists, json);
    }

    function setFastPlayer(json) {
        return setLocalStorage(fastPlayer, json);
    }
    function setTheme(json) {
        return setLocalStorage(theme, json);
    }
    function setLanguage(json) {
        return setLocalStorage(language, json);
    }

    return {
        getMusics,
        getPlayLists,
        getFastPlayer,
        getTheme,
        getLanguage,
        setMusics,
        setPlayLists,
        setFastPlayer,
        setTheme,
        setLanguage
    }

}

