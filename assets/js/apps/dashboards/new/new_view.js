DashboardManager.module("DashboardsApp.New", function(New, DashboardManager, Backbone, Marionette, $, _) {

    New.Dashboard = DashboardManager.DashboardsApp.Common.Views.Form.extend({
        title: "New dashboard",

        onRender: function(){
            this.$el.find(".js-submit").text("Create dashboard");
        }

    });
});