$(function(){
    jQuery.fn.videoPlayer = function(options){
        var that = $(this),
            translatedParagraph = options.translatedParagraph,
            videos = translatedParagraph.videos;

        that.each(function(){
            that.html("");

            if (videos == null) {
                $(".video-section").hide();
                return;
            } else {
                $(".video-section").show();
            }

            for (var i = 0; i < videos.length; i ++) {
                var video = videos[i],
                    videoElement = _createVideoElement(video);
                
                that.append(videoElement);
            }
        });

        function _createVideoElement(video){
            if (video == null)
                return null;
                
            var youtube = '<iframe width="100%" height="300px" src="' + video.url + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                videoHtml = `
                <div>
                    <div class="row">
                        <div class="video-card">
                        ${ youtube }
                        <div class="video-footer">
                            <h5 class="">${ video.title }</h5>
                            <p class="card-text">${ video.description }</p>
                            <small class="text-muted">${ video.date }</small>
                        </div>
                    </div>
                </div>`
                
            return $(videoHtml);
        }
    };
});