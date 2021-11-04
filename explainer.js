$(function(){
    jQuery.fn.explainer = function(options){
        if (options.word == null)
            throw new Error("word cannot be null");

        var that = $(this),
            word = options.word,
            entry = window.dictionaryService.getEntry(word),
            explanationContainer = $(".explanation");

        if (entry == undefined) {
            _clearExplanation();
        } else {
            _explain();
        }
        
        function _explain() {
            explanationContainer.show();

            _explainDefinition();
            _explainSynonyms();
            _explainTamil();
            _explainSanskrit();
            _explainUrls();
            _explainVideos();
        }

        function _explainVideos() {
            var element = that.find(".explainer-videos"),
                content = element.find(".explainer-content"),
                array = entry.videos;

            _initializeSection(element, "videos");
            if (_shouldHide(element, array == null || array.length == 0))
                return;
            
            if (array.length > 0){
                var ul = $("<ul></ul>").appendTo(content);
                for (var i = 0; i < array.length; i ++) {
                    var current = array[i];

                    var li = $("<li></li>").appendTo(ul);
                    $('<iframe width="200px" height="150px" src="' + current.url + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
                        .appendTo(li);
                }
            }
        }

        function _explainDefinition() {
            var element = that.find(".explainer-definition");
            _initializeSection(element, entry.word, entry.definition);
        }

        function _explainTamil() {
            var element = that.find(".explainer-tamil");
            if (_shouldHide(element, entry.tamil == null))
                return;

            _initializeSection(element, "tamil", entry.tamil);
        }

        function _explainSanskrit() {
            var element = that.find(".explainer-sanskrit");
            if (_shouldHide(element, entry.sanskrit == null))
                return;

            _initializeSection(element, "sanskrit", entry.sanskrit);
        }

        function _explainSynonyms() {
            var element = that.find(".explainer-synonyms"),
                content = element.find(".explainer-content"),
                array = entry.synonyms;

            _initializeSection(element, "synonym");
            if (_shouldHide(element, entry.synonyms == null))
                return;
            
            if (array.length > 0){
                var ul = $("<ul></ul>").appendTo(content);
                for (var i = 0; i < array.length; i ++) {
                    $("<li>" + array[i] + "</li>").appendTo(ul);
                }
            }
        }

        function _explainUrls() {
            var element = that.find(".explainer-urls"),
                content = element.find(".explainer-content");

            _initializeSection(element, "urls");
            if (_shouldHide(element, entry.urls == null))
                return;
            
            if (entry.urls.length > 0){
                var ul = $("<ul></ul>").appendTo(content);
                for (var i = 0; i < entry.urls.length; i ++) {
                    var li = $("<li></li>").appendTo(ul),
                        url = entry.urls[i],
                        a = $("<a></a>").appendTo(li);

                    a.attr("href", url.url);
                    a.text(url.title);
                    a.attr("target", "blank");
                }
            }
        }

        function _clearExplanation(){
            explanationContainer.hide();
        }

        function _initializeSection(element, title, content){
            if (element == null)
                return;
            if (content == null)
                content = "";

            title = window.dictionaryService.translate(title);
            element.find(".explainer-content").html(content);
            element.find(".explainer-title").html(title);
        }

        function _shouldHide(element, hide){
            if (element == null)
                return true;

            if (hide) {
                element.hide();
            }
            else {
                element.show();
            }

            return hide;
        }
        
    };
});