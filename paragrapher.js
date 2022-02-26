$(function(){
    jQuery.fn.paragrapher = async function(options){
        var that = $(this),
            titleTranslation = window.dictionaryService.translate("show definitions"),
            work = await window.workService.getCurrentWork();

        _setUpHideDefinitions();

        function _toggleHideDefinitions() {
            var explanationsAvailable = $(".has-explanation").length > 0;
    
            if (!explanationsAvailable) {
                $(".form-check").hide();
            } else {
                $(".form-check").show();
            }
        }

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
            window.dictionaryService.useParagraphDictionary(work, options);
            
            that.find(".paragraph-title").text(options.title);
            that.find(".paragraph-content").text(options.text);
            that.find(".paragraph-content").wordify();
            _toggleHideDefinitions();

            that.find(".paragraph-word.has-explanation").click(function(){
                var currentWord = $(this);
                $(".explanation").explainer({
                    word : currentWord.text()
                });
            });
        });
    };
});