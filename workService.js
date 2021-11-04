(function(){
    function WorkService(){
        this.getWorks = async () => { 
            return new Promise((resolve) => {
                $.ajax({
                    url: "works/index.json",
                    cache : false
                }).done(function(results) {
                    resolve(results);
                });
            });
        };

        this.getWorkByFolder = async (folder) => { 
            return new Promise((resolve) => {
                $.ajax({
                    url: "works/" + folder + "/tamil.json",
                    cache : false
                }).done(function(results) {
                    resolve(results);
                });
            });
        };

        this.getTranslationForParagraph = async (folder, type, number) => {
            return new Promise((resolve) => {
                $.ajax({
                    url: "works/" + folder + "/" + window.currentLocale.locale + "/" + type + "-" + number + ".json",
                    cache : false
                }).done(function(results) {
                    resolve(results);
                });
            });
        };

        this.getDictionary = async (folder, locale) => {
            return new Promise((resolve) => {
                $.ajax({
                    url: "works/" + folder + "/" + locale + "/dictionary.json",
                    cache : false
                }).done(function(results) {
                    resolve(results);
                });
            });
        };
    }

    window.workService = new WorkService();
})();