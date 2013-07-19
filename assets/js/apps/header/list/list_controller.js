DashboardManager.module('HeaderApp.List', function(List, DashboardManager,
                                                 Backbone, Marionette, $, _){
    List.Controller = {
        listHeader: function(){
            var links = DashboardManager.request("header:entities");
            var headers = new List.Headers({collection: links});

            headers.on ("brand:clicked",function(){
                DashboardManager.trigger ("dashboards:list");
            });

            headers.on ("itemview:navigate", function (childView,model){
                var url = model.get('url');
                if (url === "dashboards"){
                   DashboardManager.trigger ("dashboards:list");
                } else if (url === "user"){
                   DashboardManager.trigger ("user:show");
                } else {
                    throw "no such sub-application: " + url;
                }
            });

            DashboardManager.headerRegion.show(headers);
        },

        setActiveHeader: function (headerUrl){
            console.log ("pressed -->", headerUrl);
            var links =   DashboardManager.request("header:entities");
            var headerToSelect = links.find (function(header){
                return header.get("url") === headerUrl;
            });
            headerToSelect.select(); //because the model is mixed with backbone.picky
            links.trigger ("reset"); //in order to force the render of each element of the collection
        }
    };
});