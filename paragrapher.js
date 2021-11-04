$(function(){
    jQuery.fn.paragrapher = function(options){
        var that = $(this),
            titleTranslation = window.dictionaryService.translate("show definitions");

        _setUpHideDefinitions();

        function _setUpHideDefinitions() {
            $(".form-check input[type=checkbox]").unbind();
            $(".form-check input[type=checkbox]").change((ev) => {
                var checked = $(ev.currentTarget).prop("checked"),
                    container = $(".paragraph-container");
    
                if (!checked) { 
                    container.removeClass("paragraph-definitions-enabled");
                    $(".explanation").hide();
                } else {
                    container.addClass("paragraph-definitions-enabled");
                }
            });
            $(".form-check label").text(titleTranslation);
        }

        that.each(function(){
            window.dictionaryService.useParagraphDictionary(options.dictionary);
            
            that.find(".paragraph-title").text(options.title);
            that.find(".paragraph-content").text(options.text);
            that.find(".paragraph-content").wordify();

            that.find(".paragraph-word.has-explanation").click(function(){
                var currentWord = $(this);
                $(".explanation").explainer({
                    word : currentWord.text()
                });
            });
        });
    };
});