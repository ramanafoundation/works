$(function(){
    jQuery.fn.toolbar = function(){
        var that = $(this);
        that.each(function(){
            function _renderWorks(array) {
                that.html("");
                for ( var i = 0; i < array.length; i ++) {
                    var current = array[i];

                    var li = $("<li></li>").appendTo(that);
                    li.addClass("nav-item");
                    li.data("work", current);

                    var a = $("<a></a>").appendTo(li);
                    a.text(current.name);
                    a.attr("href", "#");
                    a.addClass("nav-link");
                    a.data("work", current);
                    a.click((ev) => {
                        var selectedWork = $(ev.currentTarget).data("work");
                        that.trigger("workSelected", [selectedWork]);
                    });
                }
                that.trigger("workSelected", [array[0]]);
            }

            function _renderLanguages(array) {
                var languageSelect = $(".language-selection"),
                    selectedLanguageIndex = -1,
                    browserLanguage = navigator.language.split("-")[0];
                languageSelect.html("");

                for ( var i = 0; i < array.length; i ++) {
                    var current = array[i],
                        option = $("<option></option>").appendTo(languageSelect);
                        
                    if (browserLanguage.toLowerCase() == current.locale.toLowerCase()){
                        option.attr("selected", "selected");
                        selectedLanguageIndex = i;
                    }

                    option.data("value", current);
                    option.text(current.name);
                }

                languageSelect.change((ev)=>{
                    var selected = languageSelect.find("option:selected").data("value");
                    _triggerOnLanguageChanged(selected);
                });
                _triggerOnLanguageChanged(array[selectedLanguageIndex]);
            }

            function _triggerOnLanguageChanged(language){
                $("body").trigger("languageChanged", language);
            }

            window.workService.getWorks().then((data) => {
                _renderLanguages(data.locales);
                _renderWorks(data.works);
            });
        });
    };
});