/**
 * Created with JetBrains WebStorm.
 * User: angelrey
 * Date: 18/07/13
 * Time: 8:25
 * To change this template use File | Settings | File Templates.
 */

DashboardManager.module("HeaderApp", function(Header, DashboardManager, Backbone, Marionette, $, _) {

    var API = {
        listHeader: function(){
            Header.List.Controller.listHeader();
        }
    };

    Header.on ("start", function(){
       API.listHeader();
    });
});