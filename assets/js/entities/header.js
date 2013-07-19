DashboardManager.module("Entities", function(Entities, DashboardManager, Backbone, Marionette, $, _) {

    Entities.Header = Backbone.Model.extend({
        initialize: function (){
            var selectable = new Backbone.Picky.Selectable(this);
            _.extend(this,selectable);     //mezcla el picky con el modelo
        }
    });

    Entities.HeaderCollection = Backbone.Collection.extend ({
        model: Entities.Header,

        initialize: function (){
            var singleSelect = new Backbone.Picky.SingleSelect(this);
            _.extend(this, singleSelect);
        }
    });

    var initializeHeaders = function (){
        Entities.headers = new Entities.HeaderCollection ([{name:"Dashboards",url:"dashboards"},{name:"User",url:"user"}]);
    };

    var API = {
        getHeaders: function (){
            if (Entities.headers === undefined) {
                  initializeHeaders();
            }
            return Entities.headers;
        }
    };

    DashboardManager.reqres.setHandler("header:entities", function(){
        return API.getHeaders();
    });

});