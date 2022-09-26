export function media(){

    function pause() {
        $("video")[0].pause();
        $("video")[1].pause();
        $("audio")[0].pause();
        $("audio")[1].pause();
    }

    function defaultVolume() {
        $("video")[0].volume = 0.15;
        $("video")[1].volume = 0.15;
        $("audio")[0].volume = 0.15;
        $("audio")[1].volume = 0.15;
    }

    return {
        pause,
        defaultVolume,
        
    }
}