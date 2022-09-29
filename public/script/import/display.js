export function display() {
    function init() { }


    function exibirImport() {
        $("#divOptions").addClass("d-none");
        $("#divImport").removeClass("d-none");
    }

    function exibirList() {
        $("#divImport").addClass("d-none");
        $("#divList").removeClass("d-none");
    }

    return {
        init,
        exibirImport,
        exibirList
    }
}