(function(){
    function RoutingService(){
        this.getRoutingInfo = function(){
            var parts = window.location.hash.split('/');
            if (parts.length == 3) {
                return {
                    work : parts[0],
                    verse : parts[1]
                };
            }
        };
    }

    window.routingService = new RoutingService();
})();