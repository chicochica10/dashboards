DashboardManager.module ('UserApp.Show', function(Show, DashboardManager, Backbone, Marionette, $, _) {
    Show.Controller = {
        showUser: function(){
            var view = new Show.Message();
            DashboardManager.mainRegion.show (view);
        }
    };
});
