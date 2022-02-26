$(function(){
    jQuery.fn.header = async function(options){
        var that = $(this),
            work = await window.workService.getCurrentWork(),
            selectedParagraph = work.selectedParagraph;

        that.each(function(){
            var array = work.translation.paragraphs,
                select = that.find("select"),
                title = that.find(".work-title"),
                translatedTitle = that.find(".work-translated-title");
            select.html("");

            title.text(work.info.name);
            translatedTitle.text(work.translation.dictionary.title);

            for ( var i = 0; i < array.length; i ++) {
                var current = array[i],
                    option = $("<option></option>").appendTo(select);

                option.text(current.title);
                option.data("value", current);

                if (selectedParagraph != null && 
                    current.title == selectedParagraph.title) {
                    option.attr("selected", "selected");     
                }
            }

            select.change(() => {
                var selected = select.find("option:selected").data("value");
                window.workService.setSelectedParagraph(selected);
            });
        });
    };
});