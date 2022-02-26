$(async function(){
    var toolbar = $(".main-toolbar"),
        main = $("main");

    function _showCarousel() {
        $(".carousel").carousel();
    }

    async function _displayWork() {
        var currentWork = await window.workService.getCurrentWork();
        main.header();
        _setupShowTamilButton();
        _displayParagraph();
    }

    function _displayParaphrase(translatedParagraph){
        $(".paraphrase").paraphraser({
            translatedParagraph : translatedParagraph
        });
    }

    function _displayVideos(translatedParagraph) {
        $(".video-section .videos").videoPlayer({
            translatedParagraph : translatedParagraph
        });
    }

    async function _displayParagraph() {
        var work = await window.workService.getCurrentWork(),
            selectedParagraph = work.selectedParagraph;
        
        _displayTamilParagraph(selectedParagraph.type, selectedParagraph.number);
        _showCarousel();
        _displayParaphrase(selectedParagraph);
        _displayVideos(selectedParagraph);

        $(".paragraph").paragrapher({
            title : selectedParagraph.title,
            text : selectedParagraph.text,
            dictionary : selectedParagraph.dictionary
        });
        
        $(".explanation").hide();
    }

    async function _displayTamilParagraph(type, number) {
        var work = await window.workService.getCurrentWork(),
            text = work.selectedParagraph.tamil.text;

        if (text["padacchēdam"] == null)
            $(".paragraph-tamil-p").hide();
        else
            $(".paragraph-tamil-p").show();

        if (text["anvayam"] == null)
            $(".paragraph-tamil-a").hide();
        else
            $(".paragraph-tamil-a").show();

        $(".paragraph-tamil-p .tamil").text(text["padacchēdam"]);
        $(".paragraph-tamil-a .tamil").text(text["anvayam"]);
    }

    function _setupShowTamilButton() {
        var button = $(".show-tamil-button"),
            showTamilText = window.dictionaryService.translate("Show tamil"),
            hideTamilText = window.dictionaryService.translate("Hide tamil"),
            padacchedamTitle = window.dictionaryService.translate("padacchedam word separation"),
            anvayamTitle = window.dictionaryService.translate("anvayam"),
            section = $(".tamil-section");;

        $(".paragraph-tamil-a-title").text(anvayamTitle);
        $(".paragraph-tamil-p-title").text(padacchedamTitle);

        button.unbind();
        _toggleVisibility();
        
        button.click(() => {
            section.toggleClass("tamil-section-visible");
            _toggleVisibility();
        });

        function _toggleVisibility(){
            if (section.hasClass("tamil-section-visible")){ 
                button.text(hideTamilText);
                section.show();
            }
            else {
                button.text(showTamilText);
                section.hide();
            }
        }
    }

    async function _bindEvents(){
        _displayWork();

        $("body").on("paragraphSelected", async function(){
            _displayParagraph();
        });

        /*
        main.on("paragraphSelected", (ev, data) => {
            _displayParagraph();
        });
        
        toolbar.on("workSelected", (ev, data) => {
            window.currentWork = data;
            window.workService
                .getWorkByFolder(window.currentWork.folder)
                .then((tamilData) => {
                    window.currentWork.tamil = tamilData;
                    _displayWork();
                });
        });

        $("body").on("languageChanged", (ev, data) => {
            window.currentLocale = data;
            _displayWork();
        });    */
    }

    function _initialize(){
        toolbar.toolbar();
    }

    _bindEvents();
    _initialize();
});