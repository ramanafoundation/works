$(function(){
    jQuery.fn.paraphraser = function(options){
        var that = $(this),
            paragraph = options.translatedParagraph,
            paraphrase = paragraph.paraphrase,
            formattedParaphrase = _formatParaphrase(paraphrase);

        that.each(function(){
            if (paraphrase == null)
                that.hide();
            else
                that.show();

            var title = window.dictionaryService.translate("Paraphrase");
            that.find(".paragraph-paraphrase-title").text(title);
            that.find(".paragraph-paraphrase-content").html(formattedParaphrase);
        });

        function _formatParaphrase(text){
            if (text == null)
                return null;
                
            return text
                .replaceAll("[", "<span class='paraphrase-section'>")
                .replaceAll("]", "</span>");
        }
    };
});