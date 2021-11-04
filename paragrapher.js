$(function(){
    jQuery.fn.paragrapher = function(options){
        var that = $(this);
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