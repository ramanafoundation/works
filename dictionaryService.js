(function(){
    function DictionaryService(){
        var _paragraphDictionary = null;

        this.getEntry = function(word){ 
            var cleanWord = _cleanWord(word),
                entry = null,
                dictionary = $.extend({}, window.currentLocale.dictionary, _paragraphDictionary);
            
            entry = dictionary[cleanWord];
            if (entry != null)
                entry.word = cleanWord;
            return entry;
        };

        this.hasEntry = function(word){
            return this.getEntry(word) != null;
        };

        this.useParagraphDictionary = function(dictionary){
            _paragraphDictionary = dictionary;
        };

        this.translate = function (word) {
            var entry = this.getEntry(word);
            if (entry == null)
                return word;

            if (entry.translation != null)
                return entry.translation;

            return word;
        }

        this.getTranslatedTitle = function() {
            return window.currentLocale.dictionary.title;
        }

        function _cleanWord(word) {
            if (word == null)
                return "";
            
            return word
                .toLowerCase()
                .trim()  
                .replace(".", "")
                .replace(",", "")
                .replace("?", "")
                .replace("“", "")
                .replace("”", "");
        }
    }

    window.dictionaryService = new DictionaryService();
})();