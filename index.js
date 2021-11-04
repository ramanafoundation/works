$(function(){
    var toolbar = $(".main-toolbar"),
        main = $("main");

    $("body").on("languageChanged", (ev, data) => {
        window.currentLocale = data;
        _displayWork();
    });

    toolbar.toolbar();
    toolbar.on("workSelected", (ev, data) => {
        window.currentWork = data;
        window.workService
            .getWorkByFolder(window.currentWork.folder)
            .then((tamilData) => {
                window.currentWork.tamil = tamilData;
                _displayWork();
            });
    });

    main.on("paragraphSelected", (ev, data) => {
        window.currentWork.selectedParagraph = data;
        _displayParagraph();
    });

    function _toggleHideDefinitions() {
        var explanationsAvailable = $(".has-explanation").length > 0;

        if (!explanationsAvailable) {
            $(".form-check").hide();
        } else {
            $(".form-check").show();
        }
    }

    function _showCarousel() {
        $(".carousel").carousel();
    }

    function _displayWork() {
        if (window.currentWork == null)
            return;
        if (window.currentLocale == null)
            return;

        window.workService
            .getDictionary(
                window.currentWork.folder, 
                window.currentLocale.locale)
            .then((data)=>{
                window.currentLocale.dictionary = data;
                main.header();
                _setupShowTamilButton();
            });
        
        _displayParagraph();
    }

    function _displayParaphrase(translatedParagraph){
        $(".paraphrase").paraphraser({
            translatedParagraph : translatedParagraph
        });
    }

    function _displayParagraph() {
        var work = window.currentWork,
            selectedParagraph = window.currentWork.selectedParagraph;

        if (selectedParagraph == null)
            selectedParagraph = window.currentWork.tamil.paragraphs[0];

        window.workService
            .getTranslationForParagraph(
                work.folder, 
                selectedParagraph.type, 
                selectedParagraph.number)
            .then((translatedParagraph)=>{
                _displayTamilParagraph(selectedParagraph.type, selectedParagraph.number);
                _showCarousel();
                _displayParaphrase(translatedParagraph);

                $(".paragraph").paragrapher({
                    title : translatedParagraph.title,
                    text : translatedParagraph.text,
                    dictionary : translatedParagraph.dictionary
                });

                _toggleHideDefinitions();
            });

        $(".explanation").hide();
    }

    function _displayTamilParagraph(type, number) {
        var tamilParagraph = window.currentWork.tamil.paragraphs.filter(
            n => n.type == type && n.number == number
        );
        if (tamilParagraph.length == 0)
            return;

        var text = tamilParagraph[0].text;

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
});