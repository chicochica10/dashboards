DashboardManager.module("UserApp", function(UserApp, DashboardManager, Backbone, Marionette, $, _) {
    UserApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "user": "showUser"
        }
    }) ;

    var API = {
        showUser: function(){
            UserApp.Show.Controller.showUser();
            DashboardManager.HeaderApp.List.Controller.setActiveHeader("user");
        }
    };

    DashboardManager.on ("user:show",function(){
        DashboardManager.navigate("user");
        API.showUser();
    });


    DashboardManager.addInitializer(function(){
        new UserApp.Router({
            controller: API
        });
    });
});

