DashboardManager.module ("UserApp.Show", function (Show, DashboardManager,
                                                         Backbone, Marionette, $, _){

    Show.Message = Marionette.ItemView.extend({
        template: "#user-message"
    });

});
