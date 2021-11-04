$(function(){
    jQuery.fn.wordify = function(){
        var that = $(this);
        
        that.each(function(){
            var current = $(this),
                text = current.text(),
                words = text.split(" ");
            current.html("");
            for(var i = 0; i < words.length; i ++){
                var word = words[i].trim(), 
                    wordSpan = _createWordSpan(word);
                
                current.append(wordSpan);
                current.append(" ");
            }
        });

        function _createWordSpan(word){
            var wordSpan = $("<span>" + word + "</span>"),
                hasEntry = window.dictionaryService.hasEntry(word);
            wordSpan.addClass("paragraph-word");
            if (hasEntry){
                wordSpan.attr("role", "link");
                wordSpan.addClass("has-explanation")
            }
            return wordSpan;
        }
    };
});