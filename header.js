$(function(){
    jQuery.fn.header = function(options){
        var that = $(this),
            work = window.currentWork,
            selectedParagraph = window.currentWork.selectedParagraph;

        that.each(function(){
            var array = work.tamil.paragraphs,
                select = that.find("select"),
                title = that.find(".work-title"),
                translatedTitle = that.find(".work-translated-title");
            select.html("");

            title.text(work.name);
            translatedTitle.text(window.dictionaryService.getTranslatedTitle());

            for ( var i = 0; i < array.length; i ++) {
                var current = array[i],
                    option = $("<option></option>").appendTo(select),
                    typeText = window.dictionaryService.translate(current.type);
                option.text(typeText + " - " + current.number);
                option.data("value", current);

                if (selectedParagraph != null && 
                    current.number == selectedParagraph.number &&
                    current.type == selectedParagraph.type) {
                    option.attr("selected", "selected");     
                }
            }

            select.change(() => {
                var selected = select.find("option:selected").data("value");
                that.trigger("paragraphSelected", selected);
            });
        });
    };
});