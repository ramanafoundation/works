(function(){
    function WorkService(){
        var _works = null,
            _currentWorkIndex = 0,
            _currentWork = null,
            _currentLocale = "es";

        /**
         * Gets all works available.
         * @returns an array of objects that describes all available works on the site.
         */
        this.getAllWorksInfo = async () => { 
            if (_works != null)
                return _works;

            _works = await $.ajax({
                    url: "works/index.json",
                    cache : false
                });

            return _works;
        };

        this.getCurrentLocale = function() {
            if (_currentLocale == null)
                _currentLocale = navigator.language.split("-")[0];
            
            return _currentLocale;
        }

        this.getCurrentWork = async () => {
            if (_currentWork != null)
                return _currentWork;

            var worksInfo = await this.getAllWorksInfo();
            if (worksInfo == null || worksInfo.works.length == 0)
                throw new Error("Could not retrieve works");

            var workInfo = worksInfo.works[_currentWorkIndex],
                currentWorkInTamil = await this.getTamilWorkByFolder(workInfo.folder),
                currentTranslation = await this.getTranslation(workInfo.folder);

            _currentWork = {
                info : workInfo,
                tamil : currentWorkInTamil,
                translation : currentTranslation,
                selectedParagraph : currentTranslation.paragraphs[0]
            };

            for (var i = 0; i < currentWorkInTamil.paragraphs.length; i ++) {
                currentTranslation.paragraphs[i].tamil = currentWorkInTamil.paragraphs[i];
            }

            window.dictionaryService.useParagraphDictionary(_currentWork, _currentWork.selectedParagraph);

            return _currentWork;
        };

        /**
         * Gets the single translation file for the specified work.
         * @param {*} folder the current work folder.  
         * @returns the language dictionary .json file.
         */
        this.getTranslation = async (folder) => {
            var locale = this.getCurrentLocale();

            return await $.ajax({
                url: `works/${ folder}/${ locale }.json`,
                cache : false
            });
        }

        /**
         * Returns all the paragraphs of a given work in tamil.
         */
        this.getTamilWorkByFolder = async (folder) => { 
            return await $.ajax({
                url: "works/" + folder + "/tamil.json",
                cache : false
            });
        };

        this.setSelectedParagraph = async (paragraph) => {
            var currentWork = await this.getCurrentWork();
            currentWork.selectedParagraph = paragraph;
            
            $("body").trigger("paragraphSelected");
        };
    }

    window.workService = new WorkService();
})();